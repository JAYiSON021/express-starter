import express from 'express';
import config from '../config';
import middleware from '../middlewares';
import initializeDb from '../../db';
import AdminAccount from '../controllers/account';

let router = express();

// database connetion
initializeDb(db => {

    // internal middleware
    router.use(middleware({ config, db }));

    // API ROUTES admin

    // '/admin/account'
    router.use('/account', AdminAccount({ config, db }));

});

export default router;