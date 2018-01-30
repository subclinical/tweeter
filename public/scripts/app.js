/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//mock database
const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

// var $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like

$(document).ready(function() {

//invoking tweets to be rendered
renderTweets(tweetData);

  //showing icons on mouseover
  $('article').on({
    mouseover: function() {
      $(this).find('footer i').addClass('opacity');
    },
    mouseleave: function() {
      $(this).find('footer i').removeClass('opacity');
    }
  });

// var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
});


//render html article element with json data
function createTweetElement(tweet) {
  let $tweet = $("<article>").addClass("tweet");
  let avatar = $('<img>').attr('src', tweet.user.avatars.small);
  let handle = $('<span>').html(tweet.user.handle);
  let icon1 = '<i class="fa fa-flag" aria-hidden="true"></i>';
  let icon2 = '<i class="fa fa-retweet" aria-hidden="true"></i>';
  let icon3 = '<i class="fa fa-heart" aria-hidden="true"></i>';
  let date = new Date(tweet.created_at).toLocaleString("en-US", {timeZone: "America/New_York"});
  $('<header>').html(tweet.user.name).appendTo($tweet).prepend(avatar).append(handle);
  $('<p>').html(tweet.content.text).appendTo($tweet);
  $('<footer>').html(date).appendTo($tweet).prepend('<hr>').append(icon3 + icon2 + icon1);
  // $('.tweet-container').append($tweet);
  return $tweet;
}

//appends each article to index.html
function renderTweets(tweets) {
  for(let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    console.log($tweet);
    $('#tweet-container').append($tweet);
  }
}