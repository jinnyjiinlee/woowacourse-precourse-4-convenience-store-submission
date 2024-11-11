import { PRODUCTS } from '../Constant/productsCount.js';

export class CheckGiftOrDiscountStatus {
  constructor() {
    this.productName = null;
    this.productQuantity = null;

    this.adjustmentQuantities = 0;
    this.PRODUCTS = PRODUCTS;
    this.targetProduct = null;
  }

  checkGiftOrDiscountStatus = (productName, productQuantity) => {
    this.productName = productName;
    this.productQuantity = productQuantity;

    this.targetProduct = this.PRODUCTS.find(
      (product) => product.productName === this.productName,
    );

    if (this.targetProduct.promotionStock > this.productQuantity) {
      this.applyExtraPromotion();

      return ['증정', this.adjustmentQuantities];
    }

    if (this.targetProduct.promotionStock <= this.productQuantity) {
      this.applyNoPromotionDiscount();

      return ['적용안됨', this.adjustmentQuantities];
    }
  };

  // availablePromotionStock > productQuantity
  applyExtraPromotion = () => {
    // 1 + 1 - 구매 개수가 홀수 일 때, 1개 더 증정
    if (
      (this.targetProduct.productName === '오렌지주스' ||
        this.targetProduct.productName === '감자칩' ||
        this.targetProduct.productName === '초코바' ||
        this.targetProduct.productName === '컵라면') &&
      this.productQuantity % 2 === 1
    ) {
      this.adjustmentQuantities = 1;
    }

    // 2 + 1 - 구매개수가 3의 배수 -1일 때,
    if (
      (this.targetProduct.productName === '콜라' ||
        this.targetProduct.productName === '사이다' ||
        this.targetProduct.productName === '탄산수') &&
      this.productQuantity % 3 === 2
    ) {
      this.adjustmentQuantities = 1;
    }
  };

  // availablePromotionStock < productQuantity
  applyNoPromotionDiscount = () => {
    // 1 + 1
    if (
      this.targetProduct.productName === '오렌지주스' ||
      this.targetProduct.productName === '감자칩' ||
      this.targetProduct.productName === '초코바' ||
      this.targetProduct.productName === '컵라면'
    ) {
      const promotionsApplied = Math.min(
        this.targetProduct.promotionStock,
        this.productQuantity,
      );
      const freeItemsGiven = promotionsApplied;
      this.adjustmentQuantities = this.productQuantity - promotionsApplied;

      // 만약 남은 상품이 프로모션으로 처리되지 않은 경우
      if (this.adjustmentQuantities > 0) {
        // 프로모션 적용되지 않은 수량에 대해 처리
        // 이때 adjustmentQuantities는 프로모션 적용되지 않는 유료 구매 수량
      }
    }

    // 2 + 1
    if (
      this.targetProduct.productName === '콜라' ||
      this.targetProduct.productName === '사이다' ||
      this.targetProduct.productName === '탄산수'
    ) {
      const maxPromotionsPossible = Math.floor(this.productQuantity / 3);
      const promotionsApplied = Math.min(
        maxPromotionsPossible,
        this.targetProduct.promotionStock,
      );
      const freeItemsGiven = promotionsApplied;
      const totalItemsCoveredByPromotion = promotionsApplied * 3;
      this.adjustmentQuantities =
        this.productQuantity - totalItemsCoveredByPromotion;
    }
  };
}
