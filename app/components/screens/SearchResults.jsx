import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import SearchBar from "../UIComponents/TopNavbar/SearchBar";

const SearchResults = () => {
  const [term, setTerm] = useState("");
  const products = useSelector(state => state.products.allProducts);

  const searchResultProducts = products.filter(productItem => {
    if (term === "") {
      return null;
    } else if (productItem.product.toLowerCase().includes(term.toLowerCase())) {
      return productItem;
    }
  });

  return (
    <View style={tw`mt-12`}>
      <SearchBar setTerm={setTerm} />
      <ScrollView style={tw`mx-2 mb-16`}>
        {searchResultProducts.length < 1 && term === "" && (
          <Text style={tw`text-base text-gray-500 text-center mt-5`}>
            Search results will appear here...
          </Text>
        )}
        {searchResultProducts.length < 1 && term !== "" && (
          <Text style={tw`text-base text-gray-500 text-center mt-5`}>
            Could not find the product, Try with a relevant keyword
          </Text>
        )}
        {searchResultProducts.map(item => (
          <View
            style={tw`border border-gray-300 my-1 p-1 flex flex-row items-start rounded`}
            key={item.productId}
          >
            <Image
              style={tw`w-20 h-24 rounded`}
              source={{ uri: item.searchImage }}
            />
            <View style={tw`flex`}>
              <Text
                numberOfLines={1}
                style={tw`w-3/4 ml-2 mb-1 text-lg text-gray-900`}
              >
                {item.brand}
              </Text>
              <Text
                numberOfLines={2}
                style={tw`w-3/5 ml-2 text-base text-gray-500`}
              >
                {item.product}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchResults;
