(function () {
  'use strict';

  angular
    .module('books.icebear')
    .service('PageService', PageService)
    .service('BookService', BookService)
  ;

  var API_URL = '/api/books/';


  /* BOOK SERVICE
   *  @desc : service which contains methods to be
   *          used for creating/managing a book
   */
  function BookService ($http) {
    var fns = {
      book   : {},
      create : create,
      update : update,
      detail : detail
    };

    return fns;


    function create (d) {
      // create a blank book with initial data
      return $http.post(API_URL, d);
    };

    function update (id, d) {
      // update the book detail
      return $http.post(API_URL + id + '/', d);
    };

    function detail (id) {
      return $http.get(API_URL + id + '/');
    };
  };

  function BookDataService ($http) {
    var fns = {
      chapters : chapters,
      chapter  : getChapter,
      pages    : pages,
      page     : getPage
    };

    return fns;


    function chapters (bookId) {
      return $http.get(API_URL + bookId + '/');
    };

    function getChapter (bookId, chapterId) {
      return $http.get(API_URL + bookId + 'chapters/');
    };

    function pages (bookId, chapterId) {
      return $http.get(API_URL + bookId + 'chapters/' + chapterId + '/');
    };

    function getPage (bookId, chapterId, pageId) {
      return $http.get(API_URL + bookId + 'chapters/' + chapterId + '/pages/' + pageId '/');
    };

  };

  /* PAGE SERVICE
   *  @desc : service which contains helpers to be used
   *          in the book page.
   */
  function PageService ($http) {
    var fns = {
      cursor         : "<span class='cursor'></span>",
      cursoroffset   : 0,
      setfocus       : setfocus,
      getlastword    : getlastword,
      getnextword    : getnextword,
      newword        : newword,
      deleteword     : deleteword,
      deletetext     : deletetext,
      addtext        : addtext,
      gethighlighted : gethighlighted
    };

    return fns;


    /* Helper methods */
    function setfocus (word) {
      // set the focus indicator to the
      // current word.
      var s = word.parentElement.children;

      for (var i=0; i<s.length; i++) {
        s[i].classList.remove('cw');
      }
      word.classList.add('cw');

      return true;
    };

    function getlastword (parent) {
      // get the child elements of
      // the specified parent element.
      var c = parent.children;
      return c[c.length-1];
    };

    function getnextword (word) {
      // get the next child element.
      return word.nextElementSibling;
    };

    function newword (page, word, blank) {
      // add a new word container to the page
      var w = document.createElement('SPAN');
      w.innerHTML = fns.cursor;
      blank = blank || false;

      if (blank || word.nextElementSibling === null) {
        page.appendChild(w);
      } else {
        page.insertBefore(w, word.nextElementSibling);
      }

      fns.setfocus(w);
    };

    function deleteword (page, word) {
      // delete the current word container and set the
      // focus to the previous word.
      var prevWord = word.previousElementSibling;

      if (prevWord !== null) {
        // delete the current word
        page.removeChild(word);
        fns.setfocus(prevWord);
      }
    };

    function deletetext (word, text) {
      // delete the text in the word
      var start = word.indexOf(text);
      var end = (start + text.length);
      return word.slice(0, start) + word.slice(end, word.length);
    };

    function addtext (word, key) {
      return word.innerText + key;
    };

    function gethighlighted (page) {
      // get the highlighted word container
      var selected = window.getSelection().baseNode.parentNode;

      if (selected.parentNode === page && window.getSelection().type === "Range") {
        return window.getSelection();
      } else {
        return null;
      }
    }
  };

})();