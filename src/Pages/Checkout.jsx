import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { OffCanvasCard } from '../Components/Offcanvas'
import { CartContext } from '../Context/CartContext'
import CheckoutForm from '../Components/CheckoutForm';
import FormatPrice from '../Helpers/FormatPrice';


export default function Checkout() {
    const { Cart, TotalItem, CartTotal, ProductID, ShippingCharges } = CartContext();
    const TotalPayable = ShippingCharges + CartTotal

    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0)
        if (Cart.length === 0) {
            // console.log(Cart);
            
            navigate('/Collections');
        }
    }, [Cart, navigate]);

    return (
        <>
            <div className='container-fluid my-5 px-4'>
                <div className='row'>
                    <div className='col-lg-6 col-md-12 col-sm-12 col-12 py-3 px-3'>
                        <h5 className='text-start mb-5'>Shipping Details</h5>
                        <CheckoutForm />
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12 col-12 py-3 px-3' style={{
                        backgroundColor: '#fafafa', borderRadius: '6px'
                    }} >
                        <h5 className='text-start'>Your Order</h5>
                        <div className=''>
                            <div className="offcanvas-footer my-3">
                                <div className="card-grid-btn my-1 px-0">
                                    <a style={{ lineHeight: '1.6rem' }} className="btn checkbtn py-2 border-dark bg-dark text-white">
                                        <div data-bs-dismiss="offcanvas" aria-label="Close" className='d-flex justify-content-between'>
                                            <span style={{
                                                width: '63%',
                                                textAlign: 'left'
                                            }}>Product ({TotalItem})</span>
                                            <span ><span className='px-2' ></span>Subtotal</span>
                                        </div>
                                    </a>

                                </div>
                            </div>
                            <div>
                                {Cart.map((Data, index) => {
                                    return <OffCanvasCard key={index} QuantityShow={false} ProductID={ProductID} Data={Data} />
                                })}

                                <div>
                                    <div className="seprator2 my-3"></div>
                                    <div className="row" id="Total"><div className="col-8"><p className="fw-bold text-start">Subtotal</p></div> <div className="col-4"> <p className="float-end fw-bold"><FormatPrice Price={CartTotal} /></p></div></div>
                                    <div className="seprator2 my-3"></div>
                                    <div className="row" id="Total"><div className="col-8"><p className="fw-bold text-start">Shipping</p></div> <div className="col-4"> <p className="float-end fw-bold"><FormatPrice Price={ShippingCharges} /></p></div></div>
                                    <div className="seprator2 my-3"></div>
                                    <div className="row" id="Total"><div className="col-8"><p className="fw-bold text-start">Total</p></div> <div className="col-4"> <p className="float-end fw-bold"><FormatPrice Price={TotalPayable} /></p></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
