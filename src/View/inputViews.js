import { Console } from '@woowacourse/mission-utils';
import { InputMessage } from '../Constant/messages.js';
import { PurchaseQuantitiesValidator } from '../Validation/purchaseQuantitiesValidator.js';
import { GiftConfirmationValidator } from '../Validation/validateResponse.js';

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

  async getProductNamesAndQuantitiesInput() {
    while (true) {
      try {
        this.productNamesAndQuantities = await Console.readLineAsync(
          this.inputMessage.INPUT_MESSAGE.PRODUCT_NAMES_AND_Quantities,
        );
        new PurchaseQuantitiesValidator().validateProductDetails(
          this.productNamesAndQuantities,
        );

        return this.productNamesAndQuantities;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async getAddGiftConfirmationInput(productName) {
    while (true) {
      try {
        this.gitConfirmation = await Console.readLineAsync(
          this.inputMessage.INPUT_MESSAGE.IS_VALID_PROMOTION_ADD(productName),
        );
        this.validateResponse(this.gitConfirmation);
        return this.gitConfirmation;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async getFixedPriceConfirmationInput(productName, AdjustmentQuantities) {
    while (true) {
      try {
        this.isFixedPricePurchaseInput = await Console.readLineAsync(
          this.inputMessage.INPUT_MESSAGE.IS_FIXED_PRICE_PURCHASE(
            productName,
            AdjustmentQuantities,
          ),
        );
        this.validateResponse(this.isFixedPricePurchaseInput);
        return this.isFixedPricePurchaseInput;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async getIsMembershipApplicationInput() {
    while (true) {
      try {
        this.isMembershipApplicationInput = await Console.readLineAsync(
          this.inputMessage.INPUT_MESSAGE.IS_MEMBERSHIP_APPLICATION,
        );
        this.validateResponse(this.isMembershipApplicationInput);

        return this.isMembershipApplicationInput;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async getIsAdditionalPurchaseInput() {
    while (true) {
      try {
        this.isAdditionalPurchaseInput = await Console.readLineAsync(
          this.inputMessage.INPUT_MESSAGE.IS_ADDITIONAL_PURCHASE,
        );
        this.validateResponse(this.isAdditionalPurchaseInput);

        return this.isAdditionalPurchaseInput;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  validateResponse(response) {
    this.giftConfirmationValidator.validateResponse(
      response,
    );
  }
}
