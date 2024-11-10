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
    this.productQuantities = null;

    this.getProductNamesAndQuantitiesInput = null;
    this.addGiftConfirmationResponse = null;
    this.isMembershipApplicationInput = null;
    this.isAdditionalPurchaseInput = null;

    this.targetProduct = null;
    this.additionalPurchaseResponse = null;

    this.receiptPrinter = new ReceiptPrinting();
  }

  async ProgramStart() {
    this.initializeTransaction(); // 거래 관련 필드 초기화
    this.output.printProductsInPossessionList();

    await this.getProductNamesAndQuantities();

    this.extractArrProductAndQuantities = extractProductNamesAndQuantities(
      this.getProductNamesAndQuantitiesInput
    );

    for (let i = 0; i < this.extractArrProductAndQuantities.length; i += 1) {
      this.productName = this.extractArrProductAndQuantities[i][0];
      this.productQuantities = Number(
        this.extractArrProductAndQuantities[i][1]
      );

      this.targetProduct = PRODUCTS.find(
        (product) => product.productName === this.productName
      );

      // 프로모션 적용 여부 확인 (프로모션 갯수 나오는 변수)
      if (this.targetProduct.promotionStock > 0 && isPromotionActive === true) {
        this.eligiblePromotionProduct === true;
      }

      // 프로모션 상품이 아니라면?
      if (!this.eligiblePromotionProduct) {
        // 남은 수량만큼 일반 재고에서 차감

        this.matchingRegularStock = this.targetProduct.regularStock;

        this.matchingRegularStock -= this.productQuantities;

        this.targetProduct.totalReceivedQuantities = this.productQuantities;

        // 일반 재고가 0 이하가 되면 '재고 없음'으로 표시
        if (this.targetProduct.regularStock <= 0) {
          this.targetProduct.regularStock = '재고 없음';
        }
      }

      // 프로모션 상품이 맞다면?
      if (this.eligiblePromotionProduct) {
        this.promotionStatusAndAdjustmentQuantities =
          new CheckGiftOrDiscountStatus().checkGiftOrDiscountStatus(
            this.productName,
            this.productQuantities
          );

        this.promotionStatus = this.promotionStatusAndAdjustmentQuantities[0];
        this.AdjustmentQuantities =
          this.promotionStatusAndAdjustmentQuantities[1];

        if (this.promotionStatus === '증정' && this.AdjustmentQuantities > 0) {
          await this.getAddGiftConfirmationInput();
        }

        if (this.addGiftConfirmationResponse === 'Y') {
          // Y의 의미 프로모션 상품을 this.AdjustmentQuantities 만큼 더 받겠다!
          this.productQuantities += this.AdjustmentQuantities;
        }

        if (
          this.promotionStatus === '적용안됨' &&
          this.AdjustmentQuantities > 0
        ) {
          await this.getFixedPriceConfirmationInput();
        }

        if (this.fixedPriceConfirmationResponse === 'N') {
          // N의 의미: 프로모션 적용 안되는 상품은 this.AdjustmentQuantities 만큼 구매를 취소하겠다.
          this.productQuantities -= this.AdjustmentQuantities;
        }

        this.targetProduct.totalReceivedQuantities = this.productQuantities;

        //  1+1일때
        if (
          this.productName === '오렌지주스' ||
          this.productName === '감자칩' ||
          this.productName === '초코바' ||
          this.productName === '컵라면'
        ) {
          this.targetProduct.receivedGiftQuantities = Math.floor(
            this.productQuantities / 2
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
          this.targetProduct.promotionStock -= this.productQuantities;

          // 프로모션 재고가 0이 되면 '재고 없음'으로 표시
          if (this.targetProduct.promotionStock <= 0) {
            this.targetProduct.promotionStock = '재고 없음';
          }
        } else {
          // 프로모션 재고가 부족한 경우
          this.remainingQuantities =
            this.productQuantities - this.targetProduct.promotionStock;

          // 프로모션 재고를 모두 소진하고 '재고 없음'으로 표시
          this.targetProduct.promotionStock = '재고 없음';

          // 남은 수량만큼 일반 재고에서 차감
          this.targetProduct.regularStock -= this.remainingQuantities;

          // 일반 재고가 0 이하가 되면 '재고 없음'으로 표시
          if (this.targetProduct.regularStock <= 0) {
            this.targetProduct.regularStock = '재고 없음';
          }
        } // 프로모션 상품 끝
      }
    }
    await this.getIsMembershipApplicationInput();

    new ReceiptPrinting().printReceipt(this.isMembershipApplicationInput);

    await this.getIsAdditionalPurchaseInput();

    if (this.isAdditionalPurchaseInput === 'Y') {
      await this.ProgramStart();
    }
  }

  initializeTransaction() {
    PRODUCTS.forEach((product) => {
      product.totalReceivedQuantities = 0; // 받은 총량 초기화
      product.receivedGiftQuantities = 0; // 받은 증정품 초기화
    });
  }

  async getProductNamesAndQuantities() {
    this.getProductNamesAndQuantitiesInput =
      await this.input.getProductNamesAndQuantitiesInput();
  }

  async getAddGiftConfirmationInput() {
    this.addGiftConfirmationResponse =
      await this.input.getAddGiftConfirmationInput(this.productName);
  }

  async getFixedPriceConfirmationInput() {
    this.fixedPriceConfirmationResponse =
      await this.input.getFixedPriceConfirmationInput(
        this.productName,
        this.AdjustmentQuantities
      );
  }

  async getIsMembershipApplicationInput() {
    this.isMembershipApplicationInput =
      await this.input.getIsMembershipApplicationInput();
  }

  async getIsAdditionalPurchaseInput() {
    this.isAdditionalPurchaseInput =
      await this.input.getIsAdditionalPurchaseInput();
  }
}

export { MainController };
