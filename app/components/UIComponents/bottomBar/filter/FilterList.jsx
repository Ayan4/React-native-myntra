import React from "react";
import { useSelector } from "react-redux";
import { View, Text, ScrollView, CheckBox } from "react-native";
import tw from "tailwind-react-native-classnames";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import FilterListItem from "./FilterListItem";

const FilterList = ({ filter }) => {
  const products = useSelector(state => state.products.allProducts);
  const filterArray = products.map(item => item[filter]);

  const getFilterData = filterArray => {
    let filterData = {};
    for (let filter of filterArray) {
      if (!filterData[filter]) {
        filterData[filter] = 1;
      } else {
        filterData[filter] += 1;
      }
    }
    return filterData;
  };

  const filterData = getFilterData(filterArray);

  return (
    <ScrollView style={tw`mb-32`}>
      {Object.keys(filterData).map((filterItem, index) => (
        <FilterListItem
          key={index}
          filterCategory={filter}
          filterData={filterData}
          filterItem={filterItem}
        />
      ))}
    </ScrollView>
  );
};

export default FilterList;
