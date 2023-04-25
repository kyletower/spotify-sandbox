// Using Spotify Docs: https://developer.spotify.com/documentation/web-api/tutorials/getting-started#create-an-app
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
// console.log(CLIENT_ID);
// console.log(CLIENT_SECRET);
// console.log(ACCESS_TOKEN);

const getToken = async () => {
  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
  };

  const res = await fetch('https://accounts.spotify.com/api/token', options);
  const token = await res.json();
  console.log(token);

  return token;
};

const getArtist = async (artistId) => {
  const options = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  const res = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}`,
    options
  );

  const artist = await res.json();
  console.log(artist);

  return artist;
};

const search = async (query) => {
  console.log(`Searching for ${query}`);

  const options = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  const res = await fetch(
    `https://api.spotify.com/v1/search/?q=${query}&type=track,artist,album`,
    options
  );

  const searchResults = await res.json();
  const tracks = searchResults.tracks.items;

  for (let track of tracks) {
    console.log(`${track.name}`);
  }

  return;
};

getArtist('50JJSqHUf2RQ9xsHs0KMHg');
// search('hopsin');
// getToken();
