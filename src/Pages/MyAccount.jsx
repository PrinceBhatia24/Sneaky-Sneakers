import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MidSlider from '../Components/MidSlider';
import { IoHome } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import CartTable from '../Components/CartTable';
import { CartContext } from '../Context/CartContext';

export default function MyAccount() {

    const {fetchCartData } = CartContext();

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("AuthToken");
        localStorage.removeItem("UserId");
        fetchCartData()
        navigate(`/`)
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        // Check for auth token in localStorage
        const token = localStorage.getItem("AuthToken");
        if (!token) {
            navigate(`/`);
        }
    }, [navigate]);


    const [activeMenu, setActiveMenu] = useState('Dashboard');
    return (
        <>
            <MidSlider style={{ height: '402px', width: '100%', objectFit: 'cover' }} Src={"https://hypefly.co.in/images/taylor-smith.jpg"} />
            <div className='container my-5'>
                <div className='row'>
                    {/* Sidebar */}
                    <div className='col-lg-3 col-md-12 col-sm-12 col-12'>
                        <ul>
                            <li
                                className={`my-2 px-2 text-start MyAccLi ${activeMenu === 'Dashboard' ? 'MyAccLi active' : ''}`}
                                style={{ fontSize: '18px', cursor: 'pointer' }}
                                onClick={() => setActiveMenu('Dashboard')}
                            >
                                <IoHomeOutline />  Dashboard
                            </li>
                            <li
                                className={`my-2 px-2 text-start MyAccLi ${activeMenu === 'Orders' ? 'MyAccLi active' : ''}`}
                                style={{ fontSize: '18px', cursor: 'pointer' }}
                                onClick={() => setActiveMenu('Orders')}
                            >
                                <IoCartOutline />  Orders
                            </li>
                            <li
                                className={`my-2 px-2 text-start MyAccLi ${activeMenu === 'ChangePassword' ? 'MyAccLi active' : ''}`}
                                style={{ fontSize: '18px', cursor: 'pointer' }}
                                onClick={() => setActiveMenu('ChangePassword')}
                            >
                                <CiSettings />   Change Password
                            </li>
                            <li
                                className={`my-2 px-2 text-start MyAccLi ${activeMenu === 'Logout' ? 'MyAccLi active' : ''}`}
                                style={{ fontSize: '18px', cursor: 'pointer' }}
                                onClick={handleLogout}
                            >
                                <IoExitOutline />     Logout
                            </li>
                        </ul>
                    </div>

                    {/* Content Area */}
                    <div className='col-lg-8 col-md-12 col-sm-12 my-3'>
                        {activeMenu === 'Dashboard' && (
                            <div>
                                <h4 className='text-start'>Dashboard</h4>
                                <div className='my-3'>

                                    <p>Welcome to your account dashboard! Here you can manage your account details.</p>
                                </div>
                            </div>
                        )}
                        {activeMenu === 'Orders' && (
                            <div>
                                <h4 className='text-start'>Orders</h4>
                                <div className='my-4'>
                                    <CartTable />
                                </div>
                            </div>
                        )}
                        {activeMenu === 'ChangePassword' && (
                            <div>
                                <h4 className='text-start'>Change Password</h4>
                                <p>Update your password for added security.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}
