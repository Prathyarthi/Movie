import React from 'react'
import Card from './Card'

function CardContainer() {
    return (
        <div className='h-[80vh] w-[80vw] mx-auto p-5 grid grid-cols-4'>
            <Card />
        </div>
    )
}

export default CardContainer