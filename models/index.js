const User = require('./User');
const Tracks = require('./Tracks');

User.hasMany(Tracks, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Tracks.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Tracks };
