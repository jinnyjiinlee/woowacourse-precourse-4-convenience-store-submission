import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from '../Constant/messages.js';
import { PRODUCTS } from '../Constant/productsCount.js';

export class OutputView {
  async printProductList() {
    Console.print(OUTPUT_MESSAGE.WELCOME_GREETING);

    PRODUCTS.forEach((product) => {
      this.product = product;
      this.promotionStockChecking();
      this.regularStockChecking();
    });
  }

  promotionStockChecking() {
    if (this.product.promotionStock !== null) {
      this.promotionStockText = `${this.product.promotionStock}개 ${
        this.product.promotionType || ''
      }`;
      if (this.product.promotionStock === 0) {
        this.printProductList.this.promotionStockText = '재고 없음';
      }
      this.promotionStockPrint();
    }
  }

  regularStockChecking() {
    if (this.product.regularStock !== null) {
      this.regularStockText = `${this.product.regularStock}개`;
      if (this.product.regularStock === 0) {
        this.regularStockText = '재고 없음';
      }
      this.regularStockPrint();
    }
  }

  promotionStockPrint() {
    Console.print(
      `- ${this.product.productName} ${this.product.price.toLocaleString()}원 ${
        this.promotionStockText
      }`
    );
  }

  regularStockPrint() {
    Console.print(
      `- ${this.product.productName} ${this.product.price.toLocaleString()}원 ${
        this.regularStockText
      }`
    );
  }
}
