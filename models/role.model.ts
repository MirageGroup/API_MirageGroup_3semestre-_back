import {DataTypes} from 'sequelize';
import sequelize from '../config/db';

const Role = sequelize.define(
  'role',
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
    permission: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
);

export default Role;
