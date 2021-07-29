const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tracksRoutes = require('./tracksRoutes');

router.use('/users', userRoutes);
router.use('/tracks', tracksRoutes);


module.exports = router;