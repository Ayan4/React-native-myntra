import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FlatList, LogBox } from "react-native";
import tw from "tailwind-react-native-classnames";
import {
  getFilterData,
  getTransformedSizes
} from "../../../../utils/logicFunctions";
import FilterListItem from "./FilterListItem";

const FilterList = ({ filter }) => {
  const products = useSelector(state => state.products.allProducts);
  const currentFilter = useSelector(state => state.filters.currentFilter);
  const filterArray = products.map(item => item[filter]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    LogBox.ignoreLogs(["SerializableStateInvariantMiddleware took"]);
  }, []);

  const transformedSizes = getTransformedSizes(filterArray);

  const filterData =
    currentFilter === "sizes"
      ? getFilterData(transformedSizes)
      : getFilterData(filterArray);
  const filterDataArray = Object.keys(filterData);

  return (
    <FlatList
      style={tw`mb-52`}
      data={filterDataArray}
      horizontal={false}
      keyExtractor={index => index}
      renderItem={({ item, index }) => (
        <FilterListItem
          key={index}
          filterCategory={filter}
          filterData={filterData}
          filterItem={item}
        />
      )}
    />
  );
};

export default FilterList;
