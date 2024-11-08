import { ParedProductsData } from '../Model/productsInPossessionData.js';

const rawProductList = new ParedProductsData().productsInPossession();

// TODO: productName이외 파일도 md파일에서 들고오기 
const PRODUCTS = [
  {
    productName: rawProductList[0][0],
    price: 1000,
    regularStock: 10,
    promotionStock: 10,
    promotionType: '탄산2+1',
    userReceivedAmount: 0,
  }, // 콜라
  {
    productName: rawProductList[2][0],
    price: 1000,
    regularStock: 8,
    promotionStock: 7,
    promotionType: '탄산2+1',
    userReceivedAmount: 0,
  }, // 사이다
  {
    productName: rawProductList[4][0],
    price: 1800,
    regularStock: null,
    promotionStock: 9,
    promotionType: 'MD추천상품',
    userReceivedAmount: 0,
  }, // 오렌지주스
  {
    productName: rawProductList[5][0],
    price: 1200,
    regularStock: null,
    promotionStock: 5,
    promotionType: '탄산2+1',
    userReceivedAmount: 0,
  }, // 탄산수
  {
    productName: rawProductList[6][0],
    price: 500,
    regularStock: 10,
    promotionStock: null,
    promotionType: null,
    userReceivedAmount: 0,
  }, // 물
  {
    productName: rawProductList[7][0],
    price: 1500,
    regularStock: 6,
    promotionStock: null,
    promotionType: null,
    userReceivedAmount: 0,
  }, // 비타민원터
  {
    productName: rawProductList[8][0],
    price: 1500,
    regularStock: 5,
    promotionStock: 5,
    promotionType: '반짝할인',
    userReceivedAmount: 0,
  }, // 감자칩
  {
    productName: rawProductList[10][0],
    price: 1200,
    regularStock: 5,
    promotionStock: 5,
    promotionType: 'MD추천상품',
    userReceivedAmount: 0,
  }, //초코바
  {
    productName: rawProductList[12][0],
    price: 2000,
    regularStock: 5,
    promotionStock: null,
    promotionType: null,
    userReceivedAmount: 0,
  }, // 에너지바
  {
    productName: rawProductList[13][0],
    price: 6400,
    regularStock: 8,
    promotionStock: null,
    promotionType: null,
    userReceivedAmount: 0,
  }, // 정식도시라ㅣㄱ
  {
    productName: rawProductList[14][0],
    price: 1700,
    regularStock: 10,
    promotionStock: 1,
    promotionType: 'MD추천상품',
    userReceivedAmount: 0,
  }, //컵라면
];

const PROMOTION_PRODUCTS_NAME_LIST = {
  // 2+1
  COKE: '콜라',
  SPRITE: '사이다',
  SPARKLING_WATER: '탄산수',
  // 1+1
  ORANGE_JUICE: '오렌지주스',
  POTATO_CHIP: '감자칩',
  CHOCOLATE_BAR: '초코바',
  CUP_RAMEN: '컵라면',
};

export { PROMOTION_PRODUCTS_NAME_LIST, PRODUCTS };
