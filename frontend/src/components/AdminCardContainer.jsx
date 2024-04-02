import React from 'react'
import Card from './Card'
import { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance';
import { Link } from 'react-router-dom';
import CreateMovie from '../pages/CreateMovie';

function AdminCardContainer() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axiosInstance.get('/movies/getAllMovies')
            .then(async (res) => {
                setMovies(res.data.movies)
            })
    }, [])

    return (
        <>
            <div>
                <div className='flex justify-end'>
                    <Link to={"/createMovie"}><button className='text-white p-2 m-2 border'>Create Movie</button></Link>
                </div>
                <div className='flex justify-center items-center h-[83vh] rounded'>
                    {movies.map((data) => {
                        return <Card
                            title={data.MovieName} Genre={data.Genre} Duration={"Duration: " + data.Duration} >
                        </Card>
                    })}
                </div>
            </div>
        </>
    )
}

export default AdminCardContainer
