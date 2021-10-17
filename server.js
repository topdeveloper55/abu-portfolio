const express = require("express");
const request = require("request");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("public"));

app.set("views", "./views");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/aboutme", (req, res) => {
  res.render("aboutme");
});

app.get("/projects", (req, res) => {
  res.render("projects");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/thanks", (req, res) => {
  console.log(req.body);

  const { firstName, lastName, contactNumber, emailAddress, message } =
    req.body;
  res.render("index")
});

app.listen(PORT, () => {
  console.log(`The server listening at http://localhost: ${PORT}`);
});

module.exports = app;
