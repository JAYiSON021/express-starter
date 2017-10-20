import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import Account from '../models/account';
import config from '../config';

const TOKENTIME = config.tokentime;
const SECRET = config.secret;

let authenticate = expressJwt({ secret: SECRET });

let generateAccessTokenAdmin = (req, res, next) => {
    Account.find({ usertype: "admin", username: req.body.email }, (err, vadmin) => {
        if (err) { res.json({error: err.message}); }
        if ( vadmin.length > 0 ) {
            req.token = req.token || {};
            req.token = jwt.sign({
                id: req.user.id,
            }, SECRET, {
                expiresIn: TOKENTIME
            });
            next();
        } else { 
            res.status(404).json({
                code: "not found",
                message: "Invalid email or password"
            });
        }
    });
}

let respond = (req, res) => {
    res.status(200).json({
        user: req.user.username,
        token: req.token
    });
}

module.exports = { authenticate, generateAccessTokenAdmin, respond }