import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CompanyDetailsContext } from '../Context/ComapnyDetailsContext';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import Offcanvas from './Offcanvas';

import NavTools from './NavTools';


export default function Header() {

    const { CompanyDetails } = CompanyDetailsContext()

    return (
        <>
            <p style={{ fontSize: '0.7rem' }} className='py-2 m-0 bg-dark text-white text-center'>{CompanyDetails.title}</p>
            <nav className="navbar navbar-expand-lg position-sticky navbar-light bg-light px-3" style={{
                borderBottom: '1px solid #ffffff',
                top: 0,
                zIndex: 1000,
                backgroundColor: '#fff',
                background: 'linear-gradient(rgb(244 244 255 / 88%), rgb(255 255 255 / 55%))',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'

            }} >

                <NavLink to="/" className="navbar-brand justify-content-start d-flex " >
                    <img className='img-fluid align-items-center my-1' style={{ width: '50%', }} src={`http://localhost:5007/uploads/CompanyLogo/${CompanyDetails.logo}`} />
                </NavLink>


                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className="nav-link">
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/services" className="nav-link">
                                Services
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/contact" className="nav-link">
                                Contact
                            </NavLink>
                        </li>
                    </ul>

                    <div className="navbar-tools d-flex">
                        <NavTools />
                    </div>
                </div>
            </nav>

            {/* Cart Offcanvas */}
            <Offcanvas />
        </>
    )
}
