import {
  PROMOTION_PRODUCTS_NAME_LIST,
  USER_RECEIVED_PRODUCT_AMOUNT,
  TOTAL_PRODUCTS_NAME_LIST,
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
  }

  async ProgramStart() {
    this.output.printProductsInPossessionList();

    await this.getProductNamesAndAmount();

    this.totalProductNameAndAmount = extractProductNamesAndAmount(
      this.selectedProductNamesAndAmount
    );

    for (let i = 0; i < this.totalProductNameAndAmount.length; i += 1) {
      this.productName = this.totalProductNameAndAmount[i][0];
      this.productAmount = Number(this.totalProductNameAndAmount[i][1]);
      this.AdjustmentAmount = 0;

      console.log(this.productName)

      // 프로모션 적용 여부 확인
      this.eligiblePromotionProduct = Object.keys(
        PROMOTION_PRODUCTS_NAME_LIST
      ).find((key) => PROMOTION_PRODUCTS_NAME_LIST[key] === this.productName);

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
