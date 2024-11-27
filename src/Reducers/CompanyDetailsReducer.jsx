const CompanyDetailsReducer = (state, action) => {
    switch (action.type) {
        case "Loading":
            return {
                ...state, isLoading: true
            }
        case "APIError":
            return {
                ...state, isLoading: false, isError: true
            }
        case "CompantDetails":
            return {
                ...state, isLoading: false, isError: false, CompanyDetails: action.payload
            }

        default:
            return state
    }
}

export default CompanyDetailsReducer
