const router = require('express').Router();
const { Track, User, Avatar } = require('../models');
const withAuth = require('../utils/auth');

// get and renders homepage
router.get('/', async (req, res) => {
  try {
    const trackData = await Track.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const tracks = trackData.map((track) => track.get({ plain: true }));

    res.render('homepage', {
      tracks,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets tracks page and renders tracks hb
router.get('/tracks', async (req, res) => {
  try {
    const trackData = await Track.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const tracks = trackData.map((track) => track.get({ plain: true }));

    res.render('tracks', {
      tracks,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets profile and uses withAuth middleware to divert access to route if no account
router.get('/profile', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Track }, { model: Avatar }],
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

// gets login page from home
router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});


module.exports = router;