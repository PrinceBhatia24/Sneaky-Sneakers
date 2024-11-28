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
                                src={`${window.config.SliderImages}/${Data.img}`}
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

