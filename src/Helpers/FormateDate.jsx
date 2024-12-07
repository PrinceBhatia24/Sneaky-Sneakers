import React from 'react'

export default function FormatDate({ isDate }) {
    return (
        new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).format(new Date(isDate))
    );
}

