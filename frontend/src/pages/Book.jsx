import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Book = () => {
    const [tickets, setTickets] = useState(0);
    const [date, setDate] = useState('');
    const navigate = useNavigate()

    const userId = localStorage.getItem('userId')
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/booking/createBooking', {
                UserId: userId,
                NumTickets: tickets,
                TotalAmount: 1000,
                BookingDate: date
            });
            toast.success("Tickets booked successfully");
            navigate('/dashboard');
        } catch (error) {
            console.error('Error:', error);
            toast.error("Failed to book tickets. Please try again.");
        }
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Book Tickets</h2>
            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="numTickets" className="font-bold">Number of Tickets:</label>
                    <input
                        type="number"
                        name="tickets"
                        value={tickets}
                        onChange={(e) => {
                            setTickets(e.target.value)
                        }}
                        className="px-4 py-2 border rounded-md w-40"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="font-bold">Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value)
                        }}
                        className="px-4 py-2 border rounded-md w-40"
                        required
                    />
                </div>
                <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">Book Tickets</button>
            </form>
        </div>
    );
}
export default Book;
