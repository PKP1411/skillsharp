const connection = require('../connection');
const queries = require('../mysqlquery');


exports.createNewUser = (req, res) => {
    const { firstname, lastname, gender, address, dateofbirth, location, profiletype } = req.body;

    const sql = queries.createNewUser;
    const values = [firstname, lastname, gender, address, dateofbirth, location, profiletype];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const userId = results.insertId;
        res.status(201).json({ message: 'User Profile created successfully!', userId });
    });
};


exports.getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM user_profile';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users from MySQL:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json(results);
    });
}

exports.getUserById = (req, res) => {
    const userId = req.params.id;
    const sql = queries.getuserById;

    connection.query(sql, userId, (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(results[0]);
    });
}

exports.deleteUserById = (req, res) => {
    const userId = req.params.id;
    const sql = queries.deleteUserById;

    connection.query(sql, userId, (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ message: 'User deleted successfully!' });
    });
}


exports.getUsersByProfileType = (req, res) => {
    const profileType = req.params.profileType;

    // Check if profileType is provided
    if (!profileType) {
        res.status(400).send('Bad Request: Profile type is missing');
        return;
    }

    connection.query(queries.getUsersByProfileType, [profileType], (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
};



exports.patchUserById = (req, res) => {
    const userId = req.params.id;
    const updates = req.body;

  
    const setClause = Object.keys(updates).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(userId);

    const sql = `UPDATE user_profile SET ${setClause} WHERE id = ?`;

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating user profile:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ message: 'User profile updated successfully!' });
    });
}