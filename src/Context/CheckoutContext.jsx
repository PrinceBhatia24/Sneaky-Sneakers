import { createContext, useContext, useReducer } from "react"
import CheckoutReducer from "../Reducers/CheckoutReducer";
const AppContext5 = createContext();

const CheckoutProvider = ({ children }) => {
    const initialState = {
        ShippingDetail: {},
        OrderDetails: [],
        OrgId: "",
    }

    const [state, dispatch] = useReducer(CheckoutReducer, initialState)

    return <AppContext5.Provider value={{ ...state, }}>
        {children}
    </AppContext5.Provider >

}
const CheckoutContext = () => {
    return useContext(AppContext5)
}

export {
    CheckoutProvider, AppContext5, CheckoutContext
}