import fs from 'fs';
import path from 'path';


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
    this.productsRawData = fs.readFileSync(path.resolve('public/products.md'),
      'utf8'
    );
  };

  parseProductLine = () => {
    this.lineSeparatedProductsData = this.productsRawData.split('\n');
  };
}
