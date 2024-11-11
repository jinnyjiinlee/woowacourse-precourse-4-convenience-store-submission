import { ParedProductsData } from '../Model/productsInPossessionData.js';

const rawProductList = new ParedProductsData().productsInPossession();

const PRODUCTS = [
  {
    productName: rawProductList[0][0],
    price: Number(rawProductList[0][1]),
    regularStock: Number(rawProductList[1][2]),
    promotionStock: Number(rawProductList[0][2]),
    initialPromotionStock: Number(rawProductList[0][2]),
    promotionType: rawProductList[0][3],
    totalReceivedQuantities: 0,
    receivedGiftQuantities: 0,
  }, // 콜라 - 2+1
  {
    productName: rawProductList[2][0],
    price: Number(rawProductList[2][1]),
    regularStock: Number(rawProductList[3][2]),
    promotionStock: Number(rawProductList[2][2]),
    initialPromotionStock: Number(rawProductList[2][2]),
    promotionType: rawProductList[2][3],
    totalReceivedQuantities: 0,
    receivedGiftQuantities: 0,
  }, // 사이다 - 2+1
  {
    productName: rawProductList[4][0],
    price: Number(rawProductList[4][1]),
    regularStock: 0,
    promotionStock: Number(rawProductList[4][2]),
    initialPromotionStock: Number(rawProductList[4][2]),
    promotionType: rawProductList[4][3],
    totalReceivedQuantities: 0,
    receivedGiftQuantities: 0,
  }, // 오렌지주스 = 1+1
  {
    productName: rawProductList[5][0],
    price: Number(rawProductList[5][1]),
    regularStock: 0,
    promotionStock: Number(rawProductList[5][2]),
    initialPromotionStock: Number(rawProductList[5][2]),
    promotionType: rawProductList[5][3],
    totalReceivedQuantities: 0,
    receivedGiftQuantities: 0,
  }, // 탄산수 - 2+1
  {
    productName: rawProductList[6][0],
    price: Number(rawProductList[6][1]),
    regularStock: Number(rawProductList[6][2]),
    promotionStock: null,
    initialPromotionStock: null,
    promotionType: null,
    totalReceivedQuantities: 0,
    receivedGiftQuantities: 0,
  }, // 물
  {
    productName: rawProductList[7][0],
    price: Number(rawProductList[7][1]),
    regularStock: Number(rawProductList[7][2]),
    promotionStock: null,
    initialPromotionStock: null,
    promotionType: null,
    totalReceivedQuantities: 0,
    receivedGiftQuantities: 0,
  }, // 비타민워터
  {
    productName: rawProductList[8][0],
    price: Number(rawProductList[8][1]),
    regularStock: Number(rawProductList[9][2]),
    promotionStock: Number(rawProductList[8][2]),
    initialPromotionStock: Number(rawProductList[8][2]),
    promotionType: rawProductList[8][3],
    totalReceivedQuantities: 0,
    receivedGiftQuantities: 0,
  }, // 감자칩 1+1
  {
    productName: rawProductList[10][0],
    price: Number(rawProductList[10][1]),
    regularStock: Number(rawProductList[11][2]),
    promotionStock: Number(rawProductList[10][2]),
    initialPromotionStock: Number(rawProductList[10][2]),
    promotionType: rawProductList[10][3],
    totalReceivedQuantities: 0,
    receivedGiftQuantities: 0,
  }, //초코바 1+1
  {
    productName: rawProductList[12][0],
    price: Number(rawProductList[12][1]),
    regularStock: Number(rawProductList[12][2]),
    promotionStock: null,
    initialPromotionStock: null,
    promotionType: null,
    totalReceivedQuantities: 0,
    receivedGiftQuantities: 0,
  }, // 에너지바

  {
    productName: rawProductList[13][0],
    price: Number(rawProductList[13][1]),
    regularStock: Number(rawProductList[13][2]),
    promotionStock: null,
    initialPromotionStock: null,
    promotionType: null,
    totalReceivedQuantities: 0,
    receivedGiftQuantities: 0,
  }, // 정식도시락
  {
    productName: rawProductList[14][0],
    price: Number(rawProductList[14][1]),
    regularStock: Number(rawProductList[15][2]),
    promotionStock: Number(rawProductList[14][2]),
    initialPromotionStock: Number(rawProductList[14][2]),
    promotionType: rawProductList[14][3],
    totalReceivedQuantities: 0,
    receivedGiftQuantities: 0,
  }, //컵라면 1+1
];

export { PRODUCTS };
