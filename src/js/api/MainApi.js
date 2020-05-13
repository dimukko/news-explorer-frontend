export default class MainApi {
  constructor(apiOptions) {
    this._apiOptions = apiOptions;
    this.getUserData = this.getUserData.bind(this);
    this.logout = this.logout.bind(this);
    this.createArticle = this.createArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this.getArticles = this.getArticles.bind(this);
  }

  signup({ email, password, name }) {
    return fetch(this._apiOptions.routes.signup, {
      method: 'POST',
      credentials: 'include',
      headers: this._apiOptions.headers,
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).catch((err) => new Error(err.message));
  }

  signin({ email, password }) {
    return fetch(this._apiOptions.routes.signin, {
      method: 'POST',
      credentials: 'include',
      headers: this._apiOptions.headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).catch((err) => new Error(err.message));
  }

  logout() {
    return fetch(this._apiOptions.routes.logout, {
      method: 'POST',
      credentials: 'include',
    }).catch((err) => new Error(err.message));
  }

  getUserData() {
    return fetch(this._apiOptions.routes.getUserData, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .catch((err) => new Error(err.message));
  }

  getArticles() {
    return fetch(this._apiOptions.routes.articles, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => res.json())
      .catch((err) => new Error(err.message));
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
    }).then((res) => res.json())
      .catch((err) => new Error(err.message));
  }

  removeArticle(articleId) {
    return fetch(`${this._apiOptions.routes.articles}/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._apiOptions.headers,
    }).then((res) => res.json())
      .catch((err) => new Error(err.message));
  }
}
