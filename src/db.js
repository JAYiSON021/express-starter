import mongoose from 'mongoose';
import config from './config';
import bluebird from 'bluebird';

export default callback => {
    mongoose.Promise = bluebird;
    //connect to the database from the instance of the database in config file
    let db = mongoose.connect(config.mongoUrl, {useMongoClient: true});
    callback(db);
}
