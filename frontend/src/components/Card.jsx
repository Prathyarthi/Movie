import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Card({ title, Genre, Duration }) {
    const role = localStorage.getItem("role")
    const navigate = useNavigate()
    return (
        <>
            <div className='border-gray-400 bg-slate-300 max-h-[80%] flex border-[2px]  m-3 rounded-2xl justify-center w-1/4 h-1/2'>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-5xl font-bold'>{title}</h1>
                    <h1 className='text-xl font-medium'>{Genre}</h1>
                    <h1 className='text-xl'>{Duration}</h1>
                    <div className="w-full bg-[#0095ff] flex flex-col px-3 py-2 rounded-lg">
                        <button onClick={() => {
                            navigate("/book")
                        }}>{role === "admin" ? null : "Book Now"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card