"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection('tweets').insertOne(newTweet);
        callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
        db.collection('tweets').find().toArray((err, results) => {
        callback(null, results);
        });

    },

    //Updates the like array of a tweet
    updateLike: function(target, user, callback) {
        if(db.collection('tweets').find({ $elemMatch: { tweetID: target, likedBy: { $not: user }} })) {
            db.collection('tweets').update({ tweetID: target }, { $set: { likedBy: [user] }});
        }
        // else {
        //     db.collection('tweets').update({ tweetID: target }, { $set: { likedBy: [user] }});
        // }
        callback(null, true);
    },

    //Remove user from array of likes
    editLike: function(target, user, callback) {
        db.collection('tweets').update({ tweetID: target }, { $pull: { likedBy: user }});
        callback(null, true);
    }
  };
}
