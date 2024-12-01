import { createContext, useContext, useEffect, useReducer, useState } from "react";
const AppContext = createContext();
import ProductReducer from "../Reducers/ProductReducer"
import axios from "axios";

const ProductProvider = ({ children }) => {

    //initial State 
    const initialstate = {
        //Common
        isLoading: false,
        isError: false,
        //Slider
        Slider: [],
        //Category
        Category: [],
        //Product
        Product: [],
        //ProductById
        SingleProduct: {}
    }

    //UseReducer
    const [state, dispatch] = useReducer(ProductReducer, initialstate)

    //Functions To Get Sliders
    const GetAllSlider = async () => {
        dispatch({ type: "Loading" })
        try {
            const Res = await axios.get(`${window.config.Domain}/Sliderimages/${window.config.OrgId}`)
            const Response = await Res.data.data;
            dispatch({
                type: "Sliders",
                payload: Response
            });

        }
        catch (error) {
            console.log("Something Went Wrong" + error)
            dispatch({ type: "APIError" })
        }

    }

    //Functions To Get Category
    const GetCategory = async () => {
        dispatch({ type: "Loading" })
        try {
            const Res = await axios.get(`${window.config.Domain}/CategoryImages/${window.config.OrgId}`)
            const Response = await Res.data.data;
            dispatch({
                type: "Category",
                payload: Response
            });

        }
        catch (error) {
            console.log("Something Went Wrong" + error)
            dispatch({ type: "APIError" })
        }

    }


    //Functions To Get Product
    const GetProduct = async () => {
        dispatch({ type: "Loading" })
        try {
            const Res = await axios.get(`${window.config.Domain}/Products/${window.config.OrgId}`)
            const Response = await Res.data.data;
            dispatch({
                type: "Products",
                payload: Response
            });

        }
        catch (error) {
            console.log("Something Went Wrong" + error)
            dispatch({ type: "APIError" })
        }

    }

    //Functions To Get Product By Id
    const GetProductById = async (ID) => {
        dispatch({ type: "Loading" })
        try {
         
            const Res = await axios.get(`${window.config.Domain}/Products/${window.config.OrgId}/${ID}`)
            const Response = await Res.data.data;
            dispatch({
                type: "ProductById",
                payload: Response
            });

        }
        catch (error) {
            console.log("Something Went Wrong" + error)
            dispatch({ type: "APIError" })
        }

    }


    //Function Calling
    useEffect(() => {
        GetAllSlider();
        GetCategory();
        GetProduct();
    }, [])

    return <AppContext.Provider value={{ ...state, GetProductById }}>
        {children}
    </AppContext.Provider>

};

//Custom Hook To Get direct data with variable name rather than importing it on evry page
const ProductContext = () => {
    return useContext(AppContext)
}

export {
    ProductProvider, AppContext, ProductContext
}