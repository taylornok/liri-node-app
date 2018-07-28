//Code to read and set environment variables
require("dotenv").config();

//read keys.js file
const keys = require('./keys');
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
const Omdb = require('omdb');
const FS = require('fs')
const request = require('request')
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

request('http://www.omdbapi.com/?t=harry+potter&apikey=trilogy', function (error, response, body) {
  console.log(body)
})


//Only give the directions if the user has not entered any arguements - alt to null message
if (!command) {
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
        console.log('\n' + i + '-' + tweets[i].text + '\n^Created at: ' + tweets[i].created_at + '\n');
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


  for (let i = 3; i < nodeArgs.length; i++) {

    // Build a string with the search letters, joined by ' '
    searchTopic += ' ' + nodeArgs[i];

  }
  searchTopic.trim();
  if (searchTopic === '') {
    searchTopic = 'The Sign Ace of Base';
  }

  spotify.search({
      type: 'track',
      query: searchTopic,
      limit: 5
    }, function (err, data) {
      if (!err) {
        if(data.tracks.items.length > 1){
          // console.log(data)
          let artist = data.tracks.items[0].artists[0].name
          // console.log(artist);
  
          let song = data.tracks.items[0].name;
          // console.log(song)
          let preview = data.tracks.items[0].preview_url;
          // console.log(preview)
          let album = data.tracks.items[0].album.name;
          // console.log(album)
          console.log('\nYou entered: ' + song + '.' + '\nThat sounds like a cool song!' + '\nThe spotify search found a song by: ' + artist + '.\n' + 'It comes from the album: ' + album + '\nHere\'s a preview of the top search result! \n' + preview)

        }else{
          console.log('Sorry, I could\'nt find that one, try another song')
        }
      }
    }

  )
}

else if (command === 'movie-this') {
  let nodeArgs = process.argv
  let searchTopic = '';

  for (let i = 3; i < nodeArgs.length; i++) {
    // Build a string with the search letters, joined by ' ', will be fed into search parameters
    searchTopic += ' ' + nodeArgs[i];
  }
  console.log(searchTopic)

    Omdb.get('tt0387564', function(err, movies) {
      if(err) {
          return console.error(err);
      }
      console.log(movies);
      // if(movies.length < 1) {
      //     return console.log('No movies were found!');
      // }
    
      // movies.forEach(function(movie) {
      //     console.log('%s (%d)', movie.title, movie.year);
      // });
    
    console.log(searchTopic)
  })}

