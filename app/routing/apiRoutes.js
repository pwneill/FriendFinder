var candidates = require("../data/candidates.js");

var voters = require("../data/voters.js");

var bodyParser = require("body-parser");

  module.exports = function(app) {
    
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    // A GET route with the url /api/candidates. This will be used to display a JSON of all possible candidates.
    app.get("/api/candidates", function(req, res) {
      res.json(candidates);
      // console.log(candidates);
    });

    app.get("/api/voters/:candidate", function(req, res) {

      var similarVoters = [];

      for (i = 0; i < voters.length; i++) {
        var candidate = voters[i].matchedPolitician.replace(/\s/g, '').toLowerCase()
        console.log(candidate)
        if (candidate === req.params.candidate) {
          similarVoters.push(voters[i])
        }
      }
      res.json(similarVoters)
    })
  
    // A GET route with the url /api/voters. This will be used to display a JSON of all possible voters.
    app.get("/api/voters", function(req, res) {
      res.json(voters);
      // console.log(candidates);
    });
  // A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
  app.post("/api/voters", function(req, res) {
    var user = req.body;
    var scores = user.scores;
    var userScore = [];
    scores.forEach(function(score) {
      userScore.push(parseInt(score));
    });

    var bestMatch = {};

    for (j = 0; j < candidates.length; j++) {
      var pol = candidates[j];
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
          image: pol.photo,
          description: pol.description,
          scores: pol.scores,
          scoreDiff: scoreDiff
        };
      }
    }
    newVoter = {
      name: user.name,
      photo: user.photo,
      description: user.description,
      scores: user.scores,
      matchedPolitician: bestMatch.name 
    }
    
    console.log(newVoter)
    voters.push(newVoter)
    res.json(bestMatch);
  });
};
