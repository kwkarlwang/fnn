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
        Article.findOne({ url: url }).then((article) => {
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
router.get("/less", (req, res) => {
  Article.find()
    .sort({ publishedAt: -1 })
    .limit(10)
    .then((articles) => res.json(articles));
});
router.get("/count", (req, res) => {
  Article.countDocuments()
    .exec()
    .then((number) => res.json(number));
});
router.get("/page", (req, res) => {
  let { page, limit } = req.query;
  limit = parseInt(limit);
  page = parseInt(page);
  const startIndex = (page - 1) * limit;
  Article.find()
    .sort({ publishedAt: -1 })
    .limit(limit)
    .skip(startIndex)
    .then((articles) => res.json(articles));
});
router.get("/date/min", (req, res) => {
  Article.find()
    .sort({ publishedAt: 1 })
    .limit(1)
    .then((article) => {
      res.json({ minDate: article[0].publishedAt });
    });
});

router.get("/date", (req, res) => {
  // get the beginning of the date
  const startDate = new Date(req.query.date);
  startDate.setHours(0, 0, 0, 0);
  // get the beginning of the next date
  const endDate = new Date(req.query.date);
  endDate.setDate(startDate.getDate() + 1);
  endDate.setHours(0, 0, 0, 0);
  Article.find({
    publishedAt: {
      $gte: startDate,
      $lt: endDate,
    },
  })
    .sort({ publishedAt: -1 })
    .then((articles) => res.json(articles));
});
if (process.env === "production") {
  fetchArticlesPeriodically();
}
module.exports = router;
