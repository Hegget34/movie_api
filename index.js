const express = require('express'),
morgan = require('morgan'),
fs = require('fs'),
path = require('path'),
bodyParser = require('body-parser'),
uuid = require('uuid');

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://127.0.0.1:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'});

app.use(bodyParser.json());

// Define an array of users
let users = [
  {
    _id: { "$oid": "64877f8ce9d8ef09747eb8f1" }, 
    Name: "John", 
    Email: "john@example.com", 
    Gender: "Male", 
    Birthday: "05/15/1990", 
    Username: "john1990", 
    Password: "password1",
    favoriteMovie: ["The Dark Knight"]
  },
  {
    _id: { "$oid": "6487803be9d8ef09747eb8f2" }, 
    Name: "Emma", 
    Email: "emma@example.com", 
    Gender: "Female", 
    Birthday: "09/28/1992", 
    Username: "emma1992", 
    Password: "password2", 
    favoriteMovie: ["Inception"]
  },
  {
    _id: { "$oid": "6487815be9d8ef09747eb8f3" }, 
    Name: "Michael", 
    Email: "michael@example.com", 
    Gender: "Male", 
    Birthday: "11/07/1988", 
    Username: "michael1988", 
    Password: "password3",
    favoriteMovie: ["The Departed"]
  },
  {
    _id: { "$oid": "64878213e9d8ef09747eb8f4" },
    Name: "Sarah", 
    Email: "sarah@example.com", 
    Gender: "Female", 
    Birthday: "05/02/1994", 
    Username: "sarah1994", 
    Password: "password4",
    favoriteMovie: ["Pulp Fiction"]
  }
]

