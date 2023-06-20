const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    /*topics: [{
        type: Schema.Types.ObjectId, 
        ref: 'Topic'
    }],*/
    resources: [{
        type: Schema.Types.ObjectId, 
        ref: 'Resource'
    }]
},
{
    versionKey: false 
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
