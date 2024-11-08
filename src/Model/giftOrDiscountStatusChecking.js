import { PRODUCTS } from '../Constant/productsCount.js';

export class CheckGiftOrDiscountStatus {
  constructor() {
    this.productName = null;
    this.productAmount = null;

    this.adjustmentAmount = 0;
    this.PRODUCTS = PRODUCTS;
    this.targetProduct = null;
  }

  checkGiftOrDiscountStatus = (productName, productAmount) => {
    this.productName = productName;
    this.productAmount = productAmount;

    this.targetProduct = this.PRODUCTS.find(
      (product) => product.productName === this.productName
    );

    if (this.targetProduct.promotionStock > this.productAmount) {
      this.applyExtraPromotion();

      return ['증정', this.adjustmentAmount];
    }

    if (this.targetProduct.promotionStock <= this.productAmount) {
      this.applyNoPromotionDiscount();

      return ['적용안됨', this.adjustmentAmount];
    }
  };

  // availablePromotionStock > productAmount
  applyExtraPromotion = () => {
    // 1 + 1 - 구매 개수가 홀수 일 때, 1개 더 증정
    if (
      (this.targetProduct.productName === '오렌지주스' ||
        this.targetProduct.productName === '감자칩' ||
        this.targetProduct.productName === '초코바' ||
        this.targetProduct.productName === '컵라면') &&
      this.productAmount % 2 === 1
    ) {
      this.adjustmentAmount = 1;
    }

    // 2 + 1 - 구매개수가 3의 배수 -1일 때,
    if (
      (this.targetProduct.productName === '콜라' ||
        this.targetProduct.productName === '사이다' ||
        this.targetProduct.productName === '탄산수') &&
      this.productAmount % 3 === 2
    ) {
      this.adjustmentAmount = 1;
    }
  };

  // availablePromotionStock < productAmount
  applyNoPromotionDiscount = () => {
    // 1 + 1
    if (
      this.targetProduct.productName === '오렌지주스' ||
      this.targetProduct.productName === '감자칩' ||
      this.targetProduct.productName === '초코바' ||
      this.targetProduct.productName === '컵라면'
    ) {
      this.firstUnavailableStockCount =
        this.productAmount - this.targetProduct.promotionStock;
      this.secondUnavailableStockCount =
        (this.productAmount - this.firstUnavailableStockCount) % 2;

      this.adjustmentAmount =
        this.firstUnavailableStockCount + this.secondUnavailableStockCount;
    }

    // 2 + 1
    if (
      this.targetProduct.productName === '콜라' ||
      this.targetProduct.productName === '사이다' ||
      this.targetProduct.productName === '탄산수'
    ) {
      this.firstUnavailableStockCount =
        this.productAmount - this.targetProduct.promotionStock;

      this.secondUnavailableStockCount =
        (this.productAmount - this.firstUnavailableStockCount) % 3;

      this.adjustmentAmount =
        this.firstUnavailableStockCount + this.secondUnavailableStockCount;
    }
  };
}
