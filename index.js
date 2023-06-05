const express = require('express');
const morgan = require('morgan');
// import built in node modules fs and path 
const fs = require('fs'); 
const path = require('path');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

// Define an array of movies
let topMovies = [
    { 
        title: 'Top Gun: Maverick', 
        year: 2022, 
        genre: 'Action' 
    },

    {  
        title: 'Free Guy', 
        year: 2021, 
        genre: 'Comedy' 
    },

    { 
        title: 'Soul', 
        year: 2020, 
        genre: 'Drama' 
    },
];

// Serve static files from the "public" folder
app.use(express.static('public'));

// GET route at '/'
app.get('/', (req, res) => {
    res.send('Welcome to my movie app!');
});

// GET route at '/movies'
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong.');
});

// Use Morgan middleware to log requests
app.use(morgan('combined', {stream: accessLogStream}));

// Start the server
app.listen(8080, () => {
  console.log('Server started on port 8080');
});