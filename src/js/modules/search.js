import Form from './form';

export default class Search extends Form {
  constructor(...args) {
    super(...args);

    this.handlers = this.handlers.bind(this);
    this._sendSearchRequest = this._sendSearchRequest.bind(this);
    this._validateSearchForm = this._validateSearchForm.bind(this);
  }

  _validateSearchForm() {
    const { validation } = this._dependencies;
    const form = this._currentFormElement();
    const { searchInput } = form;
    const queryResult = validation._validateInput(searchInput);

    if (queryResult) {
      this._setButtonActive();
    } else {
      this._setButtonDisabled();
    }
  }

  _sendSearchRequest(event) {
    event.preventDefault();
    const { search } = this._elements;

    const searchQuery = this._getInputFormValues(event, search).join(' ');

    if (searchQuery) {
      const { newsApi, results } = this._dependencies;

      this._setButtonDisabled();
      this._setInputsDisabled();

      results.renderLoader();

      newsApi.getNews(searchQuery)
        .then((res) => {
          if (res.status === 'ok' && res.articles.length > 0) {
            results.initialResults(res.articles, searchQuery);
          } else if (res.status === 'ok' && res.articles.length <= 0) {
            results.renderNotFound();
          } else {
            throw new Error(res.message);
          }
        })
        .then(() => {
          this._setButtonActive();
          this._setInputsActive();
        })
        .catch((err) => {
          results.renderError();
          this._setError('page', err.message);
          this._setButtonActive();
          this._setInputsActive();
        });
    }
  }

  handlers() {
    this._unmount();
    this._mountLocalHandlers([
      { element: this._container, handlers: [this._validateSearchForm], event: 'input' },
      { element: this._container, handlers: [this._sendSearchRequest], event: 'submit' }]);
  }
}
