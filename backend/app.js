import express from 'express'
// import movieRoutes from './routes/movieRoutes';
// import bookingRoutes from './routes/bookingRoutes';

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hi")
})

// app.use('/api/movies', movieRoutes);
// app.use('/api/bookings', bookingRoutes);

export default app