import FavoriteMovie from "../models/FavoriteMovie.js";

import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();
const OMDBApiKey = process.env.OMDB_APIKEY;

const OMDBApi = axios.create({
    baseURL: 'http://www.omdbapi.com',
    timeout: 1000
});

async function getPoster(title) {
    try {
        const res = await OMDBApi.get('/',{params:{apikey:OMDBApiKey, t:title}});
        if(!res.data || res.data.Response === 'False'){
            return false;
        }
        return res.data.Poster;
    } catch (error) {
        console.error(error);
    }
}

export const readPosterUrl = async (req, res) => {
    try {
        const poster = await getPoster(req.params.title);
        if(!poster)
            res.status(404).send({error: "Movie not found!"});
        else
            res.send({posterUrl: poster});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const readAllFavorite = async (req, res) => {
    try {
        const movies = await FavoriteMovie.findAll({
            where: {
                user_id: req.user.user_id
            }
        });
        var posters = new Array();
        for(const movie of movies) {
            const poster = await getPoster(movie.title);
            posters.push({
                title:movie.title, 
                posterUrl: poster
            })
        }
        console.log(posters);
        res.send(posters);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const insertFavorite = async (req, res) => {
    try {
        const poster = await getPoster(req.body.title);
        if(!poster){
            res.status(404).send({error: "Movie not found!"});
        }else{
            await FavoriteMovie.create({
                user_id: req.user.user_id, 
                title: req.body.title
            });
            res.json({
                "message": "Favorite Movie Aded"
            });
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

