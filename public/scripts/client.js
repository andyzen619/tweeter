/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  /**
   * An escape function that takes an html string and returns with no html tags
   * @param {string} str 
   */
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /**
   * Returns a article markup html that contain contents of tweet
   * @param {*} tweet 
   */
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

  /**
   * Renders the articles for a list of tweet objects and inserts them into the tweets container html
   * @param {*} tweets 
   */
  const renderTweets = function(tweets) {
    for (tweet of tweets) {
      $(".tweetsContainer").prepend(createTweetElement(tweet));
    }
  }

  /**
   * Loads all tweets onto tweets container html
   */
  const loadTweets = function() {
    $.ajax("/tweets/", {
      type: "GET",
    }).then(function(response) {
      renderTweets(response);
    });
  }

  //Sets the submit ajax function to post a new tweet
  const $tweetSubmit = $("#tweetSubmit");
  $tweetSubmit.submit(function(e) {
    e.preventDefault();
    const newTweetText = $(this).serialize();

    //Checks for correct formatting of text box when submitting new tweet.
    const newTweetTextLength = newTweetText.length - 5;
    if (newTweetTextLength <= 0 || newTweetTextLength > 140) {
      $(".newTweetsErrorMessageContainer").slideDown();
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
      $(".newTweetTextBox").val("");
      $(".newTweetCharacterCounter")["0"].textContent = 140;
      $(".newTweetsErrorMessageContainer").slideUp();
    }
  });

  loadTweets();

  //Provides toggle down behaviour for the new tweet container when clicking on top right arrow.
  const $navDropDown = $(".navDropDown");
  $navDropDown.on("click", function(e) {
    $(".newTweetContainer").animate({ height: 'toggle' });
  });
});