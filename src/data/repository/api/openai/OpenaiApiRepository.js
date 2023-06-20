const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

const createEmbedding = async (text) => { 
    const res = await openai.createEmbedding({
        model: process.env.MODEL,
        input: text,
    });

    const vector = res.data.data[0].embedding;
    return vector;
}

module.exports = { createEmbedding };