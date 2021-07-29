const sequelize = require('../config/connection');
const { User, Track, Avatar } = require('../models');

const userData = require('./userData.json');
const tracksData = require('./tracksData.json');
const avatarData = require('./avatarData.json');

// seeds user, track, and avatar seed data to MySQL db (onetrack_db)
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const tracks of tracksData) {
    await Track.create({
      ...tracks,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  for (const avatar of avatarData) {
    await Avatar.create({
      ...avatar,

    });
  }

  process.exit(0);
};


seedDatabase();