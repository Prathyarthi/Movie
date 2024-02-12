import connectToDb from '../db/index.js';

export const getAllBookings = async (req, res) => {

    const connection = await connectToDb()

    try {
        const [bookings] = await connection.query('SELECT * FROM BOOKINGS');

        res.json({
            success: true,
            message: "Fetched all showtimes",
            bookings
        })
    } catch (error) { 
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

export const createBooking = async (req, res) => {
    const { UserId, ShowtimeID, NumTickets, TotalAmount, BookingDate } = req.body;

    const connection = await connectToDb();

    try {
        const [bookingTables] = await connection.query("SHOW TABLES LIKE 'BOOKINGS'");

        if (bookingTables.length === 0) {
            await connection.query(`
            CREATE TABLE BOOKINGS(
            BookingID INT PRIMARY KEY AUTO_INCREMENT,
            USERID INT,
            ShowtimeID INT,
            NumTickets INT,
            TotalAmount INT,
            BookingDate DATE,
            FOREIGN KEY(UserId) REFERENCES Users(ID),
            FOREIGN KEY(ShowtimeID) REFERENCES Showtimes(ShowtimeID)
            )
            `)
        }

        const createBookingQuery = ('INSERT INTO BOOKINGS (UserId, ShowtimeID, NumTickets, TotalAmount, BookingDate) VALUES (?, ?, ?, ?, ?)')

        const createBookingQueryValues = [UserId, ShowtimeID, NumTickets, TotalAmount, BookingDate];

        await connection.query(createBookingQuery, createBookingQueryValues)

        res.json({
            success: true,
            message: 'Booking created successfully'
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    } finally {
        if (connection) {
            connection.end();
        }
    }
};

