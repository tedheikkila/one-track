const router = require('express').Router();
const { Track, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all tracks and JOIN with user data
    const trackData = await Track.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const tracks = trackData.map((track) => track.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      tracks, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/tracks', async (req, res) => {
  try {
    // Get all tracks
    const trackData = await Track.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const tracks = trackData.map((track) => track.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('tracks', { 
      tracks, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/track/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const track = trackData.get({ plain: true });

    res.render('track', {
      ...track,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Track }],
    });

    const user = userData.get({ plain: true });
    console.log(user);

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
