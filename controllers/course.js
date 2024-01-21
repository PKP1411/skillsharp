
const connection = require('../Index');
const queries = require('../mysqlquery'); 


exports.select_all_course = (req, res) => {
    connection.query(queries.select_all_course, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
};

exports.getAllModuleOfCourse = (req, res) => {
    const courseId = req.params.courseId;
    connection.query(queries.getAllModuleOfCourse, [courseId], (err, results) => {
        if (err) {
            console.error('Error executing MySQL getting modules:', err);
            res.status(500).send('Internal Server Error in mentor');
            return;
        }
        res.json(results);
    });
}


