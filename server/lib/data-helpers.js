"use strict";


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
    },

    //registers user in database
    signUp: function(info, callback) {
        db.collection('users').insertOne(info);
        console.log(db.collection('users').find());
        callback(null, true);
    },

    //checks login information
    logIn: function(info, callback) {
        // if(db.collection('users').find({ $elemMatch: { handle: info.handle, password: info.password }})) {
            db.collection('users').find({ handle: info.handle, password: info.password }).toArray((err, target) => {
            callback(null, target[0]);
            });
        // } else {
        //     callback(null, null);
        // }
    }
  };
}
