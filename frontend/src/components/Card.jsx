import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Card({ MovieName, ReleaseDate, Genre, Duration, imageUrl }) {
    const navigate = useNavigate()
    return (
        <>
            <div className='border-gray-400 max-h-[80%] flex border-[2px]  m-3 rounded-2xl justify-center'>
                <div onClick={() => {
                    navigate("/book")
                }}>
                    <h1>{MovieName}</h1>
                    <h1>{ReleaseDate}</h1>
                    <h1>{Genre}</h1>
                    <h1>{Duration}</h1>
                    <img src={imageUrl} alt="" />
                    {/* <img className='rounded-2xl' src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC4yLzEwICA0OS44SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00383266-jwhtsxgked-portrait.jpg" alt="" /> */}
                </div>
            </div>
        </>
    )
}

export default Card