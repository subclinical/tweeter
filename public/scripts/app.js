/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //new tweet submission event handler
  $('#submit-tweet').on('click', function(event) {
    let msg = $(this).closest('form').find('textarea');
    event.preventDefault();
    console.log(msg.val().length);
    //tweet too long
    if(msg.val().length > 140) {
      alert('Your tweet is too long!');
      console.log(msg.length);
      return;
    }
    //no text input
    if(msg.val().length === 0) {
      alert('Really wish you\'d say something...');
      return;
    }
    //valid tweet submitted
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
      //clear textarea and counter upon submission
      $('form textarea').val('');
      $(this).closest('form').find('.counter').text(140);
    }
  });

  //toggle new-tweet section
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
});