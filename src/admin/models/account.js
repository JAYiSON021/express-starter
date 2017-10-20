import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

let AdminAccount = new Schema({
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

AdminAccount.plugin(passportLocalMongoose);
module.exports = mongoose.model('AdminAccount', AdminAccount);