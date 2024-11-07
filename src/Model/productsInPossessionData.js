import fs from 'fs';

export class ParedProductsData {
  constructor() {
    this.finalProductsInPossessionList = [];
    this.lowProductsList = [];
    this.productsLowData = null;
    this.lineSeparatedProductsData = null;
  }

  parsedProductsInPossession() {
    this.exportProductsLowData(); // products.md export
    return this.productsInPossession();
  }

  exportProductsLowData = () => {
    this.productsLowData = fs.readFileSync(
      '/Users/jinny/Desktop/WOOWA_PRECOURSE/javascript-convenience-store-7-jinnyjiinlee/public/products.md',
      'utf8'
    );
  };

  productsInPossession = () => {
    this.exportProductsLowData();
    this.lineSeparatedProductsData = this.productsLowData.split('\n');

    for (let i = 1; i < 17; i += 1) {
      const eachCategory = this.lineSeparatedProductsData[i].split(',');

      const product = eachCategory[0];
      const price = eachCategory[1]
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      const count = eachCategory[2];
      let promotion = eachCategory[3];

      if (promotion === 'null') {
        promotion = '';
      }

      const resultEachLine = `- ${product} ${price}원 ${count}개 ${promotion}`;
      this.finalProductsInPossessionList.push(resultEachLine);

      this.lowProductsList.push(eachCategory);
    }

    return this.lowProductsList;
  };
}
//   const COKE = {
//     PROMOTION: this.lowProductsList[0][2],
//     NORMAL: this.lowProductsList[1][2],
//   };

//   const SPRITE = {
//     PROMOTION: this.lowProductsList[2][2],
//     NORMAL: this.lowProductsList[3][2],
//   };

//   const ORANGE_JUICE = {
//     PROMOTION: this.lowProductsList[4][2],
//   };

//   const SPARKLING_WATER = {
//     PROMOTION: this.lowProductsList[5][2],
//   };

//   const WATER = {
//     PROMOTION: this.lowProductsList[6][2],
//   };

//   const VITAMIN_WATER = {
//     NORMAL: this.lowProductsList[7][2],
//   };

//   const POTATO_CHIP = {
//     PROMOTION: this.lowProductsList[8][2],
//     NORMAL: this.lowProductsList[9][2],
//   };

//   const CHOCOLATE_BAR = {
//     PROMOTION: this.lowProductsList[10][2],
//     NORMAL: this.lowProductsList[11][2],
//   };

//   const ENERGY_BAR = {
//     NORMAL: this.lowProductsList[12][2],
//   };

//   const PACKED_LUNCH = {
//     PROMOTION: this.lowProductsList[13][2],
//   };

//   const CUP_RAMEN = {
//     PROMOTION: this.lowProductsList[14][2],
//     NORMAL: this.lowProductsList[15][2],
//   };
// };
