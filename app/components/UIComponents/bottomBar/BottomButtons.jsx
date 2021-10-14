import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Sort } from "../../UIComponents/bottomBar/Sort";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/core";

const BottomButtons = () => {
  const navigation = useNavigation();

  return (
    <View
      style={tw`bg-white border-t border-gray-300 w-full h-14 flex flex-row`}
    >
      <View style={tw`border-r border-gray-300 w-1/2`}>
        <Sort />
      </View>
      <View style={tw`w-1/2`}>
        <TouchableOpacity
          onPress={() => navigation.navigate("FilterScreen")}
          style={tw`flex flex-row items-center justify-center h-full`}
        >
          <AntDesign
            style={tw`mr-1.5 text-gray-600`}
            name="filter"
            size={20}
            color="black"
          />
          <Text style={tw`text-gray-600 font-bold`}>FILTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomButtons;
