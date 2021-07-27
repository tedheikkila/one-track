const router = require('express').Router();

const withAuth = require('../../utils/auth');
const axios = require('axios');

const querystring = require('querystring');




var client_id = '1713901affcb498a956cc29a7f7f5880'; // Your client id
var client_secret = '91a8194067164571b0698dbafcbfb044'; // Your secret



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

module.exports = router;

