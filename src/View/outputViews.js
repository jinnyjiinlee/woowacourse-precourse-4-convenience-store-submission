import { Console } from '@woowacourse/mission-utils';
import { ParedProductsData } from '../Model/productsInPossessionData.js';
import { OUTPUT_MESSAGE } from '../Constant/messages.js';
import {
  NORMAL_PRODUCT_AMOUNT,
  PROMOTION_PRODUCT_AMOUNT,
  PROMOTION_PRODUCTS_NAME_LIST,
  TOTAL_PRODUCT_AMOUNT,
} from '../Constant/productsCount.js';

export class Output {
  async printProductsInPossessionList() {
    const rawProductsList = new ParedProductsData().productsInPossession();

    Console.print(OUTPUT_MESSAGE.WELCOME_GREETING);

    Console.print(
      `- ${rawProductsList[0][0]} 1,000원 ${PROMOTION_PRODUCT_AMOUNT.COKE}개 ${rawProductsList[0][3]}` +
        '\n' +
        `- ${rawProductsList[1][0]} 1,000원 ${NORMAL_PRODUCT_AMOUNT.COKE}개` +
        '\n' +
        `- ${rawProductsList[2][0]} 1,000원 ${PROMOTION_PRODUCT_AMOUNT.SPRITE}개 ${rawProductsList[2][3]}` +
        '\n' +
        `- ${rawProductsList[3][0]} 1,000원 ${NORMAL_PRODUCT_AMOUNT.SPRITE}개 ` +
        '\n' +
        `- ${rawProductsList[4][0]} 1,800원 ${PROMOTION_PRODUCT_AMOUNT.ORANGE_JUICE}개 ${rawProductsList[4][3]}` +
        '\n' +
        `- ${rawProductsList[5][0]} 1,200원 ${PROMOTION_PRODUCT_AMOUNT.SPARKLING_WATER}개 ${rawProductsList[5][3]}` +
        '\n' +
        `- ${rawProductsList[6][0]} 500원 ${NORMAL_PRODUCT_AMOUNT.WATER}개` +
        '\n' +
        `- ${rawProductsList[7][0]} 1,500원 ${NORMAL_PRODUCT_AMOUNT.VITAMIN_WATER}개 ` +
        '\n' +
        `- ${rawProductsList[8][0]} 1,500원 ${PROMOTION_PRODUCT_AMOUNT.POTATO_CHIP}개 ${rawProductsList[8][3]}` +
        '\n' +
        `- ${rawProductsList[9][0]} 1,500원 ${NORMAL_PRODUCT_AMOUNT.POTATO_CHIP}개` +
        '\n' +
        `- ${rawProductsList[10][0]} 1,200원 ${PROMOTION_PRODUCT_AMOUNT.CHOCOLATE_BAR}개 ${rawProductsList[10][3]}` +
        '\n' +
        `- ${rawProductsList[11][0]} 1,200원 ${NORMAL_PRODUCT_AMOUNT.CHOCOLATE_BAR}개` +
        '\n' +
        `- ${rawProductsList[12][0]} 2,000원 ${NORMAL_PRODUCT_AMOUNT.ENERGY_BAR}개` +
        '\n' +
        `- ${rawProductsList[13][0]} 6,400원 ${NORMAL_PRODUCT_AMOUNT.PACKED_LUNCH}개` +
        '\n' +
        `- ${rawProductsList[14][0]} 1,700원 ${PROMOTION_PRODUCT_AMOUNT.CUP_RAMEN}개 ${rawProductsList[14][3]}` +
        '\n' +
        `- ${rawProductsList[15][0]} 1,700원 ${NORMAL_PRODUCT_AMOUNT.CUP_RAMEN}개`
    );
  }
}
