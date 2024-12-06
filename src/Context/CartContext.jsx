import { createContext, useContext, useEffect, useReducer } from "react"
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

    const ADDCART = async () => {
        try {
            const UserId = localStorage.getItem("UserId")
            const cartData = state
            const response = await fetch(`${window.config.Domain}/AddToCart/${window.config.OrgId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartData,
                    CartId: window.config.OrgId,
                    UserId
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save cart to database');
            }


            const data = await response.json();
            // console.log('Cart saved successfully:', data);
        } catch (error) {
            // console.error('Error saving cart:', error);
        }
    }
    const fetchCartData = async () => {
        try {
            const UserId = localStorage.getItem("UserId");
            const response = await fetch(`${window.config.Domain}/GetCart/${window.config.OrgId}/${UserId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (!response.ok) {
                // throw new Error('Failed to fetch cart data');
                dispatch({ type: 'CLEAR_CART' });
                return;
            }

            const data = await response.json();

            // Dispatch action to update state with fetched data
            dispatch({ type: 'SET_CART', payload: data });

        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };
    
    // const GetOrderedItems = async () => {
    //     try {
    //         const UserId = localStorage.getItem("UserId");
    //         const response = await fetch(`${window.config.Domain}/OrderItems/${window.config.OrgId}/${UserId}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    //         const data = await response.json();

    //         dispatch({ type: 'Get_Ordered_Item', payload: data });

    //     } catch (error) {
    //         console.error('Error fetching cart:', error);
    //     }
    // };

    useEffect(() => {
        fetchCartData()
    }, [])
    useEffect(() => {
        ADDCART()
    }, [initialState])

    return <AppContext4.Provider value={{ ...state, AddToCart, BuyNow, DeleteProduct, handleIncrement, handleDecrement, fetchCartData }}>
        {children}
    </AppContext4.Provider >

}
const CartContext = () => {
    return useContext(AppContext4)
}

export {
    CartProvider, AppContext4, CartContext
}