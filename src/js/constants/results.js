const RESULTS_OPTIONS = {
  container: document.querySelector('.results'),
  elements: {
    resultsTemplate: document.querySelector('#results'),
    resultsErrorTemplate: document.querySelector('#results-error'),
    noResultsTemplate: document.querySelector('#not-found'),
    loadingTemplate: document.querySelector('#loader'),
    showMoreButtonTemplate: document.querySelector('#show-more'),
  },
};

export default RESULTS_OPTIONS;
