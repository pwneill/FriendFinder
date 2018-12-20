var userData = require("../data/friends.js");

var bodyParser = require("body-parser");

// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(userData);
    console.log(userData);
  });

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post("/api/friends", function(req, res) {
    console.log(req.body);
    userData.push(req.body);
    res.json(true);
    // console.log(userData)
  });
};
