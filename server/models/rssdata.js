const mongoose = require('mongoose');
const Schema = mongoose.Schema
const RSSdataSchema = new Schema({
    title: { type: String, unique: true },
    link: String,
    pubDate: String,
    creator: String,
    content: String,
    contentSnippet: String,
    guid: String,
    categories: String,
    isoDate: String,
    id: String,
});
module.exports = mongoose.model("RSSdata", RSSdataSchema);