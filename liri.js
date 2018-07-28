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

//Develop variables to capture data based on userInput
let command = process.argv[2];
let searchTopic = process.argv[3];

//Give users the directions for interacting with the command line
const greetUser = () => {
  console.log(
    'Hello, i\'m LIRI!\n',
    'You can give me the following commands, and I\'ll return data to you! \n',
    'Make sure to type in *node liri.js* before each commande to make it work \n',
    'You can type *my-tweets* to see 20 of my most recent tweets\n',
    'Type *spotify-this-song* followed by the artist and name of a song to find information on it! \n',
    'Type *movie-this* followed by the name of a movie to find information on it! \n',
    'Type *do-what-it-says*, and I\'ll display data from the random.txt file!\n',
    'Let\'s get started...'
  )
}

//Only give the directions if the user has not entered any arguements - alt to null message
if (!command){
  greetUser();
}

//my-tweets access
if (command === 'my-tweets') {
  const params = {
    screen_name: 'purpleheffalum1'
  };
  
  twitter.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (let i = 0; i < tweets.length; i++) {
        console.log('\n' + i + '-' + tweets[i].text + '\n^Created at: '   + tweets[i].created_at + '\n');
      }
    } else {
      console.log('There\'s been an error')
    }
  });
  
}


//spotify-this-song access
else if (command === 'spotify-this-song') {
  let nodeArgs = process.argv
  let searchTopic = '';

  if (searchTopic === ''){
    searchTopic = 'The Sign Ace of Base';
  }

  for (let i = 3; i < nodeArgs.length; i++) {
    
    // Build a string with the search letters, joined by ' '
    searchTopic += '' + nodeArgs[i];
    //Create the conditional to display info for default song if there are no arguements after the command
  }
  searchTopic.trim();
  spotify.search({
    type: 'track',
    query: searchTopic,
    limit: 5
  }, function (err, data) {
    if (!err) {
      let artist = data.tracks.items[0].artists[0].name;
      let song = data.tracks.items[0].name;
      let preview = data.tracks.items[0].preview_url;
      let album = data.tracks.items[0].album.name;

      console.log(album)
      
    
      console.log('\nYou entered: ' + song + '.' + '\nThat sounds like a cool song!' + '\nThe spotify search found a song by: ' + artist + '.\n' + 'It comes from the album: ' + album + '\nHere\'s a preview of the top search result! \n' + preview)

    } else {
      return console.log('Error occurred: ' + err);
    }
  });
}
//OMDB, 'movie-this' access
else if(command === 'movie-this'){
  omdb.search(searchTopic, function(err, movies) {
    if(!err) {
      let nodeArgs = process.argv
      let searchTopic = '';
    
      for (let i = 3; i < nodeArgs.length; i++) {
        
        // Build a string with the search letters, joined by ' ', will be fed into search parameters
        searchTopic += ' ' + nodeArgs[i];


      }
    }
    else {
      return console.error(err);
  }  
  

  }
)};




// else if(command = 'do-what-it-says'){

