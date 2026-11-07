const Blog = require('./blogs');
const {sequelize} = require('../util/db');
const User = require('./user');
const ReadingList = require('./reading_list');
User.hasMany(Blog);
Blog.belongsTo(User);
// Blog.sync({alter: true});
// User.sync({alter: true});
User.belongsToMany(Blog, { through: ReadingList, foreignKey: 'userId' });
Blog.belongsToMany(User, { through: ReadingList, foreignKey: 'blogId' });
ReadingList.sync({alter: true});    
ReadingList.belongsTo(User, { foreignKey: 'userId' });
ReadingList.belongsTo(Blog, { foreignKey: 'blogId' });
User.hasMany(ReadingList, { foreignKey: 'userId' });
Blog.hasMany(ReadingList, { foreignKey: 'blogId' });

module.exports = { Blog, User, ReadingList, sequelize };
