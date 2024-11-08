import fs from 'fs';

export class ParedProductsData {
  constructor() {
    this.rawProductsList = [];
  }

  productsInPossession = () => {
    this.readProductsRawData();
    this.parseProductLine();
    for (let i = 1; i < 17; i += 1) {
      this.eachCategory = this.lineSeparatedProductsData[i].split(',');
      this.rawProductsList.push(this.eachCategory);
    }

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
}
