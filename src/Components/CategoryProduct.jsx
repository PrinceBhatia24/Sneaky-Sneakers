import React from 'react'
import TitleHeader from './TitleHeader'
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { ProductContext } from '../Context/ProductContext';
import { Link } from 'react-router-dom';

export default function CategoryProduct({ Title, Description }) {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const { Category } = ProductContext();


    return (
        <>
            <div className='my-5'>
                <TitleHeader Title={Title} Description={Description} />
                <div className='container my-5'>
                    <Carousel responsive={responsive} >
                        {Category.map((Data) => {
                            return <Link key={Data._id} to={`/Collections?CollName=${Data.CategoryName}`}>
                                <div className='col OverFlowHidden position-relative borderradius'>  <img className="img-fluid Imgg"
                                    src={`http://localhost:5007/uploads/CategoryImages/${Data.CategoryImage}`}
                                    alt={Data.CategoryName} />
                                    <div className="image-text-overlay">{Data.CategoryName}</div>
                                </div>
                            </Link>

                        })}
                    </Carousel>
                </div>

                <div>
                    <Link to="/Collections" className="btn border-dark text-dark">View All</Link>
                </div>
            </div>
        </>
    )
}
