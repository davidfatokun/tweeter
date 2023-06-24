// const { format } = require('timeago.js');
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  const createTweetElement = function (tweet) {
    const userName = tweet.user.name;
    const userAvatar = tweet.user.avatars;
    const handle = tweet.user.handle;
    const text = tweet.content.text;
    const timestamp = timeago.format(tweet.created_at);

    let $tweet = $(`
  <article class="tweet">
    <header id="tweet-superscript">
      <span> <img class="avatar" src="${userAvatar}" width="100" height="100" />${userName}</span>
      <h3>${handle}</h3>
    </header>
    <p>${text}</p>
    <hr>
    </hr>
    <footer id="icons">
      <span>${timestamp}</span>
      <div>
        <a href="#" class="icon"><i name="flag" class="fas fa-flag"></i></a>
        <a href="#" class="icon"><i class="fas fa-heart"></i></a>
        <a href="#" class="icon"><i class="fas fa-retweet"></i></a>
      </div>
    </footer>
  </article>
  `);
    return $tweet;
  }

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('#posted-tweets').empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#posted-tweets').prepend($tweet);
    }
  }

  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (tweetPostsJSON) {
        renderTweets(tweetPostsJSON);
      });
  }

  loadTweets();

  const onSubmit = $("form").on("submit", function (event) {
    event.preventDefault();
    if ($('#tweet-text').val().length === 0) {
      alert("Tweet cannot be empty");
    }
    if ($('#tweet-text').val().length > 140) {
      alert("Tweet is over 140 characters");
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $(this).serialize(),
        success: (data) => {
          console.log("this request was a success")
          loadTweets();
        },
        error: (error) => {
          console.log("this request failed, here is the error", error)
        },
      });
    }
  });
});
