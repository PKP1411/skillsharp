const connection = require('../connection');
const queries = require('../mysqlquery'); 

exports.select_all_course = (req, res) => {
    connection.query(queries.select_all_course, (err, results) => {
        if (err) {
            consolae.error('Error executing MySQL query:', err);
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

exports.getAll = (req, res) => {
    const sql = 'SELECT COUNT(*) AS totalCourses FROM course';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching course count:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const totalCourses = results[0].totalCourses;
        return res.status(200).json({ totalCourses });
    });
};

