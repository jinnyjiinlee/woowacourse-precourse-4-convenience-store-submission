import { PRODUCTS } from '../Constant/productsCount.js';
import { parseProductDetails } from '../Utils/parsedProductNamesAndQuantities.js';

export class PurchaseQuantitiesValidator {
  constructor() {
    this.productName = 0;
    this.productQuantity = 0;
    this.totalStock = 0;
    this.targetProduct = null;
  }

  validateProductDetails(productNamesAndQuantities) {
    this.productNamesAndQuantities = productNamesAndQuantities;

    this.validateAvailableStock();
  }

  validateAvailableStock() {
    this.parseProductDetails();
    for (let i = 0; i < this.parsedProductDetails.length; i += 1) {
      this.productName = this.parsedProductDetails[i][0];
      this.productQuantity = Number(this.parsedProductDetails[i][1]);
      this.validateProductItem();

      this.findProductName();
      this.calculateAvailableStock();
      this.printErrorMessageForNoStock();
    }
  }

  parseProductDetails() {
    this.parsedProductDetails = parseProductDetails(
      this.productNamesAndQuantities,
    );
  }

  validateProductItem() {
    this.validateProductName();
    this.validateProductQuantity();
  }

  validateProductName() {
    const koreanRex = /^[가-힣]+$/;
    if (!koreanRex.test(this.productName)) {
      throw new Error(
        '\n[ERROR] 유효하지 않은 상품 이름입니다. 다시 입력해 주세요.',
      );
    }
  }

  validateProductQuantity() {
    if (
      Number.isNaN(this.productQuantity) ||
      this.productQuantity <= 0 ||
      !Number.isInteger(this.productQuantity)
    ) {
      throw new Error(
        '\n[ERROR] 유효하지 않은 상품 개수입니다. 다시 입력해 주세요.',
      );
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
        '\n[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
      );
    }
  }
}
