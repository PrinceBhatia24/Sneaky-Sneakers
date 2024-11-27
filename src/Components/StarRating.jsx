import React from 'react'
import "../assets/CSS/Product.css"
export default function StarRating({ rating }) {

    // Convert rating to whole and fractional parts
    const wholeStars = Math.floor(rating); // The integer part
    const halfStar = rating % 1 >= 0.5; // If there's a half-star
    const emptyStars = 5 - Math.ceil(rating); // The remaining empty stars

    // Create an array to represent the stars
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < wholeStars) {
            stars.push('filled'); // Full star
        } else if (i === wholeStars && halfStar) {
            stars.push('half'); // Half star
        } else {
            stars.push('empty'); // Empty star
        }
    }
    return (
        <>
            <div className="prod_details_ratings">
                <span
                    className="MuiRating-root MuiRating-readOnly"
                    role="img"
                    aria-label="2.5 Stars"
                    style={{ color: "black", fontSize: 16 }}
                >
                    <span className="MuiRating-decimal">
                        <div className="star-rating">
                            {stars.map((star, index) => (
                                <span key={index} className={`star ${star}`}>
                                    <svg
                                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit"
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        {star === 'filled' ? (
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        ) : star === 'half' ? (
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        ) : (
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        )}
                                    </svg>
                                </span>

                            ))}
                        </div>
                    </span>

                </span>
                <span>|</span>
                <a
                    href="/product/64c90395073bd6dcc54a8609"
                    style={{ textDecoration: "none", color: "rgb(65, 65, 65)" }}
                >
                    {rating} Ratings
                </a>
            </div>
        </>
    )
}
