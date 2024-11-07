import { PROMOTION_PRODUCTS_NAME_LIST } from '../Constant/productsCount.js';

const productNameAndAmount = ['사이다', '4'];

const productName = productNameAndAmount[0];
const productAmount = productNameAndAmount[1];

export const getPromotionProductName = (
  productName,
  productAmount
) => {
  //if 사용자가 구입한 것이 2+1 상품 중 1개이고 / 짝수라면?
  if (
    (productName === PROMOTION_PRODUCTS_NAME_LIST.COKE ||
      productName === PROMOTION_PRODUCTS_NAME_LIST.SPRITE ||
      productName === PROMOTION_PRODUCTS_NAME_LIST.SPARKLING_WATER) &&
    productAmount % 2 === 0
  )
    return productName;

  // 사용자가 구입한 것이 1+1 상품중 1개이고 / 홀수라면?
  if (
    (productName === PROMOTION_PRODUCTS_NAME_LIST.ORANGE_JUICE ||
      productName === PROMOTION_PRODUCTS_NAME_LIST.POTATO_CHIP ||
      productName === PROMOTION_PRODUCTS_NAME_LIST.CHOCOLATE_BAR ||
      productName === PROMOTION_PRODUCTS_NAME_LIST.CUP_RAMEN) &&
    productAmount % 2 === 1
  )
    return productName;
};
