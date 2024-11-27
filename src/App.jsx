import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactUs from "./Pages/ContactUs";
import AppLayout from "./Components/AppLayout";
import Homepage from "./Pages/Homepage";
import Cart from "./Pages/Cart";
import Prooduct from "./Pages/Prooduct";
import Error from "./Pages/Error";
import Collections from "./Pages/Collections";
import Checkout from "./Pages/Checkout";
import OrderConfirmation from "./Pages/OrderConfirmation";
import MyAccount from "./Pages/MyAccount";
function App() {

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Homepage />
        },
        {
          path: "/contactus",
          element: <ContactUs />
        },
        {
          path: "/cart",
          element: <Cart />
        },
        {
          path: "/Collections",
          element: <Collections />
        },

        {
          path: "/Product/:id",
          element: <Prooduct />
        },
        {
          path: "/Checkout",
          element: <Checkout />
        },
        ,
        {
          path: "/MyAccount",
          element: <MyAccount />
        },
        {
          path: "*",
          element: <Error />
        }
      ]
    },
    {
      path: "/OrderConfirmation/:id",
      element: <OrderConfirmation />
    },
  ]);

  return <RouterProvider router={Router} future={{ v7_startTransition: true }} />
};

export default App