
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
  <p>${escape(tweet.content.text)}</p>
  <footer>
    <div>${daysAgo} days Ago </div>
    <span id="icons">
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
    $('#tweets-container').prepend($tweet);
  }
};

const loadTweets = function(action) {
  $.ajax({
    url: "/tweets",
    method: "GET",
  })
    .then(function(tweets) {
      console.log('load tweets ok',tweets);
      action(tweets);
    });
};

const renderNewTweet = function(tweets) {
  const $tweet = createTweetElement(tweets.pop());
  $('#tweets-container').prepend($tweet);
};
const errIcon = `<span class="material-icons">error_outline</span>`;

$(document).ready(function() {
  $("#navWrite").click(function() {
    console.log("it was clicked");
    $("#tweet-text").focus();
  });
  $("form").submit(function(event) {
    event.preventDefault();
    if (parseInt($("#counter").val()) === 140) {
      $("#notValid").html(`${errIcon}   Let's try that again`).slideDown(500, function() {
        $(this).fadeOut(3000);
        
      });
      return;
    } else if (parseInt($("#counter").val()) < 0) {
      $("#notValid").html(`<span class="material-icons">
      error_outline
      </span> You're not writing a novel here!`).slideDown(500, function() {
        $(this).fadeOut(3000);
      });
      return;
    } else {

      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $("form").serialize()
      })
        .then(res => {
          console.log(res, "posting this tweet: ", $("form").serialize());
          loadTweets(renderNewTweet);
          this.reset();
          $('#counter').text(140);
        });
    }
    
  });
  loadTweets(renderTweets);
});


