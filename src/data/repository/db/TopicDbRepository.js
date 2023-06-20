const Topic = require("../../models/Topic");

const getAll = async () => {
    const topics = await Topic.find();
    return topics;
}

const getById = async (id) => {
    const topic = await Topic.findById(id);
    return topic;
}

const create = async (topic) => {
    const newTopic = await Topic.create(topic);
    return newTopic;
}

const update = async (topic) => {
    const editTopic = await Topic.findOneAndUpdate(
        { _id: topic.id },
        topic,
        { returnOriginal: false }
    );
    return editTopic;
}
  
const remove = async (id) => {
    await Topic.deleteOne(
        { _id: id }
    );
}

module.exports = { getAll, getById, create, update, remove };