// Define an array of movies
let topMovies = [
  {
    _id: { "$oid": "6487599860eaa3ffa9b89120" },
    Title: "Silence of the Lambs", 
      Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.", 
    Genre: { 
      Name: "Thriller", 
      Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience." 
    },
    Director: { 
      Name: "Jonathan Demme", 
      Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.", 
      Birth: "1944", 
      Death: "2017" 
    },
    ImagePath: "silenceofthelambs.png", 
    Featured: true 
  },
  {
    _id: { "$oid": "64876876e9d8ef09747eb8e8" },
    Title: "Inception", 
    Description: "A thief who steals corporate secrets through the use of dream sharing technology is given the inverse task of planting an idea into the mind of a CEO, but his tragic past may doom the project and his team to disaster.", 
    Genre: { 
      Name: "Action", 
      Description: "A film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats." 
    }, 
    Director: { 
      Name: "Christopher Nolan", 
      Bio: "Christopher Nolan is a British-American filmmaker/producer. Known for his Hollywood blockbuster with complex storytelling.", 
      Birth: "1970", 
      Death: "-" 
    }, 
    ImagePath: "inception.png", 
    Featured: true 
  },
  {
    _id: { "$oid": "64876b1fe9d8ef09747eb8e9" },
    Title: "Pulp Fiction", 
    Description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", 
    Genre: { 
      Name: "Crime", 
      Description: "A story that is centered around the solving of a crime." 
    }, 
    Director: { 
      Name: "Quentin Tarantino", 
      Bio: "Quentin Jerome Tarantino is an Italian-American actor and musician from New York.", 
      Birth: "1963", 
      Death: "-" 
    }, 
    ImagePath: "pulpfiction.png", 
    Featured: true 
  },
  {
    _id: { "$oid": "64876dbde9d8ef09747eb8ea" }, 
    Title: "The Dark Knight", 
    Description: "When the menace known as the Joker wreaks havoc and chaos all across Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", 
    Genre: { 
      Name: "Action", 
      Description: "A film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats." 
    }, 
    Director: { 
      Name: "Christopher Nolan", 
      Bio: "Christopher Nolan is a British-American filmmaker/producer. Known for his Hollywood blockbuster with complex storytelling.", 
      Birth: "1970", 
      Death: "-" 
    }, 
    ImagePath: "thedarkknight.png", 
    Featured: true 
  },
  {
    _id: { "$oid": "6487709ee9d8ef09747eb8eb" }, 
    Title: "Schindler's List", 
    Description: "In German occupied Poland during World War 2, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.", 
    Genre: { 
      Name: "Drama", 
      Description: "Stories with high stakes and many conflicts." 
    }, 
    Director: { 
      Name: "Steven Spielberg", 
      Bio: "Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world.", 
      Birth: "1946", 
      Death: "-" 
    }, 
    ImagePath: "schindlerslist.png", 
    Featured: true 
  },
  {
    _id: { "$oid": "64877248e9d8ef09747eb8ec" }, 
    Title: "Django Unchained", 
    Description: "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal plantation owner in Mississippi.", 
    Genre: { 
      Name: "Drama", 
      Description: "Stories with high stakes and many conflicts." 
    }, 
    Director: { 
      Name: "Quentin Tarantino", 
      Bio: "Quentin Jerome Tarantino is an Italian-American actor and musician from New York.", 
      Birth: "1963", 
      Death: "-" 
    }, 
    ImagePath: "djangounchained.png", 
    Featured: true 
  },
  {
    _id: { "$oid": "64877645e9d8ef09747eb8ed" },
    Title: "Jurassic Park", 
    Description: "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.", 
    Genre: { 
      Name: "Action", 
      Description: "A film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats." 
    }, 
    Director: { 
      Name: "Steven Spielberg", 
      Bio: "Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world.", 
      Birth: "1946", 
      Death: "-" 
    }, 
    ImagePath: "jurassicpark.png", 
    Featured: true 
  },
  {
    _id: { "$oid": "64877849e9d8ef09747eb8ee" }, 
    Title: "Kill Bill: Vol 1", 
    Description: "After awakening from a four year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.", 
    Genre: { 
      Name: "Action", 
      Description: "A film genre in which the protagonist is thrust into a series of events that typically involve violence." 
    }, 
    Director: { 
      Name: "Quentin Tarantino", 
      Bio: "Quentin Jerome Tarantino is an Italian-American actor and musician from New York.", 
      Birth: "1963", 
      death: "-" 
    }, 
    ImagePath: "killbillvol1.png", 
    Featured: true 
  },
  {
    _id: { "$oid": "648779f5e9d8ef09747eb8ef" }, 
    Title: "The Departed", 
    Description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating and Irish gang in South Boston.", 
    Genre: { 
      Name: "Crime", 
      Description: "A story that is centered around the solving of a crime." 
    }, 
    Director: { 
      Name: "Martin Scorsese", 
      Bio: "Martin Scorsese was raised in the neighborhood of Little Italy, which later provided the inspiration for several of his films.", 
      Birth: "1942", 
      Death: "-" 
    }, 
    ImagePath: "thedeparted.png", 
    Featured: true 
  },
  {
    _id: { "$oid": "64877c24e9d8ef09747eb8f0" }, 
    Title: "The Big Lebowski", 
    Description: "Jeff 'The Dude' Lebowski, mistaken for a millionaire of the same name, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.", 
    Genre: { 
      Name: "Comedy", 
      Description: "Comedies are a 'make them laugh' films designed to elicit laughter from the audience." 
    }, 
    Director: { 
      Name: "Joel and Ethan Coen", 
      Bio: "Joel and Ethan Coen are brothers in the American film industry, they often collaborate with one another.", 
      Birth: "1954, 1957", 
      Death: "-,-" 
    }, 
    ImagePath: "thebiglebowski.png", 
    Featured: true 
  }
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
  const movie = topMovies.find(movie => movie.Title === title);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send('Movie not found');
  }
});

// Endpoint to list movies by genre
app.get('/movies/genre/:genre', (req, res) => {
  const genre = req.params.genre;

  Movies.find({ 'Genre.Name': genre })
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
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

// Endpoint to get director information by name
app.get('/directors/:name', (req, res) => {
  const directorName = req.params.name;
  const director = topMovies.find(movie => movie.Director.Name === directorName);

  if (director) {
    const { Bio, Birth, Death } = director.Director;
    res.status(200).json({ Bio, Birth, Death });
  } else {
    res.status(404).send('Director not found');
  }
});

// Endpoint to add a movie to a user's favorites list
app.post('/users/:Username/movies/:MovieID', (req, res, next) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $push: { FavoriteMovies: req.params.MovieID } },
    { new: true }
  )
    .exec()
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
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
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Endpoint to update user information
app.put('/users/:userId', (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;

  Users.findByIdAndUpdate(userId, updatedData, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Endpoint to get a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Update a user's info, by username
/* We’ll expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}*/
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
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

// Endpoint to delete a user by username
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Endpoint to delete a movie from a user's favorites list
app.delete('/users/:Username/movies/:MovieID', (req, res, next) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieID } },
    { new: true }
  )
    .exec()
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
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