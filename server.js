// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const bodyParser = require('body-parser');

// Require Express to run server and routes
const express = require('express');
const app = express();

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server + callback function
const port = 3000;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})

//get route
app.get('/get', (req, res)=> {
  res.send(projectData);
});

//post route
app.post('/', (req, res)=> {
    projectData = req.body;
    console.log (projectData);
    res.send('');
  });