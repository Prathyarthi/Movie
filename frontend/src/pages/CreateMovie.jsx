import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

function CreateMovie() {
  const [movieName, setMovieName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/movies/createMovie', {
        MovieName: movieName,
        ReleaseDate: releaseDate,
        Genre: genre,
        Duration: duration
      });

      setMessage(response.data.message);
      setMovieName('');
      setReleaseDate('');
      setGenre('');
      setDuration('');
      navigate('/dashboard')
    } catch (error) {
      setMessage('Error creating movie');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Create Movie</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="movieName" className="block text-sm font-medium text-gray-700">Movie Name:</label>
          <input type="text" id="movieName" value={movieName} onChange={(e) => setMovieName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">Release Date:</label>
          <input type="date" id="releaseDate" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre:</label>
          <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration:</label>
          <input type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create</button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}

export default CreateMovie;
