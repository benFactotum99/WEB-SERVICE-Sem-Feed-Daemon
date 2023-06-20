const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const topicSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
},
{
    versionKey: false 
});

const Topic = mongoose.model('Topic', topicSchema, 'topics');

module.exports = Topic;
