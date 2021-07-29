const router = require('express').Router();
const { Track, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const tracksData = await Track.findAll();

    // Serialize data so the template can read it
    const tracks = tracksData.map((track) => track.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('tracks', { 
      tracks, 
      logged_in: true 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;