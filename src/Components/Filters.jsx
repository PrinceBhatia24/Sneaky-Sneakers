import React, { useEffect, useState } from 'react'
import "../assets/CSS/Collection.css"
import { MdKeyboardArrowDown } from "react-icons/md";
import Collapse from 'react-bootstrap/Collapse';
import CatlogPriceFilter from './CatlogPriceFilter';
import { FilterContext } from '../Context/FilterContext';



export default function Filters() {
    const { FilteredProducts, AllProduct, SortingValue, Filter: { Search }, UpdateFilterValue } = FilterContext()

    const [openSections, setOpenSections] = useState({
        collections: false,
        brands: false,
        Color: false,
        Size: false,
        price: true,
    });
    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };


    const UniqueValues = (Data, Property) => {
        let UniqueValue = Data.map((Current) => {
            return Current[Property]
        })
        if (Property === "Colour") {
            return [...new Set([].concat(...UniqueValue))]
        }
        if (Property === "Size") {
            return [...new Set([].concat(...UniqueValue))]
        }
        return UniqueValue = [...new Set(UniqueValue)]
    }
    const CategoryFilter = UniqueValues(AllProduct, "Category")
    const SizeFilter = UniqueValues(AllProduct, "Size")
    const ColorFilter = UniqueValues(AllProduct, "Colour")



    return (
        <>
            <h1>Filters</h1>
            {SortingValue ? <ul className="m-0 filter">
                <li className="size-item"> {SortingValue} {SortingValue ? <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="18px" width="18px" className="w-4 h-4 text-body ml-2 flex-shrink-0 -mr-0.5 transition duration-200 ease-in-out group-hover:text-heading"><path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path></svg> : ""} </li>
            </ul> : <ul className="m-0 filter">
                <li className="size-item"> All Sneakers <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="18px" width="18px" className="w-4 h-4 text-body ml-2 flex-shrink-0 -mr-0.5 transition duration-200 ease-in-out group-hover:text-heading"><path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path></svg></li>
            </ul >}
            <div className="seprator2"></div>
            <form className="search-container my-3" onSubmit={(e) => { e.preventDefault }}>
                <input
                    type="text"
                    id="search-bar"
                    name="Search"
                    value={Search}
                    onChange={UpdateFilterValue}
                    placeholder="Search Product"
                />

            </form>

            <div className="seprator2"></div>
            <div className="OverFlowSidebar">

                <div className="BorderTop mt-3">
                    <div
                        onClick={() => toggleSection('collections')}
                        className="d-flex justify-content-between cormorantfont"
                        style={{ cursor: "pointer" }}>
                        <p className=" mt-3" style={{ cursor: "pointer" }}>
                            Collections
                        </p>
                        <span className="align-items-center d-flex me-2">
                            <MdKeyboardArrowDown />
                        </span>
                    </div>
                    <Collapse in={openSections.collections}>
                        <div id="example-collapse-text">
                            <ul
                                className="p-0 pf m-0 initclose CollectionFilter ">
                                {/* {Categories.map((Data) => {
                                    return <li key={Data._id} className="my-4">
                                        <div className="form-group d-flex align-items-center justify-content-between d-flex">
                                            <label className="group d-flex flex items-center text-heading text-sm cursor-pointer">
                                                <input type="checkbox" className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading checked:hover:bg-heading checked:focus:bg-heading" name="adidas" value="Adidas" />
                                                <span className="ms-2 mt-0.5 filer_content">{Data.CategoryName}</span>
                                                <span className="ms-2 mt-0.5 filer_content">(190)</span>
                                            </label>

                                        </div>
                                    </li>
                                })} */}
                                {CategoryFilter.map((Data, index) => {
                                    return <button type="text"
                                        key={index}
                                        className='d-block my-2'
                                        style={{
                                            border: 'none',
                                            backgroundColor: 'white'
                                        }}
                                        name="Category"
                                        value={Data}
                                        onClick={UpdateFilterValue}>
                                        {Data}
                                    </button>
                                })}

                            </ul>
                        </div>
                    </Collapse>

                </div >
                <div className="BorderTop mt-3">
                    <div
                        onClick={() => toggleSection('Size')}
                        className="d-flex justify-content-between cormorantfont"
                        style={{ cursor: "pointer" }}>
                        <p className=" mt-3" style={{ cursor: "pointer" }}>
                            Size
                        </p>
                        <span className="align-items-center d-flex me-2">
                            <MdKeyboardArrowDown />
                        </span>
                    </div>
                    <Collapse in={openSections.Size}>
                        <div id="example-collapse-text">
                            <ul
                                className="p-0 pf m-0 initclose CollectionFilter ">
                                {SizeFilter.map((Data, index) => {
                                    return <button type="text"
                                        key={index}
                                        className='d-block my-2'
                                        style={{
                                            border: 'none',
                                            backgroundColor: 'white'
                                        }}
                                        name="Size"
                                        value={Data}
                                        onClick={UpdateFilterValue}>
                                        {Data}
                                    </button>
                                })}

                            </ul>
                        </div>
                    </Collapse>

                </div>
                <div className="BorderTop mt-3">
                    <div
                        onClick={() => toggleSection('Color')}
                        className="d-flex justify-content-between cormorantfont"
                        style={{ cursor: "pointer" }}>
                        <p className=" mt-3" style={{ cursor: "pointer" }}>
                            Color
                        </p>
                        <span className="align-items-center d-flex me-2">
                            <MdKeyboardArrowDown />
                        </span>
                    </div>
                    <Collapse in={openSections.Color}>
                        <div id="example-collapse-text">
                            <ul
                                className="p-0 pf initclose m-0 CollectionFilter ">
                                {ColorFilter.map((Data, index) => {
                                    return <button type="text"
                                        key={index}
                                        className='d-block my-2'
                                        style={{
                                            border: 'none',
                                            backgroundColor: 'white'
                                        }}
                                        name="Color"
                                        value={Data}
                                        onClick={UpdateFilterValue}>
                                        {Data}
                                    </button>
                                })}
                            </ul>
                        </div>
                    </Collapse>

                </div>
                <div className="BorderTop mt-3">
                    <div
                        onClick={() => toggleSection('brands')}
                        className="d-flex justify-content-between cormorantfont"
                        style={{ cursor: "pointer" }}>
                        <p className=" mt-3" style={{ cursor: "pointer" }}>
                            Brands
                        </p>
                        <span className="align-items-center d-flex me-2">
                            <MdKeyboardArrowDown />
                        </span>
                    </div>
                    <Collapse in={openSections.brands}>
                        <div id="example-collapse-text">
                            <ul
                                className="p-0 pf initclose m-0 CollectionFilter ">
                                <li className="my-4">
                                    <div className="form-group d-flex align-items-center justify-content-between d-flex">
                                        <label className="group d-flex flex items-center text-heading text-sm cursor-pointer">

                                            <input type="checkbox" className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none checked:bg-heading checked:hover:bg-heading checked:focus:bg-heading" name="adidas" value="Adidas" />
                                            <span className="ms-2 mt-0.5 filer_content">Rolex</span>
                                            <span className="ms-2 mt-0.5 filer_content">(190)</span>
                                        </label>

                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Collapse>

                </div>
                <div className="BorderTop mt-3">
                    <div
                        onClick={() => toggleSection('price')}
                        className="d-flex justify-content-between cormorantfont"
                        style={{ cursor: "pointer" }}>
                        <p className=" mt-3" style={{ cursor: "pointer" }}>
                            Price
                        </p>
                        <span className="align-items-center d-flex me-2">
                            <MdKeyboardArrowDown />
                        </span>
                    </div>
                    <Collapse in={openSections.price}>
                        <div id="example-collapse-text">
                            <CatlogPriceFilter />
                        </div>
                    </Collapse>

                </div>


            </div >

        </>
    )
}
