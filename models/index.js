const User = require('./User');
const Tracks = require('./Tracks');
const Avatar = require('./Avatar');

User.hasMany(Tracks, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasOne(Avatar, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Tracks.belongsTo(User, {
  foreignKey: 'user_id'
});

Avatar.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Tracks, Avatar };
