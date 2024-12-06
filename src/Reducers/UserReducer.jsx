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
        default:
            return state
    }
}

export default UserReducer
