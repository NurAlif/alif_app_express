// import sequelize 
import { Sequelize } from "sequelize";
// import connection 
import db from "../config/database.js";
import bcrypt from 'bcrypt'

// init DataTypes
const { DataTypes } = Sequelize;

// Define schema
const User = db.define('user', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSaltSync(10, 'a');
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSaltSync(10, 'a');
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  },
  instanceMethods: {
    validPassword: (password) => {
      return bcrypt.compareSync(password, this.password);
    }
  }
});

User.prototype.validPassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};

await User.sync();
export default User;