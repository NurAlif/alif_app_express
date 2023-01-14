import express from "express";
import { authenticateToken } from "../config/auth.js";

import { 
    readPosterUrl, 
    readAllFavorite, 
    insertFavorite, 
    deleteFavorite,
    updateFavorite
} from "../controllers/movies.controller.js";

const movies = express.Router();

movies.get('/favorite', authenticateToken, readAllFavorite);
movies.get('/:title', authenticateToken, readPosterUrl);
movies.post('/favorite', authenticateToken, insertFavorite);
movies.put('/:title', authenticateToken, updateFavorite);
movies.delete('/:title', authenticateToken, deleteFavorite);

export default movies;