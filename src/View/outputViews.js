import { Console } from '@woowacourse/mission-utils';
import { ParedProductsData } from '../Model/productsInPossessionData.js';
import { OUTPUT_MESSAGE } from '../Constant/messages.js';
import { PRODUCTS, RECEIPT_TEXT } from '../Constant/productsCount.js';

export class Output {
  async printProductsInPossessionList() {
    const rawProductsList = new ParedProductsData().productsInPossession();

    Console.print(OUTPUT_MESSAGE.WELCOME_GREETING);

    PRODUCTS.forEach((product) => {
      // 프로모션 재고 출력
      if (product.promotionStock !== null) {
        let promotionStockText = `${product.promotionStock}개 ${
          product.promotionType || ''}`;
        if (product.promotionStock === 0) {
          promotionStockText = '재고 없음';
        }

        Console.print(
          `- ${product.productName} ${product.price.toLocaleString()}원 ${promotionStockText}`
        );
      }

      // 일반 재고 출력
      if (product.regularStock !== null) {
        let regularStockText = `${product.regularStock}개`;
        if (product.regularStock === 0) {
          regularStockText = '재고 없음';
        }

        Console.print(
          `- ${product.productName} ${product.price.toLocaleString()}원 ${regularStockText}`
        );
      }
    });
  }
}
