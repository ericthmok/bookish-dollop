const { STRING } = require('sequelize');
const {Model, DataTypes} = require('squelize');
const sequelize = require('../config/connections');

class Post extends Model {}

Post.init(
    {
        id:{
            types: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_text:{
            type: DataTypes.STRING,
            allowNull: false
        },
            uses_id:{
                type: DataTypes.INTEGER,
                references: {
                    model:'user',
                    key:'id'
                }
            }
        }
)

module.exports = Post;