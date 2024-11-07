export const extractProductNamesAndAmount = (productNamesAndAmount) => {
  // 대괄호 양쪽 없애기
  const firstSquareBracketsDelete = productNamesAndAmount.slice(1);
  const lastSquareBracketsDelete = firstSquareBracketsDelete.slice(0, -1);

  // 하이픈을 기준으로 상품명, 상품개수를 배열로 나누기
  const productNameAndAmount = lastSquareBracketsDelete.split('-');

  return [productNameAndAmount[0], productNameAndAmount[1]];
};
