import mongoose from 'mongoose';
import Router from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import config from '../config';

import org from '../models/org';
import venue from '../models/venue';
import Account from '../models/account';
import lookerProfile from '../models/profile_looker';
import venueAdminProfile from '../models/profile_venue_admin';

import { generateAccessTokenVAdmin, generateAccessTokenLooker, respond, authenticate} from '../middlewares/authmiddleware';

export default ({ config, db}) => {
    let api = Router();

    // '/v2/account/register/looker'
    api.post('/register/looker', (req, res) => {
        Account.register(new Account({ 
            username: req.body.email,
            usertype: req.body.utype
        }), req.body.password, function(err, account){
            if (account === null || err) {
                if (account === null) { res.json({error: 'can\'t register a new looker account.'}); }
                if (err) { res.json({error: err.message}); }
            } else {
                if (req.body.utype === 'looker') {
                    let newlookerProfile = new lookerProfile();
                    newlookerProfile.fullname = req.body.fullname;
                    newlookerProfile.email = req.body.email;
                    newlookerProfile.account = account._id;
                    newlookerProfile.save((err, lookerProfile) => {
                        if (lookerProfile === null || err) {
                            if (lookerProfile === null) { res.json({error: 'can\'t save a new looker profile'}) };
                            if (err) { res.json({error: err.message}); }
                        } else {
                            account.profile = newlookerProfile._id;
                            account.save(err => {
                                if (err) { res.json({error: err.message}); }
                                passport.authenticate(
                                    'local', {
                                        session: false
                                    })(req, res, () => {
                                        res.status(200).json({
                                            code: "success",
                                            message: 'Looker Registered Successfuly!'
                                    });
                                });
                            });
                        }
                    });
                } else {
                    res.status(403).json({
                        code: "forbiden",
                        message: "not a looker"
                    })
                }
            }
        });
    });

    // '/v2/account/register/vadmin'
    api.post('/register/vadmin', (req, res) => {
        Account.register(new Account({ 
            username: req.body.email,
            usertype: req.body.utype
        }), req.body.password, function(err, account) {
            if (account === null || err) {
                if (err) { res.json({error: err.message}); }
                if (account === null) { res.json({error: 'can\'t create a new account'}); }
            } else {
                if (req.body.utype === 'venue_admin') {
                    let newvenueAdminProfile = new venueAdminProfile();
                    newvenueAdminProfile.firstname = req.body.firstname;
                    newvenueAdminProfile.lastname = req.body.lastname;
                    newvenueAdminProfile.email = req.body.email;
                    newvenueAdminProfile.account = account;
                    newvenueAdminProfile.save((err, adminprofile) => {
                        if (adminprofile === null || err) {
                            if (err) { res.json({error: err.message}); }
                            if (adminprofile === null) { res.json({error: 'can\'t create a new admin profile'}); }
                        } else {
                            account.profile = newvenueAdminProfile._id;
                            account.save(err => {
                                if (err) { res.json({error: err.message}); }
                                let newOrg = new org();
                                newOrg.name = req.body.orgname;
                                newOrg.address.st = req.body.addst;
                                newOrg.address.brgy = req.body.addbrgy;
                                newOrg.address.city = req.body.addcity;
                                newOrg.address.region = req.body.addregion;
                                newOrg.full_add = req.body.full_add;
                                newOrg.save((err, org) => {
                                    if (org === null || err) {
                                        if (err) { res.json({error: err.message}); }
                                        if (org === null) { res.json({error: 'can\'t create a new place profile'}); }
                                    } else {
                                        adminprofile.org = newOrg._id;
                                        adminprofile.save(err => {
                                            if (err) { res.json({error: err.message}); }
                                            passport.authenticate(
                                                'local', {
                                                    session: false
                                                })(req, res, () => {
                                                    res.status(200).json({
                                                        code: "success",
                                                        message: 'Successfuly Registered'
                                                });
                                            });
                                        });
                                    }
                                });
                            });
                        }
                    });
                } else { 
                    res.status(403).json({
                        code: "forbiden",
                        message: "not a venue admin"
                    });
                }
            }
        });
    });

    // 'v2/account/vadmin/login'
    api.post('/vadmin/login', passport.authenticate(
        'local', {
            session: false,
            scope: []
    }), generateAccessTokenVAdmin, respond);

    // 'v2/account/looker/login'
    api.post('/looker/login', passport.authenticate(
        'local', {
            session: false,
            scope: []
    }), generateAccessTokenLooker, respond);

    // '/v2/account/logout'
    api.get('/logout', authenticate, (req, res) => {
        res.logout();
        res.status(200).send('Successfully Logged Out');
    });

    // '/v2/account/looker/info'
    api.get('/looker/info', authenticate, (req, res) => {
        //res.status(200).json(req.user);
        Account.findById(req.user.id, (err, account) => {
            if (account === null || err) {
                if (err) { res.json({error: err.message}); }
                if (account === null) { res.json({error: 'can\'t find the profile'}); }
            } else {
                if (account.usertype !== 'looker') {
                    res.status(404).json({
                        code: 'not found',
                        message: 'looker not found'
                    });
                } else {
                    res.json(account);
                }
            }
        });
    });

    // '/v2/account/vadmin/info'
    api.get('/vadmin/info', authenticate, (req, res) => {
        //res.status(200).json(req.user);
        Account.findById(req.user.id, (err, account) => {
            if (account === null || err) {
                if (err) { res.json({error: err.message}); }
                if (account === null) { res.json({error: 'can\'t find the account for the user'}); }
            } else {
                if (account.usertype !== 'venue_admin') {
                    res.status(404).json({
                        code: 'not found',
                        message: 'venue admin not found'
                    });
                } else {
                    res.status(200).json(account);
                }
            }
        });
    });

    return api;
}
