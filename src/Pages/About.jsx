import React from 'react'
import { CompanyDetailsContext } from '../Context/ComapnyDetailsContext'

export default function About() {
    const { CompanyDetails } = CompanyDetailsContext()
    return (
        <>
            <div className='container my-5'>
                <div className="flex flex-col w-full text-center justify-center items-center lg:mb-20 lg:mt-0 my-12">
                    <p className="text-[#4A5568] font-semibold lg:text-lg ">
                        SneakySneakers INDIA
                    </p>
                    <h1 className="font-extrabold text-black lg:text-4xl text-center  text-3xl lg:mt-2 mt-1.5">
                        ABOUT US
                    </h1>
                    <div className="flex flex-col lg:my-12 my-6 w-full justify-center my-5 items-center">
                        <p className='text-justify'>
                            SneakySneakers India Products Private Limited is your go-to place for all things
                            sneaker and streetwear. Whether you eat, sleep and breathe sneakers or are
                            just looking to up your streetwear game, we have something in store for
                            everyone.
                        </p>
                        <p className='text-justify'>
                            Founded in 2019 we hope to bring you the freshest brands, in premium
                            quality, from across the world straight to the comfort of your home.
                        </p>
                            <p className='text-justify'>
                            At SneakySneakers India, legitimacy is one aspect we never forgo. Our team is
                            dedicated to giving you the best service in the business. Customer
                            relationships are of utmost importance to us, we would love to connect
                            with you, don’t hesitate to reach out to us!
                        </p>
                    </div>
                    <a
                        className="inline-flex focus:outline-none md:w-80 md:h-40 h-20 w-80 relative"
                        href="/"
                    >
                        
                         <img
                            className="img-fluid"
                            style={{ objectFit: "contain" }}
                            src={`${window.config.CompanyLogo}/${CompanyDetails.logo}`}
                            alt="Logo"
                        />
                    </a>
                </div>

            </div>
        </>
    )
}
