/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1614019033053
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1614105433053
//   },
//   {
//     "user": {
//       "name": "Batman",
//       "avatars": "../images/Batman-Mask.png",
//       "handle": "@bruce"
//     },
//     "content": {
//       "text": "Je pense , donc je suis Batman"
//     },
//     "created_at": 1613008033053
//   },
//   {
//     "user": {
//       "name": "Robin",
//       "avatars": "../images/robin.png",
//       "handle": "@boyWonder"
//     },
//     "content": {
//       "text": "My real name is Richard but my friends call me Dick"
//     },
//     "created_at": 1613100533053
//   }
// ];
const createTweetElement = function(tweet) {
  const aDay = 24 * 60 * 60 * 1000; //length of a day in ms
  const now = Date.now();
  const tweetDate = tweet.created_at;
  const daysAgo = Math.floor((now - tweetDate) / aDay);
  let $tweetElm = $(
    `<article class= "tweets">
  <header>
    <div>
      <img src="${tweet.user.avatars}">
      <span>${tweet.user.name}<span>
    </div>
    <div class="handle">${tweet.user.handle}</div>
  </header>
  <p>${tweet.content.text}</p>
  <footer>
    <div>${daysAgo} days Ago </div>
    <span>
      <img src="./images/baseline_thumb_up_alt_black_18dp.png">
      <img src="./images/outline_autorenew_black_18dp.png">
      <img src="./images/outline_bookmark_black_18dp.png">
    </span>
  </footer>
  </article>`
  );
  return $tweetElm;
};

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
    
  }
};

const loadTweets = function() {
  $.ajax({
    url: "/tweets",
    method: "GET",
  })
    .then(function(tweets) {
      console.log('load tweets ok',tweets);
      renderTweets(tweets);
    });
};




$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    console.log('its the submit event default being prevented');
    if (parseInt($("#counter").val()) === 140) {
      alert("your tweet is blank");
      return;
    } else if (parseInt($("#counter").val()) < 0) {
      alert("your not writing a novel here!");
      return;
    } else {
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $("form").serialize()
      })
        .then(res => {
          console.log(res, $("form").serialize());
        });
    }
    
  });
  loadTweets();
});


