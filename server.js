const express = require("express");
const request = require("request");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

require('./routes')(app);

const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`The server listening at http://localhost: ${PORT}`);
});

module.exports = app;
