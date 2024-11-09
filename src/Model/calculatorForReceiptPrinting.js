import { Console } from '@woowacourse/mission-utils';
import { PRODUCTS } from '../Constant/productsCount.js';

export class receiptPrinting {
  constructor() {
    this.purchasedProductName = null;
    this.totalPurchasedProductAmount = 0;
    this.totalGiftPurchasedProductPrice = 0;

    this.totalPurchasedProductPrice = 0;

    this.membershipDiscountPrice = 0;

    this.priceForPay = 0;
  }

  printReceipt() {
    // 구매한 상품명
    this.purchasedProductName = PRODUCTS.filter(
      (product) => product.totalReceivedAmount > 0
    ).map((product) => product.productName);

    // 구매한 상품 개수
    const purchasedProductAmount = PRODUCTS.filter(
      (product) => product.totalReceivedAmount > 0
    ).map((product) => product.totalReceivedAmount);

    // 구매한 상품 가격
    const purchasedProductPrice = PRODUCTS.filter(
      (product) => product.totalReceivedAmount > 0
    ).map((product) => product.price);

    Console.print('==============W 편의점================');
    Console.print('상품명               수량         금액  ');

    for (let i = 0; i < this.purchasedProductName.length; i += 1) {
      const purchasedProductPriceResult =
        purchasedProductAmount[i] * purchasedProductPrice[i];

      this.totalPurchasedProductPrice += purchasedProductPriceResult;
      this.totalPurchasedProductAmount += purchasedProductAmount[i];

      // TODO: 'ㅡ'을 빈칸으로 만들어도 정렬되게 하기
      Console.print(
        `${this.purchasedProductName[i].padEnd(10, 'ㅡ')} ${String(
          purchasedProductAmount[i]
        ).padEnd(5, ' ')}  ${String(purchasedProductPriceResult).padStart(
          10,
          ' '
        )}`
      );
    }

    // 프로모션 상품명
    const giftPurchasedProductName = PRODUCTS.filter(
      (product) => product.receivedGiftAmount > 0
    ).map((product) => product.productName);

    // 프로모션 개수
    const giftPurchasedProductAmount = PRODUCTS.filter(
      (product) => product.receivedGiftAmount > 0
    ).map((product) => product.receivedGiftAmount);

    // 프로모션 가격
    const giftPurchasedProductPrice = PRODUCTS.filter(
      (product) => product.receivedGiftAmount > 0
    ).map((product) => product.price);

    for (let i = 0; i < giftPurchasedProductName.length; i += 1) {
      this.totalGiftPurchasedProductPrice +=
        giftPurchasedProductAmount[i] * giftPurchasedProductPrice[i];
    }

    Console.print('\n' + '=============증      정===============');

    // 프로모션 상품, 개수
    for (let i = 0; i < giftPurchasedProductName.length; i += 1) {
      Console.print(
        `${giftPurchasedProductName[i].padEnd(10, 'ㅡ')} ${String(
          giftPurchasedProductAmount[i]
        ).padEnd(1, ' ')}`
      );
    }

    Console.print('\n' + '=====================================');
    // 총 수량, 총 금액
    Console.print(
      `총구매액 ${String(this.totalPurchasedProductAmount).padStart(
        13
      )} ${String(this.totalPurchasedProductPrice).padStart(14)}`
    );
    // 맴버십 함수 실행
    this.calculateMembershipDiscount();
    // 내실돈 함수 실행
    this.calculatePriceForPay();

    // 행사할인 금액
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

    // 프로모션 적용 금액
  }

  calculatePriceForPay() {
    this.priceForPay =
      this.totalPurchasedProductPrice -
      this.totalGiftPurchasedProductPrice -
      this.membershipDiscountPrice;
  }
}

new receiptPrinting().printReceipt();
