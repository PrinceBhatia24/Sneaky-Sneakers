import React from 'react'
import Cards from './Cards'
import TitleHeader from './TitleHeader';
import { ProductContext } from '../Context/ProductContext';
import { Link } from 'react-router-dom';


export default function FeaturedProduct({ Title, Description }) {

    const { Product } = ProductContext();



    return (
        <div className='my-5'>
            <TitleHeader Title={Title} Description={Description} />
            <div className="card-grid my-5 px-2">
                {Product.map((Data, index) =>
                    index < 5 && <Cards key={Data._id} Data={Data} />
                )}
            </div>
            <div>
                <Link to="/Collections" className="btn border-dark text-dark">View All</Link>
            </div>
        </div>

    )
}
