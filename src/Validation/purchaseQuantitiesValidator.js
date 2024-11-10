import { PRODUCTS } from '../Constant/productsCount.js';
import { parseProductDetails } from '../Utils/parsedProductNamesAndQuantities.js';

export class PurchaseQuantitiesValidator {
  constructor() {
    this.productName = 0;
    this.productQuantity = 0;
    this.totalStock = 0;
    this.targetProduct = null;
  }

  validateAvailableStock(productNamesAndQuantities) {
    this.parsedProductDetails = parseProductDetails(productNamesAndQuantities);
    for (let i = 0; i < this.parsedProductDetails.length; i += 1) {
      this.productName = this.parsedProductDetails[i][0];
      this.productQuantity = Number(this.parsedProductDetails[i][1]);
      this.findProductName();
      this.calculateAvailableStock();
      this.printErrorMessageForNoStock();
    }
  }

  findProductName() {
    this.targetProduct = PRODUCTS.find(
      (product) => product.productName === this.productName,
    );
  }

  calculateAvailableStock() {
    this.totalStock =
      (this.targetProduct.regularStock ?? 0) +
      (this.targetProduct.promotionStock ?? 0);
  }

  printErrorMessageForNoStock() {
    if (this.productQuantity > this.totalStock) {
      throw new Error(
        '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
      );
    }
  }
}
