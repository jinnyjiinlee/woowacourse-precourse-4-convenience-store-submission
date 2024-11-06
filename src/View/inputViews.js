import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE, OUTPUT_MESSAGE } from '../Constant/messages.js';
import { Output } from './outputViews.js';

export class Input {
  constructor() {
    this.productNamesAndAmount = null;
    this.isPromotionProductsInput = null;

    this.productNamesAndAmount = INPUT_MESSAGE.PRODUCT_NAMES_AND_AMOUNT;
    this.isValidPromotionAdd = INPUT_MESSAGE.IS_VALID_PROMOTION_ADD;
  }

  async getProductNamesAndAmountInput() {
    while (true) {
      try {
        this.productNamesAndAmount = await Console.readLineAsync(
          this.productNamesAndAmount
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
          this.isValidPromotionAdd
        );
        // TODO: 유효성 검사 파일 추후 삽입
        return this.isPromotionProductsInput;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }
}
