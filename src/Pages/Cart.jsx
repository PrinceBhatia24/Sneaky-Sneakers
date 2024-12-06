import React, { useEffect } from 'react'
import CartTable from '../Components/CartTable'
import { CartContext } from '../Context/CartContext';
import FormatPrice from '../Helpers/FormatPrice';

export default function Cart() {
    const { Cart, TotalItem, CartTotal, ProductID, ShippingCharges } = CartContext();
    const TotalPayable = ShippingCharges + CartTotal
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])
    return (
        <>
            <div className='container my-5'>
                <div className='row'>
                    <div className='col-lg-8 col-12 my-5'>
                        <CartTable />
                    </div>
                    <div className='col-lg-4 col-md-12 col-12 my-5'>
                        <div>
                            <div className="p-4  border-1 rounded-3 shadow">
                                <div className="content">
                                    <h5 className="fw-bold py-2 mb-4 text-start">
                                        Order Summary (<span className="cartItems">{TotalItem}</span> item)
                                    </h5>
                                    <div className="row" id="Total">
                                        <div className="col-8">
                                            <p className="fw-bold text-start">Subtotal</p>
                                        </div>{" "}
                                        <div className="col-4">
                                            {" "}
                                            <p className="float-end fw-bold"><FormatPrice Price={CartTotal} /></p>
                                        </div>
                                    </div>
                                    <div className="row" id="Total">
                                        <div className="col-8">
                                            <p className="fw-bold text-start">Shipping</p>
                                        </div>{" "}
                                        <div className="col-4">
                                            {" "}
                                            <p className="float-end fw-bold" style={{
                                                
                                            }}><FormatPrice Price={ShippingCharges} /></p>
                                        </div>
                                    </div>
                                    <div className="row" id="Total">
                                        <div className="col-8">
                                            <p className="fw-bold text-start">Delivery</p>
                                        </div>{" "}
                                        <div className="col-4">
                                            {" "}
                                            <p className="float-end fw-bold">Free</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row" id="Total">
                                        <div className="col-8">
                                            <p className="fw-bold text-start">Total</p>
                                        </div>{" "}
                                        <div className="col-4">
                                            {" "}
                                            <p className="float-end fw-bold"><FormatPrice Price={TotalPayable} /></p>
                                        </div>
                                    </div>

                                </div>
                                <div className="d-grid gap-2 py-2">
                                    <input
                                        id="enquiryButtonn"
                                        onclick="checkLoginStatus3()"
                                        defaultValue="Checkout"
                                        style={{ backgroundColor: "#000000", border: "BLACK" }}
                                        className="btn text-white btn-primary btn-lg fs-6"
                                        type="button"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}
