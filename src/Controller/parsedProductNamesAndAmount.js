export const extractProductNamesAndAmount = (productNamesAndAmount) => {
  const splitEachProduct = productNamesAndAmount.split(',');
  const totalProductNameAndAmount = [];

  for (let i = 0; i < splitEachProduct.length; i += 1) {
    const firstSquareBracketsDelete = splitEachProduct[i].trim().slice(1);
    const lastSquareBracketsDelete = firstSquareBracketsDelete.slice(0, -1);
    const productNameAndAmount = lastSquareBracketsDelete.split('-');
    totalProductNameAndAmount.push(productNameAndAmount);
  }
  return totalProductNameAndAmount;
};
