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
            <p style={{ fontSize: '0.7rem' }} className='py-2 m-0 bg-dark text-white text-center px-2'>{CompanyDetails.title}</p>
            <nav className="navbar navbar-expand-lg navbar-light position-sticky"
                style={{
                    borderBottom: "1px solid #ffffff",
                    top: 0,
                    zIndex: 1000,
                    backgroundColor: "#fff",
                    background: "linear-gradient(rgb(244 244 255 / 88%), rgb(255 255 255 / 55%))",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                }}>

                {/* Toggler for Mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasMenu"
                    aria-controls="offcanvasMenu"
                    aria-label="Toggle navigation"
                    style={{ border: 'none' }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Logo Section */}
                <div className="d-flex justify-content-start align-items-center">
                    <NavLink to="/" className="navbar-brand mx-0 d-flex">
                        <img
                            className="img-fluid"
                            style={{ width: "100%", objectFit: "contain" }}
                            src={`${window.config.CompanyLogo}/${CompanyDetails.logo}`}
                            alt="Logo"
                        />
                    </NavLink>
                </div>

                {/* Right Tools (User and Cart) */}
                <div className="navbar-tools custom-navbar-tools "><NavTools /></div>


                {/* Center Search Icon */}
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
                </div>

                {/* Right Tools (User and Cart) */}
                <div className="navbar-tools  custom-navbar-tools2"><NavTools /></div>

            </nav>

            {/* Menu Offcanvas  */}
            <div className="offcanvas offcanvas-start customoffcanvas" style={{ height: '97vh' }} tabIndex="-1" id="offcanvasMenu" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    {/* Logo Section */}
                    <div className="d-flex justify-content-start align-items-center">
                        <NavLink to="/" className="navbar-brand d-flex">
                            <img
                                className="img-fluid"
                                style={{ width: "30%", objectFit: "contain" }}
                                src={`${window.config.CompanyLogo}/${CompanyDetails.logo}`}
                                alt="Logo"
                            />
                        </NavLink>
                    </div>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>
                <div className="seprator2 my-0"></div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav">
                        {/* Home Menu */}
                        <li className="nav-item">
                            <div className="d-flex justify-content-between align-items-center">
                                <NavLink to="/" className="nav-link OffNav">
                                    Home
                                </NavLink>
                            </div>
                        </li>

                        {/* About Menu with Submenu */}
                        <li className="nav-item">
                            <div
                                className="d-flex justify-content-between align-items-center"
                                data-bs-toggle="collapse"
                                data-bs-target="#aboutSubmenu"
                                aria-expanded="false"
                                aria-controls="aboutSubmenu"
                            >
                                <NavLink to="/about" className="nav-link OffNav">
                                    About
                                </NavLink>
                                <svg
                                    style={{ width: "20px" }}
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 512 512"
                                    height="100%"
                                    width="100%"
                                    className="transition duration-300 ease transform text-heading arrow mr-4 flex justify-end items-center rotate-0"
                                >
                                    <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
                                </svg>
                            </div>
                            {/* Submenu */}
                            <ul
                                className="collapse navbar-nav navlist ps-4"
                                id="aboutSubmenu"
                                style={{ listStyle: "none" }}
                            >
                                <li className="nav-item">
                                    <NavLink to="/about/history" className="nav-link OffNav">
                                        History
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/about/team" className="nav-link OffNav">
                                        Team
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        {/* Services Menu with Submenu */}
                        <li className="nav-item">
                            <div
                                className="d-flex justify-content-between align-items-center"
                                data-bs-toggle="collapse"
                                data-bs-target="#servicesSubmenu"
                                aria-expanded="false"
                                aria-controls="servicesSubmenu"
                            >
                                <NavLink to="/services" className="nav-link OffNav">
                                    Services
                                </NavLink>
                                <svg
                                    style={{ width: "20px" }}
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 512 512"
                                    height="100%"
                                    width="100%"
                                    className="transition duration-300 ease transform text-heading arrow mr-4 flex justify-end items-center rotate-0"
                                >
                                    <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
                                </svg>
                            </div>
                            {/* Submenu */}
                            <ul
                                className="collapse navbar-nav navlist ps-4"
                                id="servicesSubmenu"
                                style={{ listStyle: "none" }}
                            >
                                <li className="nav-item">
                                    <NavLink to="/services/web" className="nav-link OffNav">
                                        Web Development
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/services/mobile" className="nav-link OffNav">
                                        Mobile Development
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="offcanvas-footer">
                    <div className="seprator2 my-0"></div>

                </div>
            </div >

            {/* Cart Offcanvas */}
            < Offcanvas />
        </>
    )
}


