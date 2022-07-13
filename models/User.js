const {Model, DataTypes}=require('sequelize');
const sequelize = require ('../config/connections');
const bcrypt = require('bcypt');

class User extends Model {
    checkPassword(loginPass){
        return bcrypt.compareSync(loginPass, this.password);
    }
}

User.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNul: false,
            validate: {
                len: [5,10]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData){
                newUserData.password=await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updateUserData){
                updateUserData.password=await bcrypt.hash(updateUserData.password, 10);
                return updateUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User'
    }
);

module.exports = User;