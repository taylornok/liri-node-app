//Code to read and set environment variables
require("dotenv").config();
//read keys.js file
const keys = require('./keys');
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const Omdb = require('omdb');
//To access key information
let spotify = new Spotify(keys.spotify);
let twitter = new Twitter(keys.twitter);

let command = process.argv[2];
let searchTopic = process.argv[3];

//Develop functions based on userInput

//my-tweets function
if (command === 'my-tweets') {
    const params = {screen_name: 'purpleheffalum1'};

    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (let i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
      }
    }else{
      console.log('There\'s been an error')
    }
  });

}
//spotify-this-song
else if(command === 'spotify-this-song'){
  let nodeArgs = process.argv
  let searchTopic = '';
  for (let i = 3; i < nodeArgs.length; i++) {
    // Build a string with the search letters, joined by '-'
    searchTopic += ' ' + nodeArgs[i];
    //Fee that tring into the
    console.log(searchTopic) 
  }
  searchTopic.trim();
  spotify.search({ type: 'track', query: searchTopic}, function(err, data) {
    if (!err) {
      console.log(data.tracks.items[0].artists[0]); 
    }else{
      return console.log('Error occurred: ' + err);
    }
  });   

// }else if(command === 'movie-this'){
//   run OMDB api;
// }
// else if(command = 'do-what-it-says'){
  
// }

}