import connectToDb from '../db/index.js'

const getAllMovies = async (req, res) => {
    const connection = await connectToDb();
    try {
        const [movies] = await connection.query("SELECT * FROM MOVIES")
        res.json({
            success: true,
            movies
        })
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}


const createMovie = async (req, res) => {
    const { MovieName, ReleaseDate, Genre, Duration } = req.body;
    const connection = await connectToDb();
    try {
        const [tables] = await connection.query("SHOW TABLES LIKE 'Movies'");

        if (tables.length === 0) {
            await connection.query(`
                CREATE TABLE Movies (
                    MovieID INT PRIMARY KEY AUTO_INCREMENT,
                    MovieName VARCHAR(100),
                    ReleaseDate DATE,
                    Genre VARCHAR(50),
                    Duration INT
                );
            `);
        }

        const existingMovieQuery = (`SELECT * FROM MOVIES 
        WHERE MOVIENAME=?
        AND RELEASEDATE=?
          `)
        const existingMovieQueryValues = [MovieName, ReleaseDate]

        const [existingMovies] = await connection.query(existingMovieQuery, existingMovieQueryValues)

        if (existingMovies.length > 0) {
            res.json({
                success: false,
                message: 'Movie already exists'
            });
        }
        else {
            const createQuery = ('INSERT INTO Movies (MovieName, ReleaseDate, Genre, Duration) VALUES (?,?,?,?)')

            const values = [MovieName, ReleaseDate, Genre, Duration];

            await connection.query(createQuery, values)

            res.json({
                success: true,
                message: 'Movie created successfully'
            });
        }
    } catch (error) {
        console.error('Error creating movie or table:', error);
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
    getAllMovies,
    createMovie
}