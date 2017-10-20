import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let lookerProfile = new Schema({
    fullname: String,
    address: 
    {
        st: String,
        brgy: String,
        city: String,
        region: String
    },
    email: String,
    gender: String,
    birthday: String,
    age: Number,
    number: String,
    img_url:
    { 
        type: String, 
        default: 'default'
    },
    account: 
    { 
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('lookerProfile', lookerProfile);