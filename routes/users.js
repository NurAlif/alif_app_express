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
 *          name: Andy
 *          password: Andy
 *     loginResponse:
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
 *          name: Andy
 *          password: Andy
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
 *          password: Andy
 */

/**
 *   @swagger
 *   tags:
 *   name: Users
 *   description: Users CRUD with login & logout
*/

/**
 *@swagger
 *path:
 * /users/:
 *   get:
 *     summary: Lists all the users
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
 *       "200":
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * /users/{id}:
 *   get:
 *     summary: Gets a user by id
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
 *       "204":
 *         description: Update was successful.
 *       "404":
 *         description: User not found.
 *   delete:
 *     summary: Deletes a user by id
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
 *                $ref: '#/components/schemas/User'
*/

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

const users = express.Router();

users.get('', getUsers);
users.get('/:id', getUserById);
users.post('', createUser);
users.put('/:id', updateUser);
users.delete('/:id', deleteUser);

users.post('/login', login);
users.post('/logout', logout);

// export router
export default users;