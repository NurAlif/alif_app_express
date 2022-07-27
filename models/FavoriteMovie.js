// import sequelize 
import { Sequelize } from "sequelize";
// import connection 
import db from "../config/database.js";

import User from "./user.js";

// init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const FavoriteMovie = db.define('favorite_movies', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

FavoriteMovie.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "user_id",
});

await FavoriteMovie.sync();
export default FavoriteMovie;