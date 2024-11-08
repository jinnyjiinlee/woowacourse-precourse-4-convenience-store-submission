import { Console } from '@woowacourse/mission-utils';
import { InputMessage } from '../Constant/messages.js';

export class Input {
  constructor() {
    this.inputMessage = new InputMessage();
    this.productNamesAndAmount = null;
    this.isPromotionProductsInput = null;
    this.isFixedPricePurchaseInput = null;
    this.isMembershipApplicationInput = null;
    this.isAdditionalPurchaseInput = null;
  }

  async getProductNamesAndAmountInput() {
    while (true) {
      try {
        this.productNamesAndAmount = await Console.readLineAsync(
          this.inputMessage.INPUT_MESSAGE.PRODUCT_NAMES_AND_AMOUNT
        );
        // TODO: 유효성 검사 파일 추후 삽입
        return this.productNamesAndAmount;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async getAddGiftConfirmationInput(productName) {
    while (true) {
      try {
        this.isPromotionProductsInput = await Console.readLineAsync(
          this.inputMessage.INPUT_MESSAGE.IS_VALID_PROMOTION_ADD(productName)
        );
        // TODO: 유효성 검사 파일 추후 삽입
        return this.isPromotionProductsInput;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async getFixedPriceConfirmationInput(productName, AdjustmentAmount) {
    while (true) {
      try {
        this.isFixedPricePurchaseInput = await Console.readLineAsync(
          this.inputMessage.INPUT_MESSAGE.IS_FIXED_PRICE_PURCHASE(productName, AdjustmentAmount)
        );
        // TODO: 유효성 검사 파일 추후 삽입
        return this.isFixedPricePurchaseInput;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async getIsMembershipApplicationInput() {
    while (true) {
      try {
        this.isMembershipApplicationInput = await Console.readLineAsync(
          this.inputMessage.INPUT_MESSAGE.IS_MEMBERSHIP_APPLICATION
        );
        // TODO: 유효성 검사 파일 추후 삽입
        return this.isMembershipApplicationInput;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async getIsAdditionalPurchaseInput() {
    while (true) {
      try {
        this.isAdditionalPurchaseInput = await Console.readLineAsync(
          this.inputMessage.INPUT_MESSAGE.IS_ADDITIONAL_PURCHASE
        );
        // TODO: 유효성 검사 파일 추후 삽입
        return this.isAdditionalPurchaseInput;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }
}
