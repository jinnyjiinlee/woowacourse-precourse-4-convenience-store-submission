const INPUT_MESSAGE = {
  PRODUCT_NAMES_AND_AMOUNT:
    '\n' +
    '구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])' +
    '\n',

  IS_VALID_PROMOTION_ADD:
    '\n' +
    `현재 상품명은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)` +
    '\n',

  IS_FIXED_PRICE_PURCHASE:
    '\n' +
    `현재 {상품명} {수량}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? (Y/N)` +
    '\n',

  IS_MEMBERSHIP_APPLICATION:
  '\n' +
  `멤버십 할인을 받으시겠습니까? (Y/N)` +
  '\n',


};

const OUTPUT_MESSAGE = {
  WELCOME_GREETING:
    '안녕하세요. W편의점입니다.' +
    '\n' +
    '현재 보유하고 있는 상품입니다.' +
    '\n',
};

export { INPUT_MESSAGE, OUTPUT_MESSAGE };
