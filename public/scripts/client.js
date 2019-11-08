/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function(tweet) {

    const tweetArticleMarkup = `
        <article class="tweetsArticle">
            <div class="tweetsHeader">
                <span class="tweetsHeaderUser">
                    <img class="tweetsHeaderPicture" src=${tweet.user.avatars}>
                    <span class="tweetsHeaderUserName">${tweet.user.name}</span>
                </span>
                <span class="tweetHeaderHandle">${tweet.user.handle}</span>
            </div>
            <div class="tweetsBody">
                <p class="tweetsBodyText">${escape(tweet.content.text)}</p>
            </div>
            <div class="tweetsFooter">
                <span class="tweetsFooterDaysPast">
                    10 Days ago
                </span>
                <span class="tweetsFooterButtonContainer">
                    <img class="tweetsFooterButton" src="https://img.icons8.com/office/16/000000/flag--v1.png">
                    <img class="tweetsFooterButton" src="https://img.icons8.com/ultraviolet/40/000000/refresh.png">
                    <img class="tweetsFooterButton" src="https://img.icons8.com/ultraviolet/40/000000/like.png">
                </span>
            </div>
        </article>
        `;
    return tweetArticleMarkup;
  };

  const renderTweets = function(tweets) {
    for (tweet of tweets) {
      $(".tweetsContainer").prepend(createTweetElement(tweet));
    }
  }

  const $tweetSubmit = $("#tweetSubmit");
  $tweetSubmit.submit(function(e) {
    e.preventDefault();
    const newTweetText = $(this).serialize();
    const newTweetTextLength = newTweetText.length - 5;
    if (newTweetTextLength <= 0 || newTweetTextLength > 140) {
      alert("Tweet text size not valid, please resubmit Tweet");
    } else {
      $.ajax({
        crossOrigin: true,
        type: "POST",
        url: "/tweets/",
        data: $(this).serialize(),
        success: function(data) {
          loadTweets();
        }
      });
    }
  });

  const loadTweets = function() {
    $.ajax("/tweets/", {
      type: "GET",
    }).then(function(response) {
      renderTweets(response);
    });
  }

  loadTweets();

  const $navDropDown = $(".navDropDown");
  $navDropDown.on("click", function(e) {
    $(".newTweetContainer").animate({ height: 'toggle' });

    // if (newTweetsContainer.css("display") === "none") {
    //   newTweetsContainer.css("display", "inline-block");
    // } else {
    //   newTweetsContainer.css("display", "none");
    // }
  });
});