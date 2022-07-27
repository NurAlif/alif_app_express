import { Sequelize } from "sequelize";
import db from "../config/database.js";

import User from "./User.model.js";

const { DataTypes } = Sequelize;

const FavoriteMovie = db.define('favorite_movies', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
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