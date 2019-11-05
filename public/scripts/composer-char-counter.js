$(document).ready(function() {
  // --- our code goes here ---
  console.log("JQUERY has loaded in client.js");

  $newTweetTextArea = $('.newTweetTextBox');
  $newTweetCharacaterCounter = $('.newTweetCharacterCounter');
  $newTweetTextArea.on('keydown', function() {
    console.log(this);
    let textLength = this.textLength;
    $newTweetCharacaterCounter[0].textContent = 140 - textLength;
  });
})