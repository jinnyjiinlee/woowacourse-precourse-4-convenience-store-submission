import fs from 'fs';

export class ParedProductsData {
  constructor() {
    this.finalProductsInPossessionList = [];
    this.productsLowData = null;
    this.lineSeparatedProductsData = null;
  }

  parsedProductsInPossession() {
    this.exportProductsLowData();
    return this.productsInPossession();
  }

  exportProductsLowData = () => {
    this.productsLowData = fs.readFileSync(
      '/Users/jinny/Desktop/WOOWA_PRECOURSE/javascript-convenience-store-7-jinnyjiinlee/public/products.md',
      'utf8'
    );
  };

  productsInPossession = () => {
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
    }
    return this.finalProductsInPossessionList;
  };
}
