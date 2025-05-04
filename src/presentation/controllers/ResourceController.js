const resourceService = require("../../application/services/ResourceService");
const newsService = require("../../application/services/NewsService");
const topicsService = require("../../application/services/TopicService");

const pollingUpdateNews = async () => {

    var resources = await resourceService.getAll();
    resources.map(async (resource) => {
        var newsList = await newsService.getNewsFromUrl(resource.url);
        resource.topics.map(async (topicId) => {
            var topic = await topicsService.getById(topicId);
            if (topic.active == true) {
                newsList = await newsService.setRankingNews(newsList, topic);
                await Promise.all(newsList.map(async (news) => {
                    if (news.resource != resource.id) {
                        news.resource = resource.id;
                        var newsUpserted = await newsService.upsert(news);
                        if (!resource.news.includes(newsUpserted.id)) {
                            resource.news.push(newsUpserted.id);
                        }
                    }
                }));
                await resourceService.update(resource);
            }
        });
    });
}

module.exports = { pollingUpdateNews };