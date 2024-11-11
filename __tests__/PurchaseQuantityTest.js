import { PRODUCTS } from '../src/Constant/productList.js';
import { PurchaseQuantitiesValidator } from '../src/Validation/purchaseQuantitiesValidator.js';

describe('PurchaseQuantitiesValidator', () => {
  let purchaseQuantitiesValidator;

  beforeEach(() => {
    PRODUCTS.forEach((product) => {
      product.regularStock = 10;
      product.promotionStock = 5;
    });
    purchaseQuantitiesValidator = new PurchaseQuantitiesValidator();
  });

  test('재고 수량을 초과하여 구매하려고 할 때 오류가 발생해야 한다', () => {
    const productNamesAndQuantities = '[콜라-20]';

    expect(() => {
      purchaseQuantitiesValidator.validateProductDetails(
        productNamesAndQuantities,
      );
    }).toThrow(
      '[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.',
    );
  });

  test('재고 수량 이하로 구매할 경우 오류가 발생하지 않아야 한다', () => {
    const productNamesAndQuantities = '[콜라-10]';

    expect(() => {
      purchaseQuantitiesValidator.validateProductDetails(
        productNamesAndQuantities,
      );
    }).not.toThrow();
  });
});
