import React from 'react'
import { CartContext } from '../Context/CartContext';
import FormatPrice from '../Helpers/FormatPrice'
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function CartTable() {
    const { Cart, ProductID, DeleteProduct, TotalItem, ShippingCharges, CartTotal } = CartContext();
    const TotalPayable = ShippingCharges + CartTotal

    return (
        <>
            <table id="keywords" >
                <thead>
                    <tr>

                        <th>
                            <span>Product</span>
                        </th>
                        <th >
                            <span>Quantity</span>
                        </th>
                        <th>
                            <span>Total</span>
                        </th>
                        <th>Action</th>

                    </tr>
                </thead>
                <tbody>
                    {Cart.map((Data, index) => {
                        return <tr>

                            <td className="lalign" >
                                <Link to={`/Product/${ProductID}`}>
                                    <div className='d-flex align-items-center'>
                                        <img className="img-fluid CartImg" style={{
                                            width: '90px',
                                            height: '90px',
                                            objectFit: 'contain',
                                            border: 'none'
                                        }}
                                            src={`${window.config.ProductImage}/${Data.Image}`}
                                        />
                                        <div className='mx-3'>
                                            <p className='PName' style={{ fontSize: '18px' }}>{Data.Name}-({Data.Size})</p>
                                            <p className='PriceList mx-0'>{<FormatPrice Price={Data.Price} />}</p>
                                        </div>
                                    </div>
                                </Link>

                            </td>
                            <td style={{ textAlign: '-webkit-center' }}>{Data.Quantity}</td>
                            <td style={{ textAlign: '-webkit-center' }}>{<FormatPrice Price={Data.Price} />}</td>
                            <td style={{ textAlign: '-webkit-center' }}>  <div className='col-2 d-flex align-items-center' style={{ cursor: 'pointer' }} onClick={() => DeleteProduct(Data.id)}>
                                <FaRegTrashCan className='Trash' />
                            </div></td>
                        </tr>
                    })}
                </tbody>
            </table >
        </>
    )
}
