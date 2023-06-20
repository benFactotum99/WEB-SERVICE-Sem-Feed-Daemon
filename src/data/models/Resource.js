const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const resourceSchema = new Schema({
    url: {
        type: String,
        unique: true
    },
    newses: [{
        type: Schema.Types.ObjectId, 
        ref: 'News'
    }],
    topics: [{
        type: Schema.Types.ObjectId, 
        ref: 'Topic'
    }],
},
{
    versionKey: false 
});

const Resource = mongoose.model('Resource', resourceSchema, 'resources');

module.exports = Resource;
