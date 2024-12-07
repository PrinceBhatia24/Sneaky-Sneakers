const UserReducer = (state, action) => {
    switch (action.type) {
        case "RegisterUserData":
            return {
                ...state, User: action.payload
            }
        case "Get_Ordered_Item":
            return {
                ...state, OrderedItems: action.payload
            }
        case "OrderDetails":
            const id = action.payload
            const item = state.OrderedItems.find(item => item._id === id)
            return {
                ...state, OrderDetails: item
            }
        case "DataClear":
            return {
                ...state, User: {}, OrderedItems: [], OrderDetails: []
            }
        default:
            return state
    }
}

export default UserReducer
