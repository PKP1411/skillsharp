const connection = require('../connection');
const queries = require('../mysqlquery');

exports.getAllUpcomingClassOfLearner = async (req, res) => {
    try {
        const { learnerId } = req.params;
        const currentDate = new Date().toISOString().split('T')[0];

        const sql = 'SELECT * FROM learner_booking WHERE learner_id = ? AND booking_date >= ?';
        const [rows] = await connection.promise().query(sql, [learnerId, currentDate]);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching upcoming classes of learner:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
    
    
    
    
exports.getAllPastClassOfLearner = async (req, res) => {
    try {
        const { learnerId } = req.params;
        const currentDate = new Date().toISOString().split('T')[0];

        const sql = 'SELECT * FROM learner_booking WHERE learner_id = ? AND booking_date < ?';
        const [rows] = await connection.promise().query(sql, [learnerId, currentDate]);

        res.json(rows);
    } catch (error) {
        console.error('Error fetching past classes of learner:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}