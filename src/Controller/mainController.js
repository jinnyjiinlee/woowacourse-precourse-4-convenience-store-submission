import {
  PROMOTION_PRODUCTS_NAME_LIST,
  USER_RECEIVED_PRODUCT_AMOUNT,
  TOTAL_PRODUCTS_NAME_LIST,
  NORMAL_PRODUCT_AMOUNT,
  PROMOTION_PRODUCT_AMOUNT,
} from '../Constant/productsCount.js';
import { CheckGiftOrDiscountStatus } from '../Model/productAmountAndNotPromotion.js';
import { Input } from '../View/inputViews.js';
import { Output } from '../View/outputViews.js';
import { extractProductNamesAndAmount } from './parsedProductNamesAndAmount.js';

class MainController {
  constructor() {
    this.input = new Input();
    this.output = new Output();

    this.selectedProductNamesAndAmount = null;
    this.addGiftConfirmationResponse = null;
    this.isFixedPricePurchaseResponses = null;
    this.isMembershipApplicationInput = null;
    this.isAdditionalPurchaseInput = null;

    this.selectedProductAmounts = [];

    this.PROMOTION_PRODUCT_AMOUNT = PROMOTION_PRODUCT_AMOUNT;
    this.NORMAL_PRODUCT_AMOUNT = NORMAL_PRODUCT_AMOUNT;
  }

  async ProgramStart() {
    this.output.printProductsInPossessionList();

    await this.getProductNamesAndAmount();

    this.totalProductNameAndAmount = extractProductNamesAndAmount(
      this.selectedProductNamesAndAmount
    );

    console.log('this.NORMAL_PRODUCT_AMOUNT: ', this.NORMAL_PRODUCT_AMOUNT)
    console.log('this.PROMOTION_PRODUCT_AMOUNT: ', this.PROMOTION_PRODUCT_AMOUNT)

    for (let i = 0; i < this.totalProductNameAndAmount.length; i += 1) {
      this.productName = this.totalProductNameAndAmount[i][0];
      this.productAmount = Number(this.totalProductNameAndAmount[i][1]);
      this.AdjustmentAmount = 0;

      // 프로모션 적용 여부 확인
      this.eligiblePromotionProduct = Object.keys(
        PROMOTION_PRODUCTS_NAME_LIST
      ).find((key) => PROMOTION_PRODUCTS_NAME_LIST[key] === this.productName);

      console.log(
        'this.eligiblePromotionProduct: ',
        this.eligiblePromotionProduct
      );

      if (this.eligiblePromotionProduct) {
        //만약 값이 있다면,
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
      }

      this.productNameKey = Object.keys(TOTAL_PRODUCTS_NAME_LIST).find(
        (key) => TOTAL_PRODUCTS_NAME_LIST[key] === this.productName
      );

      USER_RECEIVED_PRODUCT_AMOUNT[this.productNameKey] = this.productAmount;
      console.log(
        'USER_RECEIVED_PRODUCT_AMOUNT[this.productNameKey] :',
        USER_RECEIVED_PRODUCT_AMOUNT[this.productNameKey]
      );

      if (this.eligiblePromotionProduct) {
        // updateProductStock
        if (
          this.PROMOTION_PRODUCT_AMOUNT[this.productNameKey] >=
          this.productAmount
        ) {
          // 프로모션 재고가 충분한 경우, 요청된 수량만큼 프로모션 재고에서 차감
          this.PROMOTION_PRODUCT_AMOUNT[this.productNameKey] -=
            this.productAmount;

          // 프로모션 재고가 0이 되면 '재고 없음'으로 표시
          if (this.PROMOTION_PRODUCT_AMOUNT[this.productNameKey] <= 0) {
            this.PROMOTION_PRODUCT_AMOUNT[this.productNameKey] = '재고 없음';
          }
        } else {
          // 프로모션 재고가 부족한 경우
          this.remainingAmount =
            this.productAmount -
            this.PROMOTION_PRODUCT_AMOUNT[this.productNameKey];

          // 프로모션 재고를 모두 소진하고 '재고 없음'으로 표시
          this.PROMOTION_PRODUCT_AMOUNT[this.productNameKey] = '재고 없음';

          // 남은 수량만큼 일반 재고에서 차감
          this.NORMAL_PRODUCT_AMOUNT[this.productNameKey] -=
            this.remainingAmount;

          // 일반 재고가 0 이하가 되면 '재고 없음'으로 표시
          if (this.NORMAL_PRODUCT_AMOUNT[this.productNameKey] <= 0) {
            this.NORMAL_PRODUCT_AMOUNT[this.productNameKey] = '재고 없음';
          }
        }
      }
      if (!this.eligiblePromotionProduct) {
        this.productNameKey = Object.keys(TOTAL_PRODUCTS_NAME_LIST).find(
          (key) => TOTAL_PRODUCTS_NAME_LIST[key] === this.productName
        );
        // 남은 수량만큼 일반 재고에서 차감
        this.NORMAL_PRODUCT_AMOUNT[this.productNameKey] -= this.productAmount;

        // 일반 재고가 0 이하가 되면 '재고 없음'으로 표시
        if (this.NORMAL_PRODUCT_AMOUNT[this.productNameKey] <= 0) {
          this.NORMAL_PRODUCT_AMOUNT[this.productNameKey] = '재고 없음';
        }
      }
      console.log('this.NORMAL_PRODUCT_AMOUNT: ', this.NORMAL_PRODUCT_AMOUNT)
      console.log('this.PROMOTION_PRODUCT_AMOUNT: ', this.PROMOTION_PRODUCT_AMOUNT)
    }
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
