import { Input } from '../View/inputViews.js';

class MainController {
  constructor() {
    this.input = new Input();

    this.productNamesAndAmount = null;
  }

  async ProgramStart() {
    await this.getProductNamesAndAmount();
  }

  async getProductNamesAndAmount() {
    this.productNamesAndAmount =
      await this.input.getProductNamesAndAmountInput();
  }
}

export { MainController };
