"use strict";

module.exports = (sequelize, DataTypes) => {
  const Facility = sequelize.define(
    "Users",
    {
      user_id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      facility_id: {
        type: DataTypes.BIGINT(20),
        allowNull: true
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role_id: {
        type: DataTypes.ENUM(0, 1),
        allowNull: false,
        defaultValue: 2,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: null,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      user_status: {
        type: DataTypes.ENUM(0, 1),
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "users",
      timestamps: false,
      charset: "utf8",
      collate: "utf8mb4_bin",
    }
  );
  return Facility;
};

