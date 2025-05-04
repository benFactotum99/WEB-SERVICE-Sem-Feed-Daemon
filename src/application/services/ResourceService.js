const resourceDbRepository = require("../../data/repository/db/ResourceDbRepository");
const feedRssApiRepository = require("../../data/repository/api/feed_rss/FeedRssApiRpository");

const getAll = async () => {
    const resources = await resourceDbRepository.getAll();
    return resources;
}

const getById = async (id) => {
    const resource = await resourceDbRepository.getById(id);
    return resource;
}

const getByUrl = async (url) => {
    const resource = await resourceDbRepository.getByUrl(url);
    return resource;
}

const create = async (resource) => {
    await findRss(resource.url);
    const newResource = await resourceDbRepository.create(resource);
    return newResource;
}

const update = async (resource) => {
    const updatedResource = await resourceDbRepository.update(resource);
    return updatedResource;
}

const upsert = async (resource) => {
    await findRss(resource.url);
    const upsertResource = await resourceDbRepository.upsert(resource);
    return upsertResource;
}

const findRss = async (url) => {
    var feedUrls = await feedRssApiRepository.findRss(url);
    if (feedUrls.lenght == 0)
        throw Exception("Url privo di feed");
}

const remove = async (id) => {
    await resourceDbRepository.remove(id);
}

module.exports = { getAll, getById, getByUrl, create, update, upsert, findRss, remove };
