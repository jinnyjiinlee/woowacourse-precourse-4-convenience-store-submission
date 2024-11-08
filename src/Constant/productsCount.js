import { ParedProductsData } from '../Model/productsInPossessionData.js';

const rawProductList = new ParedProductsData().productsInPossession();

const PRODUCTS = [
  { productName: rawProductList[0][0], price: 1000, regularStock: 10, promotionStock: 10, promotionType: '탄산2+1'}, // 콜라
  { productName: rawProductList[2][0], price: 1000, regularStock: 8, promotionStock: 7, promotionType: '탄산2+1'}, // 사이다
  { productName: rawProductList[4][0], price: 1800, regularStock: null, promotionStock: 9, promotionType: 'MD추천상품'}, // 오렌지주스
  { productName: rawProductList[5][0], price: 1200, regularStock: null, promotionStock: 5, promotionType: '탄산2+1'}, // 탄산수
  { productName: rawProductList[6][0], price: 500, regularStock: 10, promotionStock: null, promotionType: null}, // 물
  { productName: rawProductList[7][0], price: 1500, regularStock: 6, promotionStock: null, promotionType: null}, // 비타민원터
  { productName: rawProductList[8][0], price: 1500, regularStock: 5, promotionStock: 5, promotionType: '반짝할인'}, // 감자칩
  { productName: rawProductList[10][0], price: 1200, regularStock: 5, promotionStock: 5, promotionType: 'MD추천상품'}, //초코바
  { productName: rawProductList[12][0], price: 2000, regularStock: 5, promotionStock: null, promotionType: null}, // 에너지바
  { productName: rawProductList[13][0], price: 6400, regularStock: 8, promotionStock: null, promotionType: null}, // 정식도시라ㅣㄱ
  { productName: rawProductList[14][0], price: 1700, regularStock: 10, promotionStock: 1, promotionType: 'MD추천상품'}, //컵라면
];

const NORMAL_PRODUCT_AMOUNT = {
  COKE: Number(rawProductList[1][2]),
  SPRITE: Number(rawProductList[3][2]),
  WATER: Number(rawProductList[6][2]),
  VITAMIN_WATER: Number(rawProductList[7][2]),
  POTATO_CHIP: Number(rawProductList[9][2]),
  CHOCOLATE_BAR: Number(rawProductList[11][2]),
  ENERGY_BAR: Number(rawProductList[12][2]),
  PACKED_LUNCH: Number(rawProductList[13][2]),
  CUP_RAMEN: Number(rawProductList[15][2]),
};

const PROMOTION_PRODUCT_AMOUNT = {
  COKE: Number(rawProductList[0][2]),
  SPRITE: Number(rawProductList[2][2]),
  ORANGE_JUICE: Number(rawProductList[4][2]),
  SPARKLING_WATER: Number(rawProductList[5][2]),
  POTATO_CHIP: Number(rawProductList[8][2]),
  CHOCOLATE_BAR: Number(rawProductList[10][2]),
  CUP_RAMEN: Number(rawProductList[14][2]),
};

const TOTAL_PRODUCT_AMOUNT = {
  COKE: Number(rawProductList[1][2]) + Number(rawProductList[0][2]),
  SPRITE: Number(rawProductList[3][2]) + Number(rawProductList[2][2]),
  WATER: Number(rawProductList[6][2]),
  VITAMIN_WATER: Number(rawProductList[7][2]),
  POTATO_CHIP: Number(rawProductList[9][2]) + Number(rawProductList[8][2]),
  CHOCOLATE_BAR: Number(rawProductList[11][2]) + Number(rawProductList[10][2]),
  ENERGY_BAR: Number(rawProductList[12][2]),
  PACKED_LUNCH: Number(rawProductList[13][2]),
  CUP_RAMEN: Number(rawProductList[15][2]) + Number(rawProductList[14][2]),
};

// 사용자가 최종적으로 받는 수량
const USER_RECEIVED_PRODUCT_AMOUNT = {
  COKE: 0,
  SPRITE: 0,
  WATER: 0,
  VITAMIN_WATER: 0,
  POTATO_CHIP: 0,
  CHOCOLATE_BAR: 0,
  ENERGY_BAR: 0,
  PACKED_LUNCH: 0,
  CUP_RAMEN: 0,
};

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

const NO_PROMOTION_PRODUCTS_NAME_LIST = {
  WATER: '물',
  VITAMIN_WATER: '비타민워터',
  ENERGY_BAR: '에너지바',
  정식도시락: '정식도시락',
};

const TOTAL_PRODUCTS_NAME_LIST = {
  // 2+1
  COKE: '콜라',
  SPRITE: '사이다',
  SPARKLING_WATER: '탄산수',
  // 1+1
  ORANGE_JUICE: '오렌지주스',
  POTATO_CHIP: '감자칩',
  CHOCOLATE_BAR: '초코바',
  CUP_RAMEN: '컵라면',

  WATER: '물',
  VITAMIN_WATER: '비타민워터',
  ENERGY_BAR: '에너지바',
  정식도시락: '정식도시락',
};

export {
  PROMOTION_PRODUCT_AMOUNT,
  NORMAL_PRODUCT_AMOUNT,
  TOTAL_PRODUCT_AMOUNT,
  PROMOTION_PRODUCTS_NAME_LIST,
  NO_PROMOTION_PRODUCTS_NAME_LIST,
  USER_RECEIVED_PRODUCT_AMOUNT,
  TOTAL_PRODUCTS_NAME_LIST,
  PRODUCTS
};
