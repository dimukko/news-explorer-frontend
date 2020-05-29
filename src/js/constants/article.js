const ARTICLE_OPTIONS = {
  container: null,
  elements: {
    articleTemplate: document.querySelector('#article'),
    articleBookmark: document.querySelector('.article'),
    bookmarkLoggedinTemplate: document.querySelector('#bookmark-logged'),
    bookmarkNotLoggedTemplate: document.querySelector('#bookmark-notlogged'),
    bookmarkSavednewsTemplate: document.querySelector('#bookmark-saved'),
    articleTitle: '.article__title',
    articleText: '.article__text',
    articleDate: '.article__date',
    articleSource: '.article__source',
    articleImg: '.article__image',
    articleKeyword: '.article__search-keyword',
    articleLink: '.article__link',
  },
};

export default ARTICLE_OPTIONS;
