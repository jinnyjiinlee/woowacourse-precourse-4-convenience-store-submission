class InputMessage {
  constructor() {
    this.productName = null;
  }

  INPUT_MESSAGE = {
    PRODUCT_NAMES_AND_AMOUNT:
      '\n' +
      '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])' +
      '\n',

    IS_VALID_PROMOTION_ADD: (productName) =>
      '\n' +
      `현재 ${productName}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)` +
      '\n',

    IS_FIXED_PRICE_PURCHASE: (productName, productAmount) =>
      '\n' +
      `현재 ${productName} ${productAmount}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)` +
      '\n',

    IS_MEMBERSHIP_APPLICATION:
      '\n' + `멤버십 할인을 받으시겠습니까? (Y/N)` + '\n',

    IS_ADDITIONAL_PURCHASE:
      '\n' + `감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)` + '\n',
  };
}

const OUTPUT_MESSAGE = {
  WELCOME_GREETING:
    '\n' +
    '안녕하세요. W편의점입니다.' +
    '\n' +
    '현재 보유하고 있는 상품입니다.' +
    '\n',
};

export { InputMessage, OUTPUT_MESSAGE };
