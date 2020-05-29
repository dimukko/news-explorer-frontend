import BaseComponent from '../components/BaseComponent';

export default class Results extends BaseComponent {
  constructor(type, ...args) {
    super(...args);
    this._type = type;
    this.renderLoader = this.renderLoader.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderNotFound = this.renderNotFound.bind(this);
    this.clearMarkup = this.clearMarkup.bind(this);
    this._showMore = this._showMore.bind(this);
    this._bookmarkHandler = this._bookmarkHandler.bind(this);
    this._toggleBookmarkDescriptionHandler = this._toggleBookmarkDescriptionHandler.bind(this);
    this._addBookmarkHandlers = this._addBookmarkHandlers.bind(this);

    this._alreadyRendered = {};
    this._lastArticleId = 0;
  }

  /* *
   * Очищает объект с массивом новостей и их id
  * */
  _clearAlreadyRendered() {
    this._alreadyRendered = {};
    this._lastArticleId = 0;
  }

  /* *
   * Присваивает новое id карточке с новостью
  * */
  _getNewId() {
    const lastId = this._lastArticleId;
    this._lastArticleId += 1;

    return lastId;
  }


  /* *
   * Добавляет новости id из базы сервера и аттрибут
  * */
  _addArticleServerId(articleId, articleServerId) {
    this._alreadyRendered[articleId].serverId = articleServerId;
    this._alreadyRendered[articleId].markup.setAttribute('data-saved', true);
  }

  /* *
   * Очищает аттрибут у новости и удаляет у неё серверный id
  * */
  _removeArticleServerId(articleId) {
    this._alreadyRendered[articleId].markup.removeAttribute('data-saved');
    delete this._alreadyRendered[articleId].serverId;
  }

  clearMarkup() {
    this._clearNodeContent(this._container);
  }

  removeVisible() {
    this._container.classList.remove('results_visible');
  }


  /* *
   * Рендер разметки из шаблона
  * */
  _renderMarkup(template) {
    this._removeBookmarkHandlers();
    this.clearMarkup();

    const markup = template.cloneNode(true).content;

    this._container.appendChild(markup);
  }

  _renderResultsMarkup() {
    const { resultsTemplate } = this._elements;
    this._container.classList.add('results_visible');
    this._renderMarkup(resultsTemplate);
  }

  renderLoader() {
    const { loadingTemplate } = this._elements;
    this._container.classList.add('results_visible');
    this._renderMarkup(loadingTemplate);
  }

  renderError() {
    const { resultsErrorTemplate } = this._elements;
    this._container.classList.add('results_visible');
    this._renderMarkup(resultsErrorTemplate);
  }

  renderNotFound() {
    const { noResultsTemplate } = this._elements;
    this._container.classList.add('results_visible');
    this._renderMarkup(noResultsTemplate);
  }

  _removeShowMoreButton() {
    this._removeHandlers('.results__more-button', [this._showMore], 'click');
    this._container.querySelector('.results__more-button').remove();
  }

  _renderShowMoreButton() {
    const { showMoreButtonTemplate } = this._elements;
    const buttonMarkup = showMoreButtonTemplate.cloneNode(true).content;
    this._container.appendChild(buttonMarkup);
    this._setHandlers('.results__more-button', [this._showMore], 'click');
  }


  /* *
   * Добавляет новость в блок новостей
  * */
  _addArticle(article) {
    const articleList = this._container.querySelector('.article-list');
    articleList.appendChild(article);
  }

  /* *
   * Отправляет новости на добавление в блок новостей после их
   * создания через внешний класс
  * */
  _renderArticles() {
    const {
      news, createArticleInstance, ARTICLE_OPTIONS, auth,
    } = this._dependencies;
    const { formatNewsDate } = this._dependencies.dates;
    const unit = news.getOneNews();
    const currentNews = unit.items;

    if (unit.isLastNews) {
      this._removeShowMoreButton();
    }

    currentNews.forEach((item) => {
      const dataId = this._getNewId();
      let articleProps;

      if (this._type === 'saved') {
        const {
          _id, keyword, title, text, image, date, source, link,
        } = item;

        articleProps = {
          isLogged: true,
          type: this._type,
          dataId,
          serverId: _id,
          keyword,
          source,
          link,
          title,
          description: text,
          urlToImage: image,
          publishedAt: date,
          formatedDate: formatNewsDate(date),
        };
      } else {
        const {
          title, description, urlToImage, publishedAt, source, url,
        } = item;

        articleProps = {
          isLogged: auth.getUserAuthStatus(),
          type: 'main',
          dataId,
          keyword: this._keyword,
          source: source.name,
          link: url,
          title,
          description,
          urlToImage,
          publishedAt,
          formatedDate: formatNewsDate(publishedAt),
        };
      }

      const newArticleInstance = createArticleInstance(articleProps, ARTICLE_OPTIONS);
      const newArticleMarkup = newArticleInstance.getArticleMarkup();

      this._addArticle(newArticleMarkup);

      this._alreadyRendered[dataId] = {
        dataId,
        instance: newArticleInstance,
        markup: newArticleMarkup,
      };
    });
  }

  _showMore() {
    this._renderArticles();
    this._addBookmarkHandlers();
  }

