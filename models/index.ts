import sequelize from '../config/db';
const { DataTypes } = require('sequelize');
import {CreationOptional, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import bcrypt from 'bcrypt';
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

  const Roles = sequelize.define(
    'Roles',
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
    },{
      timestamps: true, // passa created, modified e removed
      paranoid: true, // seta removeds
      underscored: true, // passa created, modified e removed sem camel case
      freezeTableName: true, // primeiro argumento é a tabela
      name: { singular: 'role', plural: 'roles' },
      createdAt: 'created',
      updatedAt: 'modified',
      deletedAt: 'removed',
    }
  );
  
const Task = sequelize.define(
    'Process',
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
      processes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },{
      timestamps: true, // passa created, modified e removed
      paranoid: true, // seta removeds
      underscored: true, // passa created, modified e removed sem camel case
      freezeTableName: true, // primeiro argumento é a tabela
      name: { singular: 'process', plural: 'processes' },
      createdAt: 'created',
      updatedAt: 'modified',
      deletedAt: 'removed',
    }
  );

  const Process_users_user = sequelize.define(
    'process_users_user',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_process: {
        type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'process',
			key: 'id',
		},
      },
      id_user: {
        type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'user',
			key: 'id',
		},
      },
    },{
      timestamps: true, // passa created, modified e removed
      paranoid: true, // seta removeds
      underscored: true, // passa created, modified e removed sem camel case
      freezeTableName: true, // primeiro argumento é a tabela
      createdAt: 'created',
      updatedAt: 'modified',
      deletedAt: 'removed',
    }
  );

  const Task_users_user = sequelize.define(
    'task_users_user',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_task: {
        type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'tasks',
			key: 'id',
		},
      },
      id_user: {
        type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'users',
			key: 'id',
		},
      },
    },{
      timestamps: true, // passa created, modified e removed
      paranoid: true, // seta removeds
      underscored: true, // passa created, modified e removed sem camel case
      freezeTableName: true, // primeiro argumento é a tabela
      createdAt: 'created',
      updatedAt: 'modified',
      deletedAt: 'removed',
    }
  );

  const Process_tasks_task = sequelize.define(
    'process_users_user',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_process: {
        type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'process',
			key: 'id',
		},
      },
      id_task: {
        type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'tasks',
			key: 'id',
		},
      },
    },{
      timestamps: true, // passa created, modified e removed
      paranoid: true, // seta removeds
      underscored: true, // passa created, modified e removed sem camel case
      freezeTableName: true, // primeiro argumento é a tabela
      createdAt: 'created',
      updatedAt: 'modified',
      deletedAt: 'removed',
    }
  );

Process.belongsToMany(User, { through: 'ProcessUsers', timestamps: false });

User.belongsTo(Roles, { foreignKey: 'role_id' });

Task.belongsToMany(User, { through: 'task_users_user', foreignKey: 'id_user' });
User.belongsToMany(Task, { through: 'task_users_user', foreignKey: 'id_task' });

Task.belongsToMany(Process, { through: 'process_tasks_task', foreignKey: 'id_process' });
Process.belongsToMany(Task, { through: 'process_tasks_task', foreignKey: 'id_process' });

User.belongsToMany(Process, { through: 'process_users_user', foreignKey: 'id_user' });
Process.belongsToMany(User, { through: 'process_users_user', foreignKey: 'id_process' });

 



