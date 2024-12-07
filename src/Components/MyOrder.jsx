import React, { useEffect, useState } from 'react'
import FormatPrice from '../Helpers/FormatPrice'
import { Link } from 'react-router-dom';
import FormatDate from '../Helpers/FormateDate';

export default function MyOrder({ OrderItems }) {
  
    return (
        <>
            <div>
                {OrderItems.map((Data, index) => {
                    return <div key={Data._id} className="order-card">
                        <div className="order-header">
                            <div className="order-info">
                                <div><strong>ORDER PLACED</strong>
                                    <br />
                                    <p className='text-start my-1'><FormatDate isDate={Data.createdAt} /></p>
                                </div>
                                <div><p className='text-start m-0'><strong>TOTAL</strong></p>{<FormatPrice Price={Data.TotalPaid} />}</div>
                                <div className="ship-to-container">
                                    <p className='text-start m-0'> <strong>SHIP TO</strong></p>

                                    <span className="ship-to">
                                        {Data.ShippingDetail.firstName.toUpperCase()}{" "}
                                        {Data.ShippingDetail.lastName.toUpperCase()} ▼
                                    </span>
                                    <div className="tooltip">
                                        {Data.ShippingDetail.firstName} {Data.ShippingDetail.lastName}
                                        <br />
                                        {Data.ShippingDetail.address1}, {Data.ShippingDetail.city}
                                        <br />
                                        {Data.ShippingDetail.state}, {Data.ShippingDetail.pincode}
                                    </div>
                                </div>
                            </div>
                            <div className="order-actions">
                                <p className='my-0'>OrderId {Data.OrderId}</p>
                                <Link to={`/OrderDetails/${Data._id}`} className="order-link">View order details</Link> | <a href="#" className="order-link">Invoice</a>
                            </div>
                        </div>

                        <div className="order-body">
                            {Data.OrderDetails.map((Data, index) => {
                                return <div key={Data._id} className="order-item my-3">
                                    <div className='position-relative mx-2'>
                                        <img className="img-fluid CartImg me-4" style={{
                                            width: '90px',
                                            height: '90px',
                                            objectFit: 'contain',
                                            border: 'none'
                                        }}
                                            src={`${window.config.ProductImage}/${Data.Image}`}
                                        />
                                        <span style={{ backgroundColor: '#f1f1f1', color: '#000000' }} className="cartItemCount">{Data.Quantity}</span>
                                    </div>

                                    <div>
                                        <div className="product-title">{Data.Name}</div>
                                        <div className="return-window">{<FormatPrice Price={Data.Price} />} {Data.Size ? `| ${Data.Size}` : ''}  {Data.Color ? `| ${Data.Color}` : ''}</div>
                                        <div className="action-buttons">
                                            <Link to={`/Product/${Data.id.split('-')[0]}`} className="buy-again-btn">Buy it again</Link>
                                        </div>
                                    </div>
                                </div>
                            })}

                        </div>
                    </div>
                })}
            </div >
        </>
    )
}
