// Using Spotify Docs: https://developer.spotify.com/documentation/web-api/tutorials/getting-started#create-an-app
// YouTube: Maker At Play Coding -- https://www.youtube.com/watch?v=1vR3m0HupGI
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const EXPIRED_MESSAGE = 'The access token expired';

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

  return token.access_token;
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

  let i = 1;
  for (let track of tracks) {
    console.log(`${i++} ${track.name}`);
  }

  return;
};

const getArtist = async (artistId) => {
  const options = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      options
    );

    if (!res.ok) {
      const err = await res.json();
      console.log(`${err.error.status} - ${err.error.message}`);

      if ((err.error.message = EXPIRED_MESSAGE)) {
        console.log('Requesting a new token...');
        const TOKEN = getToken();
      }

      return err;
    }

    const artist = await res.json();
    console.log(artist);

    return artist;
  } catch (error) {
    console.log(error);
  }
};

// getArtist('50JJSqHUf2RQ9xsHs0KMHg');
search('NF');
// getToken();
