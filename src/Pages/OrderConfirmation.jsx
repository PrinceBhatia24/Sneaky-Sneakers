import React, { useEffect } from "react";
import { CompanyDetailsContext } from "../Context/ComapnyDetailsContext";
import { Link, useParams } from 'react-router-dom';

export default function OrderConfirmation() {
    const { CompanyDetails } = CompanyDetailsContext();
    const { id } = useParams()

    const ConfirmationMail = async () => {
        const res = await fetch(`${window.config.Domain}/OrderConfirmationMail/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json();

        if (res.status != 200) {
            // console.log(data);
        }
        else if (res.status == 200) {
            // console.log(data);

        }
    };
    useEffect(() => {
        ConfirmationMail();
    }, [id])


    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="container text-center py-5 ">
                    {/* Logo */}
                    <div className="mb-4">
                        <img style={{ width: '20%' }}
                            src={`${window.config.CompanyLogo}/${CompanyDetails.logo}`}
                        />
                    </div>

                    {/* Thanks Message */}
                    <div className="mb-4">

                        <img style={{ width: '40%' }} src="https://d3k81ch9hvuctc.cloudfront.net/company/bVvvBe/images/5fdf112d-9b22-412a-8546-da9d2240489d.jpeg"></img>
                        <p className="text-muted my-2">Hey Prince,</p>
                    </div>

                    {/* Order Details */}
                    <p className="mb-3" style={{ fontSize: '14px' }}>
                        Your HyperFly order
                        <span className="text-danger fw-bold"> R123456789 </span>
                        has successfully been placed. You'll find all the details about your order below, and we'll send you a shipping confirmation email as soon as your order ships. In the meantime, you can Check Our New Collections
                        <Link to="/Collections" className="text-decoration-none text-warning"> Here</Link>
                    </p>

                </div>
            </div >
        </>
    );
}

