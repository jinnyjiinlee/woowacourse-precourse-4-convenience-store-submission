import { Console } from '@woowacourse/mission-utils';
import { PRODUCTS } from '../Constant/productList.js';

export class ReceiptPrinting {
  constructor() {
    this.purchasedProductName = null;
    this.purchasedProductQuantities = null;
    this.purchasedProductPrice = null;
    this.purchasedProductPriceResult = null;

    this.giftPurchasedProductName = null;
    this.giftPurchasedProductQuantities = null;
    this.giftPurchasedProductPrice = null;

    this.totalPurchasedProductQuantities = 0;
    this.totalPurchasedProductPrice = 0;
    this.totalGiftPurchasedProductPrice = 0;

    this.membershipDiscountPrice = 0;
    this.priceForPay = 0;

    this.purchasedProducts = PRODUCTS.filter(
      (product) => product.totalReceivedQuantities > 0,
    );
  }

  extractPurchaseProductDetails() {
    this.purchasedProductName = this.purchasedProducts.map(
      (product) => product.productName,
    );

    this.purchasedProductQuantities = this.purchasedProducts.map(
      (product) => product.totalReceivedQuantities,
    );

    this.purchasedProductPrice = this.purchasedProducts.map(
      (product) => product.price,
    );
  }

  extractGiftPurchaseProductDetails() {
    this.giftPurchasedProductName = PRODUCTS.filter(
      (product) => product.receivedGiftQuantities > 0,
    ).map((product) => product.productName);

    this.giftPurchasedProductQuantities = PRODUCTS.filter(
      (product) => product.receivedGiftQuantities > 0,
    ).map((product) => product.receivedGiftQuantities);

    this.giftPurchasedProductPrice = PRODUCTS.filter(
      (product) => product.receivedGiftQuantities > 0,
    ).map((product) => product.price);
  }

  printReceiptHeader() {
    Console.print('==============W 편의점================');
    Console.print('상품명               수량         금액  ');
  }

  printPurchasedProductDetails() {
    for (let i = 0; i < this.purchasedProductName.length; i += 1) {
      this.purchasedProductPriceResult =
        this.purchasedProductQuantities[i] * this.purchasedProductPrice[i];

      this.totalPurchasedProductPrice += this.purchasedProductPriceResult;
      this.totalPurchasedProductQuantities +=
        this.purchasedProductQuantities[i];

      // TODO: 'ㅡ'을 빈칸으로 만들어도 정렬되게 하기
      Console.print(
        `${this.purchasedProductName[i].padEnd(10, 'ㅡ')} ${String(
          this.purchasedProductQuantities[i],
        ).padEnd(5, ' ')}  ${String(
          this.purchasedProductPriceResult.toLocaleString(),
        ).padStart(10, ' ')}`,
      );
    }
  }

  calculateTotalGiftProductPrice() {
    for (let i = 0; i < this.giftPurchasedProductName.length; i += 1) {
      this.totalGiftPurchasedProductPrice +=
        this.giftPurchasedProductQuantities[i] *
        this.giftPurchasedProductPrice[i];
    }
  }

  printGiftProductNameAndQuantities() {
    for (let i = 0; i < this.giftPurchasedProductName.length; i += 1) {
      Console.print(
        `${this.giftPurchasedProductName[i].padEnd(10, 'ㅡ')} ${String(
          this.giftPurchasedProductQuantities[i],
        ).padEnd(1, ' ')}`,
      );
    }
  }

  printTotalPurchaseQuantities() {
    Console.print(
      `총구매액 ${String(this.totalPurchasedProductQuantities).padStart(
        13,
      )} ${String(this.totalPurchasedProductPrice.toLocaleString()).padStart(
        14,
      )}`,
    );
  }

  printReceipt(isMembershipApplicationInput) {
    this.extractPurchaseProductDetails();
    this.printReceiptHeader();
    this.printPurchasedProductDetails();

    this.extractGiftPurchaseProductDetails();
    this.calculateTotalGiftProductPrice();

    Console.print('\n' + '=============증      정===============');
    this.printGiftProductNameAndQuantities();

    Console.print('\n' + '======================================');
    this.printTotalPurchaseQuantities();

    if (isMembershipApplicationInput === 'Y') {
      this.calculateMembershipDiscount();
    }

    this.calculatePriceForPay();

    // TODO: 간격 맞추기
    Console.print(
      `행사할인                       -${this.totalGiftPurchasedProductPrice.toLocaleString()}`,
    );
    Console.print(
      `맴버십할인                     -${this.membershipDiscountPrice.toLocaleString()}`,
    );
    Console.print(
      `내실돈                          ${this.priceForPay.toLocaleString()}`,
    );
  }

  calculateMembershipDiscount() {
    if (
      (this.totalPurchasedProductPrice - this.totalGiftPurchasedProductPrice) *
        0.3 <
      8000
    ) {
      this.membershipDiscountPrice =
        (this.totalPurchasedProductPrice -
          this.totalGiftPurchasedProductPrice) *
        0.3;
    }

    if (
      (this.totalPurchasedProductPrice - this.totalGiftPurchasedProductPrice) *
        0.3 >
      8000
    ) {
      this.membershipDiscountPrice = 8000;
    }
  }

  calculatePriceForPay() {
    this.priceForPay =
      this.totalPurchasedProductPrice -
      this.totalGiftPurchasedProductPrice -
      this.membershipDiscountPrice;
  }
}
