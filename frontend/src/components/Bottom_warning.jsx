import React from 'react'
import { Link } from 'react-router-dom'

function Bottom_warning({label, buttonText, to}) {
    return (
        <div className="py-2 text-sm flex justify-center">
            <div>
                {label}
            </div>
            <Link className="pointer underline pl-1 cursor-pointer" to={to}>
                {buttonText}
            </Link>
        </div>
    )
}

export default Bottom_warning