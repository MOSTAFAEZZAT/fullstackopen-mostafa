const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");
class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    year: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      validate: {
        isBefore1991(value) {
          if (new Date(value) < new Date("1991-1-1")) {
            throw new Error("Cannot care a blog dated before 1991");
          }
        },

        isNotFuture(value) {
          if (new Date(value) > new Date()) {
            throw new Error("Cannot care a blog in the future");
          }
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "blogs",
  },
);

module.exports = Blog;
