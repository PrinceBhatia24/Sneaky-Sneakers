import { createContext, useContext, useEffect, useReducer, useState } from "react";
const AppContext2 = createContext();
import FilterReducer from "../Reducers/FilterReducer"
import axios from "axios";
import { ProductContext } from "./ProductContext";

const FilterProvider = ({ children }) => {

    const { Product } = ProductContext();
    
    //initial State 
    const initialstate = {
        //Common
        isLoading: false,
        isError: false,
        //Categories
        Categories: [],
        //Sizes
        Sizes: [],
        //Colors
        Colors: [],
        SortingValue: '',
        AllProduct: [],
        FilteredProducts: [],
        Filter: {
            Search: "",
            Category: "",
            Size: "",
            Color: ""
        }
    }



    //UseReducer
    const [state, dispatch] = useReducer(FilterReducer, initialstate)

    //Filters
    const Sorting = (e) => {
        let value = e.target.value
        dispatch({ type: "GetSortValue", payload: value })
    }

    //Get Searchvalue
    const UpdateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        return dispatch({ type: "UpdateFilterValue", payload: { name, value } })
    }

    //Get Product By Collection Id
    const GetProductByCollectionId = (Id) => {
        dispatch({ type: "GetProductByCollection", payload: { Id, Product } })
    }


    //Get Sorted Products
    useEffect(() => {
        dispatch({ type: "FilterProduct", payload: Product })
        dispatch({ type: "SortedProducts" })
    }, [Product, state.SortingValue, state.Filter])


    //Get Sorted Value
    useEffect(() => {
        dispatch({ type: "FilteredProduct", payload: Product })
    }, [Product])

    return <AppContext2.Provider value={{ ...state, Sorting, GetProductByCollectionId, UpdateFilterValue }}>
        {children}
    </AppContext2.Provider>

};

//Custom Hook To Get direct data with variable name rather than importing it on evry page
const FilterContext = () => {
    return useContext(AppContext2)
}

export {
    FilterProvider, AppContext2, FilterContext
}