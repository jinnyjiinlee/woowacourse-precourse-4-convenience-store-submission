import { PROMOTION_PRODUCTS_NAME_LIST } from '../Constant/productsCount.js';
import { comparePromotionCount } from '../Model/productAmountAndNotPromotion.js';
import { Input } from '../View/inputViews.js';
import { Output } from '../View/outputViews.js';
import { extractProductNamesAndAmount } from './parsedProductNamesAndAmount.js';

class MainController {
  constructor() {
    this.input = new Input();
    this.output = new Output();

    this.productNamesAndAmount = null;
    this.isAddPromotionProductsInput = null;
    this.isFixedPricePurchaseInput = null;
    this.isMembershipApplicationInput = null;
    this.isAdditionalPurchaseInput = null;

    this.productName = null;
    this.productAmount = null;
  }

  async ProgramStart() {
    this.output.printProductsInPossessionList();

    await this.getProductNamesAndAmount();
    const productNameAndAmountArr = extractProductNamesAndAmount(
      this.productNamesAndAmount
    );

    this.productName = productNameAndAmountArr[0];
    this.productAmount = productNameAndAmountArr[1];

    this.promotionProductFinding = Object.keys(
      PROMOTION_PRODUCTS_NAME_LIST
    ).find((key) => PROMOTION_PRODUCTS_NAME_LIST[key] === this.productName);

    if (this.promotionProductFinding) {
      this.noPromotionDiscountCount =
        new comparePromotionCount().compareProductAndPromotionCount(
          this.productName,
          this.productAmount
        );

      this.gapCount = this.noPromotionDiscountCount[1];

      if (this.noPromotionDiscountCount[0] === '증정') {
        await this.getIsAddPromotionProducts();
      }

      if (this.noPromotionDiscountCount[0] === '적용안됨') {
        await this.getIsFixedPricePurchaseInput();
      }
    }
  }

  async getProductNamesAndAmount() {
    this.productNamesAndAmount =
      await this.input.getProductNamesAndAmountInput();
  }

  async getIsAddPromotionProducts() {
    this.isAddPromotionProductsInput =
      await this.input.getIsAddPromotionProductsInput(this.productName);
  }

  async getIsFixedPricePurchaseInput() {
    this.isFixedPricePurchaseInput =
      await this.input.getIsFixedPricePurchaseInput(
        this.productName,
        this.gapCount
      );
  }

  async getIsMembershipApplicationInput() {
    this.isMembershipApplicationInput =
      await this.input.getIsMembershipApplicationInput();
  }

  async getIsAdditionalPurchaseInput() {
    this.isAdditionalPurchaseInput =
      await this.input.getIsAdditionalPurchaseInput();
  }
}

export { MainController };
