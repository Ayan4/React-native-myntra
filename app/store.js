import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    filters: filterReducer
  }
});
