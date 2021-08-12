'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('facilities', {
      facility_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      facility_name: {
        type: Sequelize.STRING,
        allowNull: false
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
      facility_status: {
        type: Sequelize.ENUM("1", "0"),
        defaultValue: 1,
        comment: "1: Active; 0: Inactive",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('facilities');
  }
};