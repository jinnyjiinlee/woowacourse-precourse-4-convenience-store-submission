import fs from 'fs';

export class ParedProductsData {
  constructor() {
    this.product = null;
    this.price = null;
    this.count = null;
    this.promotion = null;

    this.finalProductsInPossessionList = [];
    this.lowProductsList = [];
    this.productsLowData = null;
    this.lineSeparatedProductsData = null;
  }

  generateProductPrintList() {
    this.productsInPossession();

    return this.finalProductsInPossessionList;
  }

  productsInPossession = () => {
    this.exportProductsLowData();
    this.lineSeparatedProductsData = this.productsLowData.split('\n');

    for (let i = 1; i < 17; i += 1) {
      const eachCategory = this.lineSeparatedProductsData[i].split(',');

      this.product = eachCategory[0];
      this.price = eachCategory[1]
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      this.count = eachCategory[2];
      this.promotion = eachCategory[3];

      if (this.promotion === 'null') {
        this.promotion = '';
      }

      this.lowProductsList.push(eachCategory);

      const resultEachLine = `- ${this.product} ${this.price}원 ${this.count}개 ${this.promotion}`;
      this.finalProductsInPossessionList.push(resultEachLine);
    }

    return this.lowProductsList;
  };

  exportProductsLowData = () => {
    this.productsLowData = fs.readFileSync(
      '/Users/jinny/Desktop/WOOWA_PRECOURSE/javascript-convenience-store-7-jinnyjiinlee/public/products.md',
      'utf8'
    );
  };
}
