const User = require("../model/user");
const Contact = require("../model/contact");
let session;

module.exports = function (app) {
  //display home page
  app.get("/", (req, res) => {
    res.render("index");
  });

  //display contact page
  app.get("/contact", (req, res) => {
    res.render("contact");
  });

  //display about me page
  app.get("/aboutme", (req, res) => {
    res.render("aboutme");
  });

  //display projects page
  app.get("/projects", (req, res) => {
    res.render("projects");
  });

  //display services page
  app.get("/services", (req, res) => {
    res.render("services");
  });

  //display login page
  app.get("/login", (req, res) => {
    res.render("login", { message: "" });
  });

  //handle loging request
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.log(err);
      } else if (user) {
        if (password != user.password)
          res.render("login", { message: "Password is not correct" });
        else {
          session = req.session
          session.userid = username
          res.redirect("/contactsList");
        }
      } else {
        res.render("login", { message: "Username doesn't exist" });
      }
    });
  });

  //display contactList page
  app.get("/contactsList", (req, res) => {
    session = req.session;
    if (session.userid) {
      Contact.find({})
        .sort("firstName")
        .exec((err, data) => {
          if (err) res.send("err occured");
          else res.render("contactsList", { records: data });
        });
    }
    else res.redirect("/login")
  });

  //handle adding the contact
  app.post("/contact", (req, res) => {
    const contact = new Contact(req.body);
    contact.save((err, data) => {
      console.log("err", err);
      if (err) res.send("err occured");
      else res.redirect("/");
    });
  });

  //handle deleting contact
  app.post("/deleteContact", (req, res) => {
    let id = req.body.deleteId
    Contact.findByIdAndRemove(id, (err, data) => {
      if(err) res.send("error occured")
      else res.redirect('/contactsList')
    })    
  });

  //display update contact
  app.post("/updateContact", (req, res) => {
    let id = req.body.updateId
    Contact.findById(id, (err, data) => {
      if(err) res.send("error occured")
      else res.render('updateContact', {contact: data})
    })    
  });

  //handle update
  app.post("/updateExec", (req, res) => {
    let { updateId, ...updateData } = req.body

    Contact.findByIdAndUpdate(updateId, updateData, (err, data) => {
      if(err) res.send("error occured")
      else res.redirect('/contactsList')
    })    
  });
};
