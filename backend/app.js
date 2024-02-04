import express from 'express'
import movieRoutes from './routes/movieRoutes.js'
// import bookingRoutes from './routes/bookingRoutes';

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1/movies", movieRoutes)
// app.use('/api/bookings', bookingRoutes);

export default app