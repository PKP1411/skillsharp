// mysqlquery.js

const queries = {
    getUsersByProfileType: 'SELECT * FROM user_profile WHERE profiletype = ?',
    select_all_course: `SELECT * FROM course`,
    getAllModuleOfCourse: 'SELECT * FROM module WHERE course_id = ?',
    getMentorById: 'SELECT * FROM mentor WHERE id = ?',
    getLearnerById: 'SELECT * FROM learner WHERE id = ?',
    getuserById: 'SELECT * FROM user_profile WHERE id = ?',
};

module.exports = queries;
