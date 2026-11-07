const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({context: queryInterface}) =>{
        await queryInterface.createTable('readings_list', {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            blogId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            read: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false
            }
        });

    }, 
    down: async({context: queryInterface}) =>{
        await queryInterface.dropTable('readings_list')
    }
}
