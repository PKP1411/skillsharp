// mysqlquery.js

const queries = {

    //mentor
    getMentorById: 'SELECT * FROM mentor WHERE id = ?',
    getAvailableMentorForModule: `
    SELECT mentor.*
    FROM mentor
    INNER JOIN course ON mentor.domain = course.domain
    INNER JOIN module ON course.id = module.course_id
    WHERE module.id = ?;
  `,
    getUpcomingClassofMentor: `
    SELECT learner_booking.*, course.name AS course_name, module.description AS module_description
    FROM learner_booking
    LEFT JOIN course ON learner_booking.course_id = course.id
    LEFT JOIN module ON learner_booking.mentor_id = module.id
    WHERE learner_booking.mentor_id = ? 
      AND learner_booking.booking_status = 'confirmed'
      AND CONCAT(learner_booking.booking_date, ' ', learner_booking.booking_time) > NOW()
    ORDER BY learner_booking.booking_date, learner_booking.booking_time
   `,


    // couses
    select_all_course: `SELECT * FROM course`,
    getAllModuleOfCourse: 'SELECT * FROM module WHERE course_id = ?',
    getLearnerById: 'SELECT * FROM learner WHERE id = ?',
    getuserById: 'SELECT * FROM user_profile WHERE id = ?',

    // users
    getUsersByProfileType: 'SELECT * FROM user_profile WHERE profiletype = ?',




    // module

    getModuleById: 'SELECT * FROM module WHERE id = ?',
    getprerequisitesofModule: `
  SELECT
    m.id AS moduleId,
    m.prerequisite_module_id AS prerequisiteId
  FROM
    module m
  WHERE
    m.id = ?;
`,
  getAllModule: 'SELECT * FROM module',
    
    
    
    //learner 
    getAllUpcomingClassOfLearner: `
    SELECT learner_booking.*, course.name AS course_name, module.description AS module_description
    FROM learner_booking
    LEFT JOIN course ON learner_booking.course_id = course.id
    LEFT JOIN module ON learner_booking.mentor_id = module.id
    WHERE learner_booking.learner_id = ? 
      AND learner_booking.booking_status = 'confirmed'
      AND CONCAT(learner_booking.booking_date, ' ', learner_booking.booking_time) > NOW()
    ORDER BY learner_booking.booking_date, learner_booking.booking_time
  `,
    
    
    // USER

  createNewUser: 'INSERT INTO user_profile (firstname, lastname, gender, address, dateofbirth, location, profiletype) VALUES (?, ?, ?, ?, ?, ST_GeomFromText(?), ?)',
  getAllUsers: 'SELECT * FROM user_profile',
  getUserById: 'SELECT * FROM user_profile WHERE id = ?',
  deleteUserById: 'DELETE FROM user_profile WHERE id = ?',



};

module.exports = queries;
