/**
 *@swagger
 *components:
 *   schemas:
 *     FavoriteMovie:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         user_id:
 *           type: integer
 *           description: The auto-generated id of the favorite movie.
 *         title:
 *           type: string
 *           description: Movie title
 *       example:
 *          user_id: 2
 *          title: battleship
 *     moviesResponse:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Movie title
 *         poster:
 *           type: string
 *           description: poster url
 *       example:
 *          title: Interstellar
 *          poster: https://www.image.jpg
 *     moviesAddFavorite:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Movie title
 *       example:
 *          title: Interstellar
 */

/**
 *   @swagger
 *   tags:
 *   name: Movies
 *   description: Movies Endpoint
*/

/**
 *@swagger
 *path:
 * /movies/{title}:
 *   get:
 *     summary: Return poster url of that movie
 *     security:        
 *      - bearerAuth: []
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Movie Title
 *     responses:
 *       "200":
 *         description: poster url
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/moviesResponse'
 *       "404":
 *         description: Movie not found.
 * /movies/favorite:
 *   get:
 *     summary: Return all poster url of that user’s favorite movies
 *     security:        
 *      - bearerAuth: []
 *     tags: [Movies]
 *     responses:
 *       "200":
 *         description: The list of favorite movies.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/moviesResponse'
 *   post:
 *     summary: Insert into user’s favorite movies
 *     security:        
 *      - bearerAuth: []
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/moviesAddFavorite'
 *     responses:
 *       "200":
 *         description: moviesAdded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/moviesResponse'
 *       "404":
 *         description: Movie not found.
*/

import express from "express";
import { authenticateToken } from "../config/auth.js";

import { readPosterUrl, readAllFavorite, insertFavorite } from "../controllers/movies.js";

const movies = express.Router();
 
movies.get('/favorite', authenticateToken, readAllFavorite);
movies.get('/:title', authenticateToken, readPosterUrl);
movies.post('/favorite', authenticateToken, insertFavorite);
 
export default movies;