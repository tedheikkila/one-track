const User = require('./User');
const Track = require('./Track');
const Avatar = require('./Avatar');

User.hasMany(Track, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasOne(Avatar, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Track.belongsTo(User, {
  onDelete: 'CASCADE',
  foreignKey: 'user_id'
});

Avatar.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Track, Avatar };
