const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const newsSchema = new Schema({
    resource: {
        type: Schema.Types.ObjectId, 
        ref: 'Resource'
    },
    creator: {
        type: String
    },
    title: {
        type: String
    },
    link: {
        type: String
    },
    pubDate: {
        type: String
    },
    content: {
        type: String
    },
    contentSnippet: {
        type: String
    },
    guid: {
        type: String
    },
    topics: [{
        topic: {
            type: Schema.Types.ObjectId, 
            ref: 'Topic'
        },
        ranking: {
            type: Number,
        }
    }],
},
{
    versionKey: false 
});

const News = mongoose.model('News', newsSchema, 'newses');

module.exports = News;
