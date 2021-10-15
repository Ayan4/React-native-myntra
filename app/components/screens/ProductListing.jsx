import React, { useEffect } from "react";
import { View, Text, FlatList, LogBox, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../slices/productSlice";
import { AntDesign } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { getSortedData, getFilteredData } from "../../utils/logicFunctions";
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

  const sortedProducts = getSortedData(products, sortBy);
  const filteredProducts = getFilteredData(
    sortedProducts,
    filterState,
    currentFilter
  );

  return (
    <View style={tw`bg-white h-full flex justify-between mt-6`}>
      <Navbar />
      {productStatus === "loading" ? (
        <ActivityIndicator style={tw`h-full`} size="large" color="#D97706" />
      ) : productStatus === "failed" ? (
        <View style={tw`flex flex-row justify-center h-full mt-60`}>
          <AntDesign name="warning" size={24} color="#D97706" />
          <Text style={tw`text-2xl text-center ml-2`}>Failed To Load...</Text>
        </View>
      ) : filteredProducts.length < 1 ? (
        <View style={tw`flex flex-row justify-center h-full mt-60`}>
          <AntDesign name="warning" size={24} color="#D97706" />
          <Text style={tw`text-xl text-center ml-2`}>
            No products to show, Try other Filters
          </Text>
        </View>
      ) : (
        <FlatList
          style={tw`mb-20`}
          data={filteredProducts}
          horizontal={false}
          numColumns={2}
          keyExtractor={productItem => productItem.productId}
          renderItem={({ item }) => (
            <ProductCard key={item.productId} product={item} />
          )}
        />
      )}

      <View style={tw`absolute bottom-6`}>
        <BottomButtons />
      </View>
    </View>
  );
}

export default ProductListing;
