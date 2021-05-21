const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const axios = require("axios");
const { authenticateToken, generateAccessToken } = require("./auth/auth");
const db = require("./db/db");
const { UserModel } = require("./models/userModel");

const app = express();

const PORT = process.env.PORT | 9000;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(authenticateToken);

app.get("/", (req, res) => {
  console.log(".........................");
  const url = "https://www.economist.com/";

  puppeteer
    .launch()
    .then((browser) => browser.newPage())
    .then((page) => {
      return page.goto(url).then(function () {
        return page.content();
      });
    })
    .then((html) => {
      // console.log(html);

      const $ = cheerio.load(html);
      const news = [];
      let k = 1;

      $("#content > section").each(function () {
        let z = 1;

        // console.log($(this).children().length);
        // console.log($(this).children("div").children().length);
        // console.log($(this).children().children().children().length);
        let id = 1;
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

            // console.log($(this).find("span").text());
          });

        // $(this)
        //   .children("div")
        //   //   .find(".ds-layout-grid > div")
        //   .each(function () {
        //     console.log(
        //       "///////////" + $(this).children("div").length + " ",
        //       z++
        //     );
        //   });
        // const heading = $(this).find("div > h3 > a > span").text();
        // const description = $(this).find("div > div > div > p").text();
        // news.push({
        //   heading,
        //   description,
        // });

        // const image = $(this).find("div > div > div > div > img").attr('src');
        //   .each(function () {
        //     console.log("zzzzzzzzzzzzzzz", z++);
        //   });
        console.log("kkkkkkkkkkkkkkk", k++);
        // console.log($(this));
      });
      console.log("news", news);
      res.status(200).send({ data: news });
      //   $("#content").each(function () {
      //     console.log({
      //       title: $(this).text(),
      //     });
      //     newsHeadlines.push({
      //       title: $(this).text(),
      //     });
      //   });
      //   console.log(
      //     "div",
      //     $("#content > section > div > div > div > div > h3 > a > span").text()
      //   );
      //   res.send(newsHeadlines);
    })
    .catch(console.error);
});

app.post("/login", async (req, res) => {
  const { password, email } = req.body;

  UserModel.findOne({ where: { password, email } })
    .then(async (user) => {
      if (!user) {
        res.send({ status: 0, message: "You have enter wrong credentials." });
      } else {
        const token = await generateAccessToken();
        res.send({
          status: 1,
          message: "success",
          userId: user.id,
          userName: user.name,
          token,
        });
      }
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/sign-up", async (req, res) => {
  const { password, email, name } = req.body;
  console.log("data", {
    name,
    email,
    password,
  });

  UserModel.create({
    name,
    email,
    password,
  })
    .then((data) => {
      console.log("data", data);
      res.send(data);
    })
    .catch((err) => res.status(400).send(err));
});

app.get("/token", (req, res) => {
  res.send({ data: "abc" });
  console.log("middle ware...............1233");
});

app.post("/read-artical", authenticateToken, (req, res) => {
  const { link = "" } = req.body;
  const url = `https://www.economist.com${link}`;

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
});

app.listen(PORT, () => {
  db.sync({ alert: true });
  console.log(`server is runing on Port ${PORT}`);
});
