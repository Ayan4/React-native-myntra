import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    sortBy: null,
    currentFilter: "gender",
    filter: {
      gender: [],
      category: [],
      sizes: [],
      brand: []
    }
  },
  reducers: {
    sortByAction: (state, action) => {
      state.sortBy = action.payload;
    },
    clearSortAction: state => {
      state.sortBy = null;
    },
    filterAction: (state, action) => {
      const { filterCategory, filterItem } = action.payload;
      const foundItem = state.filter[filterCategory].includes(filterItem);

      foundItem
        ? (state.filter[filterCategory] = state.filter[filterCategory].filter(
            item => item !== filterItem
          ))
        : state.filter[filterCategory].push(filterItem);
    },
    clearFiltersAction: state => {
      state.filter = {
        gender: [],
        category: [],
        sizes: [],
        brand: []
      };
    },
    setCurrentFilterAction: (state, action) => {
      state.currentFilter = action.payload;
    }
  }
});

export const {
  sortByAction,
  clearSort,
  filterAction,
  setCurrentFilterAction
} = filterSlice.actions;
export default filterSlice.reducer;
