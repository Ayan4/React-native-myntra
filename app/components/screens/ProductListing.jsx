import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../slices/productSlice";
import tw from "tailwind-react-native-classnames";
import ProductCard from "../UIComponents/ProductCard";
// import Sort from "../UIComponents/Sort";

function ProductListing() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.allProducts);
  const productStatus = useSelector(state => state.products.productStatus);

  console.log(productStatus);
  // console.log(products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  if (productStatus === "loading")
    return <Text style={tw`pt-10 text-xl`}>Loading...</Text>;

  return (
    <View style={tw`bg-white border-1 border-red-700 flex flex-row flex-wrap`}>
      <FlatList
        data={products}
        horizontal={false}
        numColumns={2}
        keyExtractor={productItem => productItem.productId}
        renderItem={({ item }) => (
          <ProductCard key={item.productId} product={item} />
        )}
      />
      {/* {products.map(item => (
        <ProductCard key={item.productId} product={item} />
      ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

export default ProductListing;
