import BaseComponent from '../components/BaseComponent';

export default class Header extends BaseComponent {
  constructor(headerProps, ...args) {
    super(...args);
    this._headerProps = headerProps;
    this.render = this.render.bind(this);
    this.toggleNavBar = this.toggleNavBar.bind(this);
  }

  /* *
   * Создаёт и возвращает разметку шапки страницы
  * */
  _createHeader({
    isLoggedIn, userName,
  }) {
    if (isLoggedIn) {
      const template = this._headerProps === 'light'
        ? this._elements.loggedLightTemplate
        : this._elements.loggedDarkTemplate;
      const clone = template.cloneNode(true).content;
      const userNameElement = clone.querySelector('#logout');
      userNameElement.textContent = userName;
      this._navContent = clone;
    } else if (!isLoggedIn) {
      const clone = this._elements.notLoggedLightTemplate.cloneNode(true).content;
      this._navContent = clone;
    }
    return this._navContent;
  }

  /* *
   * Переключатель меню-бургера
  * */
  toggleNavBar() {
    const {
      navBurger, navBurgerOpened, headerNav, headerNavOpened, headerLogo,
      headerLogoOpened, buttonLogin,
    } = this._elements;

    this._navBurger = this._container.querySelector(navBurger);
    this._headerNav = this._container.querySelector(headerNav);
    this._headerLogo = this._container.querySelector(headerLogo);
    this._logoutButton = this._container.querySelector(buttonLogin);

    this._navBurger.classList.toggle(navBurgerOpened);
    this._headerNav.classList.toggle(headerNavOpened);
    this._headerLogo.classList.toggle(headerLogoOpened);

    if (this._headerProps !== 'light') {
      this._logoutButton.classList.toggle('button__icon_black');
    }
    this._setHandlers(navBurger, [this.toggleNavBar], 'click');
  }

  /* *
   * Рендер шапки страницы
  * */
  render(props) {
    this._unmount();

    this._clearNodeContent(this._container);
    this._container.appendChild(this._createHeader(props));

    this._mountHandlers();
  }
}
