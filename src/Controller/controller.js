import { Input } from '../View/inputViews.js';
import { Output } from '../View/outputViews.js';

class MainController {
  constructor() {
    this.input = new Input();
    this.output = new Output();

    this.productNamesAndAmount = null;
  }

  async ProgramStart() {
    this.output.printProductsInPossessionList();
    await this.getProductNamesAndAmount();
  }

  async getProductNamesAndAmount() {
    this.productNamesAndAmount =
      await this.input.getProductNamesAndAmountInput();
  }
}

export { MainController };
