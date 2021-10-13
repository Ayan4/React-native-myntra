import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../slices/productSlice";
import tw from "tailwind-react-native-classnames";
import ProductCard from "../UIComponents/ProductCard";
import BottomButtons from "../UIComponents/bottomBar/BottomButtons";
import Filter from "../UIComponents/bottomBar/filter/Filter";

function ProductListing() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.allProducts);
  const { currentFilter, sortBy, ...filterState } = useSelector(
    state => state.filters
  );
  const productStatus = useSelector(state => state.products.productStatus);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  const getSortedData = allProducts => {
    const sortedProducts = [...allProducts];
    if (sortBy === "highToLow") {
      return sortedProducts.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "lowToHigh") {
      return sortedProducts.sort((a, b) => a.price - b.price);
    }
    return allProducts;
  };

  const getFilteredData = sortedProducts => {
    const filterArray = filterState.filter[currentFilter];
    const filteredProducts = [...sortedProducts];

    if (filterArray.length > 0) {
      return filteredProducts.filter(item =>
        filterArray.includes(item[currentFilter])
      );
    }
    return sortedProducts;
  };

  const sortedProducts = getSortedData(products);
  const filteredProducts = getFilteredData(sortedProducts);

  if (productStatus === "loading")
    return <Text style={tw`pt-10 text-xl`}>Loading...</Text>;

  return (
    <View style={tw`bg-white`}>
      <FlatList
        style={tw`mb-8`}
        data={filteredProducts}
        horizontal={false}
        numColumns={2}
        keyExtractor={productItem => productItem.productId}
        renderItem={({ item }) => (
          <ProductCard key={item.productId} product={item} />
        )}
      />
      {openFilter && (
        <View style={tw`absolute top-0 w-full h-full z-10`}>
          <Filter setOpenFilter={setOpenFilter} />
        </View>
      )}

      <View style={tw`absolute bottom-0`}>
        <BottomButtons setOpenFilter={setOpenFilter} />
      </View>
    </View>
  );
}

export default ProductListing;
