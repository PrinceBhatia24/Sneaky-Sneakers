import React from 'react'
import Cards from './Cards'
import TitleHeader from './TitleHeader';

import { Link } from 'react-router-dom';


export default function FeaturedProduct({ Title, Description, Data }) {


    return (
        <>
            <div className='my-5'>
                <TitleHeader Title={Title} Description={Description} />
                <div className="card-grid my-5 px-2">
                    {Data.map((Data, index) =>
                        index < 5 && <Cards key={Data._id} Data={Data} />
                    )}
                </div>
                <div>
                    <Link to="/Collections" className="btn border-dark text-dark">View All</Link>
                </div>
            </div>
        </>


    )
}
