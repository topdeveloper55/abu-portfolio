module.exports = function(app) {
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
      
}