/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  const data = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1614019033053
  };
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
//   }
// ];
  const createTweetElement = function(tweet) {
    let $tweetElm = $(
      `<article class= "tweets">
    <header>
      <div>
        <img src="${tweet.user.avatars}">
        Newton
      </div>
      <div class="handle">${tweet.user.handle}</div>
    </header>
    <p>${tweet.content.text}</p>
    <footer>
      <div>${tweet.created_at}</div>
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
  // const renderTweets = function(tweets) {
  //   for (const tweet of tweets) {

  //   }
  // };
  const $tweet = createTweetElement(data);
  console.log($tweet);
  $('#tweets-container').append($tweet);
});


