import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGE } from '../Constant/messages.js';
import { PRODUCTS } from '../Constant/productList.js';

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
    this.promotionChecking();
    this.promotionTypeChecking();

    if (this.promotionStockText !== '') {
      this.promotionStockPrint();
    }
  }

  promotionChecking() {
    if (this.product.promotionStock === null) {
      this.promotionStockText = '';
    }

    if (
      this.product.promotionStock === 0 ||
      this.product.promotionStock === '재고 없음'
    ) {
      this.promotionStockText = '재고 없음';
    }

    if (this.product.promotionStock > 0 && this.product.promotionStock < 30) {
      this.promotionStockText = `${this.product.promotionStock}개`;
    }
  }

  promotionTypeChecking() {
    if (this.product.promotionType === null) {
      this.promotionType = '';
    }

    if (this.product.promotionType && this.product.promotionType !== null) {
      this.promotionType = this.product.promotionType;
    }
  }

  regularStockChecking() {
    if (
      this.product.regularStock !== null &&
      this.product.regularStock !== '재고 없음'
    ) {
      //이걸 재고 없음 일때는 재고없음으로 나오게 해야 한다.
      this.regularStockText = `${this.product.regularStock}개`;
      if (this.product.regularStock === 0) {
        this.regularStockText = '재고 없음';
      }
      this.regularStockPrint();
    }
  }

  promotionStockPrint() {
    Console.print(
      `- ${this.product.productName} ${this.product.price.toLocaleString()}원 ${this.promotionStockText} ${this.promotionType}`,
    );
  }

  regularStockPrint() {
    Console.print(
      `- ${this.product.productName} ${this.product.price.toLocaleString()}원 ${
        this.regularStockText
      }`,
    );
  }
}
