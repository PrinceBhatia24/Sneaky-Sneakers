import React from 'react'

export default function MidSlider({ Src, style }) {
    return (
        <div>
            <img className='img-fluid' src={Src} style={style} />
        </div>
    )
}
