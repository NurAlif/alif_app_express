import express from "express";

import { 
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout
 } from "../controllers/user.js";

const router = express.Router();
 
router.get('/login', login);
router.get('/logout', logout);
 
// export router
export default router;