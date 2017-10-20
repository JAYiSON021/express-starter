import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let venueAdminProfile = new Schema({
    firstname: String,
    lastname: String,
    address: 
    {
        st: 
        { 
            type: String, 
            default: ''
        },
        brgy: 
        { 
            type: String, 
            default: ''
        },
        city: 
        { 
            type: String, 
            default: ''
        },
        region: 
        { 
            type: String, 
            default: ''
        }
    },
    birthday: 
    {
        month: 
        { 
            type: String, 
            default: 'U'
        },
        day: 
        { 
            type: String, 
            default: 'U'
        },
        year: 
        { 
            type: String, 
            default: 'U'
        }
    },
    gender: 
    { 
        type: String, 
        default: 'U'
    },
    email: String,
    age: Number,
    number: String,
    img_url: 
    { 
        type: String, 
        default: 'default'
    },
    org: Schema.Types.ObjectId,
    account: { type: Schema.Types.ObjectId }
}, {
    timestamps: true
});

module.exports = mongoose.model('venueAdminProfile', venueAdminProfile);
