import React from 'react'

export default function TitleHeader({Title, Description}) {
    return (
        <>
            <h2 className="divider line glow" >{Title}  </h2>
            <p>{Description}</p>
        </>
    )
}
