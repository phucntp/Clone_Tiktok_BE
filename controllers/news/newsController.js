/* eslint-disable consistent-return */
const asyncHandler = require("express-async-handler");
const News = require("../../models/news");

const handleGetNews = asyncHandler(async (req, res) => {
  const { cookies } = req;
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  const newsData = JSON.parse(JSON.stringify(await News.find()));

  if (newsData) {
    return res.status(200).json(newsData);
  }
  res.status(404);
  throw new Error("News is empty");
});

const handleGetNewsId = asyncHandler(async (req, res) => {
  const { cookies, id } = req;
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  const newsData = JSON.parse(JSON.stringify(await News.find({ _id: id })));

  if (newsData) {
    return res.status(200).json(newsData);
  }
  res.status(404);
  throw new Error("News is empty");
});

module.exports = {
  handleGetNews,
  handleGetNewsId
};
