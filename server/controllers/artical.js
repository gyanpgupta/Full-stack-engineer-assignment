require("dotenv").config();

const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

exports.all_news = (req, res) => {
  const url = `${process.env.SCRAPURL}`;

  puppeteer
    .launch()
    .then((browser) => browser.newPage())
    .then((page) => {
      return page.goto(url).then(function () {
        return page.content();
      });
    })
    .then((html) => {
      const $ = cheerio.load(html);
      const news = [];

      $("#content > section").each(function () {
        $(this)
          .children()
          .children()
          .children()
          .each(function () {
            const heading = $(this).find("span").text();
            const description = $(this).find("p").text();
            const link = $(this).find("span").parent("a").attr("href");
            const image = $(this).find("div > meta").attr("content");

            if (heading != "" && description != "") {
              news.push({
                id: Math.floor(Math.random() * 1000),
                heading: $(this).find("span").text(),
                description: $(this).find("p").text(),
                link,
                image,
              });
            }
          });
      });
      res.status(200).send({ data: news });
    })
    .catch(console.error);
};

exports.readArtical = (req, res) => {
  const { link = "" } = req.body;
  const url = `${process.env.SCRAPURL}${link}`;

  puppeteer
    .launch()
    .then((browser) => browser.newPage())
    .then((page) => {
      return page.goto(url).then(function () {
        return page.content();
      });
    })
    .then((html) => {
      const $ = cheerio.load(html);

      const heading = $(".article__headline").text();
      const description = $("#content").find("article > div >  p").text();
      const image = $("#content")
        .find("article > div > div > div > meta")
        .attr("content");
      res.send({
        heading,
        description,
        image,
      });
    })
    .catch(console.error);
};
