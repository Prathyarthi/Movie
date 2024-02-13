import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Appbar() {

    const [name, setName] = useState("")
    try {
        useEffect(() => {
            axios.get("http://localhost:8000/api/v1/users/getUser", {
                withCredentials: true,
            })
                .then((res) => {
                    console.log(res.data.user.username);
                    setName(res.data.user.username)
                })
        }, [])
    } catch (error) {
        console.log(error);
    }

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                MOVIE
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    {name}
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {name[0]?.toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appbar