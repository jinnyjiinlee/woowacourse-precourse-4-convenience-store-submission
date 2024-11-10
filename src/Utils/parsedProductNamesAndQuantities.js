export const extractProductNamesAndQuantities = (productNamesAndQuantities) => {
  const splitEachProduct = productNamesAndQuantities.split(',');
  const totalProductNameAndQuantities = [];

  for (let i = 0; i < splitEachProduct.length; i += 1) {
    const firstSquareBracketsDelete = splitEachProduct[i].trim().slice(1);
    const lastSquareBracketsDelete = firstSquareBracketsDelete.slice(0, -1);
    const productNameAndQuantities = lastSquareBracketsDelete.split('-');
    totalProductNameAndQuantities.push(productNameAndQuantities);
  }
  return totalProductNameAndQuantities;
};
