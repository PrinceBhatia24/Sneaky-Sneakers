import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { ProductContext } from '../Context/ProductContext';
import { Link } from 'react-router-dom';

export default function SliderCaresoul() {
    const { Slider } = ProductContext();

    return (
        <>
            <Carousel data-bs-theme="dark">
                {Slider.map((Data) => {
                    return <Carousel.Item key={Data._id}>
                        <Link to="">
                            <img
                                style={{ objectFit: "cover", height: "100%" }}
                                className="d-block w-100"
                                src={`http://localhost:5007/uploads/SliderImages/${Data.img}`}
                                alt={Data.name}
                            />
                        </Link>
                        <Carousel.Caption>
                            <h5>{Data.name}</h5>
                            <p>{Data.caption}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                })}

            </Carousel>
        </>
    )
}


// const FeaturedProduct = [

//     {
//         Name: "",
//         Image: "https://hypefly.co.in/_next/image?url=https%3A%2F%2Fdjm0962033frr.cloudfront.net%2FMOCHA_DESK_97a55d338a.webp&w=2048&q=75",
//     },
//     {
//         Name: "",
//         Image: "https://hypefly.co.in/_next/image?url=https%3A%2F%2Fdjm0962033frr.cloudfront.net%2FMEDIUM_OLIVE_TS_1_2561b62edc.webp&w=2048&q=75",
//     }

// ];
