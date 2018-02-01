/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
    loadTweets();

  //new tweet submission event handler
  $('#submit-tweet').on('click', function(event) {
    let msg = $(this).closest('form').find('textarea');
    event.preventDefault();
    //tweet too long
    if(msg.val().length > 140) {
      alert('Your tweet is too long!');
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

  //like event handler
  $('body').on('click', '.fa-heart', function(event) {
      let id = $(event.target).closest('article').attr('id');
      let $counter = $(event.target).closest('article').data('likeCounter');
      let data = { id: id, user: 'currentUser' };
    //if target tweet is not yet liked by user
    if(!$(event.target).data().liked) {
      $(event.target).closest('article').data('likeCounter', $counter + 1);
      $(event.target).closest('article').find('.fa-heart').text($(event.target).closest('article').data('likeCounter'));
      $.ajax({
        url: '/tweets/liked',
        method: 'POST',
        data: data,
        success: function() {
          console.log('User added to like list.');
        }
      });
      $(event.target).data('liked', true);
      //if user already liked target
    } else {
      $(event.target).closest('article').data('likeCounter', $counter - 1);
      $(event.target).closest('article').find('.fa-heart').text($(event.target).closest('article').data('likeCounter'));
      $.ajax({
        url: '/tweets/liked',
        method: 'PUT',
        data: data,
        success: function() {
          console.log('User added to like list.');
        }
      });
      $(event.target).data('liked', false);
      if($(event.target).closest('article').data('likeCounter') === 0) {
        $(event.target).closest('article').find('.fa-heart').text('');
      }
    }
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

//render html article element with json data
function createTweetElement(tweet) {
  let $tweet = $("<article id=" + tweet.tweetID + ">").addClass("tweet");
  let avatar = $('<img>').attr('src', tweet.user.avatars.small);
  let handle = $('<span>').text(tweet.user.handle);
  // let butt = '<button type="submit" class="like">Like</button>';
  let icon1 = '<i class="fa fa-flag" aria-hidden="true"></i>';
  let icon2 = '<i class="fa fa-retweet" aria-hidden="true"></i>';
  let icon3 = '<i class="fa fa-heart" aria-hidden="true"></i>';
  let date = new Date(tweet.created_at).toLocaleString("en-US", {timeZone: "America/New_York"});
  $('<header>').text(tweet.user.name).appendTo($tweet).prepend(avatar).append(handle);
  $('<p>').text(tweet.content.text).appendTo($tweet);
  $('<footer>').text(date).appendTo($tweet).prepend('<hr>').append(icon3 + icon2 + icon1);
  $tweet.data({'likeCounter': tweet.likedBy.length,'likedBy': tweet.likedBy });
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

});