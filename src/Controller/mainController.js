import { PRODUCTS } from '../Constant/productsCount.js';
import { CheckGiftOrDiscountStatus } from '../Model/giftOrDiscountStatusChecking.js';
import { Input } from '../View/inputViews.js';
import { Output } from '../View/outputViews.js';
import { extractProductNamesAndAmount } from './parsedProductNamesAndAmount.js';
import { receiptPrinting } from '../Model/calculatorForReceiptPrinting.js';

class MainController {
  constructor() {
    this.input = new Input();
    this.output = new Output();
    this.productName = null;

    this.selectedProductNamesAndAmount = null;
    this.addGiftConfirmationResponse = null;
    this.isMembershipApplicationInput = null;
    this.isAdditionalPurchaseInput = null;

    this.targetProduct = null;
  }

  async ProgramStart() {
    this.output.printProductsInPossessionList();

    await this.getProductNamesAndAmount();

    this.extractArrProductAndAmount = extractProductNamesAndAmount(
      this.selectedProductNamesAndAmount
    );

    for (let i = 0; i < this.extractArrProductAndAmount.length; i += 1) {
      this.productName = this.extractArrProductAndAmount[i][0];
      this.productAmount = Number(this.extractArrProductAndAmount[i][1]);

      this.targetProduct = PRODUCTS.find(
        (product) => product.productName === this.productName
      );

      // 프로모션 적용 여부 확인 (프로모션 갯수 나오는 변수)
      this.eligiblePromotionProduct = this.targetProduct.promotionStock;

      // 프로모션 상품이 아니라면?
      if (!this.eligiblePromotionProduct) {
        // console.log('들어오면 안돼! ');
        // 남은 수량만큼 일반 재고에서 차감
   
        this.matchingRegularStock = this.targetProduct.regularStock;

        this.matchingRegularStock -= this.productAmount;


        this.targetProduct.totalReceivedAmount = this.productAmount;

        // 일반 재고가 0 이하가 되면 '재고 없음'으로 표시
        if (this.targetProduct.regularStock <= 0) {
          this.targetProduct.regularStock = '재고 없음';
        }
      }

      // 프로모션 상품이 맞다면?
      if (this.eligiblePromotionProduct) {
        this.promotionStatusAndAdjustmentAmount =
          new CheckGiftOrDiscountStatus().checkGiftOrDiscountStatus(
            this.productName,
            this.productAmount
          );

        this.promotionStatus = this.promotionStatusAndAdjustmentAmount[0];
        this.AdjustmentAmount = this.promotionStatusAndAdjustmentAmount[1];

        if (this.promotionStatus === '증정' && this.AdjustmentAmount > 0) {
          await this.getAddGiftConfirmationInput();
        }

        if (this.addGiftConfirmationResponse === 'Y') {
          // Y의 의미 프로모션 상품을 this.AdjustmentAmount 만큼 더 받겠다!
          this.productAmount += this.AdjustmentAmount;
        }

        if (this.promotionStatus === '적용안됨' && this.AdjustmentAmount > 0) {
          await this.getFixedPriceConfirmationInput();
        }

        if (this.fixedPriceConfirmationResponse === 'N') {
          // N의 의미: 프로모션 적용 안되는 상품은 this.AdjustmentAmount 만큼 구매를 취소하겠다.
          this.productAmount -= this.AdjustmentAmount;
        }

        this.targetProduct.totalReceivedAmount = this.productAmount;

        //  1+1일때
        if (
          this.productName === '오렌지주스' ||
          this.productName === '감자칩' ||
          this.productName === '초코바' ||
          this.productName === '컵라면'
        ) {
          this.targetProduct.receivedGiftAmount = Math.floor(
            this.productAmount / 2
          );
        }

        // 2+1 일때, 콜라, 사이다, 탄산수
        if (
          this.productName === '콜라' ||
          this.productName === '사이다' ||
          this.productName === '탄산수'
        ) {
          this.targetProduct.receivedGiftAmount = Math.floor(
            this.targetProduct.totalReceivedAmount / 3
          );
        }

        // updateProductStock
        if (this.targetProduct.promotionStock) {
          // 프로모션 재고가 충분한 경우, 요청된 수량만큼 프로모션 재고에서 차감
          this.targetProduct.promotionStock -= this.productAmount;

          // 프로모션 재고가 0이 되면 '재고 없음'으로 표시
          if (this.targetProduct.promotionStock <= 0) {
            this.targetProduct.promotionStock = '재고 없음';
          }
        } else {
          // 프로모션 재고가 부족한 경우
          this.remainingAmount =
            this.productAmount - this.targetProduct.promotionStock;

          // 프로모션 재고를 모두 소진하고 '재고 없음'으로 표시
          this.targetProduct.promotionStock = '재고 없음';

          // 남은 수량만큼 일반 재고에서 차감
          this.targetProduct.regularStock -= this.remainingAmount;

          // 일반 재고가 0 이하가 되면 '재고 없음'으로 표시
          if (this.targetProduct.regularStock <= 0) {
            this.targetProduct.regularStock = '재고 없음';
          }
        } // 프로모션 상품 끝
      }
    }
    new receiptPrinting().printReceipt();
  }

  async getProductNamesAndAmount() {
    this.selectedProductNamesAndAmount =
      await this.input.getProductNamesAndAmountInput();
  }

  async getAddGiftConfirmationInput() {
    this.addGiftConfirmationResponse =
      await this.input.getAddGiftConfirmationInput(this.productName);
  }

  async getFixedPriceConfirmationInput() {
    this.fixedPriceConfirmationResponse =
      await this.input.getFixedPriceConfirmationInput(
        this.productName,
        this.AdjustmentAmount
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
