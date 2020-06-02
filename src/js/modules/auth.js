export default class Auth {
  constructor(page) {
    this.sendCheckRequest = this.sendCheckRequest.bind(this);
    this.userLogout = this.userLogout.bind(this);
    this._loggedIn = false;
    this._userName = '';
    this._page = page;
  }

  setDependencies(dependecies) {
    this._dependencies = dependecies;
  }

  /* *
   * Выход пользователя
  * */
  userLogout() {
    const { logout } = this._dependencies.mainApi;
    const { renderError } = this._dependencies.results;

    logout()
      .then((res) => {
        if (res.status === '200') {
          this._setUnauthorizedComponents();
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        renderError();
        this._setError('page', err.message);
      });
  }

  getUserAuthStatus() {
    return this._loggedIn;
  }

  getUserName() {
    return this._userName;
  }

  /* *
   * Подчищает разметку результатов
  * */
  _cleanupDependenciesMarkups() {
    const { results } = this._dependencies;

    results.clearMarkup();
    results.removeVisible();
  }

  /* *
   * Рендер хидера неавторизованного пользователя
  * */
  _setUnauthorizedComponents() {
    this._loggedIn = false;
    if (this._page === 'saved') {
      window.location.href = '../';
    }

    const { header, popupAuth, HEADER_OPTIONS } = this._dependencies;

    header.setMountHandlers(
      [{ element: HEADER_OPTIONS.elements.navBurger, handlers: [header.toggleNavBar] },
        { element: HEADER_OPTIONS.elements.buttonAuth, handlers: [popupAuth.open] }],
    );

    header.render({ isLoggedIn: this._loggedIn });

    this._cleanupDependenciesMarkups();
  }

  /* *
   * Рендер хидера авторизованного пользователя и инициализация сохранённых статей
  * */
  _setAuthorizedComponents() {
    this._loggedIn = true;

    const { header, HEADER_OPTIONS } = this._dependencies;

    header.setMountHandlers(
      [{ element: HEADER_OPTIONS.elements.navBurger, handlers: [header.toggleNavBar] },
        { element: HEADER_OPTIONS.elements.buttonLogin, handlers: [this.userLogout] }],
    );
    header.render({
      isLoggedIn: this._loggedIn,
      userName: this._userName,
    });
    if (this._page === 'saved') {
      const { savedArticles } = this._dependencies;
      savedArticles.initialSavedArticles();
    }
    this._cleanupDependenciesMarkups();
  }

  /* *
   * Проверяет авторизацию
  * */
  sendCheckRequest() {
    const { getUserData } = this._dependencies.mainApi;
    getUserData()
      .then((res) => {
        if (res.info.name && res.info.email) {
          this._userName = res.info.name;
          this._setAuthorizedComponents();
        } else {
          throw new Error(res.message);
        }
      })
      .catch(() => {
        this._setUnauthorizedComponents();
      });
  }
}
