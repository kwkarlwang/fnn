require("dotenv").config();
const express = require("express");
const axios = require("axios");
const schedule = require("node-schedule");
const Article = require("../../models/Article");
const router = express.Router();
const NEWS_APIKEY = process.env.NEWS_APIKEY;

const fetchArticlesPeriodically = () => {
  schedule.scheduleJob("0 * * * *", function () {
    console.log("A new hour has reached");
    fetchArticles();
  });
};
const fetchArticles = async () => {
  try {
    const response_cnn = axios.get(
      `https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=${NEWS_APIKEY}`
    );
    const response_fox = axios.get(
      `https://newsapi.org/v2/top-headlines?sources=fox-news&apiKey=${NEWS_APIKEY}`
    );
    const response = await Promise.all([response_cnn, response_fox]);
    for (const source of response) {
      for (const article of source.data.articles) {
        const { author, title, description, url, publishedAt } = article;
        const image = article.urlToImage;
        const source = article.source.name;
        // create a new article if the current article is not found
        // in the database
        Article.findOne({ url }).then((article) => {
          // if article is not found
          if (!article) {
            Article.create({
              source,
              author,
              title,
              description,
              url,
              image,
              publishedAt,
            });
          }
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

router.get("/", (req, res) => {
  Article.find()
    .sort({ publishedAt: -1 })
    .then((articles) => res.json(articles));
});

fetchArticlesPeriodically();
module.exports = router;
