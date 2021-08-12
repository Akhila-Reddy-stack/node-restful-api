"use strict";

module.exports = (sequelize, DataTypes) => {
  const Facility = sequelize.define(
    "Facilities",
    {
      facility_id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      facility_name: {
        type: DataTypes.STRING,
        allowNull: false
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
      facility_status: {
        type: DataTypes.ENUM("1", "0"),
        defaultValue: 1,
        comment: "1: Active; 0: Inactive",
      },
    },
    {
      tableName: "facilities",
      timestamps: false,
      charset: "utf8",
      collate: "utf8mb4_bin",
    }
  );
  return Facility;
};
