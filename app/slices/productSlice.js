import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../Api/api";

export const fetchAllProducts = createAsyncThunk(
  "products/allProducts",
  async () => {
    const response = await axios.get(API.GET_PRODUCTS);
    return response.data.products;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    productStatus: "idle"
  },
  reducers: {},
  extraReducers: {
    [fetchAllProducts.pending]: (state, action) => {
      state.productStatus = "loading";
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      state.allProducts = action.payload;
      state.productStatus = "succeeded";
    },
    [fetchAllProducts.rejected]: (state, action) => {
      state.productStatus = "failed";
      state.error = action.error.message;
    }
  }
});

export default productSlice.reducer;
