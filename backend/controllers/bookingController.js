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
    const { UserId, NumTickets, TotalAmount, BookingDate, Session } = req.body;
    console.log(UserId, NumTickets, TotalAmount, BookingDate, Session);
    const connection = await connectToDb();

    const currentDate = new Date();
    const bookingDateTime = new Date(BookingDate);
    if (bookingDateTime < currentDate) {
        return res.status(400).json({
            error: 'Booking date cannot be in the past'
        });
    }

    try {
        const [bookingTables] = await connection.query("SHOW TABLES LIKE 'BOOKINGS'");

        if (bookingTables.length === 0) {
            await connection.query(`
            CREATE TABLE BOOKINGS(
            BookingID INT PRIMARY KEY AUTO_INCREMENT,
            USERID INT,
            NumTickets INT,
            TotalAmount INT,
            BookingDate DATE,
            Session VARCHAR(10),
            FOREIGN KEY(UserId) REFERENCES Users(ID)
            )
            `)
        }

        const createBookingQuery = ('INSERT INTO BOOKINGS (UserId, NumTickets, TotalAmount, BookingDate, Session) VALUES (?, ?, ?, ?, ?)')

        const createBookingQueryValues = [UserId, NumTickets, TotalAmount, BookingDate, Session];

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

