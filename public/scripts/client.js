/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const initialTweets = [{
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

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
                <p class="tweetsBodyText">${tweet.content.text}</p>
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
      $(".tweetsContainer").append(createTweetElement(tweet));
    }
  }
  renderTweets(initialTweets);
});