$(document).ready(function() {

  const countChar = function() {
    $newTweetTextArea = $('.newTweetTextBox');
    $newTweetCharacaterCounter = $('.newTweetCharacterCounter');
    $newTweetTextArea.on('keydown', function() {
      let textLength = 139 - this.textLength;
      if (textLength >= 0) {
        $newTweetCharacaterCounter[0].textContent = textLength;
      } else {
        $newTweetCharacaterCounter[0].textContent = 0;
      }
    });
  };

  countChar();
})