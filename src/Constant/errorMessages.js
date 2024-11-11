const ERROR = '[ERROR]';

export const ERROR_MESSAGES = Object.freeze({
  PURCHASE_DETAILS: {
    OUT_OF_STOCK: `${ERROR} 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`,
    INVALID_Quantities: `${ERROR} 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`,
    PRODUCT_NOT_FOUND: `${ERROR} 존재하지 않는 상품입니다. 다시 입력해 주세요.`,
    INVALID_INPUT: `${ERROR} 잘못된 입력입니다. 다시 입력해 주세요.`,
  },

  CONFIRMATION: {
    EMPTY_INPUT: `${ERROR} 빈 값을 입력하셨습니다. 다시 입력해 주세요.`,
    CORRECT_INPUT: `${ERROR} 'Y', 'N' 이외에 다른 것을 입력하셨습니다. 다시 입력해 주세요.`,
  },
});
