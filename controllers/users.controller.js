import User from "../models/User.model.js";
import { generateAccessToken } from "../config/auth.js";

export const getUsers = async (req, res) => {
    try {
        const user = await User.findAll();
        res.send(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                user_id: req.params.id
            }
        });
        res.send(user);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            "message": "User Created",
            "token": generateAccessToken(user.user_id)
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const updateUser = async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                user_id: req.params.id
            }
        });
        res.status(201).json({
            "message": "User Updated"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                user_id: req.params.id
            }
        });
        res.json({
            "message": "User Deleted"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const login = async (req, res) => {
    try {
        var user = await User.findOne({
            where: {
                user_id: req.body.user_id // user email
            }
        });

        if (!user) {
            res.status(404).send({error: "User not found!"});
        } else {
            if (!user.password ||
                !await user.validPassword(req.body.password,
                    user.password)) {
                res.json({
                    "message": "Authentication failed"
                });
            } else {
                res.json({
                    "message": "Authentication success",
                    "token": generateAccessToken(req.body.user_id)
                });
            }
        }

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}