import fs from 'fs';

export class ParedProductsData {
  constructor() {
    this.product = null;
    this.price = null;
    this.amount = null;
    this.promotion = null;

    this.finalProductsInPossessionList = [];
    this.rawProductsList = [];
    this.productsRawData = null;
    this.lineSeparatedProductsData = null;
  }

  generateProductPrintList() {
    this.productsInPossession();

    return this.finalProductsInPossessionList;
  }

  productsInPossession = () => {
    this.readProductsRawData();
    this.parseProductLine();

    for (let i = 1; i < 17; i += 1) {
      this.eachCategory = this.lineSeparatedProductsData[i].split(',');
      this.formatProductsData();
      this.rawProductsList.push(this.eachCategory);
      const resultEachLine = `- ${this.product} ${this.price}원 ${this.amount}개 ${this.promotion}`;
      this.finalProductsInPossessionList.push(resultEachLine);
    }
    console.log(this.rawProductsList);

    return this.rawProductsList;
  };

  readProductsRawData = () => {
    this.productsRawData = fs.readFileSync(
      '/Users/jinny/Desktop/WOOWA_PRECOURSE/javascript-convenience-store-7-jinnyjiinlee/public/products.md',
      'utf8'
    );
  };

  parseProductLine = () => {
    this.lineSeparatedProductsData = this.productsRawData.split('\n');
  };

  formatProductsData = () => {
    this.product = this.eachCategory[0];
    this.price = this.eachCategory[1]
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.amount = this.eachCategory[2];
    this.promotion = this.eachCategory[3];

    if (this.promotion === 'null') {
      this.promotion = '';
    }
  };
}
