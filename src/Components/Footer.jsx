import React from 'react'
import { Link } from 'react-router-dom';
import { CompanyDetailsContext } from '../Context/ComapnyDetailsContext';

export default function Footer() {

    const { CompanyDetails } = CompanyDetailsContext()
    

    return (
        <>
            <footer
                className="ftco-footer ftco-section Hello "

            >
                <div className="container">

                    <div className="row">
                        <div className="col-lg-3 col-md-12 ">
                            <div className="ftco-footer-widget">
                                <Link to="/" >
                                    <img
                                        className="img-fluid d-flex mb-3 justify-content-start  logoimg"
                                        style={{ filter: 'invert(1)', width: '55%' }}
                                        src={`http://localhost:5007/uploads/CompanyLogo/${CompanyDetails.logo}`}

                                    />
                                </Link>
                                <div className='my-5'>
                                    <h6 className=" my-0 text-white md:text-lg text-sm font-avenir font-semibold uppercase lg:text-left text-start">BUSINESS INQUIRIES</h6>
                                    <p className="text text-start  my-1" style={{ color: '#ffffff96', fontSize: '16px' }}>

                                        {CompanyDetails.address}

                                    </p>
                                </div>
                                <div className='my-5'>
                                    <h6 className=" my-0 text-white md:text-lg text-sm font-avenir font-semibold uppercase lg:text-left text-start">BREGISTERED ADDRESS</h6>
                                    <p className="text text-start my-1">
                                        <a
                                            className="Emaill Emailhreff text-start"
                                            style={{ color: "rgb(0 0 0 / 45%)", color: '#ffffff96', fontSize: '16px' }}
                                            href={`mailto:${CompanyDetails.email}`}
                                        >
                                            {CompanyDetails.email}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className=" col-lg-3 col-md-6 col-sm-6 col-6">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Useful Links</h2>
                                <div className="d-flex">
                                    <ul className="list-unstyled navfooterul mr-l-5 pr-l-3 mr-0">
                                        <li>
                                            <a href="Shipping-Delivery.aspx" className="py-2 navfooter d-block">
                                                Shipping Information
                                            </a>
                                        </li>
                                        <li>
                                            <a href="Cancellation-Refund.aspx" className="py-2 d-block">
                                                Return
                                            </a>
                                        </li>
                                        <li>
                                            <a href="terms-and-conditions.aspx" className="py-2 d-block">
                                                Terms &amp; Conditions
                                            </a>
                                        </li>
                                        <li>
                                            <a href="Privacy.aspx" className="py-2 d-block">
                                                Privacy Policy
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className=" col-lg-3 col-md-6 col-sm-6 col-6">
                            <div className="ftco-footer-widget mb-4">
                                <h2 className="ftco-heading-2">Useful Links</h2>
                                <div className="d-flex">
                                    <ul className="list-unstyled navfooterul mr-l-5 pr-l-3 mr-0">
                                        <li>
                                            <a href="Shipping-Delivery.aspx" className="py-2 navfooter d-block">
                                                Shipping Information
                                            </a>
                                        </li>
                                        <li>
                                            <a href="Cancellation-Refund.aspx" className="py-2 d-block">
                                                Return
                                            </a>
                                        </li>
                                        <li>
                                            <a href="terms-and-conditions.aspx" className="py-2 d-block">
                                                Terms &amp; Conditions
                                            </a>
                                        </li>
                                        <li>
                                            <a href="Privacy.aspx" className="py-2 d-block">
                                                Privacy Policy
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className=" col-lg-3 col-md-6 col-sm-6 col-6">
                            <div className="ftco-footer-widget mb-4 ml-md-5">
                                <h2 className="ftco-heading-2">Menu</h2>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="AboutUs.aspx" className="py-2 d-block">
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="Shop.aspx" className="py-2 d-block">
                                            Shop
                                        </a>
                                    </li>
                                    <li>
                                        <a href="ContactUs.aspx" className="py-2 d-block">
                                            Contact Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="Cart.aspx" className="py-2 d-block">
                                            Cart
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                       

                    </div>
                </div>
                <div
                    className="footer-bottom bg-white"
                    style={{
                        borderTop: "1px solid #c2adad",
                        paddingTop: 10,
                        paddingBottom: 10
                    }}
                >
                    <div className="container-xl container-md container-sm container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 text-left align-items-center justify-content-sm-center justify-content-md-center d-flex">
                                <p className="ex-small mb-0 text-center" style={{ marginTop: 0 }}>
                                    ©2024 {CompanyDetails.companyname} | All Rights Reserved
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

            </footer>

        </>

    )
}
