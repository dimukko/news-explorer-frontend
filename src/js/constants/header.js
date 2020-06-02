const HEADER_OPTIONS = {
  container: document.querySelector('.header'),
  elements: {
    notLoggedLightTemplate: document.querySelector('#header-notlogged-light'),
    loggedLightTemplate: document.querySelector('#header-logged-light'),
    loggedDarkTemplate: document.querySelector('#header-logged-dark'),
    headerLogo: '.header__logo',
    headerLogoOpened: 'header__logo_is-open-menu',
    headerNav: '.header__nav',
    headerNavOpened: 'header__nav_is-open',
    buttonAuth: '.header__nav-item_not-auth',
    buttonLogin: '#logout',
    navBurger: '.header__toggle',
    navBurgerOpened: 'header__toggle_light_opened',
    navBurgerClosed: 'header__toggle_light_closed',
  },
};

export default HEADER_OPTIONS;
