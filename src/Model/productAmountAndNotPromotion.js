import {
  PROMOTION_PRODUCT_AMOUNT,
  PROMOTION_PRODUCTS_NAME_LIST,
  TOTAL_PRODUCT_AMOUNT,
} from '../Constant/productsCount.js';

export class CheckGiftOrDiscountStatus {
  constructor() {
    this.productName = null;
    this.productAmount = null;

    this.adjustmentAmount = 0;
  }

  checkGiftOrDiscountStatus = (productName, productAmount) => {
    this.productName = productName;
    this.productAmount = productAmount;

    this.promotionProductKey = Object.keys(PROMOTION_PRODUCTS_NAME_LIST).find(
      (key) => PROMOTION_PRODUCTS_NAME_LIST[key] === this.productName
    );

    this.availablePromotionStock = Number(
      PROMOTION_PRODUCT_AMOUNT[this.promotionProductKey]
    );

    this.totalProductAmount = Number(
      TOTAL_PRODUCT_AMOUNT[this.promotionProductKey]
    );

    if (this.availablePromotionStock > this.productAmount) {
      this.applyExtraPromotion();

      return ['증정', this.adjustmentAmount];
    }

    if (this.availablePromotionStock <= this.productAmount) {
      this.applyNoPromotionDiscount();

      return ['적용안됨', this.adjustmentAmount];
    }
  };

  // availablePromotionStock > productAmount
  applyExtraPromotion = () => {
    // 1 + 1 - 구매 개수가 홀수 일 때, 1개 더 증정
    if (
      (this.promotionProductKey === 'ORANGE_JUICE' ||
        this.promotionProductKey === 'POTATO_CHIP' ||
        this.promotionProductKey === 'CHOCOLATE_BAR' ||
        this.promotionProductKey === 'CUP_RAMEN') &&
      this.productAmount % 2 === 1
    ) {
      this.adjustmentAmount = 1;
    }

    // 2 + 1 - 구매개수가 3의 배수 -1일 때,
    if (
      (this.promotionProductKey === 'COKE' ||
        this.promotionProductKey === 'SPRITE' ||
        this.promotionProductKey === 'SPARKLING_WATER') &&
      this.productAmount % 3 === 2
    ) {
      this.adjustmentAmount = 1;
    }
  };

  // availablePromotionStock < productAmount
  applyNoPromotionDiscount = () => {
    // 1 + 1
    if (
      this.promotionProductKey === 'ORANGE_JUICE' ||
      this.promotionProductKey === 'POTATO_CHIP' ||
      this.promotionProductKey === 'CHOCOLATE_BAR' ||
      this.promotionProductKey === 'CUP_RAMEN'
    ) {
      this.firstUnavailableStockCount =
        this.productAmount - this.availablePromotionStock;
      this.secondUnavailableStockCount =
        (this.productAmount - this.firstUnavailableStockCount) % 2;

      this.adjustmentAmount =
        this.firstUnavailableStockCount + this.secondUnavailableStockCount;
    }

    // 2 + 1
    if (
      this.promotionProductKey === 'COKE' ||
      this.promotionProductKey === 'SPRITE' ||
      this.promotionProductKey === 'SPARKLING_WATER'
    ) {
      this.firstUnavailableStockCount =
        this.productAmount - this.availablePromotionStock;

      this.secondUnavailableStockCount =
        (this.productAmount - this.firstUnavailableStockCount) % 3;

      this.adjustmentAmount =
        this.firstUnavailableStockCount + this.secondUnavailableStockCount;
    }
  };
}
