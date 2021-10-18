const express = require("express");
const request = require("request");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const mongoose = require('mongoose');
require("dotenv").config();

const MongoDBURI = process.env.MONGO_URI
mongoose.connect(MongoDBURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, (err) => {
  if(err) console.log("can't connect to db")
  else console.log("connected to db successfully")
});

const app = express();

const PORT = process.env.PORT || 8080;

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));
// cookie parser middleware
app.use(cookieParser());

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.set("views", "./views");
app.set("view engine", "ejs");

require('./routes')(app);

app.listen(PORT, () => {
  console.log(`The server listening at http://localhost: ${PORT}`);
});

module.exports = app;
