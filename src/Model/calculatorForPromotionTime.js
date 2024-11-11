import fs from 'fs';
import path from 'path';
import { DateTimes } from '@woowacourse/mission-utils';
import { PRODUCTS } from '../Constant/productList.js';

const promotionDateRawData = fs.readFileSync(
  path.resolve('public/promotions.md'),
  'utf8',
);

const promotionDataLines = promotionDateRawData.split('\n');
const promotionDetail = [];

for (let i = 0; i < promotionDataLines.length; i += 1) {
  promotionDetail.push(promotionDataLines[i].split(','));
}

export class PromotionActiveChecking {
  isPromotionActive(productName) {
    this.productName = productName;
    this.findPromotionType();

    const currentDate = DateTimes.now();

    const startDate = this.promotions.find(
      (promotion) => promotion.type === this.promotionType,
    ).start_date;

    const endDate = this.promotions.find(
      (promotion) => promotion.type === this.promotionType,
    ).end_date;

    const start = new Date(startDate);
    const end = new Date(endDate);

    return currentDate >= start && currentDate <= end;
  }

  findPromotionType() {
    this.promotionType = PRODUCTS.find(
      (product) => product.productName === this.productName,
    ).promotionType;
  }

  promotions = [
    {
      type: promotionDetail[1][0],
      start_date: promotionDetail[1][3],
      end_date: promotionDetail[1][4],
    },
    {
      type: promotionDetail[2][0],
      start_date: promotionDetail[2][3],
      end_date: promotionDetail[2][4],
    },
    {
      type: promotionDetail[3][0],
      start_date: promotionDetail[3][3],
      end_date: promotionDetail[3][4],
    },
  ];
}
