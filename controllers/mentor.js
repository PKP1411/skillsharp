
const connection = require('../Index');
const queries = require('../mysqlquery'); 

// Controller function to get users based on profile type
exports.getUsersByProfileType = (req, res) => {
    const profileType = req.params.profileType;
    
    connection.query(queries.getUsersByProfileType, [profileType], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
};

exports.getMentorById = (req, res) => {
    const mentorId = req.params.mentorId;
    connection.query(queries.getMentorById, [mentorId], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
};
 
exports.getHomePage = (req, res) => {
    res.send('Welcome to the home page!');
};
