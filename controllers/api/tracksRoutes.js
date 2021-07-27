const router = require('express').Router();
const { Tracks } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newTrack = await Tracks.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTrack);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const trackData = await Tracks.destroy({
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
