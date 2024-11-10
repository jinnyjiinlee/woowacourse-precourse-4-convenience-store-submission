import { PRODUCTS } from '../Constant/productsCount.js';

export class CheckGiftOrDiscountStatus {
  constructor() {
    this.productName = null;
    this.productQuantities = null;

    this.adjustmentQuantities = 0;
    this.PRODUCTS = PRODUCTS;
    this.targetProduct = null;
  }

  checkGiftOrDiscountStatus = (productName, productQuantities) => {
    this.productName = productName;
    this.productQuantities = productQuantities;

    this.targetProduct = this.PRODUCTS.find(
      (product) => product.productName === this.productName
    );

    if (this.targetProduct.promotionStock > this.productQuantities) {
      this.applyExtraPromotion();

      return ['증정', this.adjustmentQuantities];
    }

    if (this.targetProduct.promotionStock <= this.productQuantities) {
      this.applyNoPromotionDiscount();

      return ['적용안됨', this.adjustmentQuantities];
    }
  };

  // availablePromotionStock > productQuantities
  applyExtraPromotion = () => {
    // 1 + 1 - 구매 개수가 홀수 일 때, 1개 더 증정
    if (
      (this.targetProduct.productName === '오렌지주스' ||
        this.targetProduct.productName === '감자칩' ||
        this.targetProduct.productName === '초코바' ||
        this.targetProduct.productName === '컵라면') &&
      this.productQuantities % 2 === 1
    ) {
      this.adjustmentQuantities = 1;
    }

    // 2 + 1 - 구매개수가 3의 배수 -1일 때,
    if (
      (this.targetProduct.productName === '콜라' ||
        this.targetProduct.productName === '사이다' ||
        this.targetProduct.productName === '탄산수') &&
      this.productQuantities % 3 === 2
    ) {
      this.adjustmentQuantities = 1;
    }
  };

  // availablePromotionStock < productQuantities
  applyNoPromotionDiscount = () => {
    // 1 + 1
    if (
      this.targetProduct.productName === '오렌지주스' ||
      this.targetProduct.productName === '감자칩' ||
      this.targetProduct.productName === '초코바' ||
      this.targetProduct.productName === '컵라면'
    ) {
      this.firstUnavailableStockCount =
        this.productQuantities - this.targetProduct.promotionStock;
      this.secondUnavailableStockCount =
        (this.productQuantities - this.firstUnavailableStockCount) % 2;

      this.adjustmentQuantities =
        this.firstUnavailableStockCount + this.secondUnavailableStockCount;
    }

    // 2 + 1
    if (
      this.targetProduct.productName === '콜라' ||
      this.targetProduct.productName === '사이다' ||
      this.targetProduct.productName === '탄산수'
    ) {
      this.firstUnavailableStockCount =
        this.productQuantities - this.targetProduct.promotionStock;

      this.secondUnavailableStockCount =
        (this.productQuantities - this.firstUnavailableStockCount) % 3;

      this.adjustmentQuantities =
        this.firstUnavailableStockCount + this.secondUnavailableStockCount;
    }
  };
}
