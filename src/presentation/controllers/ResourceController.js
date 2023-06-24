const resourceService = require("../../domain/services/ResourceService");
const newsService = require("../../domain/services/NewsService");
const topicsService = require("../../domain/services/TopicService");

const pollingUpdateNewses = async () => {

    var resources = await resourceService.getAll();
    resources.map(async (resource) => {
        var newses = await newsService.getNewsesFromUrl(resource.url);
        resource.topics.map(async (topicId) => {
            var topic = await topicsService.getById(topicId);
            if (topic.active == true) {
                newses = await newsService.setRankingNewses(newses, topic);
                await Promise.all(newses.map(async (news) => {
                    if (news.resource != resource.id) {
                        news.resource = resource.id;
                        var newsUpserted = await newsService.upsert(news);
                        if (!resource.newses.includes(newsUpserted.id)) {
                            resource.newses.push(newsUpserted.id);
                        }
                    }
                }));
                await resourceService.update(resource);
            }
        });
    });
}

module.exports = { pollingUpdateNewses };