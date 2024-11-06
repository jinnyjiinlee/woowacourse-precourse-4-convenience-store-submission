import { Console } from '@woowacourse/mission-utils';
import { INPUT_MESSAGE } from '../Constant/messages.js';

export class Input {
  constructor() {
    this.productNamesAndAmount = null;

    this.productNamesAndAmount = INPUT_MESSAGE.PRODUCT_NAMES_AND_AMOUNT;
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
}
