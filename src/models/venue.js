import mongoose from 'mongoose';
import books from './books';
import reservation_req from './reservation_reqs'
const Schema = mongoose.Schema;

let venue = new Schema({
    name: 
    { 
        type: String, 
        required: true
    },
    location: 
    { 
        type: String, 
        required: true 
    },
    img_url: 
    { 
        type: String, 
        default: 'default' 
    },
    enabled: 
    { 
        type: Boolean, 
        default: true 
    },
    capacity: 
    {
        max: Number,
        min: Number
    },
    venue_type:[ String ],
    features:[ String ],
    overview: String,
    org: 
    { 
        type: Schema.Types.ObjectId 
    },
    org_name: String,
    org_full_add: String,
    reservation_policy: String,
    costs: [
        { 
            cur: String, 
            value: String,
            unit: String,
            _id: 0
        }
    ],
    availability: [
        { 
            dayRange: String, 
            timeRangeFrom: String, 
            timeRangeTo: String, 
            _id: 0
        }
    ],
    booking_ids: [
        {
            type: Schema.Types.ObjectId,
            ref: 'books'
        }
    ],
    reservation_req_ids: [
        {
            type: Schema.Types.ObjectId,
            ref: 'reservation_req'
        }
    ],
    gallery: [
        String
    ]
}, {    
    timestamps: true
});

module.exports = mongoose.model('venue', venue);
