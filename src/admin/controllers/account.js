import mongoose from 'mongoose';
import Router from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';
import AdminAccount from '../models/account';

import { generateAccessTokenAdmin, respond, authenticate} from '../middlewares/authmiddleware';

export default ({ config, db}) => {
    let api = Router();

    // 'admin/account/login'
    api.post('/login', passport.authenticate(
        'local', {
            session: false,
            scope: []
    }), generateAccessTokenAdmin, respond);

    // '/admin/account/logout'
    api.get('/logout', authenticate, (req, res) => {
        res.logout();
        res.status(200).send('Successfully Logged Out');
    });


    return api;
}
