// index.js
const express = require('express');
const bodyParser = require('body-parser');

const mentorRoutes = require('./routes/mentorRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const courseRoutes = require('./routes/courseRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); 
const authRoutes = require('./routes/authRoutes')
const learnerRoutes = require('./routes/learnerRoutes')


const app = express();
const port = 3000;

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

app.use('/mentors', mentorRoutes);
app.use('/learners',  learnerRoutes);
app.use('/courses', courseRoutes); 
app.use('/modules', moduleRoutes);
app.use('/users', userRoutes);
app.use('/learner-bookings', bookingRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('home page'); 
 })

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


