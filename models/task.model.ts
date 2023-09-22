import {DataTypes} from 'sequelize';
import sequelize from '../config/db';

const Task = sequelize.define(
  'task',
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requirement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_finish: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permission: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
);

export default Task;
