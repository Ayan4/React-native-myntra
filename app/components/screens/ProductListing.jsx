import React, { useEffect } from "react";
import { View, Text, FlatList, LogBox, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../slices/productSlice";
import { AntDesign } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import Navbar from "../UIComponents/TopNavbar/Navbar";
import ProductCard from "../UIComponents/ProductCard";
import BottomButtons from "../UIComponents/bottomBar/BottomButtons";

function ProductListing() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.allProducts);
  const { currentFilter, sortBy, ...filterState } = useSelector(
    state => state.filters
  );
  const productStatus = useSelector(state => state.products.productStatus);

  useEffect(() => {
    dispatch(fetchAllProducts());
    LogBox.ignoreLogs(["SerializableStateInvariantMiddleware took"]);
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

    if (filterArray.length > 0 && currentFilter !== "sizes") {
      return filteredProducts.filter(item =>
        filterArray.includes(item[currentFilter])
      );
    } else if (filterArray.length > 0 && currentFilter === "sizes") {
      function filteredData() {
        let result = [];
        let sizeArray;
        for (let i = 0; i < filteredProducts.length; i++) {
          sizeArray = filteredProducts[i].sizes.split(",");

          for (let j = 0; j < sizeArray.length; j++) {
            if (filterArray.includes(sizeArray[j])) {
              result.push(filteredProducts[i]);
            }
          }
        }
        return result;
      }
      return filteredData();
    }
    return sortedProducts;
  };

  const sortedProducts = getSortedData(products);
  const filteredProducts = getFilteredData(sortedProducts);

  return (
    <View style={tw`bg-white h-full flex justify-between`}>
      <Navbar />

      {productStatus === "loading" ? (
        <ActivityIndicator style={tw`h-full`} size="large" color="#D97706" />
      ) : productStatus === "failed" ? (
        <View style={tw`flex flex-row justify-center h-full mt-60`}>
          <AntDesign name="warning" size={24} color="#D97706" />
          <Text style={tw`text-2xl text-center ml-2`}>Failed To Load...</Text>
        </View>
      ) : (
        <FlatList
          style={tw`mb-12`}
          data={filteredProducts}
          horizontal={false}
          numColumns={2}
          keyExtractor={productItem => productItem.productId}
          renderItem={({ item }) => (
            <ProductCard key={item.productId} product={item} />
          )}
        />
      )}

      <View style={tw`absolute bottom-0`}>
        <BottomButtons />
      </View>
    </View>
  );
}

export default ProductListing;
