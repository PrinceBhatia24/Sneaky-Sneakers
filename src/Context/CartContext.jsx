import { createContext, useContext, useReducer } from "react"
import CartReducer from "../Reducers/CartReducer";
const AppContext4 = createContext();

const CartProvider = ({ children }) => {
    const initialState = {
        ProductID: "",
        Cart: [],
        TotalItem: "",
        TotalPrice: "",
        CartTotal: "",
        ShippingCharges: 299,

    }

    const [state, dispatch] = useReducer(CartReducer, initialState)

    const AddToCart = (id, Size, Color, Quantity, SingleProduct) => {
        dispatch({ type: 'ADD_TO_CART', payload: { id, Size, Color, Quantity, SingleProduct } });

    }

    const BuyNow = (id, Size, Color, Quantity, SingleProduct) => {
        dispatch({ type: 'BUY_NOW', payload: { id, Size, Color, Quantity, SingleProduct } });

    }



    const handleDecrement = (id) => {
        dispatch({ type: 'QuantityDecrease', payload: id });

    }
    const handleIncrement = (id) => {
        dispatch({ type: 'QuantityIncrease', payload: id });
    }
    const DeleteProduct = (id) => {
        dispatch({ type: 'DeleteCart', payload: id });
    }

    return <AppContext4.Provider value={{ ...state, AddToCart, BuyNow, DeleteProduct, handleIncrement, handleDecrement }}>
        {children}
    </AppContext4.Provider >

}
const CartContext = () => {
    return useContext(AppContext4)
}

export {
    CartProvider, AppContext4, CartContext
}