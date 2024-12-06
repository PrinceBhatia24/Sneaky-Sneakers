import { createContext, useContext, useEffect, useReducer } from "react";
const UserContext = createContext();
import UserReducer from "../Reducers/UserReducer";
import axios from "axios";

const UserDetailsProvider = ({ children }) => {

    //initial State 
    const initialstate = {
        User: {},
        OrderedItems: []
    }
    //UseReducer
    const [state, dispatch] = useReducer(UserReducer, initialstate)

    //Functions To Get UserDetails
    const GetUserDetials = async () => {
        const UserId = localStorage.getItem("UserId");
        try {
            const Res = await axios.get(`${window.config.Domain}/Registration/${window.config.OrgId}/${UserId}`)
            const Response = await Res.data;



            dispatch({
                type: "RegisterUserData",
                payload: Response
            });

        }
        catch (error) {
            console.log("Something Went Wrong" + error)
            dispatch({ type: "APIError" })
        }

    }

    const GetOrderedItems = async () => {
        try {
            const UserId = localStorage.getItem("UserId");
            const response = await fetch(`${window.config.Domain}/OrderItems/${window.config.OrgId}/${UserId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            dispatch({ type: 'Get_Ordered_Item', payload: data });

        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        GetUserDetials();
        GetOrderedItems();
    }, [])


    return <UserContext.Provider value={{ ...state }}>
        {children}
    </UserContext.Provider>

};

//Custom Hook To Get direct data with variable name rather than importing it on evry page
const UserDetailsContext = () => {
    return useContext(UserContext)
}

export {
    UserDetailsProvider, UserContext, UserDetailsContext
}