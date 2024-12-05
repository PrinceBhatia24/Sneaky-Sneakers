// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./config.js"
import { ProductProvider } from './Context/ProductContext.jsx'
import { FilterProvider } from './Context/FilterContext.jsx'
import { CompanyDetailsProvider } from './Context/ComapnyDetailsContext.jsx'
import { CartProvider } from './Context/CartContext.jsx'
import { CheckoutProvider } from './Context/CheckoutContext.jsx'
import { Provider } from 'react-redux'
import store from './Store/Store.jsx'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CompanyDetailsProvider>
      <ProductProvider>
        <FilterProvider>
          <CartProvider>
            <CheckoutProvider>
              <App />
            </CheckoutProvider>
          </CartProvider>
        </FilterProvider>
      </ProductProvider>
    </CompanyDetailsProvider>
  </Provider>


)
