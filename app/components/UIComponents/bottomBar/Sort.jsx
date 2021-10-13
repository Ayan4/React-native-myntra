import React from "react";
import {
  Actionsheet,
  useDisclose,
  Icon,
  Center,
  NativeBaseProvider
} from "native-base";
import { TouchableOpacity, Text, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { sortByAction, clearSortAction } from "../../../slices/filterSlice";

export function Sort() {
  const { isOpen, onOpen, onClose } = useDisclose();
  const dispatch = useDispatch();
  const sortBy = useSelector(state => state.filters.sortBy);

  const handleSort = sortBase => {
    dispatch(sortByAction(sortBase));
    onClose();
  };

  const handleClearSort = () => {
    dispatch(clearSortAction());
    onClose();
  };

  return (
    <>
      <TouchableOpacity
        style={tw`w-full absolute h-full flex flex-row justify-center items-center`}
        onPress={onOpen}
      >
        <MaterialIcons
          style={tw`mr-1.5 text-gray-600`}
          name="sort"
          size={20}
          color="black"
        />
        <Text style={tw`text-gray-600 font-bold text-xs`}>SORT</Text>
      </TouchableOpacity>

      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          <View
            style={tw`w-full border-b border-gray-300 px-4 pb-3 text-red-500 flex flex-row justify-between items-center`}
          >
            <Text style={tw`text-gray-500 font-bold`}>SORT BY</Text>
            <TouchableOpacity
              onPress={handleClearSort}
              style={tw`border-b-2 border-yellow-600 pb-0.5`}
            >
              <Text style={tw`text-xs font-bold text-yellow-600`}>CLEAR</Text>
            </TouchableOpacity>
          </View>
          <Actionsheet.Item
            style={tw.style(
              "mt-2",
              sortBy === "highToLow" && "border-l-4 border-yellow-600"
            )}
            onPress={() => handleSort("highToLow")}
            startIcon={
              <Icon
                style={tw`text-gray-700 text-3xl`}
                as={<MaterialCommunityIcons name="sort-ascending" />}
                color="black"
                mr={2}
              />
            }
          >
            <Text style={tw`text-gray-700`}>High to Low</Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            style={tw.style(
              "mt-2",
              sortBy === "lowToHigh" && "border-l-4 border-yellow-600"
            )}
            onPress={() => handleSort("lowToHigh")}
            startIcon={
              <Icon
                style={tw`text-gray-700 text-3xl`}
                as={<MaterialCommunityIcons name="sort-descending" />}
                color="black"
                mr={2}
              />
            }
          >
            <Text style={tw`text-gray-700`}>Low to High</Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Sort />
      </Center>
    </NativeBaseProvider>
  );
};
