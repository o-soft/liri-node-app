// write the code you need to grab the data from keys.js. Then store the keys in a variable.
// Make it so liri.js can take in one of the following commands:
// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`

// Load the fs package to read and write
var fs = require("fs");
var request = require("request");
var twitter = require("twitter");
var spotify = require("spotify");

// Take two arguments.
// The first will be the action (i.e. "deposit", "withdraw", etc.)
// The second will be the amount that will be added, withdrawn, etc.

var action = process.argv[2];
var value = process.argv[3];

// We will then create a switch-case statement (if-then would also work).
// The switch-case will direct which function gets run.
switch (action) {
  case "movie-this":
    omdbMovie();
    break;

  case "my-tweets":
    twentyTweets();
    break;

  case "spotify-this-song":
    spotifySong();
    break;

  case "do-what-it-says":
    doWhat();
    break;

}


    // * Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.
    // * Rotten Tomatoes Rating.
    // * Rotten Tomatoes URL.


function omdbMovie() {

	// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
	// var yourMovie = process.argv[2];
	var yourMovie = value;

	// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=" + yourMovie + "&y=&plot=short&r=json", function(error, response, body) {

	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	    console.log("The movie's rating is: " + JSON.parse(body).Year.imdbRating.Country.Language.Plot.Actors.Ratings[1]);
	  }
	});

}
