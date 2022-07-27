import express from "express";
import { authenticateToken } from "../config/auth.js";

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
} from "../controllers/users.controller.js";

const users = express.Router();

users.get('', authenticateToken, getUsers);
users.get('/:id', authenticateToken, getUserById);
users.post('', createUser);
users.put('/:id', authenticateToken, updateUser);
users.delete('/:id', authenticateToken, deleteUser);

users.post('/login', login);

export default users;