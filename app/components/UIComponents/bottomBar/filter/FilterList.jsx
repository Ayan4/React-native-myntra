import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FlatList, LogBox } from "react-native";
import tw from "tailwind-react-native-classnames";
import FilterListItem from "./FilterListItem";

const FilterList = ({ filter }) => {
  const products = useSelector(state => state.products.allProducts);
  const currentFilter = useSelector(state => state.filters.currentFilter);
  const filterArray = products.map(item => item[filter]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    LogBox.ignoreLogs(["SerializableStateInvariantMiddleware took"]);
  }, []);

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

  const getTransformedSizes = filterArray => {
    let filterSizes = [];
    for (let i = 0; i < filterArray.length; i++) {
      const sizeArray = filterArray[i].split(",");

      for (let j = 0; j < sizeArray.length; j++) {
        filterSizes.push(sizeArray[j]);
      }
    }
    return filterSizes;
  };

  const transformedSizes = getTransformedSizes(filterArray);

  const filterData =
    currentFilter === "sizes"
      ? getFilterData(transformedSizes)
      : getFilterData(filterArray);
  const filterDataArray = Object.keys(filterData);

  return (
    <FlatList
      style={tw`mb-56`}
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
