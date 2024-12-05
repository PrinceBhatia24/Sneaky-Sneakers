import React, { useEffect, useState } from 'react'
import Cards from '../Components/Cards'
import FeaturedProduct from '../Components/FeaturedProduct'
import CategoryProduct from '../Components/CategoryProduct'
import SliderCaresoul from '../Components/SliderCaresoul'
import MidSlider from '../Components/MidSlider'
import { ProductContext } from '../Context/ProductContext'
import axios from "axios";



export default function Homepage() {

    const {Category, GetProductByCategory } = ProductContext();
    const [categoryProducts, setCategoryProducts] = useState({}); // State to store products by category

    // Function to fetch products by category
    const fetchProducts = async () => {
        // debugger
        const fetchedProducts = {};
        const Res = await axios.get(`${window.config.Domain}/CategoryImages/${window.config.OrgId}`)
        const cat = Res.data.data;

        for (const category of cat) {
            const response = await GetProductByCategory(category.CategoryName);
            fetchedProducts[category.CategoryName] = response; // Store fetched data by category name
        }

        setCategoryProducts(fetchedProducts); // Update state after fetching all categories
    };


    useEffect(() => {
        window.scrollTo(0, 0)
        fetchProducts();
    }, [])
    return (
        <>
            <SliderCaresoul />
            {
                Category.map((data) => {
                    return <FeaturedProduct key={data._id}
                        Title={data.CategoryName}
                        Data={categoryProducts[data.CategoryName] || []}
                        Description={data.CategoryDetail}
                    />
                })
            }
            <CategoryProduct Title={"Shop By Category"} Description={"Explore curated fits, but never lose sight of authenticity."} />
            <div className='my-5'>
                <MidSlider Src="https://hypefly.co.in/_next/image?url=https%3A%2F%2Fdjm0962033frr.cloudfront.net%2FRUNNING_HOME_3_76fc084ade.jpg&w=2048&q=75" />
            </div>
        </>
    )
}
