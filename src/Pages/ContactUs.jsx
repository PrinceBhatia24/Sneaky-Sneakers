import React, { useState, useEffect } from 'react'
import { CompanyDetailsContext } from '../Context/ComapnyDetailsContext';
import { UserDetailsContext } from '../Context/UserDetails';

export default function ContactUs() {
    const { CompanyDetails } = CompanyDetailsContext()
    const { User } = UserDetailsContext()


    // Function to handle input changes for Registration form
    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactForm({ ...ContactForm, [name]: value });
        setErrors({ ...errors, contact: {} }); // Clear errors as the user types
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            ContactSubmit(e);
        }
    };
    const validate = () => {

        let conatctErrors = {}
        if (!ContactForm.email) {
            conatctErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(ContactForm.email)) {
            conatctErrors.email = 'Email is invalid';
        }

        if (!ContactForm.name.trim()) {
            conatctErrors.name = 'First name is required.';
        }
        if (!ContactForm.message) {
            conatctErrors.message = 'Message is required';
        }

        setErrors(conatctErrors);
        return Object.keys(conatctErrors).length === 0;
    };

    const ContactSubmit = async (e) => {
        e.preventDefault();
        const UserId = localStorage.getItem("UserId");
        const res = await fetch(`${window.config.Domain}/Feedback/${window.config.OrgId}/${UserId}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name: ContactForm.name,
                email: ContactForm.email,
                message: ContactForm.message
            })
        })
        const data = await res.json();
        if (res.status != 200) {
            console.log("Something Went Wrong");
        }
        else if (res.status === 200) {
            const clearform = () => {
                setContactForm({
                    message: '',
                })
            }
            clearform();
        }

    }

    // State for ContactForm inputs
    const [ContactForm, setContactForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    useEffect(() => {
        setContactForm((prevState) => ({
            ...prevState,
            name: User.name,
            email: User.email,
        }))
    },[User])

    const [errors, setErrors] = useState({
        contact: {},
    });

    return (
        <div className="container my-5" >
            <div className="row ">

                <div className="col-md-4 image-section imghide" />

                <div className="col-md-8 form-section px-1">
                    <div className="form-container text-center">

                        <img className='img-fluid align-items-center my-3   ' style={{ width: '25%', }}
                            src={`${window.config.CompanyLogo}/${CompanyDetails.logo}`}
                        />

                        <h3 className="my-3">Do you have any question?</h3>
                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className='col-6'>
                                    <div className="my-3">
                                        <input
                                            disabled
                                            type="text"
                                            name="name"
                                            value={ContactForm.name}
                                            onChange={handleContactChange}
                                            className="form-control"
                                            placeholder="Name"
                                        />
                                        {errors.name && (
                                            <small className="text-danger text-start d-block">{errors.name}</small>
                                        )}

                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className="my-3">
                                        <input
                                            disabled
                                            type="email"
                                            name="email"
                                            value={ContactForm.email}
                                            onChange={handleContactChange}
                                            className="form-control"
                                            placeholder="Email"
                                        />
                                        {errors.email && (
                                            <small className="text-danger text-start d-block">{errors.email}</small>
                                        )}

                                    </div>
                                </div>
                            </div>


                            <div className="my-3 input-group">
                                <textarea
                                    name="message"
                                    value={ContactForm.message}
                                    onChange={handleContactChange}
                                    className="form-control"
                                    placeholder="Message"
                                    rows="4" // Adjust the number of rows as needed
                                />

                            </div>
                            {errors.message && (
                                <small className="text-danger text-start d-block">{errors.message}</small>
                            )}

                            <button type="submit" className="btn btn-dark py-3 my-3 w-100">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
