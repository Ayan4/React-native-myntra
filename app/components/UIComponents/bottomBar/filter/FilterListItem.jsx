import React, { useState, useEffect } from "react";
import { View, Text, CheckBox, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import { filterAction } from "../../../../slices/filterSlice";

const FilterListItem = ({ filterCategory, filterData, filterItem }) => {
  const dispatch = useDispatch();
  const filterState = useSelector(state => state.filters);

  const [check, setCheck] = useState(
    filterState.filter[filterCategory].includes(filterItem)
  );

  useEffect(() => {
    setCheck(filterState.filter[filterCategory].includes(filterItem));
  });

  const checkHandler = item => {
    dispatch(filterAction({ filterCategory, filterItem: item }));
    setCheck(!check);
  };

  return (
    <TouchableOpacity
      onPress={() => checkHandler(filterItem)}
      style={tw`flex flex-row justify-between items-center mx-2 px-1 py-2 border-b border-gray-200`}
    >
      <View style={tw`flex flex-row items-center`}>
        <CheckBox value={check} onChange={() => checkHandler(filterItem)} />
        <Text style={tw`text-gray-500 text-xs ml-2`}>{filterItem}</Text>
      </View>
      <Text style={tw`text-gray-500 text-xs`}>{filterData[filterItem]}</Text>
    </TouchableOpacity>
  );
};

export default FilterListItem;
