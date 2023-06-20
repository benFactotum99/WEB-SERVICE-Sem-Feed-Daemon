const News = require("../../data/models/News"); 

const itemFeedToNews = (item) => {
    var notice = new News();
    notice.creator = item.creator;
    notice.title = item.title;
    notice.link = item.link;
    notice.pubDate = item.pubDate;
    notice.content = item.content;
    notice.contentSnippet = item.contentSnippet;
    notice.guid = item.guid;
    return notice;
}

module.exports = { itemFeedToNews };