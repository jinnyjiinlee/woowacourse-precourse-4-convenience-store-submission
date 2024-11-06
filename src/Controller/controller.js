import { Input } from '../View/inputViews.js';
import { Output } from '../View/outputViews.js';

class MainController {
  constructor() {
    this.input = new Input();
    this.output = new Output();

    this.productNamesAndAmount = null;
    this.isAddPromotionProductsInput = null;
  }

  async ProgramStart() {
    this.output.printProductsInPossessionList();
    await this.getProductNamesAndAmount();
    await this.getIsAddPromotionProducts();

  }

  async getProductNamesAndAmount() {
    this.productNamesAndAmount =
      await this.input.getProductNamesAndAmountInput();
  }

  async getIsAddPromotionProducts() {
    this.isAddPromotionProductsInput =
      await this.input.getIsAddPromotionProductsInput();
  }
}

export { MainController };
