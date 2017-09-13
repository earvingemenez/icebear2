(function () {
  'use strict';

  angular
    .module('books.icebear')
    .controller('BookController', BookController)
    .controller('BookEditorController', BookEditorController)
  ;


  /* BOOK CONTROLLER
   *  @desc : controller which contains methods related to the
   *          book module
   */
  function BookController ($scope, $state) {

  };


  /* BOOK EDITOR CONTROLLER
   *  @desc : controller which contains methods related to
   *          editing the book
   */
  function BookEditorController ($scope, $state, PageService) {

    this.click = function (event) {
      /* method that will set a specific word to focus
       * when clicked.
       */
      event.stopPropagation();

      var elem = event.target;

      // make sure this will not triggered when page is clicked
      if (event.target.className !== 'page') {
        // focus a specific word
        PageService.setfocus(elem);
      } else {
        // this should go to the last child
        if (elem.children.length > 0) {
          var word = PageService.getlastword(elem);
          PageService.setfocus(word);
        } else {
          // add an inital span.cw for the first word
          PageService.newword(elem, true);
        }
      }
    };

    this.typeText = function (event) {
      /* catch event when typing while word is on focus
       */
      event.stopPropagation();

      var curWord = document.getElementsByClassName('cw')[0];
      var page = curWord.parentNode;

      if (event.keyCode === 32){
        // check if the key pressed is space. space means new word
        event.preventDefault(); // prevent scrolldown
        PageService.newword(page, curWord);

      } else if (event.keyCode === 8) {
        // check if there is a highlighted word. remove the whole
        // word container.
        var highlighted = PageService.gethighlighted(page);
        if (highlighted !== null) {
          var newtext = PageService.deletetext(curWord.innerText, highlighted.toString());
          // curWord.innerText = newtext;
          return;
        }

        // check if current word is empty. delete the word container
        // and set the focus to the previous word.
        if (curWord.innerText === "") {
          PageService.deleteword(page, curWord);
          return;
        }

        // check if the key pressed is backspace. delete the last
        // letter from the current word.
        curWord.innerText = curWord.innerText.slice(0, -1);
        return;

      } else if (
          (event.keyCode > 47 && event.keyCode < 91) ||
          (event.keyCode > 95 && event.keyCode < 112) ||
          (event.keyCode > 185 && event.keyCode < 223)
        ) {
        // check the key pressed if it is alphanumeric.
        curWord.innerHTML = PageService.addtext(curWord, event.key);
        return;
      }
    }

  };


})();