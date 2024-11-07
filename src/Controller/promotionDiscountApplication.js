import { ParedProductsData } from '../Model/productsInPossessionData.js';

const userProduct = '오렌지주스';
const userCount = 1;

// 사용자에게 입력 받는 값이 프로모션을 적용할 수 있는지 파악해야 한다.

//if 사용자가 구입한 것이 2+1 상품 중 1개이고 / 짝수라면?
if (
  (userProduct === '콜라' ||
    userProduct === '사이다' ||
    userProduct === '탄산수') &&
  userCount % 2 === 0
) {
  console.log(
    `현재 ${userProduct}(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`
  );
}

// 사용자가 구입한 것이 1+1 상품중 1개이고 / 홀수라면?
if (
  (userProduct === '오렌지주스' ||
    userProduct === '감자칩' ||
    userProduct === '초코바' ||
    userProduct === '컵라면') &&
  userCount % 2 === 1
) {
  console.log(
    `현재 ${userProduct}은(는) 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? (Y/N)`
  );
}
