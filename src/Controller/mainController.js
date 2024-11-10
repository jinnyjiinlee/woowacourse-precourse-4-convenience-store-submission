import { PRODUCTS } from '../Constant/productsCount.js';
import { CheckGiftOrDiscountStatus } from '../Model/giftOrDiscountStatusChecking.js';
import { InputView } from '../View/inputViews.js';
import { OutputView } from '../View/outputViews.js';
import { parseProductDetails } from '../Utils/parsedProductNamesAndQuantities.js';
import { ReceiptPrinting } from '../Model/calculatorForReceiptPrinting.js';
import { PromotionActiveChecking } from '../Model/calculatorForPromotionTime.js';

class MainController {
  constructor() {
    this.input = new InputView();
    this.output = new OutputView();

    this.productName = null;
    this.productQuantity = null;
    this.productDetailsInput = null;

    this.giftConfirmationResponse = null;
    this.membershipApplicationResponse = null;

    this.targetProduct = null;
    this.additionalPurchaseResponse = null;

    this.receiptPrinter = new ReceiptPrinting();
  }

  async startProgram() {
    this.initializeTransaction(); // 거래 관련 필드 초기화

    this.output.printProductList();

    await this.getProductNamesAndQuantities();
    this.parsedProductDetails = parseProductDetails(this.productDetailsInput);

    await this.processProduct();
    await this.getIsMembershipApplicationInput();
    new ReceiptPrinting().printReceipt(this.membershipApplicationResponse);

    await this.getIsAdditionalPurchaseInput();

    if (this.additionalPurchaseResponse === 'Y') {
      await this.startProgram();
    }
  }

  async processProduct() {
    for (let i = 0; i < this.parsedProductDetails.length; i += 1) {
      this.productName = this.parsedProductDetails[i][0];
      this.productQuantity = Number(this.parsedProductDetails[i][1]);
      this.findProductByName();
      this.checkPromotionActive();
      this.processNonPromotionProduct();
      await this.processPromotionProduct();
    }
  }

  findProductByName() {
    console.log(
      '\n\nthis.isEligibleForPromotion: ',
      this.isEligibleForPromotion,
    );

    this.targetProduct = PRODUCTS.find(
      (product) => product.productName === this.productName,
    );
  }

  checkPromotionActive() {
    console.log(
      '\n\nthis.targetProduct.promotionStock: ',
      this.targetProduct.promotionStock,
    );
    console.log(
      '\n\nthis.targetProduct.promotionStock > 0: ',
      this.targetProduct.promotionStock > 0,
    );

    if (
      this.targetProduct.promotionStock > 0 &&
      new PromotionActiveChecking().isPromotionActive(this.productName) === true
    ) {
      this.isEligibleForPromotion = true;
    }
  }

  processNonPromotionProduct() {
    if (!this.isEligibleForPromotion) {
      this.currentRegularStock = this.targetProduct.regularStock;
      this.currentRegularStock -= this.productQuantity;
      this.targetProduct.totalReceivedQuantities = this.productQuantity;
      if (this.targetProduct.regularStock <= 0) {
        this.targetProduct.regularStock = '재고 없음';
      }
    }
  }

  async processPromotionProduct() {
    if (this.isEligibleForPromotion) {
      await this.applyEligiblePromotions();
    }
  }

  async applyEligiblePromotions() {
    //이것도 들어와 미치게싼
    this.handlePromotionProcess();
    await this.handleGiftConfirmation();
    await this.adjustProductQuantityForPromotion();
    this.applyOnePlusOnePromotion();
    this.applyTwoPlusOnePromotion();
    this.updatePromotionStock();
    this.handleInsufficientPromotionStock();
  }

  handlePromotionProcess() {
    // 들어오긴 하네 !

    this.promotionInfo =
      new CheckGiftOrDiscountStatus().checkGiftOrDiscountStatus(
        this.productName,
        this.productQuantity,
      );
    console.log('this.promotionInfo[0]: ', this.promotionInfo[0]);
    console.log('this.promotionInfo[1]: ', this.promotionInfo[1]);

    this.promotionStatus = this.promotionInfo[0];
    this.adjustmentQuantity = this.promotionInfo[1];
  }

  async handleGiftConfirmation() {
    if (this.promotionStatus === '증정' && this.adjustmentQuantity > 0) {
      await this.getAddGiftConfirmationInput();
    }
  }

  //  1+1일때
  applyOnePlusOnePromotion() {
    if (
      this.productName === '오렌지주스' ||
      this.productName === '감자칩' ||
      this.productName === '초코바' ||
      this.productName === '컵라면'
    ) {
      this.targetProduct.receivedGiftQuantities = Math.floor(
        this.productQuantity / 2,
      );
    }
  }

  // 2+1 일때, 콜라, 사이다, 탄산수
  applyTwoPlusOnePromotion() {
    if (
      this.productName === '콜라' ||
      this.productName === '사이다' ||
      this.productName === '탄산수'
    ) {
      this.targetProduct.receivedGiftQuantities = Math.floor(
        this.targetProduct.totalReceivedQuantities / 3,
      );
    }
  }

  async adjustProductQuantityForPromotion() {
    if (this.giftConfirmationResponse === 'Y') {
      this.productQuantity += this.adjustmentQuantity;
    }

    if (this.promotionStatus === '적용안됨' && this.adjustmentQuantity > 0) {
      await this.getFixedPriceConfirmationInput();
    }

    if (this.fixedPriceConfirmationResponse === 'N') {
      this.productQuantity -= this.adjustmentQuantity;
    }

    this.targetProduct.totalReceivedQuantities = this.productQuantity;
  }

  updatePromotionStock() {
    if (this.targetProduct.promotionStock) {
      this.targetProduct.promotionStock -= this.productQuantity;

      if (this.targetProduct.promotionStock <= 0) {
        this.targetProduct.promotionStock = '재고 없음';
      }
    }
  }

  // 프로모션 재고가 부족한 경우
  handleInsufficientPromotionStock() {
    if (!this.targetProduct.promotionStock) {
      this.remainingQuantity =
        this.productQuantity - this.targetProduct.promotionStock;
      this.targetProduct.promotionStock = '재고 없음';
      this.targetProduct.regularStock -= this.remainingQuantity;

      if (this.targetProduct.regularStock <= 0) {
        this.targetProduct.regularStock = '재고 없음';
      }
    }
  }

  initializeTransaction() {
    PRODUCTS.forEach((product) => {
      product.totalReceivedQuantities = 0; // 받은 총량 초기화
      product.receivedGiftQuantities = 0; // 받은 증정품 초기화
    });
    this.isEligibleForPromotion = false; // 프로모션 상품 계속 true 유지 방지
  }

  async getProductNamesAndQuantities() {
    this.productDetailsInput =
      await this.input.getProductNamesAndQuantitiesInput();
  }

  async getAddGiftConfirmationInput() {
    this.giftConfirmationResponse =
      await this.input.getAddGiftConfirmationInput(this.productName);
  }

  async getFixedPriceConfirmationInput() {
    this.fixedPriceConfirmationResponse =
      await this.input.getFixedPriceConfirmationInput(
        this.productName,
        this.adjustmentQuantity,
      );
  }

  async getIsMembershipApplicationInput() {
    this.membershipApplicationResponse =
      await this.input.getIsMembershipApplicationInput();
  }

  async getIsAdditionalPurchaseInput() {
    this.additionalPurchaseResponse =
      await this.input.getIsAdditionalPurchaseInput();
  }
}

export { MainController };
