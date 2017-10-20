import express from 'express';
import config from '../config';
import middleware from '../middlewares';
import initializeDb from '../db';
import account from '../controllers/account';

let router = express();

// database connetion
initializeDb(db => {

    // internal middleware
    router.use(middleware({ config, db }));

    // API ROUTES v2 
    // '/v2/account'
    router.use('/account', account({ config, db }));
    
});

export default router;