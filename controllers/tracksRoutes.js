const router = require('express').Router();
const { Track, User } = require('../models');

// gets tracks to render
router.get('/', async (req, res) => {
  try {
    const tracksData = await Track.findAll();

    const tracks = tracksData.map((track) => track.get({ plain: true }));

    res.render('tracks', { 
      tracks, 
      logged_in: true 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;