import React, { useContext, useEffect, useState } from 'react'
import "../assets/CSS/Product.css"
import Carousel from 'react-bootstrap/Carousel';
import { ProductContext } from '../Context/ProductContext';
import { Link, useParams } from 'react-router-dom';
import FormatPrice from '../Helpers/FormatPrice'
import StarRating from '../Components/StarRating';
import { CartContext } from '../Context/CartContext';

export default function Prooduct() {

    const { id } = useParams()

    const { GetProductById, SingleProduct } = ProductContext()
    const { Name, Category, Colour, Description, Discount, Image1, Price, Review, SalePrice, Size, UniqueId, _id } = SingleProduct
    const { AddToCart } = CartContext();




    const [Detail, setDetail] = useState({
        Size: null,
        Color: null,
        Quantity: 1
    })

    const handleIncrement = () => {
        setDetail({
            ...Detail,
            Quantity: Detail.Quantity + 1
        });
    };
    const handleDecrement = () => {
        if (Detail.Quantity > 1) {
            setDetail({
                ...Detail,
                Quantity: Detail.Quantity - 1
            });
        }
        
    };
    const handleSizeClick = (size) => {
        setDetail({
            ...Detail,
            Size: size
        });

    };
    const handleColorClick = (Color) => {
        setDetail({
            ...Detail,
            Color: Color
        });

    };


    useEffect(() => {
        setDetail((prevDetail) => ({
            ...prevDetail,
            Size: Array.isArray(Size) && Size.length > 0 ? Size[0] : null,
            Color: Array.isArray(Colour) && Colour.length > 0 ? Colour[0] : null
        }));
    }, [SingleProduct, Size, Colour]);

    useEffect(() => {
        GetProductById(id);
    }, [id])

    return (
        <>
            <div className='container test'>
                <div className='row'>
                    <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
                        <Carousel data-bs-theme="dark" className='carousel-container'>
                            <Carousel.Item >
                                <Link to="">
                                    <img
                                        style={{ objectFit: "cover", height: "100%" }}
                                        className="d-block w-100"
                                        src={`http://localhost:5007/uploads/ProductImage/${Image1}`}

                                    />
                                </Link>

                            </Carousel.Item>

                        </Carousel>
                    </div>
                    <div className='col-lg-6 col-md-12 col-sm-12 col-12'>
                        <div className="prod_details_right_col_001">
                        <h4 className="prod_details_info my-2"> {Category}</h4>
                            <h1 className="prod_details_title">
                                {Name}
                            </h1>
                            
                            {/* <StarRating rating={3} /> */}
                            <div className="prod_details_price">
                                <div className="price_box">
                                    <h2 className="price">
                                        {<FormatPrice Price={SalePrice} />} &nbsp;
                                        <small className="del_price">
                                            {/* <del>
                                                {<FormatPrice Price={Price} />}
                                            </del> */}
                                        </small>
                                    </h2>
                                    {/* <p className="saved_price">You save: ₹4,200 (35%)</p> */}
                                    <span className="tax_txt">(Inclusive of all taxes)</span>
                                </div>
                                {/* <div className="badge">
                                    <span className="instock">
                                        <svg
                                            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                                            focusable="false"
                                            aria-hidden="true"
                                            viewBox="0 0 24 24"
                                            data-testid="DoneIcon"
                                        >
                                            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                                        </svg>{" "}
                                        In Stock
                                    </span>
                                </div> */}
                            </div>
                            <div className="seprator2" />
                            <div className="productDescription">
                                <div className="prod_details_offers">
                                    <h4 className='my-3'>Color: {Detail.Color}</h4>
                                    <ul className='m-0'>
                                        {Array.isArray(Colour) ? (
                                            Colour.map((color, index) => (
                                                <li
                                                    key={`${color}-${index}`}
                                                    className={`size-item ${Detail.Color === color ? 'selected' : ''}`}
                                                    onClick={() => handleColorClick(color)}
                                                >
                                                    {color}
                                                </li>
                                            ))
                                        ) : ''}
                                    </ul>
                                </div>

                            </div>
                            <div className="productDescription">
                                <div className="prod_details_offers">
                                    <h4 className='my-3'>Sizes: {Detail.Size}</h4>
                                    <ul className='m-0'>
                                        {Array.isArray(Size) ? (
                                            Size.map((size, index) => (
                                                <li
                                                    key={`${size}-${index}`}
                                                    className={`size-item ${Detail.Size === size ? 'selected' : ''}`}
                                                    onClick={() => handleSizeClick(size)}
                                                >
                                                    {size}
                                                </li>
                                            ))
                                        ) : ''}
                                    </ul>
                                </div>

                            </div>

                            <div className="seprator2 my-3" />
                            <div className="productDescription">
                                <div className="prod_details_offers">
                                    <h4 className='mb-3'>Quantity: {Detail.Quantity}</h4>
                                    <div className="quantity-selector mb-4">
                                        <button className="quantity-button" onClick={handleDecrement}>-</button>
                                        <span className="quantity-display">{Detail.Quantity}</span>
                                        <button className="quantity-button" onClick={handleIncrement}>+</button>
                                    </div>
                                    <ul className='m-0'>
                                        <li className='p-0 border-0'>
                                            <a
                                                data-bs-toggle="offcanvas"
                                                href="#offcanvasCart"
                                                style={{
                                                    fontSize: '17px',
                                                    padding: '8px 34px'
                                                }} onClick={() => AddToCart(id, Detail.Size, Detail.Color, Detail.Quantity, SingleProduct)} className="btn productbtn border-dark bg-dark text-white">Add To Cart</a>
                                        </li>
                                        <li className='p-0 border-0'>
                                            <button style={{
                                                fontSize: '17px',
                                                padding: '8px 34px'
                                            }} className="btn productbtn border-dark bg-dark text-white">Buy Now</button>
                                        </li>

                                    </ul>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}
