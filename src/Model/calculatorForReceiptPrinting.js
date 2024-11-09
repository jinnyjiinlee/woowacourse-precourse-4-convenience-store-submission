import { Console } from '@woowacourse/mission-utils';
import { PRODUCTS, RECEIPT_TEXT } from '../Constant/productsCount.js';

export class receiptPrinting {
  printReceipt() {
    const purchasedProductName = PRODUCTS.filter(
      (product) => product.totalReceivedAmount > 0
    ).map((product) => product.productName);

    const purchasedProductAmount = PRODUCTS.filter(
      (product) => product.totalReceivedAmount > 0
    ).map((product) => product.totalReceivedAmount);

    const purchasedProductPrice = PRODUCTS.filter(
      (product) => product.totalReceivedAmount > 0
    ).map((product) => product.price);

    // console.clear();
    // console.log('purchasedProductName: ', purchasedProductName);
    // console.log('purchasedProductAmount: ', purchasedProductAmount);
    // console.log('purchasedProductPrice: ', purchasedProductPrice);

    Console.print('==============W 편의점================');
    Console.print('상품명               수량         금액  ');

    for (let i = 0; i < purchasedProductName.length; i += 1) {
      const purchasedProductPriceResult =
        purchasedProductAmount[i] * purchasedProductPrice[i];

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

    // Console.print('=============증	   정===============');
    // Console.print(`${콜라}             ${1}             `);

    // Console.print('====================================');
    // Console.print(`총구매액             ${8}     ${(13, 000)}`);
    // Console.print(`행사할인                     -${(13, 000)}`);
    // Console.print(`맴버십할인                    -${(13, 000)}`);
    // Console.print(`내실돈                       ${(13, 000)}`);
  }
}
