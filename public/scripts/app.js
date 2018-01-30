/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('article').on({
    mouseover: function() {
      $(this).find('footer i').addClass('opacity');
    },
    mouseleave: function() {
      $(this).find('footer i').removeClass('opacity');
    }
  });

});