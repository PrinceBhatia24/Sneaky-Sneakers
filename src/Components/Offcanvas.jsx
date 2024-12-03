import React from 'react'
import { Link } from 'react-router-dom';
import { FaRegTrashCan } from "react-icons/fa6";
import Filters from './Filters';
import { CartContext } from '../Context/CartContext';
import FormatPrice from '../Helpers/FormatPrice'
import EmptyCart from './EmptyCart';


export default function Offcanvas() {
    const { Cart, TotalItem, CartTotal, ProductID, DeleteProduct } = CartContext();
    return (
        <div>
            <div className="offcanvas offcanvas-end customoffcanvas" style={{ height: '97vh' }} tabIndex="-1" id="offcanvasCart" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Shopping Cart ({TotalItem})</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className='container-fluid'>
                        {Cart.length > 0 ? (
                            Cart.map((Data, index) => {
                                return (
                                    <OffCanvasCard
                                        key={index}
                                        QuantityShow={true}
                                        ProductID={ProductID}
                                        Data={Data}
                                    />
                                );
                            })
                        ) : (
                            <EmptyCart Title="Empty Cart" />
                        )}

                    </div>
                </div>
                <div className="offcanvas-footer">
                    <div className="card-grid-btn my-1" data-bs-dismiss="offcanvas" aria-label="Close">
                        <Link to="/Checkout" style={{ lineHeight: '2rem' }} className="btn checkbtn py-2 border-dark bg-dark text-white">
                            <div className='d-flex'>
                                <span style={{
                                    width: '63%',
                                    textAlign: 'left'
                                }}>Proceed To Checkout</span>
                                <span style={{ borderLeft: '1px solid white' }}><span className='px-2' ></span>{<FormatPrice Price={CartTotal} />}</span>
                            </div>
                        </Link>

                    </div>
                </div>
            </div >
            {/* OffCamvasFilter */}
            <div className="offcanvas offcanvas-bottom customoffcanvas w-100" tabIndex="-1" id="offcanvasFilter" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Filters</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <Filters />
                </div>
            </div >
        </div >
    )
}

function OffCanvasCard(props) {
    const { Name, Image, Quantity, Price, Color, Size, id, Total } = props.Data

    const { ProductID, handleDecrement, handleIncrement } = CartContext();
    const { QuantityShow } = props



    return (
        <div className='row mb-5' style={{width:'100%'}}>
            <div className='col-3 position-relative py-1'>
                <img className='img-fluid CartImg'
                    style={{
                        objectFit: 'contain',
                        border: 'none'
                    }}

                    src={`${window.config.ProductImage}/${Image}`}
                />
                <span className="cartItemCount">{Quantity}</span>
            </div>
            <div className='col-7 '>
                <Link to={`/Product/${ProductID}`}>
                    <p className='PName'>{Name}</p>
                    <p className='PName' style={{ fontWeight: '500' }}>{<FormatPrice Price={Price} />} | {Size} | {Color}</p>
                </Link>
                {QuantityShow ? <div className="quantity-selector bg-dark text-white mb-2" style={{ padding: '3px 14px' }}>
                    <button className="quantity-button text-white " style={{ fontSize: '1rem' }} onClick={() => handleDecrement(id)}>-</button>
                    <span className="quantity-display" style={{ fontSize: '1rem' }} >{Quantity}</span>
                    <button className="quantity-button text-white " style={{ fontSize: '1rem' }} onClick={() => handleIncrement(id)}>+</button>
                </div> : ""}

            </div >
            <div className='col-2 d-flex align-items-center'>
                <p className='PriceList'>{<FormatPrice Price={Total} />}</p>
            </div>

        </div >
    )
}


export {
    OffCanvasCard,
}
