import React, { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'
import axios from 'axios'

function Book() {
    const [details, setDetails] = useState([])

    useEffect(() => {
        axios.post("http://localhost:8000/movies/getAllMovies")
            .then(async (res) => {
                setDetails(res.data.movies)
            })
    }, [])


    return (
        <div className='flex justify-center items-center h-[80vh]'>
            {details.map((data) => {
                return <MovieCard
                    title={data.MovieName} ReleaseDate={data.ReleaseDate} Genre={data.Genre} Duration={data.Duration}>
                </MovieCard>
            })}
        </div>
    )
}

export default Book