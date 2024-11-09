import { Console } from '@woowacourse/mission-utils';
import { PRODUCTS } from '../Constant/productsCount.js';

export class receiptPrinting {
  printReceipt() {
    // 구매한 상품명
    const purchasedProductName = PRODUCTS.filter(
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

    let totalPurchasedProductAmount = 0;
    let totalPurchasedProductPrice = 0;

    for (let i = 0; i < purchasedProductName.length; i += 1) {
      const purchasedProductPriceResult =
        purchasedProductAmount[i] * purchasedProductPrice[i];

      totalPurchasedProductPrice += purchasedProductPriceResult;
      totalPurchasedProductAmount += purchasedProductAmount[i];

      // TODO: 'ㅡ'을 빈칸으로 만들어도 정렬되게 하기
      Console.print(
        `${purchasedProductName[i].padEnd(10, 'ㅡ')} ${String(
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

    console.log('giftPurchasedProductAmount: ', giftPurchasedProductAmount)

    // 프로모션 가격
    const giftPurchasedProductPrice = PRODUCTS.filter(
      (product) => product.receivedGiftAmount > 0
    ).map((product) => product.price);

    console.log('giftPurchasedProductPrice: ', giftPurchasedProductPrice)

    // 프로모션 상품 총 구입 금액
    let totalGiftPurchasedProductPrice = 0;

    for (let i = 0; i < giftPurchasedProductName.length; i += 1) {
      totalGiftPurchasedProductPrice +=
        giftPurchasedProductAmount[i] * giftPurchasedProductPrice[i];
        console.log('totalGiftPurchasedProductPrice: ', totalGiftPurchasedProductPrice)
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
      `총구매액 ${String(totalPurchasedProductAmount).padStart(13)} ${String(
        totalPurchasedProductPrice
      ).padStart(14)}`
    );
    // 행사할인 금액
    // TODO: 나중에 간격 맞추기
    Console.print(`행사할인                        -${totalGiftPurchasedProductPrice}`);
    Console.print(`맴버십할인                   {(13, 000)}`);
    Console.print(`내실돈                       {(13, 000)}`);
  }
}

new receiptPrinting().printReceipt();
