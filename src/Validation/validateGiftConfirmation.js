import { ERROR_MESSAGES } from '../Constant/errorMessages.js';

export class GiftConfirmationValidator {
  constructor() {
    this.gitConfirmation = 0;
  }

  isValidEmptyInput() {
    return this.gitConfirmation !== '';
  }

  isValidConfirmationInput() {
    return this.gitConfirmation === 'Y' || this.gitConfirmation === 'N';
  }

  getValidationRules() {
    return [
      [!this.isValidEmptyInput(), ERROR_MESSAGES.GIFT_CONFIRMATION.EMPTY_INPUT],
      [
        !this.isValidConfirmationInput(),
        ERROR_MESSAGES.GIFT_CONFIRMATION.CORRECT_INPUT,
      ],
    ];
  }

  validateGiftConfirmation(gitConfirmation) {
    this.gitConfirmation = gitConfirmation;
    const validationRules = this.getValidationRules();

    validationRules.forEach((arr) => {
      if (arr[0]) throw new Error(arr[1]);
    });

    return true;
  }
}
