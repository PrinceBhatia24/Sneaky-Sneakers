import { createContext, useContext, useEffect, useReducer } from "react";
const AppContext3 = createContext();
import CompanyDetailsReducer from "../Reducers/CompanyDetailsReducer";
import axios from "axios";

const CompanyDetailsProvider = ({ children }) => {

    //initial State 
    const initialstate = {
        isLoading: false,
        isError: false,
        CompanyDetails: {}
    }
    //UseReducer
    const [state, dispatch] = useReducer(CompanyDetailsReducer, initialstate)

    //Functions To Get All Colors
    const GetCompanyDetials = async () => {
        dispatch({ type: "Loading" })
        try {
            const Res = await axios.get(`http://localhost:5007/CompanyDetailsData/${window.config.OrgId}`)
            const Response = await Res.data.data;
            // console.log(Response);

            dispatch({
                type: "CompantDetails",
                payload: Response
            });

        }
        catch (error) {
            console.log("Something Went Wrong" + error)
            dispatch({ type: "APIError" })
        }

    }
    useEffect(() => {
        GetCompanyDetials();
    }, [])


    return <AppContext3.Provider value={{ ...state }}>
        {children}
    </AppContext3.Provider>

};

//Custom Hook To Get direct data with variable name rather than importing it on evry page
const CompanyDetailsContext = () => {
    return useContext(AppContext3)
}

export {
    CompanyDetailsProvider, AppContext3, CompanyDetailsContext
}