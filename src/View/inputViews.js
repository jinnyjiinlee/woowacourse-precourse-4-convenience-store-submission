import { Console } from '@woowacourse/mission-utils';
import { InputMessage } from '../Constant/messages.js';
import { PurchaseQuantitiesValidator } from '../Validation/purchaseQuantitiesValidator.js';
import { GiftConfirmationValidator } from '../Validation/confirmationResponseValidator.js';

export class InputView {
  constructor() {
    this.inputMessage = new InputMessage();
    this.giftConfirmationValidator = new GiftConfirmationValidator();
    this.productNamesAndQuantities = null;
    this.gitConfirmation = null;
    this.isFixedPricePurchaseInput = null;
    this.isMembershipApplicationInput = null;
    this.isAdditionalPurchaseInput = null;
  }

  async getProductDetailsInput() {
    while (true) {
      try {
        await this.handleProductDetailsInput();
        return this.productNamesAndQuantities;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async handleProductDetailsInput() {
    this.productNamesAndQuantities = await Console.readLineAsync(
      this.inputMessage.INPUT_MESSAGE.PRODUCT_NAMES_AND_Quantities,
    );
    new PurchaseQuantitiesValidator().validateProductDetails(
      this.productNamesAndQuantities,
    );
  }

  async getAddGiftConfirmationInput(productName) {
    while (true) {
      try {
        await this.handleGiftConfirmationInput(productName);
        return this.gitConfirmation;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async handleGiftConfirmationInput(productName) {
    this.gitConfirmation = await Console.readLineAsync(
      this.inputMessage.INPUT_MESSAGE.IS_VALID_PROMOTION_ADD(productName),
    );
    this.validateResponse(this.gitConfirmation);
  }

  async getFixedPriceConfirmationInput(productName, AdjustmentQuantity) {
    this.productName = productName;
    this.AdjustmentQuantity = AdjustmentQuantity;
    while (true) {
      try {
        await this.handleFixedPriceConfirmationInput();
        return this.isFixedPricePurchaseInput;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async handleFixedPriceConfirmationInput() {
    this.isFixedPricePurchaseInput = await Console.readLineAsync(
      this.inputMessage.INPUT_MESSAGE.IS_FIXED_PRICE_PURCHASE(
        this.productName,
        this.AdjustmentQuantity,
      ),
    );
    this.validateResponse(this.isFixedPricePurchaseInput);
  }

  async getIsMembershipApplicationInput() {
    while (true) {
      try {
        await this.handleMembershipInput();
        return this.isMembershipApplicationInput;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async handleMembershipInput() {
    this.isMembershipApplicationInput = await Console.readLineAsync(
      this.inputMessage.INPUT_MESSAGE.IS_MEMBERSHIP_APPLICATION,
    );
    this.validateResponse(this.isMembershipApplicationInput);
  }

  async getIsAdditionalPurchaseInput() {
    while (true) {
      try {
        await this.handleAdditionalPurchase();
        return this.isAdditionalPurchaseInput;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async handleAdditionalPurchase() {
    this.isAdditionalPurchaseInput = await Console.readLineAsync(
      this.inputMessage.INPUT_MESSAGE.IS_ADDITIONAL_PURCHASE,
    );
    this.validateResponse(this.isAdditionalPurchaseInput);
  }

  validateResponse(response) {
    this.giftConfirmationValidator.validateResponse(response);
  }
}
