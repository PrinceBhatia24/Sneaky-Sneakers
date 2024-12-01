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
createRoot(document.getElementById('root')).render(
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


)
