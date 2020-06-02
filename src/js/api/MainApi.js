export default class MainApi {
  constructor(apiOptions) {
    this._apiOptions = apiOptions;
    this.getUserData = this.getUserData.bind(this);
    this.logout = this.logout.bind(this);
    this.createArticle = this.createArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this.getArticles = this.getArticles.bind(this);
  }

  signup([email, password, name]) {
    return fetch(this._apiOptions.routes.signup, {
      method: 'POST',
      credentials: 'include',
      headers: this._apiOptions.headers,
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then((res) => res.json());
  }

  signin([email, password]) {
    return fetch(this._apiOptions.routes.signin, {
      method: 'POST',
      credentials: 'include',
      headers: this._apiOptions.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => res.json());
  }

  logout() {
    return fetch(this._apiOptions.routes.logout, {
      method: 'POST',
      credentials: 'include',
    }).then((res) => res.json());
  }

  getUserData() {
    return fetch(this._apiOptions.routes.getUserData, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json());
  }

  getArticles() {
    return fetch(this._apiOptions.routes.articles, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json());
  }

  createArticle({
    keyword, title, text, date, source, link, image,
  }) {
    return fetch(this._apiOptions.routes.articles, {
      method: 'POST',
      credentials: 'include',
      headers: this._apiOptions.headers,
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      }),
    }).then((res) => res.json());
  }

  removeArticle(articleId) {
    return fetch(`${this._apiOptions.routes.articles}/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._apiOptions.headers,
    }).then((res) => res.json());
  }
}