  /* *
   * Сохраняет новость в базу пользователя
  * */
  _sendAddArticleRequest(articleId) {
    const { createArticle } = this._dependencies.mainApi;
    const { instance } = this._alreadyRendered[articleId];
    const props = instance.getArticleProps();
    createArticle(props)
      .then((res) => {
        if (!res.data.id) {
          throw new Error('500');
        }
        return res.data.id;
      })
      .then((serverId) => this._addArticleServerId(articleId, serverId))
      .then(() => instance.setBookmarkMarked())
      .catch((err) => console.log(err));
  }

  /* *
   * Удаляет новость из базы пользователя
  * */
  _sendRemoveArticleRequest(articleId) {
    const { removeArticle } = this._dependencies.mainApi;
    const { instance } = this._alreadyRendered[articleId];
    const serverId = instance.getArticleProps().serverId
    || this._alreadyRendered[articleId].serverId;

    removeArticle(serverId)
      .then((res) => {
        if (!res.status === '200') {
          throw new Error(res.message);
        }
      })
      .then(() => this._removeArticleServerId(articleId))
      .then(() => {
        if (this._type === 'saved') {
          const { savedArticles } = this._dependencies;
          instance.deleteArticle();
          savedArticles.deleteSavedArticle(serverId);
        } else {
          instance.removeBookmarkMarked();
        }
      })
      .catch((err) => console.log(err));
  }

  /* *
   * Определяет тип кнопки у статьи и в соответствии отправляет запрос
  * */
  _bookmarkHandler(event) {
    const articleElement = event.target.closest('.article');
    const articleId = articleElement.getAttribute('data-id');
    const isSaved = articleElement.hasAttribute('data-saved');
    const isBookmarkClick = event.target.classList.contains('article__action-button');

    if (this._type === 'saved' && isBookmarkClick) {
      this._sendRemoveArticleRequest(articleId);
    } else if (isSaved && isBookmarkClick) {
      this._sendRemoveArticleRequest(articleId);
    } else if (!isSaved && isBookmarkClick) {
      this._sendAddArticleRequest(articleId);
    }
  }


  _toggleBookmarkDescriptionHandler(event) {
    const isBookmarkClick = event.target.classList.contains('article__action-button');

    if (isBookmarkClick) {
      event.target.parentNode.querySelector('.article__action-description').classList.toggle('article__action-description_is-opened');
    }
  }

  _addBookmarkHandlers() {
    const iterable = Object.values(this._alreadyRendered);
    const { auth } = this._dependencies;
    this._isLogged = auth.getUserAuthStatus();

    iterable.forEach((renderedItem) => {
      if (this._isLogged) {
        this._setHandlers(renderedItem.markup, [this._bookmarkHandler], 'click');
        this._setHandlers(renderedItem.markup, [this._toggleBookmarkDescriptionHandler], 'mouseover');
        this._setHandlers(renderedItem.markup, [this._toggleBookmarkDescriptionHandler], 'mouseout');
      } else {
        this._setHandlers(renderedItem.markup, [this._toggleBookmarkDescriptionHandler], 'mouseover');
        this._setHandlers(renderedItem.markup, [this._toggleBookmarkDescriptionHandler], 'mouseout');
      }
    });
  }

  _removeBookmarkHandlers() {
    const iterable = Object.values(this._alreadyRendered);
    const alreadyRenderedCount = iterable.length;

    if (alreadyRenderedCount > 0) {
      iterable.forEach((renderedItem) => {
        this._removeHandlers(renderedItem.markup, [this._bookmarkHandler], 'click');
      });
    }
  }

  /* *
   * Переводит первую букву ключевого слова в верхний регистр
  * */
  _upFirst(keyword) {
    if (!keyword) return keyword;

    return keyword[0].toUpperCase() + keyword.slice(1);
  }

  /* *
   * Инициализирует результаты поиска новостей
  * */
  initialResults(articles, keyword) {
    const { news } = this._dependencies;
    this._keyword = this._upFirst(keyword);

    Promise.resolve()
      .then(() => {
        news.clearNews();
        this._removeBookmarkHandlers();
        this._clearAlreadyRendered();
      })
      .then(() => news.generateNews(articles))
      .then(() => this._renderResultsMarkup())
      .then(() => this._renderShowMoreButton())
      .then(() => this._renderArticles())
      .then(() => {
        this._addBookmarkHandlers();
      })
      .catch((err) => console.log(err));
  }


  /* *
   * Инициализирует результаты сохранённых новостей пользователя
  * */
  initialSavedResults(articles) {
    const { news } = this._dependencies;
    this._type = 'saved';
    this.renderLoader();
    if (articles.data.length === 0) {
      this.renderNotFound();
    } else {
      Promise.resolve()
        .then(() => {
          news.clearNews();
          this._removeBookmarkHandlers();
          this._clearAlreadyRendered();
        })
        .then(() => news.generateNews(articles.data))
        .then(() => this._renderResultsMarkup())
        .then(() => this._renderShowMoreButton())
        .then(() => this._renderArticles())
        .then(() => this._addBookmarkHandlers())
        .catch((err) => console.log(err));
    }
  }
}
