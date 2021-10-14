export const getSortedData = (allProducts, sortBy) => {
  const sortedProducts = [...allProducts];
  if (sortBy === "highToLow") {
    return sortedProducts.sort((a, b) => b.price - a.price);
  }
  if (sortBy === "lowToHigh") {
    return sortedProducts.sort((a, b) => a.price - b.price);
  }
  return allProducts;
};

export const getFilteredData = (sortedProducts, filterState) => {
  let filteredProducts = [...sortedProducts];
  const filterObject = filterState.filter;

  for (let filterType in filterObject) {
    if (filterObject[filterType].length > 0) {
      filteredProducts = filteredProducts.filter(item =>
        filterObject[filterType].some(i => item[filterType].includes(i))
      );
    }
  }
  return filteredProducts;
};

export const getFilterData = filterArray => {
  let filterData = {};
  for (let filter of filterArray) {
    if (!filterData[filter]) {
      filterData[filter] = 1;
    } else {
      filterData[filter] += 1;
    }
  }
  return filterData;
};

export const getTransformedSizes = filterArray => {
  let filterSizes = [];
  for (let i = 0; i < filterArray.length; i++) {
    const sizeArray = filterArray[i].split(",");

    for (let j = 0; j < sizeArray.length; j++) {
      filterSizes.push(sizeArray[j]);
    }
  }
  return filterSizes;
};
