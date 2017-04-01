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
var keys = require('./keys.js');



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
    randomTask();
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

	if (yourMovie === null) {
		yourMovie = "Mr. Nobody";
	}

	// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t=" + yourMovie + "&y=&plot=short&r=json", function(error, response, body) {

	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {
	  	var ratings = JSON.parse(body).Ratings;
	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	    console.log("The movie's title is: " + JSON.parse(body).Title);
	    console.log("The movie's year is: " + JSON.parse(body).Year);
	    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
	    console.log("The movie's Country is: " + JSON.parse(body).Country);
	    console.log("The movie's Language is: " + JSON.parse(body).Language);
	    console.log("The movie's Plot is: " + JSON.parse(body).Plot);
	    console.log("The movie's Actors is: " + JSON.parse(body).Actors);
	    console.log("The movie's Rotten Tomatoes Rating is: " + ratings[1].Value);
	  } else {
	  		console.log("error, try your search again");
	  }
	});

};

function spotifySong(input) {
	var input = process.argv[3];
	if (!input) {
		input = "eye of the tiger"
	}
	var parameter = input;
 
	spotify.search({ type: 'track', query: input }, function(err, data) {
		// console.log(data);
	    if (!err) {
	    	var trackInfo = data.tracks.items;
	    		if (trackInfo[0] != undefined) {
	    			console.log("Artist: " + data.tracks.items[0].artists[0].name);
	    			console.log("Song Name: " + data.tracks.items[0].name);
	    			console.log("Preview Link: " + data.tracks.items[0].external_urls.spotify);
	    			console.log("Album: " + data.tracks.items[0].album.name);
	    		}
	    	}
	    
	 	else {
	 		console.log('Error occurred: ' + err);
	        return false;	
	 	}
	    // Do something with 'data' 

	});
};

// function twentyTweets() {
// 	var params = {
// 		screen_name: 'oscarluna1',
// 	};

// 	var client = new twitter({
// 		consumer_key: keys.twitterKeys.consumer_key,
// 		consumer_secret: keys.twitterKeys.consumer_secret,
// 		access_token_key: keys.twitterKeys.access_token_key,
// 		access_token_secret: keys.twitterKeys.access_token_secret
// 	});
// 	// var twitterKeys = keys.twitterKeys;
// 	client.get('statuses/user_timeline', params, function(error, tweets, response) {
// 		if(!error) {
// 			for(var t = 0; t < tweets.length; t++) {
// 				output = ('\n' + '@' + params.screen_name + ' said ' + tweets[t].text + ' at ' + tweets[t].created_at +'\n');
// 				console.log(output);
// 				append();
// 			}
// 		} else {
// 			console.log('twitter error');
// 		}
// 	});
// }
function twentyTweets() {
    
 var params = {
        screen_name: 'oscarluna1',
        count: 20,
    };

 var client = new twitter ({
   
   consumer_key: keys.twitterKeys.consumer_key,
   consumer_secret: keys.twitterKeys.consumer_secret,
   access_token_key: keys.twitterKeys.access_token_key,
   access_token_secret: keys.twitterKeys.access_token_secret,
 });

    client.get("statuses/user_timeline", params, function(error, tweets, response) {
         if (!error) {
             for (var i =0; i < tweets.length; i++){
                 var losTweets = tweets[i];
               console.log(losTweets.text);
             }
         } 
         else {
         	console.log('twitter error');
         }
    });

};

function randomTask(inquiry) {
  fs.readFile('random.txt', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    }
    var output = data.toString().split(','); //splits string from random.txt into an array
    task = output[0]; //set task from random.txt array
    inquiry = output[1]; //set request from random.txt array
    //runs new parameters back through switch case
    switch (task) {
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
		    randomTask();
		    break;

    	default:
        	console.log('The prompt you typed for the requested task was not recognized; please double-check your spelling and try again.');

    }; //end of switch
  }); //end of read file
}; 

	
