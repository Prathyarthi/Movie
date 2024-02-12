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
    const { MovieId, TheatreId, StartTime, EndTime } = req.body;

    if (!MovieId || !TheatreId || !StartTime || !EndTime) {
        return res.status(400).json({
            success: false,
            message: "MovieId, TheatreId, StartTime, and EndTime are required fields."
        });
    }

    const connection = await connectToDb();

    try {
        const [showtimeTables] = await connection.query("SHOW TABLES LIKE 'SHOWTIMES'");

        if (showtimeTables.length === 0) {
            await connection.query(`
                CREATE TABLE SHOWTIMES (
                    SHOWTIMEID INT PRIMARY KEY AUTO_INCREMENT,
                    MOVIEID INT,
                    THEATREID INT,
                    STARTTIME INT,
                    ENDTIME INT,
                    FOREIGN KEY (MOVIEID) REFERENCES MOVIES(MOVIEID),
                    FOREIGN KEY (THEATREID) REFERENCES THEATRES(THEATREID)
                );
            `);
        }

        const existingShowtimeQuery = (`SELECT MOVIEID,THEATREID 
        FROM SHOWTIMES 
        WHERE MOVIEID = ? AND THEATREID = ?
          `)

        const existingShowtimeQueryValues = [MovieId, TheatreId]

        const [existingShowtime] = await connection.query(existingShowtimeQuery, existingShowtimeQueryValues)

        if (existingShowtime.length > 0) {
            res.json({
                success: false,
                message: 'Showtime already exists'
            });
        }
        else {
            const createShowtimeQuery = ('INSERT INTO SHOWTIMES (MovieId, TheatreId, StartTime, EndTime ) VALUES (?,?,?,?)')

            const showtimeValues = [MovieId, TheatreId, StartTime, EndTime];

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