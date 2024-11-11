import { PRODUCTS } from '../Constant/productList.js';

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

    // console.log('this.productName', this.productName);
    // console.log('this.productQuantity', this.productQuantity);

    this.targetProduct = this.PRODUCTS.find(
      (product) => product.productName === this.productName,
    );

    // console.log(
    //   'this.targetProduct.promotionStock',
    //   this.targetProduct.promotionStock,
    // );
    // console.log('this.productQuantity', this.productQuantity);

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
      this.firstUnavailableStockCount =
        this.productQuantity - this.targetProduct.promotionStock;
      this.secondUnavailableStockCount =
        (this.productQuantity - this.firstUnavailableStockCount) % 2;

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
        this.productQuantity - this.targetProduct.promotionStock;
      this.secondUnavailableStockCount =
        (this.productQuantity - this.firstUnavailableStockCount) % 3;

      this.adjustmentQuantities =
        this.firstUnavailableStockCount + this.secondUnavailableStockCount;
    }
  };
}
