const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const tracksRoutes = require('./tracksRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/tracks', tracksRoutes);

module.exports = router;
