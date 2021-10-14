import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { productFilters } from "../../config/productFilters";
import FilterList from "../UIComponents/bottomBar/filter/FilterList";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentFilterAction,
  clearFiltersAction
} from "../../slices/filterSlice";
import { useNavigation } from "@react-navigation/core";

const FilterContainer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentFilter = useSelector(state => state.filters.currentFilter);
  const allFiltersList = productFilters.filters;

  return (
    <View style={tw`h-full w-full bg-white flex justify-between mt-6`}>
      <View>
        <View
          style={tw`border-b border-gray-200 py-5 px-4 flex flex-row justify-between`}
        >
          <Text style={tw`font-bold text-base text-gray-600`}>FILTERS</Text>
          <TouchableOpacity onPress={() => dispatch(clearFiltersAction())}>
            <Text
              style={tw`font-bold text-base text-yellow-600 border-b-2 border-yellow-600`}
            >
              CLEAR ALL
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`flex flex-row h-full`}>
          <ScrollView style={tw`w-2/6 bg-gray-100`}>
            {allFiltersList.map((filter, index) => (
              <TouchableOpacity
                onPress={() => dispatch(setCurrentFilterAction(filter))}
                style={tw.style(
                  `border-b border-gray-300 pl-4 py-4`,
                  currentFilter === filter &&
                    "border-l-4 border-yellow-600 bg-white"
                )}
                key={index}
              >
                <Text style={tw`tracking-wide text-base text-gray-900`}>
                  {filter[0].toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={tw`w-4/6`}>
            <FilterList filter={currentFilter} />
          </View>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        style={tw`absolute bottom-6 w-full border-t border-gray-300 h-14 bg-white flex justify-center items-center`}
        onPress={() => navigation.navigate("ProductListing")}
      >
        <Text style={tw`text-gray-700 font-bold text-base tracking-wide`}>
          CLOSE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterContainer;
