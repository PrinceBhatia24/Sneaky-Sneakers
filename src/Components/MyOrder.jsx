import React, { useState } from 'react'
import FormatPrice from '../Helpers/FormatPrice'
import { Link } from 'react-router-dom';

export default function MyOrder({ OrderItems }) {
    return (
        <>
            <div>
                {OrderItems.map((Data, index) => {
                    return <div className="order-card">
                        <div className="order-header">
                            <div className="order-info">
                                <div><strong>ORDER PLACED</strong><br />{Data.createdAt}

                                </div>
                                <div><strong>TOTAL</strong><br />{<FormatPrice Price={Data.TotalPaid} />}</div>
                                {/* <div><strong>SHIP TO</strong><br /><span className="ship-to">{Data.ShippingDetail.firstName.toUpperCase()} {Data.ShippingDetail.lastName.toUpperCase()} ▼</span></div> */}
                                <div className="ship-to-container">
                                    <strong>SHIP TO</strong>
                                    <br />
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
                                <a href="#" className="order-link">View order details</a> | <a href="#" className="order-link">Invoice</a>
                            </div>
                        </div>

                        <div className="order-body">
                            {Data.OrderDetails.map((Data, index) => {
                                return <div className="order-item my-3">
                                    <div className='position-relative mx-2'>
                                        <img className="img-fluid CartImg me-4" style={{
                                            width: '90px',
                                            height: '90px',
                                            objectFit: 'contain',
                                            border: 'none'
                                        }}
                                            src={`${window.config.ProductImage}/${Data.Image}`}
                                        />
                                        <span style={{ backgroundColor: '#f1f1f1', color: '#000000' }} class="cartItemCount">{Data.Quantity}</span>
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
