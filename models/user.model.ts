import {CreationOptional, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import {DataTypes} from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/db';
import ErrorHandler from '../services/ErrorHandlerService';

export interface UserInterface {
  id?: CreationOptional<number>;
  name: string;
  email: string;
  password: string;
  role?: string;
  validPassword?: any;
}

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>, UserInterface {}

const User = sequelize.define(
  'Users',
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Roles',
        key: 'id',
      },
    },
  },
  {
    timestamps: true, // passa created, modified e removed
    paranoid: true, // seta removeds
    underscored: true, // passa created, modified e removed sem camel case
    freezeTableName: true, // primeiro argumento é a tabela
    name: { singular: 'user', plural: 'users' },
    createdAt: 'created',
    updatedAt: 'modified',
    deletedAt: 'removed',
    hooks: {
      beforeCreate: setPassword,
      beforeUpdate: setPassword,
    },
  },
);

function setPassword(user: UserModel) {
  const salt = bcrypt.genSaltSync();
  if (!user.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
    throw new ErrorHandler(500, 'Password policy not matched.');
  }
  user.password = bcrypt.hashSync(user.password, salt);
}

User.prototype.validPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
