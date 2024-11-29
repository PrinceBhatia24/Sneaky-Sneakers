import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import Modal from 'react-bootstrap/Modal';
import { FilterContext } from '../Context/FilterContext';
import { CompanyDetailsContext } from '../Context/ComapnyDetailsContext';
import { CartContext } from '../Context/CartContext';
import FormatPrice from '../Helpers/FormatPrice'
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import EmptyCart from './EmptyCart';


export default function NavTools() {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const toggleRegister = () => {
        setIsRegister(!isRegister);
        setErrors({ login: {}, register: {} }); // Clear errors on toggle
    };


    // State for Login inputs
    const [loginInputs, setLoginInputs] = useState({
        email: "",
        password: "",
    });

    // State for Registration inputs
    const [registerInputs, setRegisterInputs] = useState({
        name: "",
        email: "",
        password: "",
    });


    // Validation Errors
    const [errors, setErrors] = useState({
        login: {},
        register: {},
    });


    // Function to handle input changes for Login form
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginInputs({ ...loginInputs, [name]: value });
        setErrors({ ...errors, login: {} }); // Clear errors as the user types
    };

    // Function to handle input changes for Registration form
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterInputs({ ...registerInputs, [name]: value });
        setErrors({ ...errors, register: {} }); // Clear errors as the user types
    };

    // Helper function to validate email
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };


    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!loginInputs.email) {
            newErrors.email = "Email is required.";
        } else if (!validateEmail(loginInputs.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!loginInputs.password) {
            newErrors.password = "Password is required.";
        } else if (loginInputs.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors({ ...errors, login: newErrors });
        } else {
            LoginUser();
        }
    };

    // Registration form submission handler
    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!registerInputs.name) {
            newErrors.name = "Name is required.";
        }

        if (!registerInputs.email) {
            newErrors.email = "Email is required.";
        } else if (!validateEmail(registerInputs.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!registerInputs.password) {
            newErrors.password = "Password is required.";
        } else if (registerInputs.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors({ ...errors, register: newErrors });
        } else {
            RegisterUser()
        }
    };

    const UserIdGenerator = () => {
        const UserId = Math.floor(Math.random() * 10000);
        const Userid = `SNEAK${UserId}`
        return Userid;
    }

    const RegisterUser = async () => {
        try {
            const { name, email, password } = registerInputs;
            const res = await fetch(`${window.config.Domain}/Registration`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    OrgId: window.config.OrgId,
                    UserId: UserIdGenerator(),
                    name,
                    email,
                    password,
                }),
            });

            // Parse response
            const data = await res.json();

            if (!res.ok) {
                console.error("Error:", data);
                alert(`Registration failed: ${data || "Unknown error"}`);
            } else {
                console.log("Success:", data);
                alert("Registration successful!");

                // Clear form inputs
                setRegisterInputs({
                    name: "",
                    email: "",
                    password: "",
                });
                toggleRegister();
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    };

    const LoginUser = async () => {
        const { email, password } = loginInputs
        const res = await fetch(`${window.config.Domain}/LoginUser`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })

        const data = await res.json();

        if (res.status != 200) {
            alert(data.message);
        }

        else if (res.status === 200) {
            localStorage.setItem("AuthToken", data.token);
            navigate(`/MyAccount`)
            handleClose2();
            setLoginInputs({
                email: "",
                password: "",
            });
        }
    };



    const { FilteredProducts, Filter: { Search }, UpdateFilterValue } = FilterContext()
    const { TotalItem } = CartContext();
    const { CompanyDetails } = CompanyDetailsContext()


    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);


    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => setShow(true);
    const handleLoginShow = () => setShow2(true);

    const handleLoginNavigation = () => {

        const token = localStorage.getItem("AuthToken");
        if (token) {
            // navigate(`/MyAccount`)
            window.location.href = "/MyAccount";
        }
        else {
            handleLoginShow();
        }
    };
    const highlightText = (text, searchTerm) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi'); // Case-insensitive match
        return text.split(regex).map((part, index) =>
            regex.test(part) ? <span key={index} className="highlight">{part}</span> : part
        );
    };


    

    return (
        <>
            <div className="navbar-tools d-flex">
                <a className="nav-link" onClick={handleShow}>
                    <span style={{ cursor: 'pointer' }}>
                        <FaSearch />
                    </span>
                </a>
                <NavLink className="nav-link" onClick={handleLoginNavigation}>
                    <span style={{ cursor: 'pointer' }}>
                        <FaUser />
                    </span>
                </NavLink>

                <a data-bs-toggle="offcanvas" href="#offcanvasCart" className="nav-link position-relative"><FaShoppingCart /> <span className="MaincartItemCount">{TotalItem}</span></a>
            </div>


            {/* Search Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Body className='py-0' style={{ height: '0' }} >
                    <form className="search-container mx-0 my-3 d-flex" onSubmit={(e) => { e.preventDefault }}>
                        <CiSearch className='m-auto' style={{ fontSize: '1.5rem' }} />
                        <input
                            className='w-100 border-0 text-dark'
                            type="text"
                            id="search-bar"
                            name="Search"
                            value={Search}
                            onChange={UpdateFilterValue}
                            placeholder="Search Product"
                        />
                    </form>

                </Modal.Body>
                <Modal.Footer style={{
                    position: 'relative',
                    top: '50px',
                    backgroundColor: '#ffffff',
                    maxHeight: '390px',
                    overflowY: 'scroll',
                    justifyContent: 'center'
                }} className='mt-3'>
                    {FilteredProducts.length > 0 ? (
                        FilteredProducts.map((Data, index) => {
                            return <Link show={show} key={{ index }} onClick={handleClose} to={`/Product/${Data._id}`}>
                                <div className="row mb-4">
                                    <div className="col-2 position-relative py-1">
                                        <img
                                            className="img-fluid CartImg"
                                            src={`http://localhost:5007/uploads/ProductImage/${Data.Image1}`}
                                            style={{ height: "100%", objectFit: "contain", border: "none" }}
                                        />
                                    </div>
                                    <div className="col-10 mt-3">
                                        <a href="/Product/6737530a4d306c9cdd56fcc5">
                                            <p className="PName">
                                                {/* {Data.Name} */}
                                                {highlightText(Data.Name, Search)}
                                            </p>

                                            <p className="PriceList mt-2 mx-1">{<FormatPrice Price={Data.SalePrice} />}</p>
                                        </a>

                                    </div>
                                </div>
                            </Link>
                        })
                    ) : (
                        <EmptyCart Title="No Product Found" />
                    )}
                </Modal.Footer>

            </Modal >

            {/* Login/Register Modal */}
            <Modal id="LoginModal" show={show2} onHide={handleClose2} centered>
                <Modal.Body className='p-0' >
                    <div className="container-fluid">
                        <div className="row">

                            <div className="col-md-6 image-section" />

                            <div className="col-md-6 form-section">
                                <div className="form-container text-center">

                                    <img className='img-fluid align-items-center my-3   ' style={{ width: '35%', }} src={`http://localhost:5007/uploads/CompanyLogo/${CompanyDetails.logo}`} />
                                    {!isRegister ? (
                                        // Login Form
                                        <>
                                            <p className="my-3">Login with your email & password</p>
                                            <form onSubmit={handleLoginSubmit}>
                                                <div className="my-3">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={loginInputs.email}
                                                        onChange={handleLoginChange}
                                                        className="form-control"
                                                        placeholder="Email"
                                                    />
                                                    {errors.login.email && (
                                                        <small className="text-danger text-start d-block">{errors.login.email}</small>
                                                    )}
                                                </div>
                                                <div className="my-3 input-group">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={loginInputs.password}
                                                        onChange={handleLoginChange}
                                                        className="form-control"
                                                        placeholder="Password"
                                                    />

                                                    <span className="input-group-text">
                                                        <i className="bi bi-eye" />
                                                    </span>
                                                </div>
                                                {errors.login.password && (
                                                    <small className="text-danger text-start d-block">{errors.login.password}</small>
                                                )}
                                                <div className="d-flex justify-content-between mb-3">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id="rememberMe"
                                                        />
                                                        <label className="form-check-label" htmlFor="rememberMe">
                                                            Remember me
                                                        </label>
                                                    </div>
                                                    <a href="#" className="text-decoration-none">
                                                        Forgot password?
                                                    </a>
                                                </div>
                                                <button type="submit" className="btn btn-dark w-100">
                                                    Login
                                                </button>
                                                <div className="text-center my-3">Or</div>
                                                <p className="text-center">
                                                    Don't have any account?{' '}
                                                    <span
                                                        className="text-decoration-none text-primary"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={toggleRegister}
                                                    >
                                                        Register
                                                    </span>
                                                </p>
                                            </form>
                                        </>
                                    ) : (
                                        // Register Form
                                        <>
                                            <p className="my-3">Create your account now and join the community!</p>
                                            <form onSubmit={handleRegisterSubmit}>
                                                <div className="my-3">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={registerInputs.name}
                                                        onChange={handleRegisterChange}
                                                        className="form-control"
                                                        placeholder="Name"
                                                    />
                                                    {errors.register.name && (
                                                        <small className="text-danger text-start d-block">{errors.register.name}</small>
                                                    )}

                                                    {/* {errors.name && <div className="invalid-feedback">{errors.name}</div>
                                                    } */}

                                                </div>
                                                <div className="my-3">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={registerInputs.email}
                                                        onChange={handleRegisterChange}
                                                        className="form-control"
                                                        placeholder="Email"
                                                    />
                                                    {errors.register.email && (
                                                        <small className="text-danger text-start d-block">{errors.register.email}</small>
                                                    )}

                                                </div>
                                                <div className="my-3 input-group">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        value={registerInputs.password}
                                                        onChange={handleRegisterChange}
                                                        className="form-control"
                                                        placeholder="Password"
                                                    />
                                                    <span className="input-group-text">
                                                        <i className="bi bi-eye" />
                                                    </span>

                                                </div>
                                                {errors.register.password && (
                                                    <small className="text-danger text-start d-block">{errors.register.password}</small>
                                                )}

                                                <button type="submit" className="btn btn-dark w-100">
                                                    Register
                                                </button>
                                                <div className="text-center my-3">Or</div>
                                                <p className="text-center">
                                                    Already have an account?{' '}
                                                    <span
                                                        className="text-decoration-none text-primary"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={toggleRegister}
                                                    >
                                                        Login
                                                    </span>
                                                </p>
                                            </form>
                                        </>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                </Modal.Body>

            </Modal>
        </>
    )
}
