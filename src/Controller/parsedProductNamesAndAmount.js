import { PROMOTION_COUNT } from '../Constant/productsCount.js';

export const extractProductNamesAndAmount = (productNamesAndAmount) => {
  // 대괄호 양쪽 없애기
  const firstSquareBracketsDelete = productNamesAndAmount.slice(1);
  const lastSquareBracketsDelete = firstSquareBracketsDelete.slice(0, -1);

  // 하이픈을 기준으로 상품명, 상품개수를 배열로 나누기
  const productNameAndAmount = lastSquareBracketsDelete.split('-');
  // console.log('productNameAndAmount[0]: ', productNameAndAmount[0]);
  // console.log('productNameAndAmount[1]: ', productNameAndAmount[1]);

  return [productNameAndAmount[0], productNameAndAmount[1]];
};

// const promotionProductsList = {
//   cokeName: '콜라',
//   spriteName: '사이다',
//   orangeJuiceName: '오렌지주스',
//   sparklingWaterName: '탄산수',
//   potatoChipName: '감자칩',
//   chocolateBarName: '초코바',
//   cupNoodleName: '컵라면',
// };

// if (productNameAndAmount[0] === promotionProductsList.cokeName) {
//   console.log(promotionProductsList.cokeName, '선택함');
// }

// console.log('productNameAndAmount[1]: ', productNameAndAmount[1]);

// console.log('PROMOTION_COUNT.COKE: ', PROMOTION_COUNT.COKE);

// if (productNameAndAmount[0] === promotionProductsList.spriteName) {
//   console.log(promotionProductsList.spriteName, '선택함');
// }
// if (productNameAndAmount[0] === promotionProductsList.orangeJuiceName) {
//   console.log(promotionProductsList.orangeJuiceName, '선택함');
// }
// if (productNameAndAmount[0] === promotionProductsList.sparklingWaterName) {
//   console.log(promotionProductsList.sparklingWaterName, '선택함');
// }
// if (productNameAndAmount[0] === promotionProductsList.potatoChipName) {
//   console.log(promotionProductsList.potatoChipName, '선택함');
// }
// if (productNameAndAmount[0] === promotionProductsList.chocolateBarName) {
//   console.log(promotionProductsList.chocolateBarName, '선택함');
// }
// if (productNameAndAmount[0] === promotionProductsList.cupNoodleName) {
//   console.log(promotionProductsList.cupNoodleName, '선택함');
// }
