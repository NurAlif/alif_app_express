import express from "express";
import { authenticateToken } from "../config/auth.js";

import { 
    readPosterUrl, 
    readAllFavorite, 
    insertFavorite 
} from "../controllers/movies.controller.js";

const movies = express.Router();
 
movies.get('/favorite', authenticateToken, readAllFavorite);
movies.get('/:title', authenticateToken, readPosterUrl);
movies.post('/favorite', authenticateToken, insertFavorite);
 
export default movies;