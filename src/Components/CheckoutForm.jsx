import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';


export default function CheckoutForm() {
    const navigate = useNavigate();
    

    const { Cart, CartTotal, ShippingCharges } = CartContext();
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        pincode: '',
    });
    const OrderIdGenerator = () => {
        const orderid = Math.floor(Math.random() * 10000);
        const OrderId = `#SNEAK${orderid}`
        return OrderId;
    }

    const OrderItem = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5007/SetOrderedItems", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ShippingDetail: formData, OrderDetails: Cart, OrgId: window.config.OrgId, OrderId: OrderIdGenerator(), TotalPaid: CartTotal + ShippingCharges
            })
        })
        const data = await res.json();
        if (res.status != 200) {
            console.log("Something Went Wrong");
        }
        else if (res.status === 200) {
            
            const clearform = () => {
                setFormData({
                    email: '',
                    phone: '',
                    firstName: '',
                    lastName: '',
                    address1: '',
                    address2: '',
                    city: '',
                    state: '',
                    pincode: '',
                })
            }
            clearform();
            navigate(`/OrderConfirmation/${data.order._id}`)

        }

    }


    const [errors, setErrors] = useState({});

    const validate = () => {
        let formErrors = {};

        if (!formData.email) {
            formErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email is invalid';
        }

        if (!formData.phone) {
            formErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            formErrors.phone = 'Phone number must be 10 digits';
        }
        if (!formData.firstName.trim()) {
            formErrors.firstName = 'First name is required.';
        }
        if (!formData.lastName.trim()) {
            formErrors.lastName = 'Last name is required.';
        }

        if (!formData.address1) {
            formErrors.address1 = 'Address is required';
        }

        if (!formData.city) {
            formErrors.city = 'City is required';
        }

        if (!formData.state) {
            formErrors.state = 'State is required';
        }

        if (!formData.pincode) {
            formErrors.pincode = 'ZIP code is required';
        } else if (!/^\d{5,6}$/.test(formData.pincode)) {
            formErrors.pincode = 'ZIP code must be 5-6 digits';
        }



        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone' && value.length > 10) return;
        if (name === 'zip' && value.length > 5) return;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            OrderItem(e);
        }
    };


    const handleKeyPress = (e) => {
        const { name, key } = e;

        // Prevent numbers and special characters in first name, last name, and city
        if (['firstName', 'lastName', 'city'].includes(name) && !/^[a-zA-Z\s]$/.test(key)) {
            e.preventDefault();
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <p className='text-start'>Contact Information</p>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="d-block text-start fw-bold">Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                />
                <Form.Control.Feedback className='text-start' type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label className="d-block text-start fw-bold">Phone Number</Form.Label>
                <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onKeyPress={(e) => !/[\d]/.test(e.key) && e.preventDefault()} // Allow only digits
                    isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback className='text-start' type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>

            <Row className="mb-3">
                <p className='text-start'>Shipping Address</p>
                <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label className='text-start d-block fw-bold'>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback className='text-start' type="invalid">{errors.firstName}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Label className='text-start d-block fw-bold'>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onKeyPress={handleKeyPress}
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback className='text-start' type="invalid">{errors.lastName}</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label className="text-start d-block fw-bold">Apartment, Suite, etc</Form.Label>
                <Form.Control
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    isInvalid={!!errors.address1}
                />
                <Form.Control.Feedback className='text-start' type="invalid">{errors.address1}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label className="text-start d-block fw-bold">Street, Area, etc</Form.Label>
                <Form.Control
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label className="text-start d-block fw-bold">City</Form.Label>
                    <Form.Control
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        isInvalid={!!errors.city}
                    />
                    <Form.Control.Feedback className='text-start' type="invalid">{errors.city}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label className="text-start d-block fw-bold">State</Form.Label>
                    <Form.Select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        isInvalid={!!errors.state}
                    >
                        <option value="">--Select State--</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Maharashtra">Maharashtra</option>
                        {/* Add other states here */}
                    </Form.Select>
                    <Form.Control.Feedback className='text-start' type="invalid">{errors.state}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label className="text-start d-block fw-bold">ZIP</Form.Label>
                    <Form.Control
                        name="pincode"
                        value={formData.zip}
                        onChange={handleChange}
                        onKeyPress={(e) => !/[\d]/.test(e.key) && e.preventDefault()} // Allow only digits
                        isInvalid={!!errors.zip}
                    />
                    <Form.Control.Feedback className='text-start' type="invalid">{errors.zip}</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Button
                variant="primary"
                type="submit"
                // onClick={OrderItem}
                className="d-flex mt-2 text-end justify-content-end btn border-dark text-white bg-dark"
            >
                Proceed To Payment
            </Button>

        </Form>
    );
}


// {
//     "ShippingDetail": {
//       "email": "example@example.com",
//       "phone": "1234567890",
//       "firstName": "John",
//       "lastName": "Doe",
//       "address1": "123 Main St",
//       "address2": "Apt 4B",
//       "city": "New York",
//       "state": "NY",
//       "pincode": "10001"
//     },
//     "OrderDetails": [
//       {
//         "id": "673752b64d306c9cdd56fcc0-UK5-Red",
//         "Category": "Sneakers",
//         "Price": "6999",
//         "Name": "Yeezy Foam Runner 'Onyx'",
//         "Image": "1731410592632image (2).webp",
//         "Size": "UK5",
//         "Color": "Red",
//         "Quantity": 1,
//         "Total": 6999
//       }
//     ],
//     "OrgId": "org123"
//   }
