import User from "../models/User.js";
import FavoriteMovie from "../models/FavoriteMovie.js";
import { generateAccessToken } from "../config/auth.js";

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
        if(!res.data){
            throw new Error('no response')
        }
        if(res.data.Response === 'False'){
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
            res.send({error: "poster not found"});
        else
            res.send({posterUrl: poster});
    } catch (err) {
        console.log(err);
    }
}

export const readAllFavorite = async (req, res) => {
    try {
        const product = await FavoriteMovie.findAll({
            where: {
                user_id: req.params.id
            }
        });
        res.send(product[0]);
    } catch (err) {
        console.log(err);
    }
}

export const insertFavorite = async (req, res) => {
    try {
        const poster = await getPoster(req.params.title);
        if(!poster){
            res.send({error: "poster not found"});
        }else{
            await FavoriteMovie.create(req.user.user_id);
            res.json({
                "message": "Favorite Movie Aded"
            });
            res.send(product[0]);
        }
    } catch (err) {
        console.log(err);
    }
}

