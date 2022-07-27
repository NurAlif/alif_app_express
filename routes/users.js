/**
 *@swagger
 *components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - password
 *       properties:
 *         user_id:
 *           type: integer
 *           description: The auto-generated id of the user.
 *         name:
 *           type: string
 *           description: user name
 *         password:
 *           type: string
 *           description: password
 *       example:
 *          name: Alif
 *          password: alif1234
 *     loginResponse:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           description: The auto-generated id of the user.
 *         name:
 *           type: string
 *           description: user name
 *         token:
 *           type: string
 *           description: token
 *       example:
 *          user_id: 2
 *          name: alif1234
 *          token: jwt_token
 *     loginRequest:
 *       type: object
 *       required:
 *         - user_id
 *         - password
 *       properties:
 *         user_id:
 *           type: integer
 *           description: The auto-generated id of the user.
 *         password:
 *           type: string
 *           description: password
 *       example:
 *          user_id: 2
 *          password: Andysecret123
 */

/**
 *   @swagger
 *   tags:
 *   name: Users
 *   description: Users CRUD + login
*/

/**
 *@swagger
 *path:
 * /users/:
 *   get:
 *     summary: Lists all the users
 *     security:        
 *      - bearerAuth: []
 *     tags: [Users]
 *     responses:
 *       "200":
 *         description: The list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *   post:
 *     summary: Creates a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       "201":
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * /users/{id}:
 *   get:
 *     summary: Gets a user by id
 *     security:        
 *      - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       "200":
 *         description: The list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       "404":
 *         description: User not found.
 *   put:
 *     summary: Updates a user
 *     security:        
 *      - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       "201":
 *         description: Update was successful.
 *       "404":
 *         description: User not found.
 *   delete:
 *     summary: Deletes a user by id
 *     security:        
 *      - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user id
 *     responses:
 *       "204":
 *         description: Delete was successful.
 *       "404":
 *         description: User not found.
 * /users/login:
 *    post:
 *      summary: Creates a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/loginRequest'
 *      responses:
 *        "200":
 *          description: The created user.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/loginResponse'
*/

import express from "express";
import { authenticateToken } from "../config/auth.js";

import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
} from "../controllers/user.js";

const users = express.Router();

users.get('', authenticateToken, getUsers);
users.get('/:id', authenticateToken, getUserById);
users.post('', createUser);
users.put('/:id', authenticateToken, updateUser);
users.delete('/:id', authenticateToken, deleteUser);

users.post('/login', login);

export default users;