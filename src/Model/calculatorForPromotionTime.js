import { DateTimes } from '@woowacourse/mission-utils';
import fs from 'fs';
import path from 'path';

// 프로모션 데이터 읽어오기 (절대 경로)
const promotionDateRawData = fs.readFileSync(
  path.resolve('public/promotions.md'),
  'utf8'
); 

// const promotionDateRawData = fs.readFileSync(
//   '/Users/jinny/Desktop/WOOWA_PRECOURSE/javascript-convenience-store-7-jinnyjiinlee/public/promotions.md',
//   'utf8'
// );

const promotionDataLines = promotionDateRawData.split('\n');

const promotionDetail = [];

for (let i = 0; i < promotionDataLines.length; i += 1) {
  promotionDetail.push(promotionDataLines[i].split(','));
}

// console.log(promotionDetail);

// 프로모션 날짜 확인 함수
export const isPromotionActive = (promotionType) => {
  const currentDate = DateTimes.now();

  const startDate = promotions.find(
    (promotion) => promotion.name === promotionType
  ).start_date;

  const endDate = promotions.find(
    (promotion) => promotion.name === promotionType
  ).end_date_date;

  const start = new Date(startDate);
  const end = new Date(endDate);

  return currentDate >= start && currentDate <= end;
};

// 프로모션 목록 배열
const promotions = [
  { name: '탄산2+1', start_date: '2024-01-01', end_date: '2024-11-30' },
  { name: 'MD추천상품', start_date: '2024-01-01', end_date: '2024-12-31' },
  { name: '반짝할인', start_date: '2024-11-01', end_date: '20204-11-30' },
];

// console.log(isPromotionActive(sparklingStartDate, sparklingEndDate));
// console.log(
//   isPromotionActive(mdRecommendationStartDate, mdRecommendationEndDate)
// );
// console.log(isPromotionActive(flashDiscountStartDate, flashDiscountEndDate));
