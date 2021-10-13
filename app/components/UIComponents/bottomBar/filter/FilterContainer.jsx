import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { productFilters } from "../../../../config/constants";
import FilterList from "./FilterList";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentFilterAction,
  clearFiltersAction
} from "../../../../slices/filterSlice";

const FilterContainer = ({ setOpenFilter }) => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(state => state.filters.currentFilter);
  const allFiltersList = productFilters.filters;

  return (
    <View style={tw`h-full w-full bg-white flex justify-between`}>
      <View>
        <View
          style={tw`border-b border-gray-200 py-3 px-4 flex flex-row justify-between`}
        >
          <Text style={tw`font-bold text-xs text-gray-600`}>FILTERS</Text>
          <TouchableOpacity onPress={() => dispatch(clearFiltersAction())}>
            <Text
              style={tw`font-bold text-xs text-yellow-600 border-b-2 border-yellow-600`}
            >
              CLEAR ALL
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`flex flex-row h-full`}>
          <ScrollView style={tw`w-2/6 border-r border-gray-300 bg-gray-100`}>
            {allFiltersList.map((filter, index) => (
              <TouchableOpacity
                onPress={() => dispatch(setCurrentFilterAction(filter))}
                style={tw.style(
                  `border-b border-gray-300 pl-4 py-3`,
                  currentFilter === filter &&
                    "border-l-4 border-yellow-600 bg-white"
                )}
                key={index}
              >
                <Text style={tw`text-xs tracking-wide text-gray-700`}>
                  {filter[0].toUpperCase() + filter.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView style={tw`w-4/6`}>
            <FilterList filter={currentFilter} />
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        style={tw`absolute bottom-0 w-full border-t border-gray-400 h-12 bg-white flex justify-center items-center`}
        onPress={() => setOpenFilter(false)}
      >
        <Text style={tw`text-gray-700`}>CLOSE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterContainer;
