const express = require('express'),
morgan = require('morgan'),
fs = require('fs'),
path = require('path'),
bodyParser = require('body-parser'),
uuid = require('uuid');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(bodyParser.json());

// Define an array of users
let users = [
  {
    id: 1,
    name: 'Zach',
    favoriteMovie: 'Top Gun: Maverick'
  },
    {
    id: 2,
    name: 'Aaron',
    favoriteMovie: 'Free Guy'
  },
    {
    id: 3,
    name: 'Karen',
    favoriteMovie: 'Soul'
  }
]

// Define an array of movies
let topMovies = [
    { 
        title: 'Top Gun: Maverick', 
        year: 2022, 
        genre: 'Action',
        description: 'Top Gun: Maverick is a 2022 American action drama film directed by Joseph Kosinski and written by Ehren Kruger, Eric Warren Singer, and Christopher McQuarrie from stories by Peter Craig and Justin Marks. The film is a sequel to the 1986 film Top Gun. Tom Cruise reprises his starring role as the naval aviator Maverick.',
        Director: 'Joseph Kosinski'
    },

    {  
        title: 'Free Guy', 
        year: 2021, 
        genre: 'Comedy',
        description: 'It tells the story of a bank teller who discovers that he is a non-player character in a massively multiplayer online game who then partners with a player to find evidence that a gaming company CEO stole the code.',
        Director: 'Shawn Levy'
    },

    { 
        title: 'Soul', 
        year: 2020, 
        genre: 'Drama',
        description: 'The story follows a pianist, Joe Gardner (Foxx), who falls into a coma, by an accident, before his big break as a jazz musician and seeks to reunite his separated soul and body.',
        Director: 'Pete Docter'
    },
];

// Serve static files from the "public" folder
app.use(express.static('public'));

// GET route at '/'
app.get('/', (req, res) => {
    res.send('Welcome to my movie app!');
});

// Endpoint to get all movies
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// Endpoint to get a movie by title
app.get('/movies/:title', (req, res) => {
  const title = req.params.title;
  const movie = topMovies.find(movie => movie.title === title);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send('Movie not found');
  }
});

// Endpoint to get movies by genre
app.get('/movies/genre/:genre', (req, res) => {
  const genre = req.params.genre;
  const moviesByGenre = topMovies.filter(movie => movie.genre === genre);
  res.status(200).json(moviesByGenre);
});

// Endpoint to get movie description
app.get('/movies/:title/description', (req, res) => {
  const movieTitle = req.params.title;
  const movie = topMovies.find(movie => movie.title === movieTitle);
  if (movie) {
    res.status(200).json({ description: movie.description });
  } else {
    res.status(404).send('Movie not found');
  }
});

// Endpoint to get movie director
app.get('/movies/:title/director', (req, res) => {
  const movieTitle = req.params.title;
  const movie = topMovies.find(movie => movie.title === movieTitle);
  if (movie) {
    res.status(200).json({ director: movie.Director });
  } else {
    res.status(404).send('Movie not found');
  }
});

// Endpoint to create a new movie
app.post('/movies', (req, res) => {
  const newMovie = req.body;
  topMovies.push(newMovie);
  res.status(201).json(newMovie);
});

// Endpoint to update a movie
app.put('/movies/:title', (req, res) => {
  const title = req.params.title;
  const updatedMovie = req.body;
  const movieIndex = topMovies.findIndex(movie => movie.title === title);
  if (movieIndex !== -1) {
    topMovies[movieIndex] = { ...topMovies[movieIndex], ...updatedMovie };
    res.status(200).json(topMovies[movieIndex]);
  } else {
    res.status(404).send('Movie not found');
  }
});

// Endpoint to delete a movie
app.delete('/movies/:title', (req, res) => {
  const title = req.params.title;
  const movieIndex = topMovies.findIndex(movie => movie.title === title);
  if (movieIndex !== -1) {
    const deletedMovie = topMovies[movieIndex];
    topMovies.splice(movieIndex, 1);
    res.status(200).json(deletedMovie);
  } else {
    res.status(404).send('Movie not found');
  }
});

// Endpoint to get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Endpoint to create a new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Endpoint to edit a user
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    res.status(200).json(users[userIndex]);
  } else {
    res.status(404).send('User not found');
  }
});

// Endpoint to get favorite movie for a user
app.get('/users/:id/favorite', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);
  if (user) {
    res.status(200).json({ favoriteMovie: user.favoriteMovie });
  } else {
    res.status(404).send('User not found');
  }
});

// Endpoint to delete a user
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    res.status(200).json(deletedUser);
  } else {
    res.status(404).send('User not found');
  }
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