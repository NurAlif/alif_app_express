import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
process.env.TOKEN_SECRET;

export const generateAccessToken = function(user_id) {
  return jwt.sign({user_id:user_id}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

export const authenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(403)

    try{
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
      console.log(decode)
      req.user = decode
      next()
    }catch (e) {
      console.log(error);
      res.status(500);
    }
  }