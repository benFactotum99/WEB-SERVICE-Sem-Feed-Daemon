const newsDbRepository = require("../../data/repository/db/NewsDbRepository");
const feedRssApiRepository = require("../../data/repository/api/feed_rss/FeedRssApiRpository");
const openaiApiRepository = require("../../data/repository/api/openai/OpenaiApiRepository");
const newsMappers = require("../mappers/NewsMappers");
const mathHelpers = require("../helpers/MathHelpers");

const getAll = async () => {
    const newss = await newsDbRepository.getAll();
    return newss;
}

const getById = async (id) => {
    const news = await newsDbRepository.getById(id);
    return news;
}

const getUserNewses = async (userId) => {
    const newses = await newsDbRepository.getUserNewses(userId);
    return newses;
}

const getNewsesFromUrl = async (url) => {
    var feedUrls = await feedRssApiRepository.findRss(url);
    if (feedUrls.lenght == 0){
        throw Exception("Url privo di feed");
    }
    var feed = await feedRssApiRepository.getFeedsRss(feedUrls[0].url);
    var newses = [];
    feed.items.forEach(async (item) => {
        var newsDb = await newsDbRepository.getByGuid(item.guid);
        if (newsDb == null){
            var news = newsMappers.itemFeedToNews(item);
            newses.push(news);
        } else {
            newses.push(newsDb);
        }
    });
    return newses;
}

const setRankingNewses = async (newses, topicParam) => {
    var vectTopic = await openaiApiRepository.createEmbedding(topicParam.name + " " + topicParam.description);
    await Promise.all(newses.map(async (news) => {
        if ((news.topics.filter(t => t.topic == topicParam.id).length == 0)) {
            var vectNews = await openaiApiRepository.createEmbedding(news.title + " " + news.content);
            var rankingVects = mathHelpers.vectorSimilarity(vectTopic, vectNews);
            var topicElement = { topic: topicParam.id, ranking: rankingVects };
            news.topics.push(topicElement);
        }
    }));
    return newses;
}

const create = async (news) => {
    const newNews = await newsDbRepository.create(news);
    return newNews;
}

const update = async (news) => {
    const updatedNews = await newsDbRepository.update(news);
    return updatedNews;
}

const upsert = async (news) => {
    const upsertedNews = await newsDbRepository.upsert(news);
    return upsertedNews;
}

const remove = async (id) => {
    await newsDbRepository.remove(id);
}

module.exports = { getAll, getById, getUserNewses, getNewsesFromUrl, setRankingNewses, create, update, upsert, remove };
