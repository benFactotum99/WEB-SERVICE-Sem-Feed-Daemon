const mathjs = require("mathjs");

const vectorSimilarity = (v1, v2) => {
    const similarity = mathjs.dot(v1, v2) / (mathjs.norm(v1) * mathjs.norm(v2));
    return similarity;
}

module.exports = { vectorSimilarity };