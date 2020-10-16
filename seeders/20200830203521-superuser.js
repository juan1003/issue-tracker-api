'use strict';

const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const hashedPassword = await bcrypt.hash('pass1234', 15);

   await queryInterface.bulkInsert('Users', [{
     firstName: 'Kevin',
     lastName: 'Knits',
     username: 'administrator',
     password: hashedPassword,
     createdAt: new Date(),
     updatedAt: new Date()
   }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
