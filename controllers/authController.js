const connection = require('../connection');
const queries = require('../mysqlquery');

exports.register = (req, res) => {
    const { firstname, lastname, email, password, ...otherUserProfileFields } = req.body;

    // Check if the email already exists
    const emailCheckQuery = 'SELECT COUNT(*) AS emailCount FROM user_profile WHERE email = ?';
    connection.query(emailCheckQuery, [email], (err, results) => {
        if (err) {
            console.error('Error checking email:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const emailCount = results[0].emailCount;
        if (emailCount > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // If email is not registered, proceed with registration
        const sql = 'INSERT INTO user_profile (firstname, lastname, email, password, gender, address, dateofbirth, location, profiletype) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [
            firstname,
            lastname,
            email,
            password,
            otherUserProfileFields.gender || null,
            otherUserProfileFields.address || null,
            otherUserProfileFields.dateofbirth || null,
            otherUserProfileFields.location || null,
            otherUserProfileFields.profiletype || null
        ];

        connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).json({ message: 'Internal server error' });
            }
            console.log('User registered successfully');
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};


// log in 

exports.login =  (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM user_profile WHERE email = ?';
    const values = [email];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];

        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log('User logged in successfully');
        res.status(200).json({ message: 'User logged in successfully', user });
    });
};

