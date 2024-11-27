const ProductReducer = (state, action) => {
    switch (action.type) {
        case "Loading":
            return {
                ...state, isLoading: true
            }
        case "APIError":
            return {
                ...state, isLoading: false, isError: true
            }
        case "Sliders":
            // const FeaturedSlider = action.payload.filter((current) => {
            //     return current.Featured === true;
            // })
            return {
                ...state, isLoading: false, isError: false, Slider: action.payload
            }
        case "Category":
            return {
                ...state, Category: action.payload
            }
        case "Products":
            return {
                ...state, Product: action.payload
            }
        case "ProductById":
            return {
                ...state, SingleProduct: action.payload
            }
            


        default:
            return state
    }
}

export default ProductReducer