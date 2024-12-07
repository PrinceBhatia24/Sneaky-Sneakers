import React, { useEffect, useState } from 'react'
import { UserDetailsContext } from '../Context/UserDetails';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import FormatPrice from '../Helpers/FormatPrice'
import FormatDate from '../Helpers/FormateDate';
import Error from '../Pages/Error';

export default function OrderDetails() {
    const { GetOrderDetails, OrderDetails } = UserDetailsContext();

    const [loading, setLoading] = useState(true);
    const { id } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchOrderDetails = async () => {
            await GetOrderDetails(id);
            setLoading(false);
        };

        fetchOrderDetails();
    }, [id])
    if (loading) {
        return <div>Loading...</div>; // Render a loader while waiting for data
    }

    if (!OrderDetails) {
        return <Error />; // Handle case where data is unavailable
    }
    return (
        <>

            <div className='container mb-0 mt-5'>
                <h3 className='text-start'>Order Details</h3>
                <div className='container  px-1 Orderdetailsheader'>
                    <p className='my-0'>Ordered on <span className='fw-bold'> <FormatDate isDate={OrderDetails.createdAt} /></span></p>
                    <p className='my-0'>Order <span className='fw-bold'> {OrderDetails.OrderId}</span> </p>
                    {/* <p className='my-0'><span style={{ cursor: 'pointer', color: '#007185', fontWeight: '600' }}> Invoice</span> </p> */}
                </div>
                <div className="order-header bg-white " style={{ border: '1px solid #0000002b', borderRadius: '10px', padding: '22px 16px' }}>

                    <div className='text-start ordermid'><strong >Shipping Address</strong><br />
                        <p className='text-start mt-1 mb-0'>{OrderDetails.ShippingDetail.firstName.toUpperCase()} {OrderDetails.ShippingDetail.lastName.toUpperCase()}</p>
                        <p className='text-start my-0'>{OrderDetails.ShippingDetail.address1} , {OrderDetails.ShippingDetail.address2}</p>
                        <p className='text-start my-0'>{OrderDetails.ShippingDetail.city} , {OrderDetails.ShippingDetail.state}, {OrderDetails.ShippingDetail.pincode}</p>
                    </div>
                    <div className='text-start ordermid'><strong >Order Summary</strong><br />
                        <div className="row mt-1" id="Total"><div className="col-8"><p className=" text-start my-0">Item(s) Subtotal:</p></div> <div className="col-4"> <p className="float-end my-0"><FormatPrice Price={OrderDetails.TotalPaid} /></p></div></div>
                        <div className="row" id="Total"><div className="col-8"><p className=" text-start my-0">Shipping:</p></div> <div className="col-4"> <p className="float-end my-0">₹0</p></div></div>
                        <div className="row" id="Total"><div className="col-8"><p className="fw-bold text-start">Grand Total:</p></div> <div className="col-4"> <p className="float-end fw-bold"><FormatPrice Price={OrderDetails.TotalPaid} /></p></div></div>

                    </div>
                    <div className='text-start ordermid'><strong >Payment Methods</strong><br />
                        <p className='text-start'>-</p>
                    </div>
             

                </div>

            </div>
            <div className='container mt-1 mb-5' >
                <div className="order-body" style={{ border: '1px solid #0000002b', borderRadius: '10px', padding: '5px' }}>
                    {OrderDetails.OrderDetails.map((Data, index) => {
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
            </div >
        </>
    )
}
