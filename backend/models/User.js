"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    isAdmin() {
      return this.admin;
    }

    isVerified() {
      return this.isVerified;
    }

    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      name: DataTypes.STRING,
      // shipping_id: DataTypes.INTEGER,
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
