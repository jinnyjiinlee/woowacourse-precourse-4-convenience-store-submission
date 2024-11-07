import { ParedProductsData } from '../Model/productsInPossessionData.js';

const productCount = new ParedProductsData().productsInPossession();

const PROMOTION_COUNT = {
  COKE: productCount[0][2],
  SPRITE: productCount[2][2],
  ORANGE_JUICE: productCount[4][2],
  SPARKLING_WATER: productCount[5][2],
  POTATO_CHIP: productCount[8][2],
  CHOCOLATE_BAR: productCount[10][2],
  CUP_RAMEN: productCount[14][2],
};

const NORMAL_COUNT = {
  COKE: productCount[0][2],
  SPRITE: productCount[3][2],
  WATER: productCount[6][2],
  VITAMIN_WATER: productCount[7][2],
  POTATO_CHIP: productCount[9][2],
  CHOCOLATE_BAR: productCount[11][2],
  ENERGY_BAR: productCount[12][2],
  PACKED_LUNCH: productCount[13][2],
  CUP_RAMEN: productCount[15][2],
};

const PROMOTION_PRODUCTS_NAME_LIST = {
  COKE: '콜라',
  SPRITE: '사이다',
  ORANGE_JUICE: '오렌지주스',
  SPARKLING_WATER: '탄산수',
  POTATO_CHIP: '감자칩',
  CHOCOLATE_BAR: '초코바',
  CUP_RAMEN: '컵라면',
};

export { PROMOTION_COUNT, NORMAL_COUNT, PROMOTION_PRODUCTS_NAME_LIST };
