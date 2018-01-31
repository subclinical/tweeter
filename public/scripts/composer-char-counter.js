$(document).ready(function() {
  $('.new-tweet textarea').on('input', function(event) {
    let $count = $(this).closest('form').find('.counter');
    $count.text(140 - this.value.length);
    if(this.value.length > 140) {
      $count.css('color', 'red');
    } else {
      $count.css('color', 'black');
    }
  });
});