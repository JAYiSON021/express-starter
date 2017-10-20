import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

let Account = new Schema({
    email: String,
    password: String,
    usertype: 
    { 
        type: String, 
        required: true 
    },
    profile: { type: Schema.Types.ObjectId }
}, {
    timestamps: true
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);