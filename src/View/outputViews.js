import { Console } from '@woowacourse/mission-utils';
import { ParedProductsData } from '../Model/productsInPossessionData.js';
import { OUTPUT_MESSAGE } from '../Constant/messages.js';
import { PRODUCTS, RECEIPT_TEXT } from '../Constant/productsCount.js';

export class Output {
  async printProductsInPossessionList() {
    const rawProductsList = new ParedProductsData().productsInPossession();

    Console.print(OUTPUT_MESSAGE.WELCOME_GREETING);

    PRODUCTS.forEach((product) => {
      // 프로모션 재고가 있을 경우 출력
      if (product.promotionStock) {
        Console.print(
          `${product.productName} ${product.price}원 ${product.promotionStock}개 ${product.promotionType}`
        );
      }

      // 일반 재고가 있을 경우 출력
      if (product.regularStock) {
        Console.print(
          `${product.productName} ${product.price}원 ${product.regularStock}개`
        );
      }
    });
  }


}
