'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = bcrypt.genSaltSync();
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('Admin123', salt),
        created: new Date()
      },
    ]);

    await queryInterface.bulkInsert('roles', [
      {
        role: 'test',
        name: 'admin',
        permission: 0,
        created: new Date()
      },
    ]);

    await queryInterface.bulkInsert('tasks', [
      {
        name: 'Admin',
        description: 'admin',
        requirement: 'admin@admin.com',
        date_created: new Date(),
        date_finish: new Date(),
        state: 'test',
        created: new Date()
      },
    ]);

    return await queryInterface.bulkInsert('process', [
      {
        name: 'test',
        description: 'test',
        date_created: new Date(),
        date_finish: new Date(),
        state: 'test',
        created: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
