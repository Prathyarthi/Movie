import connectToDb from "../db/index.js"

const getAllShowtimes = async (req, res) => {

    const connection = await connectToDb()
    try {
        const [showtime] = await connection.query("SELECT * FROM SHOWTIMES")

        res.json({
            success: true,
            message: "Fetched all showtimes",
            showtime
        })
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

const createShowtime = async (req, res) => {
    const { MovieId, TheaterId, StartTime, EndTime } = req.body;

    const connection = await connectToDb();

    try {
        const [showtimeTables] = await connection.query("SHOW TABLES LIKE 'SHOWTIMES'");

        if (showtimeTables.length === 0) {
            await connection.query(`
                CREATE TABLE SHOWTIMES (
                    ShowtimeID INT PRIMARY KEY AUTO_INCREMENT,
                    MovieID INT,
                    TheaterID INT,
                    StartTime TIMESTAMP,
                    EndTime TIMESTAMP,
                    FOREIGN KEY (MovieID) REFERENCES Movies(MovieID),
                    FOREIGN KEY (TheaterID) REFERENCES Theaters(TheaterID)
                );
            `);
        }

        const existingShowtimeQuery = (`SELECT * FROM SHOWTIMES 
        WHERE ShowtimeID=?
          `)

        const existingShowtimeQueryValues = [ShowtimeID]

        const [existingShowtime] = await connection.query(existingShowtimeQuery, existingShowtimeQueryValues)

        if (existingShowtime.length > 0) {
            res.json({
                success: false,
                message: 'Showtime already exists'
            });
        }
        else {
            const createShowtimeQuery = ('INSERT INTO Movies (MovieId, TheaterId, StartTime, EndTime ) VALUES (?,?,?,?)')

            const showtimeValues = [MovieId, TheaterId, StartTime, EndTime];

            await connection.query(createShowtimeQuery, showtimeValues)

            res.json({
                success: true,
                message: 'Showtime created successfully'
            });
        }
    } catch (error) {
        console.error('Error creating showtime or table:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    } finally {
        if (connection) {
            connection.end();
        }
    }
};


export {
    getAllShowtimes,
    createShowtime
}