const { DataTypes } = require('sequelize');
import sequelize from '../config/db';

const Process = sequelize.define('Process', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_created: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date_finish: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  timestamps: true, // passa created, modified e removed
  paranoid: true, // seta removeds
  underscored: true, // passa created, modified e removed sem camel case
  freezeTableName: true, // primeiro argumento é a tabela
  name: { singular: 'role', plural: 'roles' },
  createdAt: 'created',
  updatedAt: 'modified',
  deletedAt: 'removed',
});

module.exports = Process;