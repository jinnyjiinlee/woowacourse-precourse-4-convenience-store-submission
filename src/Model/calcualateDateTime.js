// import fs from 'fs';

// const promotionRawData = fs.readFileSync(
//   '/Users/jinny/Desktop/WOOWA_PRECOURSE/javascript-convenience-store-7-jinnyjiinlee/public/promotions.md',
//   'utf8'
// );

// const lineSeparatedProductsData = promotionRawData.split('\n');

// const eachCategory = [];

// for (let i = 0; i < lineSeparatedProductsData.length; i += 1) {
//   eachCategory.push(lineSeparatedProductsData[i].split(','));
// }

// console.log(eachCategory);

// // 프로모션 날짜 확인 함수
// const isPromotionActive = (startDate, endDate) => {
//   const currentDate = new Date();
//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   return currentDate >= start && currentDate <= end;
// };

// // console.log(isPromotionActive('2024-01-01','2024-06-31' ))
// // 프로모션 목록 배열
// const promotions = [
//   { name: '탄산2+1', start_date: '2024-01-01', end_date: '2024-12-31' },
//   { name: 'MD추천상품', start_date: '2024-01-01', end_date: '2024-12-31' },
//   { name: '반짝할인', start_date: '2024-11-01', end_date: '20204-11-30' },
// ];

// console.log(promotions.find((promo) => promo.name === '탄산2+1').start_date);
// console.log(promotions.find((promo) => promo.name === 'MD추천상품').start_date);
// console.log(promotions.find((promo) => promo.name === '반짝할인').start_date);

// // var now = new Date();

// // console.log(now);
