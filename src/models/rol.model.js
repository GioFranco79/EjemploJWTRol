import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.config.js";

const Rol = sequelize.define('Rol', {
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
}, {
    tableName: 'rol',
    createdAt: false,
    updatedAt: false
});

export{
    Rol
}

//Rol.sync();