import { ParedProductsData } from '../Model/productsInPossessionData.js';

const productAmount = new ParedProductsData().productsInPossession();

const NORMAL_PRODUCT_AMOUNT = {
  COKE: productAmount[1][2],
  SPRITE: productAmount[3][2],
  WATER: productAmount[6][2],
  VITAMIN_WATER: productAmount[7][2],
  POTATO_CHIP: productAmount[9][2],
  CHOCOLATE_BAR: productAmount[11][2],
  ENERGY_BAR: productAmount[12][2],
  PACKED_LUNCH: productAmount[13][2],
  CUP_RAMEN: productAmount[15][2],
};

const PROMOTION_PRODUCT_AMOUNT = {
  COKE: productAmount[0][2],
  SPRITE: productAmount[2][2],
  ORANGE_JUICE: productAmount[4][2],
  SPARKLING_WATER: productAmount[5][2],
  POTATO_CHIP: productAmount[8][2],
  CHOCOLATE_BAR: productAmount[10][2],
  CUP_RAMEN: productAmount[14][2],
};

const TOTAL_PRODUCT_AMOUNT = {
  COKE: Number(productAmount[1][2]) + Number(productAmount[0][2]),
  SPRITE: Number(productAmount[3][2]) + Number(productAmount[2][2]),
  WATER: Number(productAmount[6][2]),
  VITAMIN_WATER: Number(productAmount[7][2]),
  POTATO_CHIP: Number(productAmount[9][2]) + Number(productAmount[8][2]),
  CHOCOLATE_BAR: Number(productAmount[11][2]) + Number(productAmount[10][2]),
  ENERGY_BAR: Number(productAmount[12][2]),
  PACKED_LUNCH: Number(productAmount[13][2]),
  CUP_RAMEN: Number(productAmount[15][2]) + Number(productAmount[14][2]),
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
  TOTAL_PRODUCTS_NAME_LIST
  
};
