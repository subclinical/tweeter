$(document).ready(function() {
  console.log('Hi it me');
  $('.new-tweet textarea').on('input', function(event) {
    let $count = $(this).closest('form').find('.counter');
    $count.html(140 - this.value.length);
    if(this.value.length > 140) {
      $count.css('color', 'red');
    } else {
      $count.css('color', 'black');
    }
  });
});