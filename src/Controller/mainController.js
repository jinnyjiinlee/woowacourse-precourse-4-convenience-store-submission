import { PRODUCTS } from '../Constant/productsCount.js';
import { CheckGiftOrDiscountStatus } from '../Model/giftOrDiscountStatusChecking.js';
import { InputView } from '../View/inputViews.js';
import { OutputView } from '../View/outputViews.js';
import { extractProductNamesAndQuantities } from '../Utils/parsedProductNamesAndQuantities.js';
import { ReceiptPrinting } from '../Model/calculatorForReceiptPrinting.js';
import { isPromotionActive } from '../Model/calculatorForPromotionTime.js';

class MainController {
  constructor() {
    this.input = new InputView();
    this.output = new OutputView();

    this.productName = null;
    this.productQuantity = null;

    this.productDetailsInput = null;
    this.giftConfirmationResponse = null;
    this.membershipApplicationResponse = null;
    this.additionalPurchaseResponse = null;

    this.targetProduct = null;
    this.additionalPurchaseResponse = null;

    this.receiptPrinter = new ReceiptPrinting();
  }

  async startProgram() {
    this.initializeTransaction(); // 거래 관련 필드 초기화
    this.output.printProductsInPossessionList();

    await this.getProductNamesAndQuantities();

    this.parsedProductDetails = extractProductNamesAndQuantities(
      this.productDetailsInput
    );

    for (let i = 0; i < this.parsedProductDetails.length; i += 1) {
      this.productName = this.parsedProductDetails[i][0];
      this.productQuantity = Number(this.parsedProductDetails[i][1]);

      this.targetProduct = PRODUCTS.find(
        (product) => product.productName === this.productName
      );

      // 프로모션 적용 여부 확인 (프로모션 갯수 나오는 변수)
      if (this.targetProduct.promotionStock > 0 && isPromotionActive === true) {
        this.isEligibleForPromotion === true;
      }

      // 프로모션 상품이 아니라면?
      if (!this.isEligibleForPromotion) {
        // 남은 수량만큼 일반 재고에서 차감

        this.currentRegularStock = this.targetProduct.regularStock;

        this.currentRegularStock -= this.productQuantity;

        this.targetProduct.totalReceivedQuantities = this.productQuantity;

        // 일반 재고가 0 이하가 되면 '재고 없음'으로 표시
        if (this.targetProduct.regularStock <= 0) {
          this.targetProduct.regularStock = '재고 없음';
        }
      }

      // 프로모션 상품이 맞다면?
      if (this.isEligibleForPromotion) {
        this.promotionInfo =
          new CheckGiftOrDiscountStatus().checkGiftOrDiscountStatus(
            this.productName,
            this.productQuantity
          );

        this.promotionStatus = this.promotionInfo[0];
        this.adjustmentQuantity = this.promotionInfo[1];

        if (this.promotionStatus === '증정' && this.adjustmentQuantity > 0) {
          await this.getAddGiftConfirmationInput();
        }

        if (this.giftConfirmationResponse === 'Y') {
          // Y의 의미 프로모션 상품을 this.adjustmentQuantity 만큼 더 받겠다!
          this.productQuantity += this.adjustmentQuantity;
        }

        if (
          this.promotionStatus === '적용안됨' &&
          this.adjustmentQuantity > 0
        ) {
          await this.getFixedPriceConfirmationInput();
        }

        if (this.fixedPriceConfirmationResponse === 'N') {
          // N의 의미: 프로모션 적용 안되는 상품은 this.adjustmentQuantity 만큼 구매를 취소하겠다.
          this.productQuantity -= this.adjustmentQuantity;
        }

        this.targetProduct.totalReceivedQuantities = this.productQuantity;

        //  1+1일때
        if (
          this.productName === '오렌지주스' ||
          this.productName === '감자칩' ||
          this.productName === '초코바' ||
          this.productName === '컵라면'
        ) {
          this.targetProduct.receivedGiftQuantities = Math.floor(
            this.productQuantity / 2
          );
        }

        // 2+1 일때, 콜라, 사이다, 탄산수
        if (
          this.productName === '콜라' ||
          this.productName === '사이다' ||
          this.productName === '탄산수'
        ) {
          this.targetProduct.receivedGiftQuantities = Math.floor(
            this.targetProduct.totalReceivedQuantities / 3
          );
        }

        // updateProductStock
        if (this.targetProduct.promotionStock) {
          // 프로모션 재고가 충분한 경우, 요청된 수량만큼 프로모션 재고에서 차감
          this.targetProduct.promotionStock -= this.productQuantity;

          // 프로모션 재고가 0이 되면 '재고 없음'으로 표시
          if (this.targetProduct.promotionStock <= 0) {
            this.targetProduct.promotionStock = '재고 없음';
          }
        } else {
          // 프로모션 재고가 부족한 경우
          this.remainingQuantity =
            this.productQuantity - this.targetProduct.promotionStock;

          // 프로모션 재고를 모두 소진하고 '재고 없음'으로 표시
          this.targetProduct.promotionStock = '재고 없음';

          // 남은 수량만큼 일반 재고에서 차감
          this.targetProduct.regularStock -= this.remainingQuantity;

          // 일반 재고가 0 이하가 되면 '재고 없음'으로 표시
          if (this.targetProduct.regularStock <= 0) {
            this.targetProduct.regularStock = '재고 없음';
          }
        } // 프로모션 상품 끝
      }
    }
    await this.getIsMembershipApplicationInput();

    new ReceiptPrinting().printReceipt(this.membershipApplicationResponse);

    await this.getIsAdditionalPurchaseInput();

    if (this.additionalPurchaseResponse === 'Y') {
      await this.startProgram();
    }
  }

  initializeTransaction() {
    PRODUCTS.forEach((product) => {
      product.totalReceivedQuantities = 0; // 받은 총량 초기화
      product.receivedGiftQuantities = 0; // 받은 증정품 초기화
    });
  }

  async getProductNamesAndQuantities() {
    this.productDetailsInput =
      await this.input.getProductNamesAndQuantitiesInput();
  }

  async getAddGiftConfirmationInput() {
    this.giftConfirmationResponse =
      await this.input.getAddGiftConfirmationInput(this.productName);
  }

  async getFixedPriceConfirmationInput() {
    this.fixedPriceConfirmationResponse =
      await this.input.getFixedPriceConfirmationInput(
        this.productName,
        this.adjustmentQuantity
      );
  }

  async getIsMembershipApplicationInput() {
    this.membershipApplicationResponse =
      await this.input.getIsMembershipApplicationInput();
  }

  async getIsAdditionalPurchaseInput() {
    this.additionalPurchaseResponse =
      await this.input.getIsAdditionalPurchaseInput();
  }
}

export { MainController };
