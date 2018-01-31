/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // //showing icons on mouseover
  // $('article').on({
  //   mouseover: function() {
  //     $(this).find('footer i').addClass('opacity');
  //   },
  //   mouseleave: function() {
  //     $(this).find('footer i').removeClass('opacity');
  //   }
  // });

  $('#submit-tweet').on('click', function(event) {
    let msg = $(this).closest('form').find('textarea');
    event.preventDefault();
    console.log(msg.val().length);
    if(msg.val().length > 140) {
      alert('Your tweet is too long!');
      console.log(msg.length);
      return;
    }
    if(msg.val().length === 0) {
      alert('Really wish you\'d say something...');
      return;
    }
    if(msg.val().length <= 140 && msg.val().length > 0) {
      let query = msg.serialize();
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: query,
        success: function() {
          updateTweets();
        }
      });
      $('form textarea').val('');
    }
  });

  $('.compose').on('click', function(event) {
    $('.new-tweet').slideToggle('fast', function() {
      $(this).find('textarea').focus();
    });
  });

//render tweets real time
function updateTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function(tweets) {
      $('#tweet-container').prepend(createTweetElement(tweets[tweets.length-1]));
    }
  })
}

//access tweets database and renders them
function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function(tweets) {
      renderTweets(tweets);
    }
  });
}
    loadTweets();

// var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
});



//render html article element with json data
function createTweetElement(tweet) {
  let $tweet = $("<article>").addClass("tweet");
  let avatar = $('<img>').attr('src', tweet.user.avatars.small);
  let handle = $('<span>').text(tweet.user.handle);
  let icon1 = '<i class="fa fa-flag" aria-hidden="true"></i>';
  let icon2 = '<i class="fa fa-retweet" aria-hidden="true"></i>';
  let icon3 = '<i class="fa fa-heart" aria-hidden="true"></i>';
  let date = new Date(tweet.created_at).toLocaleString("en-US", {timeZone: "America/New_York"});
  $('<header>').text(tweet.user.name).appendTo($tweet).prepend(avatar).append(handle);
  $('<p>').text(tweet.content.text).appendTo($tweet);
  $('<footer>').text(date).appendTo($tweet).prepend('<hr>').append(icon3 + icon2 + icon1);
  // $('.tweet-container').append($tweet);
  return $tweet;
}

//appends each article to index.html
function renderTweets(tweets) {
  tweets = tweets.reverse();
  for(let tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('#tweet-container').append($tweet);
  }
}