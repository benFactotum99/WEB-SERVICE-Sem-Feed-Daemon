var rssFinder = require('rss-finder');
let Parser = require('rss-parser');
let parser = new Parser();

const findRss = async (url) => {
    var res = await rssFinder(url);
    return res.feedUrls;
}

const getFeedsRss = async (urlRss) => {
    let feed = await parser.parseURL(urlRss);
    return feed;
}


module.exports = { findRss, getFeedsRss };