// LIBRARIES NEEDED
const express = require('express');
const app = express();
const mysql = require('mysql2');
const mongoose = require('mongoose');

// SQL CONNECTION
// TO DO: connect to mysql with the host, database, user, and password. 
//const connection = ...uncomment this and finish the rest 
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root', 
    password: 'Matthew0818$', 
    database: 'company_db' // replace with your MySQL database name
});

// MySQL Connection Verification
function verifyMySQLConnection() {
    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting to MySQL: ' + err.stack);
            return;
        }
        console.log('MySQL connected as id ' + connection.threadId);
    });
}

// MONGOOSE CONNECTION
// TODO: connect to your local host on the companyDB collection
mongoose.connect('mongodb://localhost:27017/companyDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// TODO: Mongoose Schema and Model
const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    startDate: Date,
    endDate: Date
});
const ProjectModel = mongoose.model('Project', projectSchema);

// MongoDB Connection Verification 
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// ENDPOINTS
// Endpoint to get all projects from MongoDB when you enter: http://localhost:3000/projects
app.get('/projects', async (req, res) => {
    try {
        const projects = await ProjectModel.find({});
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

// Endpoint to get all employees from MySQL when you enter: http://localhost:3000/employees
app.get('/employees', function (req, res) {
    connection.query('SELECT * FROM employees', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
});

// RUNNING THE SERVER
app.listen(3000, function () {
    console.log('Server is running on port 3000!');
    verifyMySQLConnection();
});