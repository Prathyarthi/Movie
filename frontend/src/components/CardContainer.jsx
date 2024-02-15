import React from 'react'
import Card from './Card'
import { useEffect, useState } from 'react'
import axios from 'axios';
import axiosInstance from '../axiosInstance';

function CardContainer() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axiosInstance.get('/movies/getAllMovies')
            .then(async (res) => {
                setMovies(res.data.movies)
            })
    }, [])

    return (
        <div className='flex justify-center items-center h-[80vh]'>
            {movies.map((data) => {
                return <Card
                    title={data.MovieName} ReleaseDate={data.ReleaseDate} Genre={data.Genre} Duration={data.Duration} imageUrl="">
                </Card>
            })}
        </div>
    )
}

export default CardContainer
