const connection = require('../connection');
const queries = require('../mysqlquery');

 


exports.getAllModules = (req, res) => {
  
    const sql = queries.getAllModule;

   
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching modules:', err);
            return res.status(500).json({ error: 'Error fetching modules' });
        }
        res.json(results);
    });
}


exports.getprerequisitesOfModule = (req, res) => {
    const moduleId = req.params.id;
    const sql = 'SELECT * FROM module WHERE id = ?';
    const prerequisiteSql = 'SELECT * FROM module WHERE id = ?';
    connection.query(sql, [moduleId], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Module not found' });
            return;
        }
        const module = result[0];
        if (!module.prerequisite_module_id) {
            res.json({ message: 'No prerequisite module for this module' });
            return;
        }
        connection.query(prerequisiteSql, [module.prerequisite_module_id], (err, prerequisiteResult) => {
            if (err) {
                console.error('Error executing MySQL query: ' + err.stack);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (prerequisiteResult.length === 0) {
                res.status(404).json({ error: 'Prerequisite module not found' });
            } else {
                res.json(prerequisiteResult[0]);
            }
        });
    });
}

exports.getModuleById = (req, res) => {
    const moduleId = req.params.id;
    const sql = queries.getModuleById;
    connection.query(sql, [moduleId], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Module not found' });
        } else {
            res.json(result[0]);
        }
    });
}

exports.getSkillofmodule = (req, res) => {
    const moduleId = parseInt(req.params.moduleId, 10);

    // Construct SQL query
    const sql = 'SELECT skill,skill_level FROM moduleslevel WHERE moduleId = ?';

    // Execute the query
    connection.query(sql, [moduleId], (err, result) => {
        if (err) {
            console.error('Error executing MySQL query: ' + err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'No skills found for the specified module ID' });
        }
    });
};


exports.patchModuleById = (req, res) => {
    const moduleId = req.params.moduleId;
    const updates = req.body;
 
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'No updates provided' });
    }

 
    const sql = 'UPDATE module SET ? WHERE id = ?';

 
    connection.query(sql, [updates, moduleId], (err, result) => {
        if (err) {
            console.error('Error updating module:', err);
            return res.status(500).json({ error: 'Error updating module' });
        }

        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Module not found' });
        }
 
        res.status(200).json({ message: 'Module updated successfully' });
    });
};

 

exports.getHomePage = (req, res) => {
    res.send('Here is all Module!');
};
