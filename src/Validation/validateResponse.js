import { ERROR_MESSAGES } from '../Constant/errorMessages.js';

export class GiftConfirmationValidator {
  constructor() {
    this.response = 0;
  }

  isValidEmptyInput() {
    return this.response !== '';
  }

  isValidConfirmationInput() {
    return this.response === 'Y' || this.response === 'N';
  }

  getValidationRules() {
    return [
      [!this.isValidEmptyInput(), ERROR_MESSAGES.CONFIRMATION.EMPTY_INPUT],
      [
        !this.isValidConfirmationInput(),
        ERROR_MESSAGES.CONFIRMATION.CORRECT_INPUT,
      ],
    ];
  }

  validateResponse(response) {
    this.response = response;
    const validationRules = this.getValidationRules();

    validationRules.forEach((arr) => {
      if (arr[0]) throw new Error(arr[1]);
    });

    return true;
  }
}
