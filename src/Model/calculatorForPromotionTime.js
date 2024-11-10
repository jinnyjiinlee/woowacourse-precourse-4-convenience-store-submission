import { DateTimes } from '@woowacourse/mission-utils';
import fs from 'fs';
import path from 'path';
import { PRODUCTS } from '../Constant/productsCount.js';

// 프로모션 데이터 읽어오기 (절대 경로)
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

  // TODO 배열 바로 가져오게 수정
  // 프로모션 목록 배열
  promotions = [
    { type: '탄산2+1', start_date: '2024-01-01', end_date: '2024-11-30' },
    { type: 'MD추천상품', start_date: '2024-01-01', end_date: '2024-12-31' },
    { type: '반짝할인', start_date: '2024-11-01', end_date: '20204-11-30' },
  ];
}
