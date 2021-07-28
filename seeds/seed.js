const sequelize = require('../config/connection');
const { User, Track } = require('../models');

const userData = require('./userData.json');
const tracksData = require('./tracksData.json');

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

  process.exit(0);
};

seedDatabase();
