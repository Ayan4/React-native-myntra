import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Sort } from "../../UIComponents/bottomBar/Sort";
import tw from "tailwind-react-native-classnames";

const BottomButtons = ({ setOpenFilter }) => {
  return (
    <View style={tw`bg-gray-200 w-full h-11 flex flex-row`}>
      <View style={tw`border-r border-gray-300 w-1/2`}>
        <Sort />
      </View>
      <View style={tw`w-1/2`}>
        <TouchableOpacity
          onPress={() => setOpenFilter(true)}
          style={tw`flex flex-row items-center justify-center h-full`}
        >
          <AntDesign
            style={tw`mr-1.5 text-gray-600`}
            name="filter"
            size={20}
            color="black"
          />
          <Text style={tw`text-gray-600 font-bold text-xs`}>FILTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomButtons;
