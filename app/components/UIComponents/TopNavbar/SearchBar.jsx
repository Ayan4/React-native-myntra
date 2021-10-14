import React from "react";
import { View, TextInput } from "react-native";
import tw from "tailwind-react-native-classnames";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

const SearchBar = ({ setTerm }) => {
  const navigation = useNavigation();

  const searchCloseHandler = () => {
    navigation.navigate("ProductListing");
  };

  return (
    <View
      style={tw`flex flex-row items-center bg-white py-2.5 px-3 border-b border-gray-300 mb-3`}
    >
      <TextInput
        onChangeText={text => setTerm(text)}
        placeholder={"Search products"}
        style={tw`w-full pr-8 text-lg`}
      />
      <AntDesign
        onPress={searchCloseHandler}
        style={tw`absolute right-2 text-gray-500`}
        name="close"
        size={24}
        color="black"
      />
    </View>
  );
};

export default SearchBar;
