import React from 'react'
import FormatPrice from '../Helpers/FormatPrice'
import { Link } from 'react-router-dom';

export default function Cards(props) {
    const { Name, Image1, SalePrice, Price, _id } = props.Data
    return (
        <>
            <div className="card-container" >
                <Link to={`/Product/${_id}`}>
                    <div className="card">
                        <div className="position-relative">
                            <span className="sale-badge">SALE</span>
                            <img
                                src={`http://localhost:5007/uploads/ProductImage/${Image1}`}
                                
                                className="card-img-top"
                                alt="Yeezy Foam Runner"
                            />
                            
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{Name}</h5>
                            <p className="mb-1">
                                <span className="price">{<FormatPrice Price={SalePrice} />}</span>
                                <span className="old-price">{<FormatPrice Price={Price} />}</span>
                            </p>
                        </div>
                    </div>
                </Link>

            </div>
        </>
    )
}