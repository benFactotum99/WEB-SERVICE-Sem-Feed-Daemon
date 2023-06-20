const Resource = require("../../models/Resource");

const getAll = async () => {
    const resources = await Resource.find();
    return resources;
}

const getByUrl = async (url) => {
    const resource = await Resource.findOne({'url': url});
    return resource;
}

const getById = async (id) => {
    const resource = await Resource.findById(id);
    return resource;
}

const create = async (resource) => {
    const newResource = await Resource.create(resource);
    return newResource;
}

const upsert = async (resource) => {
    const resUpsert = await Resource.findOneAndUpdate(
        {'url': resource.url }, 
        resource, 
        { upsert: true, returnOriginal: false });
    return resUpsert;
}

const update = async (resource) => {
    const editResource = await Resource.findOneAndUpdate(
        { _id: resource.id },
        resource,
        { returnOriginal: false }
    );
    return editResource;
}
  
const remove = async (id) => {
    await Resource.deleteOne(
        { _id: id }
    );
}

module.exports = { getAll, getById, getByUrl, create, update, upsert, remove };