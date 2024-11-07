import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from '../Constant/messages.js';

export class Input {
  constructor() {
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
          INPUT_MESSAGE.PRODUCT_NAMES_AND_AMOUNT
        );
        // TODO: 유효성 검사 파일 추후 삽입
        return this.productNamesAndAmount;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async getIsAddPromotionProductsInput() {
    while (true) {
      try {
        this.isPromotionProductsInput = await Console.readLineAsync(
          INPUT_MESSAGE.IS_VALID_PROMOTION_ADD
        );
        // TODO: 유효성 검사 파일 추후 삽입
        return this.isPromotionProductsInput;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async getIsFixedPricePurchaseInput() {
    while (true) {
      try {
        this.isFixedPricePurchaseInput = await Console.readLineAsync(
          INPUT_MESSAGE.IS_FIXED_PRICE_PURCHASE
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
          INPUT_MESSAGE.IS_MEMBERSHIP_APPLICATION
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
          INPUT_MESSAGE.IS_ADDITIONAL_PURCHASE
        );
        // TODO: 유효성 검사 파일 추후 삽입
        return this.isAdditionalPurchaseInput;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }
}
