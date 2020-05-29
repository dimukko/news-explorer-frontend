const POPUP_REG_OPTIONS = {
  container: document.querySelector('.popup'),
  elements: {
    templateName: document.querySelector('#popup-registered'),
    popup: '.popup__content',
    closeElement: '.popup__close',
    subButtonLinkAuth: '#success-button',
  },
  props: {},
};

const POPUP_SIGNUP_OPTIONS = {
  container: document.querySelector('.popup'),
  elements: {
    templateName: document.querySelector('#popup-signup'),
    popup: '.popup__content',
    closeElement: '.popup__close',
    form: '#sign-up',
    email: '#signup-email',
    password: '#signup-password',
    name: '#signupName',
    buttonErrors: '.popup__error-message',
    subButtonLinkAuth: '#signin-button',
  },
  props: {},
};

const POPUP_AUTH_OPTIONS = {
  container: document.querySelector('.popup'),
  elements: {
    templateName: document.querySelector('#popup-signin'),
    popup: '.popup__content',
    closeElement: '.popup__close',
    form: '#sign-in',
    email: '#signin-email',
    password: '#signin-password',
    buttonErrors: '.popup__error-message',
    subButtonLinkReg: '#signup-button',
  },
  props: {},
};

export {
  POPUP_REG_OPTIONS,
  POPUP_SIGNUP_OPTIONS,
  POPUP_AUTH_OPTIONS,
};
