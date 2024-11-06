import { Console } from '@woowacourse/mission-utils';
import { ParedProductsData } from '../Model/productsInPossessionData.js';
import { OUTPUT_MESSAGE } from '../Constant/messages.js';

export class Output {
  constructor() {
    this.productsInPossessionListArr =
      new ParedProductsData().parsedProductsInPossession();
  }

  async printProductsInPossessionList() {
    Console.print(OUTPUT_MESSAGE.WELCOME_GREETING);

    for (let i = 0; i < 16; i += 1) {
      Console.print(this.productsInPossessionListArr[i]);
    }
  }
}
