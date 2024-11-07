import { Input } from '../View/inputViews.js';
import { Output } from '../View/outputViews.js';

class MainController {
  constructor() {
    this.input = new Input();
    this.output = new Output();

    this.productNamesAndAmount = null;
    this.isAddPromotionProductsInput = null;
    this.isFixedPricePurchaseInput = null;
    this.isMembershipApplicationInput = null;
  }

  async ProgramStart() {
    this.output.printProductsInPossessionList();
    await this.getProductNamesAndAmount();
    await this.getIsAddPromotionProducts();
    await this.getIsFixedPricePurchaseInput();
    await this.getIsMembershipApplicationInput();
  }

  async getProductNamesAndAmount() {
    this.productNamesAndAmount =
      await this.input.getProductNamesAndAmountInput();
  }

  async getIsAddPromotionProducts() {
    this.isAddPromotionProductsInput =
      await this.input.getIsAddPromotionProductsInput();
  }

  async getIsFixedPricePurchaseInput() {
    this.isFixedPricePurchaseInput =
      await this.input.getIsFixedPricePurchaseInput();
  }

  async getIsMembershipApplicationInput() {
    this.isMembershipApplicationInput =
      await this.input.getIsMembershipApplicationInput();
  }
}

export { MainController };
