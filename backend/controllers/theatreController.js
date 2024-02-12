import connectToDb from '../db/index.js'

const getAllTheatres = async (req, res) => {
    const connection = await connectToDb();
    try {
        const [theatres] = await connection.query("SELECT * FROM THEATRES")
        res.json({
            success: true,
            theatres
        })
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

const createTheatre = async (req, res) => {
    const { theatreName, location, capacity } = req.body;

    const connection = await connectToDb();

    try {
        const [theatreTables] = await connection.query("SHOW TABLES LIKE 'THEATRES'");

        if (theatreTables.length === 0) {
            await connection.query(`
                CREATE TABLE THEATRES (
                    THEATREID INT PRIMARY KEY AUTO_INCREMENT,
                    THEATRENAME VARCHAR(20),
                    LOCATION VARCHAR(20),
                    CAPACITY INT
                );
            `);
        }

        const existingTheatreQuery = (`SELECT * FROM THEATRES 
        WHERE THEATRENAME=?
        AND LOCATION=?
          `)

        const existingTheatreQueryValues = [theatreName, location]

        const [existingTheatre] = await connection.query(existingTheatreQuery, existingTheatreQueryValues)

        if (existingTheatre.length > 0) {
            res.json({
                success: false,
                message: 'Theatre already exists'
            });
        }
        else {
            const createTheatreQuery = ('INSERT INTO THEATRES (THEATRENAME, LOCATION, CAPACITY) VALUES (?,?,?)')

            const theatreValues = [theatreName, location, capacity];

            await connection.query(createTheatreQuery, theatreValues)

            res.json({
                success: true,
                message: 'Theatre created successfully'
            });
        }
    } catch (error) {
        console.error('Error creating theatre or table:', error);
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
    createTheatre,
    getAllTheatres
}