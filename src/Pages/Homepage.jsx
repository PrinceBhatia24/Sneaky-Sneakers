import React, { useEffect } from 'react'
import Cards from '../Components/Cards'
import FeaturedProduct from '../Components/FeaturedProduct'
import CategoryProduct from '../Components/CategoryProduct'
import SliderCaresoul from '../Components/SliderCaresoul'
import MidSlider from '../Components/MidSlider'



export default function Homepage() {
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])
    return (
        <>
            <SliderCaresoul />
            <FeaturedProduct Title={"Sneakers"} Description={"Explore curated fits, but never lose sight of authenticity."} />
            <CategoryProduct Title={"Shop By Category"} Description={"Explore curated fits, but never lose sight of authenticity."} />
            <div className='my-5'>
            <MidSlider Src="https://hypefly.co.in/_next/image?url=https%3A%2F%2Fdjm0962033frr.cloudfront.net%2FRUNNING_HOME_3_76fc084ade.jpg&w=2048&q=75" />
            </div>
        </>
    )
}
