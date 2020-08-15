const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  source: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  publishedAt: {
    type: Date,
  },
});

module.exports = Article = mongoose.model("article", ArticleSchema);
