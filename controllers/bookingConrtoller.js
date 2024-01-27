const queries = require('../mysqlquery');

// learnerBookingController.js

const connection = require('../connection');

// GET all learner bookings
exports.getAllLearnerBookings = (req, res) => {
    connection.query('SELECT * FROM learner_booking', (err, results) => {
        if (err) {
            console.error('Error fetching learner bookings:', err);
            return res.status(500).json({ error: 'Error fetching learner bookings' });
        }
        res.json(results);
    });
};

// GET single learner booking by ID
exports.getLearnerBookingById = (req, res) => {
    const bookingId = req.params.bookingId;
    connection.query('SELECT * FROM learner_booking WHERE id = ?', [bookingId], (err, results) => {
        if (err) {
            console.error('Error fetching learner booking:', err);
            return res.status(500).json({ error: 'Error fetching learner booking' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Learner booking not found' });
        }
        res.json(results[0]);
    });
};




exports.createLearnerBooking = (req, res) => {
    const { learner_id, course_id, mentor_id, booking_date, booking_time, booking_status } = req.body;

    // Extract the date part from the ISO string and format it as 'YYYY-MM-DD'
    const formattedDate = new Date(booking_date).toISOString().split('T')[0];

    const sql = 'INSERT INTO learner_booking (learner_id, course_id, mentor_id, booking_date, booking_time, booking_status) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [learner_id, course_id, mentor_id, formattedDate, booking_time, booking_status];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const bookingId = results.insertId;
        res.status(201).json({ message: 'New booking successfully added!', bookingId });
    });
};

// PATCH update learner booking
exports.updateLearnerBooking = (req, res) => {
    const bookingId = req.params.bookingId;
    const updatedBooking = req.body;
    connection.query('UPDATE learner_booking SET ? WHERE id = ?', [updatedBooking, bookingId], (err, result) => {
        if (err) {
            console.error('Error updating learner booking:', err);
            return res.status(500).json({ error: 'Error updating learner booking' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Learner booking not found' });
        }
        res.json({ message: 'Learner booking updated successfully' });
    });
};

// DELETE learner booking
exports.deleteLearnerBooking = (req, res) => {
    const bookingId = req.params.bookingId;
    connection.query('DELETE FROM learner_booking WHERE id = ?', [bookingId], (err, result) => {
        if (err) {
            console.error('Error deleting learner booking:', err);
            return res.status(500).json({ error: 'Error deleting learner booking' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Learner booking not found' });
        }
        res.json({ message: 'Learner booking deleted successfully' });
    });
};


exports.getPastBookingHistory = async (req, res) => {
    try {
        // Get the current date
        const currentDate = new Date().toISOString().split('T')[0];

        // Query to fetch past bookings
        const sql = 'SELECT * FROM learner_booking WHERE booking_date < ?';
        const [rows] = await connection.promise().query(sql, [currentDate]); // Use promise() to enable promise support

        res.json(rows);
    } catch (error) {
        console.error('Error fetching past bookings:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getUpcomingBookingClasses = async (req, res) => {
    try {
        // Get the current date
        const currentDate = new Date().toISOString().split('T')[0];

        // Query to fetch upcoming booking classes
        const sql = 'SELECT * FROM learner_booking WHERE booking_date >= ?';
        const [rows] = await connection.promise().query(sql, [currentDate]);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching upcoming booking classes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

