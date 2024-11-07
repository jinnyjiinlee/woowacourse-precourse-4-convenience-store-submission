import {
  PROMOTION_COUNT,
  PROMOTION_PRODUCTS_NAME_LIST,
  TOTAL_PRODUCT_COUNT,
} from '../Constant/productsCount.js';

export class comparePromotionCount {
  constructor() {
    this.productName = null;
    this.productAmount = null;
    this.noPromotionDiscountCount = null;

    this.lastTwoMultiple = 0;
    this.lastThreeMultiple = 0;

    this.additionalPromotionCount = 0;
  }

  compareProductAndPromotionCount = (productName, productAmount) => {
    this.productName = productName;
    this.productAmount = Number(productAmount);

    this.productNameFinding = Object.keys(PROMOTION_PRODUCTS_NAME_LIST).find(
      (key) => PROMOTION_PRODUCTS_NAME_LIST[key] === this.productName
    );

    this.promotionCount = Number(PROMOTION_COUNT[this.productNameFinding]);
    this.totalProductCount = Number(
      TOTAL_PRODUCT_COUNT[this.productNameFinding]
    );

    if (this.promotionCount > this.productAmount) {
      this.productAndOverPromotion();

      return ['증정', this.additionalPromotionCount];
    }

    if (this.promotionCount <= this.productAmount) {
      this.productAndNoPromotion();

      return ['적용안됨', this.additionalPromotionCount];
    }
  };

  // promotionCount > productAmount
  productAndOverPromotion = () => {
    // 1 + 1 - 구매 개수가 홀수 일 때, 1개 더 증정
    if (
      (this.productNameFinding === 'ORANGE_JUICE' ||
        this.productNameFinding === 'POTATO_CHIP' ||
        this.productNameFinding === 'CHOCOLATE_BAR' ||
        this.productNameFinding === 'CUP_RAMEN') &&
      this.productAmount % 2 === 1
    ) {
      this.additionalPromotionCount = 1;
    }

    // 2 + 1 - 구매개수가 3의 배수 -1일 때,
    if (
      (this.productNameFinding === 'COKE' ||
        this.productNameFinding === 'SPRITE' ||
        this.productNameFinding === 'SPARKLING_WATER') &&
      this.productAmount % 3 === 1
    ) {
      this.additionalPromotionCount = 1;
    }
  };

  // promotionCount < productAmount
  productAndNoPromotion = () => {
    // 1 + 1
    if (
      this.productNameFinding === 'ORANGE_JUICE' ||
      this.productNameFinding === 'POTATO_CHIP' ||
      this.productNameFinding === 'CHOCOLATE_BAR' ||
      this.productNameFinding === 'CUP_RAMEN'
    ) {
      for (let i = 0; i < this.promotionCount; i += 1) {
        if (i % 2 === 0) {
          this.lastTwoMultiple = i;
        }
      }
      this.noPromotionDiscountCount =
        this.productAmount - Number(this.lastTwoMultiple);
    }
    this.additionalPromotionCount = this.productAmount - this.promotionCount;

    // 2 + 1
    if (
      this.productNameFinding === 'COKE' ||
      this.productNameFinding === 'SPRITE' ||
      this.productNameFinding === 'SPARKLING_WATER'
    ) {
      for (let i = 0; i < this.promotionCount; i += 1) {
        if (i % 3 === 0) {
          this.lastThreeMultiple = i;
        }
      }
      this.noPromotionDiscountCount =
        this.productAmount - Number(this.lastThreeMultiple);
    }
  };
}
