import React, { useEffect } from 'react'
import "../assets/CSS/Collection.css"
import MidSlider from '../Components/MidSlider'
import Cards from '../Components/Cards'
import Form from 'react-bootstrap/Form';
import Filters from '../Components/Filters';
import { VscSettings } from "react-icons/vsc";
import Offcanvas from '../Components/Offcanvas';
import { FilterContext } from '../Context/FilterContext';
import { useSearchParams } from 'react-router-dom';
import EmptyCart from '../Components/EmptyCart';

export default function Collections() {
    const { Sorting, GetProductByCollectionId, FilteredProducts } = FilterContext();

    const [searchParams] = useSearchParams();
    const Category = searchParams.get('Category');

    useEffect(() => {
        window.scrollTo(0, 0)
        if (Category) {
            GetProductByCollectionId(Category);
        }

    }, [Category])


    return (
        <>
            <Offcanvas />
            <MidSlider  Src={"https://hypefly.co.in/_next/image?url=https%3A%2F%2Fdjm0962033frr.cloudfront.net%2FALL_SNEAKERS_142c1e9b0a.webp&w=3840&q=75"} />
            <div className='container-fluid'>
                <div className='row px-0'>
                    <div className='col-lg-2 col-md-3 my-5 filterSticky px-2'>
                        <Filters />
                    </div>
                    <div className='col-lg-10 col-md-9 col-sm-12 col-12 my-5'>
                        <div className='d-flex justify-content-between row'>
                            <div className='col-lg-4 col-md-6 col-sm-6 col-6 card-grd my-1'>

                                <h1 className='AllSneakersHide'>All Sneakers</h1>
                                <a className="btn mobfilbtn border-dark text-dark">
                                    <div className='d-flex align-items-center' data-bs-toggle="offcanvas" href="#offcanvasFilter">
                                        <VscSettings />
                                        <span className='mx-1'> Filter</span>
                                    </div>
                                </a>
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-3 col-3 card-grd my-1'>
                                <Form.Select size="sm" id="Sort" onChange={Sorting} aria-label="Default select example">
                                    <option>Sort By</option>
                                    <option value="Lowest">Price: Low To High</option>
                                    <option value="Highest">Price: High To Low</option>
                                    <option value="A-Z">Alphabetically, A-Z</option>
                                    <option value="Z-A">Alphabetically, Z-A</option>
                                </Form.Select>
                            </div>


                        </div>
                        <div className="card-grid my-5">
                            {FilteredProducts.length > 0 ? (
                                FilteredProducts.map((Data, index) => {
                                    return <Cards key={Data._id} Data={Data} />
                                })
                            ) : (
                                <EmptyCart Title="No Product Found" />

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}