import express from 'express'
import movieRoutes from './routes/movieRoutes.js'
import theatreRoutes from './routes/theatreRoutes.js'
import showtimeRoutes from './routes/showtimeRoutes.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1/movies", movieRoutes)
app.use('/api/v1/theatre', theatreRoutes);
app.use('/api/v1/showtime', showtimeRoutes);

export default app