import BaseComponent from '../components/BaseComponent';

export default class SavedArticles extends BaseComponent {
  constructor(...args) {
    super(...args);

    this.initialSavedArticles = this.initialSavedArticles.bind(this);
    this.getUserArticles = this.getUserArticles.bind(this);
  }

  _renderSavedArticles() {
    const { results } = this._dependencies;

    results.initialSavedResults(this._articles);
  }

  /* *
   * Удаляет объект карточки из сохраненных внутри компонента объектов
   * и обновляет информацию для пользователя
  * */
  deleteSavedArticle(serverId) {
    this._articles.data = this._articles.data.filter((article) => article._id !== serverId);
    this._updateContainers();
  }

  /* *
   * Обновляет информацию для пользователя
  * */
  _updateContainers() {
    if (this._articles.data.length === 0) {
      this._renderSavedArticles();
    }
    this._updateNumberContainer(this._articles);
    this._updateKeywordContainer(this._articles);
  }

  /* *
   * Отправляет запрос api на получение сохраненных новостей
  * */
  getUserArticles() {
    const { mainApi } = this._dependencies;
    // this._userName = auth.getUserName();
    mainApi
      .getArticles()
      .then((res) => {
        this._articles = res;
        this._renderSavedArticles();
        this._updateNumberContainer(this._articles);
        this._updateKeywordContainer(this._articles);
      })
      .catch((err) => console.log(err));
  }

  /* *
   * Внешний метод для инициализации сохраненных новостей
  * */
  initialSavedArticles() {
    this.getUserArticles();
  }

  /* *
   * Подсчитывает ключевые слова
  * */
  _countKeywords(articles) {
    const keywords = {};
    articles.data.forEach((article) => {
      if (keywords[article.keyword]) {
        keywords[article.keyword] += 1;
      } else {
        keywords[article.keyword] = 1;
      }
    });
    return Object.entries(keywords);
  }

  _countArticles(articles) {
    return articles.data.length;
  }

  _sortKeywordsByPopularity(keywordsArray) {
    return keywordsArray.sort((a, b) => b[1] - a[1]);
  }

  /* *
   * Рендер количества статей в зависимости от числа сохранённых
  * */
  _updateNumberContainer(articles) {
    const { auth } = this._dependencies;

    this._userName = auth.getUserName();

    const { userSpan, amountSpan } = this._elements;

    userSpan.textContent = this._userName;

    const articleAmount = this._countArticles(articles);
    if ((articleAmount % 10 > 4)
     || articleAmount === 0
     || articleAmount % 10 === 0
     || (articleAmount < 20 && articleAmount > 4)) {
      amountSpan.textContent = `, у вас ${articleAmount} сохранённых статей`;
    } else if (articleAmount % 10 === 1) {
      amountSpan.textContent = `, у вас ${articleAmount} сохранённая статья`;
    } else if (articleAmount % 10 <= 4 && articleAmount % 10 !== 0) {
      amountSpan.textContent = `, у вас ${articleAmount} сохранённые статьи`;
    }
  }

  /* *
   * Рендер ключевых слов в зависимости от числа сохранённых
  * */
  _updateKeywordContainer(articles) {
    const keywordsArr = this._sortKeywordsByPopularity(this._countKeywords(articles));

    const { amountKeywords, keywords, keywordsOther } = this._elements;

    if (keywordsArr.length <= 0) {
      amountKeywords.textContent = 'По ключевым словам: ничего не найдено :(';
      keywords.textContent = '';
    } else if (keywordsArr.length === 1) {
      amountKeywords.textContent = 'По ключевым словам:';
      keywords.textContent = `${keywordsArr[0][0]}`;
      keywordsOther.textContent = '';
    } else if (keywordsArr.length === 2) {
      amountKeywords.textContent = 'По ключевым словам:';
      keywords.textContent = `${keywordsArr[0][0]}`;
      keywordsOther.textContent = `и ${keywordsArr[1][0]}`;
    } else if (keywordsArr.length === 3) {
      amountKeywords.textContent = 'По ключевым словам:';
      keywords.textContent = `${keywordsArr[0][0]},`;
      keywordsOther.textContent = `${keywordsArr[1][0]} и ${keywordsArr[2][0]}`;
    } else {
      amountKeywords.textContent = 'По ключевым словам:';
      keywords.textContent = `${keywordsArr[0][0]},`;
      keywordsOther.textContent = `${keywordsArr[1][0]} и ${keywordsArr.length - 2} другим`;
    }
  }
}
