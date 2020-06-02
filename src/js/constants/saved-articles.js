const SAVED_OPTIONS = {
  container: document.querySelector('.results'),
  elements: {
    resultsTemplate: document.querySelector('#results'),
    resultsErrorTemplate: document.querySelector('#results-error'),
    noResultsTemplate: document.querySelector('#not-found'),
    loadingTemplate: document.querySelector('#loader'),
    showMoreButtonTemplate: document.querySelector('#show-more'),
    amountKeywords: document.querySelector('#amount-keywords'),
    keywords: document.querySelector('#keywords'),
    keywordsOther: document.querySelector('#other-keywords'),
    userSpan: document.querySelector('#user-name'),
    amountSpan: document.querySelector('#amount-articles'),
  },
  props: {
    page: 'saved',
  },
};

export default SAVED_OPTIONS;
