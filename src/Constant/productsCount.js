import { ParedProductsData } from '../Model/productsInPossessionData.js';

const productCount = new ParedProductsData().productsInPossession();

const NORMAL_COUNT = {
  COKE: productCount[1][2],
  SPRITE: productCount[3][2],
  WATER: productCount[6][2],
  VITAMIN_WATER: productCount[7][2],
  POTATO_CHIP: productCount[9][2],
  CHOCOLATE_BAR: productCount[11][2],
  ENERGY_BAR: productCount[12][2],
  PACKED_LUNCH: productCount[13][2],
  CUP_RAMEN: productCount[15][2],
};

const PROMOTION_COUNT = {
  COKE: productCount[0][2],
  SPRITE: productCount[2][2],
  ORANGE_JUICE: productCount[4][2],
  SPARKLING_WATER: productCount[5][2],
  POTATO_CHIP: productCount[8][2],
  CHOCOLATE_BAR: productCount[10][2],
  CUP_RAMEN: productCount[14][2],
};

const TOTAL_PRODUCT_COUNT = {
  COKE: Number(productCount[1][2]) + Number(productCount[0][2]),
  SPRITE: Number(productCount[3][2]) + Number(productCount[2][2]),
  WATER: Number(productCount[6][2]),
  VITAMIN_WATER: Number(productCount[7][2]),
  POTATO_CHIP: Number(productCount[9][2]) + Number(productCount[8][2]),
  CHOCOLATE_BAR: Number(productCount[11][2]) + Number(productCount[10][2]),
  ENERGY_BAR: Number(productCount[12][2]),
  PACKED_LUNCH: Number(productCount[13][2]),
  CUP_RAMEN: Number(productCount[15][2]) + Number(productCount[14][2]),
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

export {
  PROMOTION_COUNT,
  NORMAL_COUNT,
  TOTAL_PRODUCT_COUNT,
  PROMOTION_PRODUCTS_NAME_LIST,
  NO_PROMOTION_PRODUCTS_NAME_LIST,
};
