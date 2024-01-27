const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass123',
    database: 'skillsharp1'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = connection;


 


 


 
 


// #4
// Get the available mentors for the module
// const moduleId = 3;
// const sql = `
//     SELECT mentor.*, mentor_availability.availableslot
//     FROM mentor
//     JOIN mentor_availability ON mentor.id = mentor_availability.mentor_id
//     WHERE mentor.id NOT IN (
//       SELECT mentor.id
//       FROM mentor
//       JOIN learner_booking ON mentor.id = learner_booking.mentor_id
//       JOIN module ON learner_booking.course_id = module.course_id
//       WHERE module.id = ?
//     )
//     AND mentor_availability.availableslot >= NOW();
//   `;

// mysqlconnection.query(sql, [moduleId], (err, results) => {
//     if (err) {
//         console.error('Error executing MySQL query:', err);
//         res.status(500).send('Internal Server Error');
//         return;
//     }
//     console.log('query results:', results);
// });




// // here I write sql query and execute with connecting local database;
// const selectDataFromModeule = 'select * from module';   


// // Select mentor query
// const selectmentor = 'select * from userprofile where `profiletype` = "OTHER"';  




// // learner interest 
// const learnerInterest = 'Programming';    
// // give Mentor According to learner interest --->     
// const selectMentoraccordingLearnerInterest = `
// SELECT DISTINCT m.*
// FROM Mentor m
// JOIN Mentor_Availability ma ON m.id = ma.mentorid
// JOIN ContentType ct ON m.id = ct.id
// JOIN Learner l ON m.domain = l.interests
// WHERE l.interests = ?;
// `;



// // facing problem at this ....... 
// const getContentOfuserprofile = '';



// // Get All data on one user using UserId; 
// const idOfUserProfile = 10;
// const getAllUserProfileData = 'SELECT * FROM userProfile WHERE id = ?';



// // select available mentor which have same domain od learner internest ->
// // Replace :module_id with the actual module ID
// const moduleID = 1;  
// // SQL query
// const getAvailableMentorOfMudole = `
//   SELECT m.id AS mentor_id, m.areofexpertise, m.domain, ma.level, ma.availableslots
//   FROM Mentor m
//   JOIN Mentor_Availability ma ON m.id = ma.mentorid
//   JOIN Courses c ON m.domain = c.domain
//   JOIN Module mo ON c.id = mo.courseid
//   WHERE mo.id = ?
//   AND ma.availableslots > 0
//   ORDER BY ma.availableslots DESC; -- or ASC for ascending order
// `;


// console.log("First MySQL query running: ");
// mysqlconnection.query(getAvailableMentorOfMudole, [moduleID], (err, results) => {
//     if (err) {
//         console.error("error execution query: ", err);
//         return;
//     }
//     console.log('query results:', results);
// })






// // // Replace with actual values
// // const booking_learnerId = 1;
// // const booking_moduleId = 1;
// // const booking_mentorId = 1;
// // const bookingTime = '2022-01-01 12:00:00';
// // // SQL query
// // const sqlQuery = `
// //   INSERT INTO Learner_Booking (learnerid, moduleid, bookingtime, bookingstatus)
// //   VALUES (?, ?, ?, 'PENDING');
// // `;
// // // learner booking Execute the query.  
// // mysqlconnection.query(sqlQuery, [booking_learnerId, booking_moduleId, bookingTime], (error, results) => {
// //     if (error) {
// //         console.error('Error executing query:', error);
// //         // Handle the error
// //     } else {
// //         // Process the results
// //         console.log('Booking successful:', results);
// //     }
// // })





// // console.log("Second MySQL query running: "); 

// // mysqlconnection.query(selectmentor, (err, results) => {
// //     if (err) {
// //         console.error("error execution query: ", err);
// //         return;
// //     }
// //     console.log('query results:', results);
// // })

     

 



module.exports = connection