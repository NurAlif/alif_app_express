// Import model Product
import User from "../models/User.js";

// Get semua product
export const getUsers = async (req, res) => {
    try {
        const product = await User.findAll();
        res.send(product);
    } catch (err) {
        console.log(err);
    }
}

// Get product berdasarkan id
export const getUserById = async (req, res) => {
    try {
        const product = await User.findAll({
            where: {
                user_id: req.params.id
            }
        });
        res.send(product[0]);
    } catch (err) {
        console.log(err);
    }
}

// Create product baru
export const createUser = async (req, res) => {
    try {
        await User.create(req.body);
        res.json({
            "message": "Product Created"
        });
    } catch (err) {
        console.log(err);
    }
}

// Update product berdasarkan id
export const updateUser = async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                user_id: req.params.id
            }
        });
        res.json({
            "message": "Product Updated"
        });
    } catch (err) {
        console.log(err);
    }
}

// Delete product berdasarkan id
export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                user_id: req.params.id
            }
        });
        res.json({
            "message": "Product Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}



export const logout = async (req, res) => {
    try {
        await User.destroy({
            where: {
                user_id: req.params.id
            }
        });
        res.json({
            "message": "Product Deleted"
        });
    } catch (err) {
        console.log(err);
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
            res.json({
                "message": "User not found"
            });
        } else {
            if (!user.password ||
                !await user.validPassword(req.body.password,
                    user.password)) {
                res.json({
                    "message": "Authentication failed"
                });
            } else {
                res.json({
                    "message": "Authentication success"
                });
            }
        }

    } catch (err) {
        res = err;
    }
}