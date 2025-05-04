const userDbRepository = require("../../data/repository/db/UserDbRepository");

const getAll = async () => {
    const users = await userDbRepository.getAll();
    return users;
}

const getById = async (id) => {
    const user = await userDbRepository.getById(id);
    return user;
}

const getByEmail = async (email) => {
    const user = await userDbRepository.getByEmail(email);
    return user;
}

const getUserResource = async () => {
    const users = await userDbRepository.getUserResource();
    return users;
}

const create = async (user) => {
    const newUser = await userDbRepository.create(user);
    return newUser;
}

const update = async (user) => {
    const updatedUser = await userDbRepository.update(user);
    return updatedUser;
}

const remove = async (id) => {
    await userDbRepository.remove(id);
}

module.exports = { getAll, getById, getByEmail, getUserResource, create, update, remove };
