$(document).ready(function() {

  /**
   * Provides the character count indicator for new tweet container.
   */
  const countChar = function() {
    $newTweetTextArea = $('.newTweetTextBox');
    $newTweetCharacaterCounter = $('.newTweetCharacterCounter');
    $newTweetTextArea.on('keyup', function() {
      let textLength = 140 - this.textLength;
      if (textLength >= 0) {
        $newTweetCharacaterCounter[0].textContent = textLength;
      } else {
        $newTweetCharacaterCounter[0].textContent = 0;
      }
    });
  };

  countChar();
})