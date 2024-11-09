import { Console } from '@woowacourse/mission-utils';
import { PRODUCTS } from '../Constant/productsCount.js';

export class receiptPrinting {
  constructor() {
    this.purchasedProductName = null;
    this.purchasedProductAmount = null;
    this.purchasedProductPrice = null;
    this.purchasedProductPriceResult = null;

    this.giftPurchasedProductName = null;
    this.giftPurchasedProductAmount = null;
    this.giftPurchasedProductPrice = null;

    this.totalPurchasedProductAmount = 0;
    this.totalPurchasedProductPrice = 0;
    this.totalGiftPurchasedProductPrice = 0;

    this.membershipDiscountPrice = 0;
    this.priceForPay = 0;

    this.purchasedProducts = PRODUCTS.filter(
      (product) => product.totalReceivedAmount > 0
    );
  }

  extractPurchaseProductDetails() {
    this.purchasedProductName = this.purchasedProducts.map(
      (product) => product.productName
    );

    this.purchasedProductAmount = this.purchasedProducts.map(
      (product) => product.totalReceivedAmount
    );

    this.purchasedProductPrice = this.purchasedProducts.map(
      (product) => product.price
    );
  }

  extractGiftPurchaseProductDetails() {
    this.giftPurchasedProductName = PRODUCTS.filter(
      (product) => product.receivedGiftAmount > 0
    ).map((product) => product.productName);

    this.giftPurchasedProductAmount = PRODUCTS.filter(
      (product) => product.receivedGiftAmount > 0
    ).map((product) => product.receivedGiftAmount);

    this.giftPurchasedProductPrice = PRODUCTS.filter(
      (product) => product.receivedGiftAmount > 0
    ).map((product) => product.price);
  }

  printReceiptHeader() {
    Console.print('==============W 편의점================');
    Console.print('상품명               수량         금액  ');
  }

  printPurchasedProductDetails() {
    for (let i = 0; i < this.purchasedProductName.length; i += 1) {
      this.purchasedProductPriceResult =
        this.purchasedProductAmount[i] * this.purchasedProductPrice[i];

      this.totalPurchasedProductPrice += this.purchasedProductPriceResult;
      this.totalPurchasedProductAmount += this.purchasedProductAmount[i];

      // TODO: 'ㅡ'을 빈칸으로 만들어도 정렬되게 하기
      Console.print(
        `${this.purchasedProductName[i].padEnd(10, 'ㅡ')} ${String(
          this.purchasedProductAmount[i]
        ).padEnd(5, ' ')}  ${String(this.purchasedProductPriceResult).padStart(
          10,
          ' '
        )}`
      );
    }
  }

  calculateTotalGiftProductPrice() {
    for (let i = 0; i < this.giftPurchasedProductName.length; i += 1) {
      this.totalGiftPurchasedProductPrice +=
        this.giftPurchasedProductAmount[i] * this.giftPurchasedProductPrice[i];
    }
  }

  // 프로모션 상품, 개수
  printGiftProductNameAndAmount() {
    for (let i = 0; i < this.giftPurchasedProductName.length; i += 1) {
      Console.print(
        `${this.giftPurchasedProductName[i].padEnd(10, 'ㅡ')} ${String(
          this.giftPurchasedProductAmount[i]
        ).padEnd(1, ' ')}`
      );
    }
  }

  // 총 수량, 총 금액
  printTotalPurchaseAmount() {
    Console.print(
      `총구매액 ${String(this.totalPurchasedProductAmount).padStart(
        13
      )} ${String(this.totalPurchasedProductPrice).padStart(14)}`
    );
  }

  printReceipt() {
    this.extractPurchaseProductDetails();
    this.printReceiptHeader();
    this.printPurchasedProductDetails();

    this.extractGiftPurchaseProductDetails();
    this.calculateTotalGiftProductPrice();

    Console.print('\n' + '=============증      정===============');
    this.printGiftProductNameAndAmount();

    Console.print('\n' + '=====================================');
    this.printTotalPurchaseAmount();

    // 맴버십 함수 실행
    this.calculateMembershipDiscount();
    // 내실돈 함수 실행
    this.calculatePriceForPay();

    // TODO: 나중에 간격 맞추기
    Console.print(
      `행사할인                        -${this.totalGiftPurchasedProductPrice}`
    );
    Console.print(
      `맴버십할인                      -${this.membershipDiscountPrice}`
    );
    Console.print(`내실돈                          ${this.priceForPay}`);
  }

  calculateMembershipDiscount() {
    // 총 금액 - 프로모션 적용 금액
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

new receiptPrinting().printReceipt();
