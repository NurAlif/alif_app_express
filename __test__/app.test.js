import app from "../app.js"
import { authenticateToken, generateAccessToken } from "../config/auth.js";
import request from 'supertest';

describe('token', () => {
    describe('authenticate token', () => {
        it('Generate and authenticate is passed', async() => {
            let token = generateAccessToken(4);
            var req = {
                headers : {
                    'authorization' : "Bearer " + token
                }
            }
            authenticateToken(req, null, function(){});
            expect(req.user.user_id).toEqual(4);
        });
    });
    describe('get jwt from login', () => {
        it('get user name and id from token is passed', async() => {
            const res = await request(app)
                .post('/users/login').send({user_id:4, password:"dotindonesia"})
                .set('Accept', 'application/json');
            expect(res.status).toEqual(200);
            
            expect(res.body.message).toEqual("Authentication success");
            var req = {
                headers : {
                    'authorization' : "Bearer " + res.body.token
                }
            }
            authenticateToken(req, res, function(){});
            expect(req.user.user_id).toEqual(4);
        })
    });
})