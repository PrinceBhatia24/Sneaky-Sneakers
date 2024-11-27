const FilterReducer = (state, action) => {
    switch (action.type) {
        case "Loading":
            return {
                ...state, isLoading: true
            }
        case "APIError":
            return {
                ...state, isLoading: false, isError: true
            }

        case "FilteredProduct":
            return {
                ...state,
                FilteredProducts: [...action.payload],
                AllProduct: [...action.payload],
            }
        case "GetSortValue":
            return {
                ...state, SortingValue: action.payload
            }

        case "SortedProducts":
            const { FilteredProducts } = state
            let Tempdata = [...FilteredProducts]

            const SortingProduct = (a, b) => {
                if (state.SortingValue === "Lowest") {
                    return a.SalePrice - b.SalePrice
                }
                if (state.SortingValue === "Highest") {
                    return b.SalePrice - a.SalePrice
                }
                if (state.SortingValue === "A-Z") {
                    return a.Name.localeCompare(b.Name)
                }
                if (state.SortingValue === "Z-A") {
                    return b.Name.localeCompare(a.Name)
                }
            }
            let newSortedProduct = Tempdata.sort(SortingProduct)
            return {
                ...state,
                FilteredProducts: newSortedProduct
            }

        case "UpdateFilterValue":
            const { name, value } = action.payload
            return {
                ...state, Filter: {
                    ...state,
                    [name]: value
                }
            }
        case "FilterProduct":
            let tempdata = [...action.payload]
            const { Search, Category, Size, Color } = state.Filter

            if (Search) {
                tempdata = tempdata.filter((Current) => {
                    return Current.Name.toLowerCase().includes(Search)
                })
            }

            if (Category) {
                tempdata = tempdata.filter((Current) => {
                    return Current.Category === Category
                })
            }

            if (Size) {
                tempdata = tempdata.filter((Current) => {
                    return Current.Size.includes(Size)
                })
            }
            if (Color) {
                tempdata = tempdata.filter((Current) => {
                    return Current.Colour.includes(Color)
                })
            }
            return {
                ...state, FilteredProducts: tempdata,
            }

        case "GetProductByCollection":
            const { Id, Product } = action.payload

            // Filter products based on the CollectionId
            const FilteredByCollection = Product.filter((product) => {
                return product.Category === Id;
            });

            return {
                ...state,
                FilteredProducts: FilteredByCollection,
            };

        default:
            return state
    }
}

export default FilterReducer