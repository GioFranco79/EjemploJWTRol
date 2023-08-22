import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.config.js";


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true    
    },
    email:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    rol:{
        type: DataTypes.ENUM('ADMIN', 'USER'),
        allowNull: false
    }
},{
    tableName: 'user',
    createdAt: false,
    updatedAt: false
});

export{
    User
}