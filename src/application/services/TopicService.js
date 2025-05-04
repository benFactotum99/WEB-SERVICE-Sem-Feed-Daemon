const topicDbService = require("../../data/repository/db/TopicDbRepository");

const getAll = async () => {
    const topics = await topicDbService.getAll();
    return topics;
}

const getById = async (id) => {
    const topic = await topicDbService.getById(id);
    return topic;
}

const create = async (topic) => {
    const newTopic = await topicDbService.create(topic);
    return newTopic;
}

const update = async (topic) => {
    const updatedTopic = await topicDbService.update(topic);
    return updatedTopic;
}

const remove = async (id) => {
    await topicDbService.remove(id);
}

module.exports = { getAll, getById, create, update, remove };
