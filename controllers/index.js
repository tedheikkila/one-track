const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const tracksRoutes = require('./tracksRoutes');

router.use('/', homeRoutes);
router.use('/tracks', tracksRoutes);
router.use('/api', apiRoutes);

module.exports = router;
