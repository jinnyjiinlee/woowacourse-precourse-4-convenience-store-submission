import { PurchaseQuantitiesValidator } from '../src/Validation/purchaseQuantitiesValidator.js';

describe('PurchaseNameValidator', () => {
  let purchaseNameValidator;

  beforeEach(() => {
    purchaseNameValidator = new PurchaseQuantitiesValidator();
  });

  test.each(['[통조림-5]', '[병따개-3]', '[라이터-1]', '[고무장갑-2]'])(
    '존재하지 않는 상품을 입력한 경우 오류가 발생해야 한다',
    (productNames) => {
      expect(() => {
        purchaseNameValidator.validateProductDetails(productNames);
      }).toThrow('[ERROR] 존재하지 않는 상품입니다. 다시 입력해 주세요.');
    },
  );

  test.each(['[콜라-5]', '[비타민워터-2]', '[정식도시락-3]', '[물-4]'])(
    '존재하는 상품을 입력한 경우 오류가 발생하지 않아야 한다.',
    (productNames) => {
      expect(() => {
        purchaseNameValidator.validateProductDetails(productNames);
      });
    },
  );
});
