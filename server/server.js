const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const db = require("./db/db");

const app = express();

const PORT = process.env.PORT | 9000;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/", require("./routers/router"));

app.listen(PORT, () => {
  db.sync({ alert: true });
  console.log(`server is runing on Port ${PORT}`);
});
