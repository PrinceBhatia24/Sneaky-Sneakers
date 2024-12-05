import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name: "product",
    initialState: {},
    reducers: {
        GetAllSlider(state, action) { 
            console.log("Redux Working");
            
        },
        GetCategory(state, action) { },
        GetProduct(state, action) { },
        GetProductById(state, action) { }
    }
})

export default ProductSlice.reducer
export const { GetAllSlider } = ProductSlice.actions;