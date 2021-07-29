const User = require('./User');
const Track = require('./Track');
const Avatar = require('./Avatar');

// relationships between the 3 MySQL tables/models (user, track, avatar)
User.hasMany(Track, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.belongsTo(Avatar, {
  foreignKey: 'avatar_id',
  onDelete: 'CASCADE'
});

Track.belongsTo(User, {
  foreignKey: 'user_id'
});

Avatar.hasMany(User, {
  foreignKey: 'avatar_id',
  onDelete: 'CASCADE'
});


module.exports = { User, Track, Avatar };