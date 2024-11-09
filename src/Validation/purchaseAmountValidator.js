import { PRODUCTS } from '../Constant/productsCount.js';
import { extractProductNamesAndAmount } from '../Utils/parsedProductNamesAndAmount.js';

export class PurchaseAmountValidator {
  constructor() {
    this.productName = 0;
    this.productAmount = 0;
    this.totalStock = 0;
    this.targetProduct = null;
  }

  hasSufficientStock(productNamesAndAmount) {
    const extractArrProductAndAmount = extractProductNamesAndAmount(
      productNamesAndAmount
    );

    // console.log('extractArrProductAndAmount: ', extractArrProductAndAmount);

    for (let i = 0; i < extractArrProductAndAmount.length; i += 1) {
      this.productName = extractArrProductAndAmount[i][0];
      this.productAmount = Number(extractArrProductAndAmount[i][1]);

      this.targetProduct = PRODUCTS.find(
        (product) => product.productName === this.productName
      );

      //재고 총량 구하기
      this.totalStock =
        (this.targetProduct.regularStock ?? 0) +
        (this.targetProduct.promotionStock ?? 0);

      // console.log(
      //   'this.targetProduct.regularStock: ',
      //   this.targetProduct.regularStock
      // );
      // console.log(
      //   'this.targetProduct.promotionStock: ',
      //   this.targetProduct.promotionStock
      // );
      // console.log('this.totalStock: ', this.totalStock);

      if (this.productAmount > this.totalStock) {
        throw new Error(
          '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.'
        );
      }
    }
  }
}
