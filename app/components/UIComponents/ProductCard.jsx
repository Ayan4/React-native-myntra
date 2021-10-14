import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";

const ProductCard = ({ product }) => {
  const defaultImage = product.images.find(item => item.view === "default");
  const [heart, setHeart] = useState(false);

  return (
    <View style={tw`w-1/2 border-b border-gray-300 border-r`}>
      <Image style={tw`w-full h-72`} source={{ uri: defaultImage.src }} />

      <View style={tw`px-2 mt-2 mb-5`}>
        <View style={tw`flex flex-row justify-between items-center`}>
          <View style={tw`w-4/5`}>
            <Text numberOfLines={1} style={tw`font-semibold text-gray-800`}>
              {product.brand}
            </Text>
            <Text numberOfLines={1} style={tw`text-xs text-gray-500`}>
              {product.additionalInfo}
            </Text>
          </View>
          <AntDesign
            onPress={() => setHeart(!heart)}
            name="hearto"
            size={20}
            color={heart ? "red" : "gray"}
          />
        </View>
        <View style={tw`flex flex-row items-end`}>
          <Text style={tw`font-semibold text-gray-800`}>₹{product.price}</Text>
          <Text style={tw`text-xs text-gray-400 line-through ml-1`}>
            ₹{product.mrp}
          </Text>
          <Text style={tw`text-yellow-600 text-xs font-semibold ml-1.5`}>
            (Rs. {product.discount} OFF)
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
