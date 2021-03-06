const router = require('express').Router();
const { Track } = require('../../models');
const withAuth = require('../../utils/auth');
const axios = require('axios');

const querystring = require('querystring');
require('dotenv').config();

// for 3rd party API Spotify
var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret

// axios post for Spotify creds
const spotifyAuth = async () => {
  try {
    const res = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({ 'grant_type': 'client_credentials' }), {
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
      }
    })
    return res.data.access_token
  } catch (error) {
    console.log(error);
  }
}

// axios post to get Spotify creds on input (string input) and type (artist/song) search
router.post('/', async (req, res) => {
  let token = await spotifyAuth();

  let input = req.body.input;
  let type = req.body.type;
  const search = await axios.get('https://api.spotify.com/v1/search/?q=' + input + '&type=' + type, {
    headers: {
      'Authorization': 'Bearer ' + token
    },
  })
  res.json(search.data);
})

// posts for artist's toptracks on library page (acts as 2nd api call using artist id from first api call)
router.post('/toptracks', async (req, res) => {
  let token = await spotifyAuth();

  let id = req.body.id;

  const search = await axios.get('https://api.spotify.com/v1/artists/' + id + '/top-tracks?market=us', {
    headers: {
      'Authorization': 'Bearer ' + token
    },
  })
  res.json(search.data);
})

// saves track to profile page; user needs an account/be logged in to save tracks to profile (mw = withAuth)
router.post('/newtrack', withAuth, async (req, res) => {
  try {
    const trackData = await Track.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(trackData);

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

// delete one track by its `id` value via the delete button at bottom of each saved track (withAuth)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const trackData = await Track.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!trackData) {
      res.status(404).json({ message: 'No track found with that id' });
      return;
    }

    res.status(200).json(trackData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;