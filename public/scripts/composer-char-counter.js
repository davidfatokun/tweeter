$(document).ready(function () {
  // Update the text area character count and color
  $('#tweet-text').on("input", function () {
    let inputLength = $(this).val().length;
    $('.counter').text(function () {
      if (inputLength > 140) {
        $(this).css('color', 'red');
      } else {
        $(this).css('color', 'black');
      }
      return 140 - inputLength;
    });
  });
});

