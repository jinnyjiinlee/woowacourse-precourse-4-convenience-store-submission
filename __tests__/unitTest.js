
import { PRODUCTS } from '../src/Constant/productsCount.js';
import { PurchaseQuantitiesValidator } from '../src/Validation/purchaseQuantitiesValidator.js';


// Jest 테스트 코드
describe('PurchaseQuantitiesValidator', () => {
  let purchaseQuantitiesValidator;

  beforeEach(() => {
    // PRODUCTS 배열의 재고 초기화 (테스트 간 상태가 섞이지 않도록 하기 위함)
    PRODUCTS.forEach((product) => {
      product.regularStock = 10;
      product.promotionStock = 5;
    });
    purchaseQuantitiesValidator = new PurchaseQuantitiesValidator();
  });

  test('재고 수량을 초과하여 구매하려고 할 때 오류가 발생해야 한다', () => {
    const productNamesAndQuantities = '[콜라-20]'; // 총 재고는 15개인데 20개를 구매하려고 시도

    expect(() => {
      purchaseQuantitiesValidator.validateAvailableStock(productNamesAndQuantities);
    }).toThrow('[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.');
  });

  test('재고 수량 이하로 구매할 경우 오류가 발생하지 않아야 한다', () => {
    const productNamesAndQuantities = '[콜라-10]'; // 총 재고는 15개, 10개는 구매 가능

    expect(() => {
      purchaseQuantitiesValidator.validateAvailableStock(productNamesAndQuantities);
    }).not.toThrow();
  });
});
