const connection = require('../connection');
const queries = require('../mysqlquery');


exports.getMentorById = (req, res) => {
    const mentorId = req.params.mentorId;

    // Check if mentorId is provided
    if (!mentorId) {
        res.status(400).send('Bad Request: Mentor ID is missing');
        return;
    }

    connection.query(queries.getMentorById, [mentorId], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
};

exports.getCountOfMentor = (req, res) => {
    const sql = 'SELECT COUNT(*) AS mentorcount FROM mentor';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching course count:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const mentorcount = results[0].mentorcount;
        res.status(200).json({ mentorcount });
    });
};

exports.getMentorStats = (req, res) => {
    const mentorId = req.params.mentorId;

    // Get current date and date one week ago
    const currentDate = new Date().toISOString().slice(0, 10);
    const oneWeekAgo = new Date(new Date() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    // Query to fetch mentor stats
    const sql = `
       SELECT
    m.id AS mentor_id,
    COUNT(lb.id) AS total_classes_taken,
    COUNT(DISTINCT lb.course_id) AS total_bookings,
    SUM(CASE WHEN lb.booking_date BETWEEN ? AND ? THEN 1 ELSE 0 END) AS classes_booked_last_week,
    AVG(lb.rating) AS avg_rating
    FROM mentor m
    LEFT JOIN learner_booking lb ON m.id = lb.mentor_id
    WHERE m.id = ?
    `
    
    connection.query(sql, [oneWeekAgo, currentDate, mentorId], (err, results) => {
        if (err) {
            console.error('Error fetching mentor stats:', err);
            return res.status(500).json({ error: 'Error fetching mentor stats' });
        }
        res.json(results[0]);
    });
}

exports.getAvailableMentorForModule = (req, res) => {
    const moduleId = req.params.moduleId;

    // Query to fetch all mentors for the given module
    const sql = `
        SELECT mentor.*
        FROM mentor
        INNER JOIN mentorslevel ON mentor.id = mentorslevel.mentorId
        WHERE mentorslevel.skill = (
            SELECT course.domain
            FROM module
            INNER JOIN course ON module.course_id = course.id
            WHERE module.id = ?
        )`;

    connection.query(sql, [moduleId], (err, results) => {
        if (err) {
            console.error('Error fetching mentors:', err);
            return res.status(500).json({ error: 'Error fetching mentors' });
        }

        res.json(results);
    });
}

exports.patchMentorById =  (req, res) => {
    const mentorId = req.params.id;
    const updates = req.body;

    // Construct SET clause for SQL query
    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(mentorId); // Add mentor ID to the end of values array

    const sql = `UPDATE mentor SET ${setClause} WHERE id = ?`;

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating mentor profile:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ message: 'Mentor profile updated successfully!' });
    });
};

exports.getUpcomingClassOfMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;
        const currentDate = new Date().toISOString().split('T')[0];

        const sql = 'SELECT * FROM learner_booking WHERE mentor_id = ? AND booking_date >= ?';
        const [rows] = await connection.promise().query(sql, [mentorId, currentDate]);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching upcoming bookings of mentor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getPastClassOfMentor = async (req, res) => {
    try {
        const { mentorId } = req.params;
        const currentDate = new Date().toISOString().split('T')[0];

        const sql = 'SELECT * FROM learner_booking WHERE mentor_id = ? AND booking_date < ?';
        const [rows] = await connection.promise().query(sql, [mentorId, currentDate]);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching past bookings of mentor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getAllMentors = (req, res) => {
    const sql = 'SELECT * FROM mentor';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching mentors:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(200).json({ mentors: results });
    });
};

exports.getHomePage = (req, res) => {
    res.send('Here is all Module!');
};

exports.getMentorsAvailableAtTime = (req, res) => {
    const { time } = req.body; // Assuming time is provided in the format "2024-02-12T09:00:00.000Z"

    const sql = `SELECT m.*
                 FROM mentor m
                 INNER JOIN mentor_availability ma ON m.id = ma.mentor_id
                 WHERE ma.availableslot = ?`;

    connection.query(sql, [new Date(time)], (err, results) => {
        if (err) {
            console.error('Error fetching mentors available at time:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ availableMentors: results });
    });
};

exports.getAllMentorAvailability = (req, res) => {
    const sql = 'SELECT * FROM mentor_availability';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching all mentor availability:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ mentorAvailability: results });
    });
};


