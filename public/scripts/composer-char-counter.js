$(document).ready(function() {
  $('#tweet-text').on("input", function() {
    var inputLength = $(this).val().length;
    $('.counter').text(function(){
      if (inputLength > 140) {
        $(this).css('color', 'red');
    } else {
        $(this).css('color', 'black');
    }
      return 140 - inputLength;
    });
  });
});

