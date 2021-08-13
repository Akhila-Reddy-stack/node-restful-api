'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      facility_id: {
        type: Sequelize.BIGINT(20),
        allowNull: true,
        references: {
          model: 'facilities',
          key: 'facility_id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      user_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role_id: {
        type: Sequelize.ENUM("1", "2"),
        defaultValue: 2,
        allowNull: false,
        comment: "1: Admin; 2: User",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: null,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      user_status: {
        type: Sequelize.ENUM("1", "0"),
        defaultValue: 1,
        allowNull: false,
        comment: "1: Active; 0: Inactive",
      },
    });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};