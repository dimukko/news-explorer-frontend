import BaseComponent from '../components/BaseComponent';

export default class Article extends BaseComponent {
  constructor(articleProps, ...args) {
    super(...args);
    this._article = articleProps;
    this._createArticle();
    this.getArticleMarkup = this.getArticleMarkup.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.setBookmarkMarked = this.setBookmarkMarked.bind(this);
    this.removeBookmarkMarked = this.removeBookmarkMarked.bind(this);
  }

  /* *
   * Создаёт элементы карточки со статьёй
  * */
  _createArticleContent() {
    const { articleTemplate } = this._elements;
    this._container = articleTemplate.cloneNode(true).content.querySelector('.article');
  }

  /* *
   * Обновляет контент карточки со статьёй и расставляет аттрибуты
  * */
  _updateArticleContent() {
    const {
      dataId, keyword, source, title, description, urlToImage, formatedDate, link, type,
    } = this._article;
    const {
      articleTitle, articleDate, articleText, articleSource, articleImg,
      articleKeyword, articleLink,
    } = this._elements;

    if (type === 'saved') {
      this._container.setAttribute('data-saved', true);
      this._container.querySelector(articleKeyword).classList.remove(`${articleKeyword.replace('.', '')}_hidden`);
    }

    this._container.setAttribute('data-id', dataId);
    this._container.querySelector(articleTitle).textContent = title;
    this._container.querySelector(articleDate).textContent = formatedDate;
    this._container.querySelector(articleText).textContent = description;
    this._container.querySelector(articleSource).textContent = source;
    this._container.querySelector(articleKeyword).textContent = keyword;
    this._container.querySelector(articleImg).src = urlToImage;
    this._container.querySelector(articleLink).href = link;
  }

  /* *
   * Создаёт карточку со статьёй
  * */
  _createArticle() {
    this._createArticleContent();
    this._setBookmark();
    this._updateArticleContent();

    this._articleBookmarkIcon = this._container.querySelector('.article__action-button');
  }

  getArticleMarkup() {
    return this._container;
  }

  getArticleProps() {
    const {
      keyword, source, title, description, urlToImage, publishedAt, link, serverId,
    } = this._article;

    return {
      keyword,
      source,
      title,
      link,
      text: description,
      image: urlToImage,
      date: publishedAt,
      serverId,
    };
  }

  /* *
   * Убирает обработчики и удаляет ноду
  * */
  deleteArticle() {
    this._unmount();
    this._container.remove();
  }

  /* *
   * Устанавливает разметку закладки
  * */
  _setBookmark() {
    const { isLogged, type } = this._article;
    const {
      bookmarkLoggedinTemplate, bookmarkNotLoggedTemplate, bookmarkSavednewsTemplate,
    } = this._elements;
    const bookmarkNode = this._container;
    let template;

    if (isLogged && type === 'main') {
      template = bookmarkLoggedinTemplate;
    } else if (!isLogged && type === 'main') {
      template = bookmarkNotLoggedTemplate;
    } else if (isLogged && type === 'saved') {
      template = bookmarkSavednewsTemplate;
    }

    const bookmarkElement = template.cloneNode(true).content;
    bookmarkNode.appendChild(bookmarkElement);
  }

  setBookmarkMarked() {
    this._articleBookmarkIcon.classList.add('article__action-button_added-article');
  }

  removeBookmarkMarked() {
    this._articleBookmarkIcon.classList.remove('article__action-button_added-article');
  }
}
