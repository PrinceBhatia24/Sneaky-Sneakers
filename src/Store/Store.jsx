import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Slice/ProductSlice";

const store = configureStore({
    reducer: {
        product: ProductSlice
    },
})

export default store