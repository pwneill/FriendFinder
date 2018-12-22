var userData = require("../data/friends.js");

var bodyParser = require("body-parser");

module.exports = function(app) {
  // A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
  app.get("/api/friends", function(req, res) {
    res.json(userData);
    console.log(userData);
  });

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post("/api/friends", function(req, res) {
    var user = req.body.scores;
    var userScore = [];
    user.forEach(function(score) {
      userScore.push(parseInt(score));
    });

    var bestMatch = {};

    for (j = 0; j < userData.length; j++) {
      var pol = userData[j];
      var scoreDiff = 0;

      for (i = 0; i < 10; i++) {
        scoreDiff += Math.abs(pol.scores[i] - userScore[i]);
      }

      if (
        scoreDiff < bestMatch.scoreDiff ||
        bestMatch.scoreDiff === undefined
      ) {
        bestMatch = {
          name: pol.name,
          description: pol.description,
          scores: pol.scores,
          scoreDiff: scoreDiff
      }} 
    }
    res.json(bestMatch)
  });
};
