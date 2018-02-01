"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      tweetID: generateRandomString(),
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      likedBy: []
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.post('/liked', function(req, res) {
    if(!req.body.id && !req.body.user) {
      res.status(400).send();
      return;
    }
    DataHelpers.updateLike(req.body.id, req.body.user, (err) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.put('/liked', function(req, res) {
    if(!req.body.id && !req.body.user) {
      res.status(400).send();
      return;
    }
    DataHelpers.editLike(req.body.id, req.body.user, (err) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

}

//generates 6 alphanumeric character strings using Math.random method
function generateRandomString() {
  var str = "";
  while(str.length < 6) {

    var candidate = Math.floor(Math.random() * 74 + 48);
    if(candidate >= 48 && candidate <= 57 || candidate >= 65 && candidate <= 90 || candidate >= 97 && candidate <= 122) {
      str += String.fromCharCode(candidate);
    }
  }
  return str;
}