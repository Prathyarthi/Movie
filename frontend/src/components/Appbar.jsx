import { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'

function Appbar() {

    const [name, setName] = useState("")
    // console.log(localStorage.getItem("token"))
    useEffect(() => {
        axiosInstance.get("/users/getUser")
            .then(res => {
                setName(res.data.user.USERNAME)
            })
    }, [])
    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4 text-white">
                BookYourShow
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4 text-white">
                    {name.toUpperCase()}
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