import {
  PROMOTION_COUNT,
  PROMOTION_PRODUCTS_NAME_LIST,
} from '../Constant/productsCount.js';
import { Input } from '../View/inputViews.js';
import { Output } from '../View/outputViews.js';
import { getPromotionProductName } from './additionalPromotionApplication.js';
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

    const additionalPromotionProductName = getPromotionProductName(
      this.productName,
      this.productAmount
    );

    // 프로모션 추가를 해야된다면, 추가 하시겠습니까? 메시지 받기
    if (additionalPromotionProductName) {
      await this.getIsAddPromotionProducts(this.productName);
      const productCountKey = Object.keys(PROMOTION_PRODUCTS_NAME_LIST).find(
        (key) => PROMOTION_PRODUCTS_NAME_LIST[key] === this.productName
      );

      let productCount = PROMOTION_COUNT[productCountKey];

      if (this.isAddPromotionProductsInput === 'Y') {
        console.log(productCount);
        productCount -= 1;
        console.log(productCount);
      }
    }
  }

  async getProductNamesAndAmount() {
    this.productNamesAndAmount =
      await this.input.getProductNamesAndAmountInput();
  }

  async getIsAddPromotionProducts(productName) {
    this.isAddPromotionProductsInput =
      await this.input.getIsAddPromotionProductsInput(productName);
  }

  async getIsFixedPricePurchaseInput() {
    this.isFixedPricePurchaseInput =
      await this.input.getIsFixedPricePurchaseInput();
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
