export default class News {
  constructor(type, props) {
    this._type = type;
    this._props = props;
    this._news = [];
    this._currentNewsIndex = 0;
    this.clearNews = this.clearNews.bind(this);
    this.getOneNews = this.getOneNews.bind(this);
    this.getNewsCount = this.getNewsCount.bind(this);
  }

  _updateNewsIndex() {
    this._currentNewsIndex += 1;
  }

  clearNews() {
    this._news = [];
    this._currentNewsIndex = 0;
  }

  /* *
   * Создаёт индексы новостей и записывает в массив
  * */
  generateNews(arr) {
    const { maxItemsMain, maxItemsSaved } = this._props;
    const maxItems = this._type === 'saved' ? maxItemsSaved : maxItemsMain;

    for (let i = 0; i < arr.length; i += maxItems) {
      this._news.push(arr.slice(i, i + maxItems));
    }
  }

  getNewsCount() {
    return this._news.length;
  }

  /* *
   * Проверяет индексы на предмет последней новости
  * */
  getOneNews() {
    const isLastNews = this._currentNewsIndex >= (this._news.length - 1);
    const items = this._currentNewsIndex <= (this._news.length - 1)
      ? this._news[this._currentNewsIndex] : [];

    this._updateNewsIndex();

    return { isLastNews, items };
  }
}
