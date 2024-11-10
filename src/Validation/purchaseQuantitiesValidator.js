import { PRODUCTS } from '../Constant/productsCount.js';
import { extractProductNamesAndQuantities } from '../Utils/parsedProductNamesAndQuantities.js';

export class PurchaseQuantitiesValidator {
  constructor() {
    this.productName = 0;
    this.productQuantities = 0;
    this.totalStock = 0;
    this.targetProduct = null;
  }

  hasSufficientStock(productNamesAndQuantities) {
    const extractArrProductAndQuantities = extractProductNamesAndQuantities(
      productNamesAndQuantities
    );

    for (let i = 0; i < extractArrProductAndQuantities.length; i += 1) {
      this.productName = extractArrProductAndQuantities[i][0];
      this.productQuantities = Number(extractArrProductAndQuantities[i][1]);

      this.targetProduct = PRODUCTS.find(
        (product) => product.productName === this.productName
      );

      //재고 총량 구하기
      this.totalStock =
        (this.targetProduct.regularStock ?? 0) +
        (this.targetProduct.promotionStock ?? 0);

      if (this.productQuantities > this.totalStock) {
        throw new Error(
          '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.'
        );
      }
    }
  }
}
