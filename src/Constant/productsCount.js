import { ParedProductsData } from '../Model/productsInPossessionData.js';

const rawProductList = new ParedProductsData().productsInPossession();

// TODO: productName이외 파일도 md파일에서 들고오기
const PRODUCTS = [
  {
    productName: rawProductList[0][0],
    price: 1000,
    regularStock: 10,
    promotionStock: 10,
    promotionType: '탄산2+1',
    totalReceivedAmount: 0,
    receivedGiftAmount: 0,
  }, // 콜라 - 2+1
  {
    productName: rawProductList[2][0],
    price: 1000,
    regularStock: 7,
    promotionStock: 8,
    promotionType: '탄산2+1',
    totalReceivedAmount: 0,
    receivedGiftAmount: 0,
  }, // 사이다 - 2+1
  {
    productName: rawProductList[4][0],
    price: 1800,
    regularStock: 0,
    promotionStock: 9,
    promotionType: 'MD추천상품',
    totalReceivedAmount: 0,
    receivedGiftAmount: 0,
  }, // 오렌지주스 = 1+1
  {
    productName: rawProductList[5][0],
    price: 1200,
    regularStock: 0,
    promotionStock: 5,
    promotionType: '탄산2+1',
    totalReceivedAmount: 0,
    receivedGiftAmount: 0,
  }, // 탄산수 - 2+1
  {
    productName: rawProductList[6][0],
    price: 500,
    regularStock: 10,
    promotionStock: null,
    promotionType: null,
    totalReceivedAmount: 0,
    receivedGiftAmount: 0,
  }, // 물
  {
    productName: rawProductList[7][0],
    price: 1500,
    regularStock: 6,
    promotionStock: null,
    promotionType: null,
    totalReceivedAmount: 0,
    receivedGiftAmount: 0,
  }, // 비타민워터
  {
    productName: rawProductList[8][0],
    price: 1500,
    regularStock: 5,
    promotionStock: 5,
    promotionType: '반짝할인',
    totalReceivedAmount: 0,
    receivedGiftAmount: 0,
  }, // 감자칩 1+1
  {
    productName: rawProductList[10][0],
    price: 1200,
    regularStock: 5,
    promotionStock: 5,
    promotionType: 'MD추천상품',
    totalReceivedAmount: 0,
    receivedGiftAmount: 0,
  }, //초코바 1+1
  {
    productName: rawProductList[12][0],
    price: 2000,
    regularStock: 5,
    promotionStock: null,
    promotionType: null,
    totalReceivedAmount: 0,
    receivedGiftAmount: 0,
  }, // 에너지바
  {
    productName: rawProductList[13][0],
    price: 6400,
    regularStock: 8,
    promotionStock: null,
    promotionType: null,
    totalReceivedAmount: 0,
    receivedGiftAmount: 0,
  }, // 정식도시락
  {
    productName: rawProductList[14][0],
    price: 1700,
    regularStock: 10,
    promotionStock: 1,
    promotionType: 'MD추천상품',
    totalReceivedAmount: 0,
    receivedGiftAmount: 0,
  }, //컵라면 1+1
];

const RECEIPT_TEXT = {
  LINE: {
    RECEIPT_HEADER_LINE: '==============W 편의점================',
    GIFT_DIVIDING_LINE: '=============증	   정===============',
    RECEIPT_FOOTER_LINE: '====================================',
  },

  WORD: {
    PRODUCT_NAME: '상풍명',
    PRODUCT_AMOUNT: '수량',
    PRODUCT_PRICE: '금액',
    TOTAL_PURCHASE_PRICE: '총구매액',
    EVENT_DISCOUNT: '행사할인',
    MEMBERSHIP_DISCOUNT: '맴버십할인',
    PRICE_TO_PAY: '내실돈',
  },
};

export { PRODUCTS, RECEIPT_TEXT };
