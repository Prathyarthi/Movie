import React from 'react';

const MovieCard = ({ MovieName, ReleaseDate, Genre, Duration }) => {
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white flex justify-center">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{MovieName}</div>
                <p className="text-gray-700 text-base mb-2">Language: {language}</p>
                <p className="text-gray-700 text-base mb-2">ReleaseDate: {ReleaseDate}</p>
                <p className="text-gray-700 text-base mb-2">Genre: {Genre}</p>
                <p className="text-gray-700 text-base mb-2">Duration: {Duration}</p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Book Tickets
                </button>
            </div>
        </div>
    );
};
export default MovieCard;
