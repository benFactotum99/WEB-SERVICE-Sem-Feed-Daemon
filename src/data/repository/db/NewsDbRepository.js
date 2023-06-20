const News = require("../../models/News");
const User = require("../../models/User");
const Topic = require("../../models/Topic");

require("dotenv").config();

const getAll = async () => {
    const newss = await News.find();
    return newss;
}

const getById = async (id) => {
    const news = await News.findById(id);
    return news;
}

const getByGuid = async (guid) => {
    const news = await News.findOne({ 'guid': guid });
    return news;
}

const getUserNewses = async (userId) => {
    const user = await User.findById(userId);
    const topics = await Topic.find({ "user": userId, "active": true, }, {
        fields: { _id: 1 }
    });
    const newses = await News
        .find({ "resource": user.resources, "topics.ranking": { "$gte": process.env.RANKING }, })
        .populate('resource', 'url')
        .populate({
            path: 'topics',
            populate: {
                path: 'topic',
                model: 'Topic',
            } 
        })
        .where('topics.topic').in(topics);
    return newses;
}

const create = async (news) => {
    const newNews = await News.create(news);
    return newNews;
}

const update = async (news) => {
    const editNews = await News.findOneAndUpdate(
        { _id: news.id },
        news,
        { returnOriginal: false }
    );
    return editNews;
}

const upsert = async (news) => {
    const newsUpsert = await News.findOneAndUpdate(
        { _id: news.id }, 
        news, 
        { upsert: true, returnOriginal: false });
    return newsUpsert;
}
  
const remove = async (id) => {
    await News.deleteOne(
        { _id: id }
    );
}

module.exports = { getAll, getById, getByGuid, getUserNewses, create, update, upsert, remove };