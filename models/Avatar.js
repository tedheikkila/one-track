const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Avatar extends Model { }

Avatar.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },

      },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'avatar',
    }
);

module.exports = Avatar;