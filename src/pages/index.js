import './index.css';

const header = document.querySelector('.header');
const popupIn = document.querySelector('#popup-signin');
const popupUp = document.querySelector('#popup-signup');
const popupReg = document.querySelector('#popup-registered');
const navigation = header.querySelector('.header__nav');
const hamburgerBtn = header.querySelector('#hamburger');

header.addEventListener('click', (event) => {
  if (event.target.closest('#login')) {
    popupIn.classList.add('popup_is-opened');
  }

  if (event.target.closest('#hamburger')) {
    hamburgerBtn.classList.toggle('header__toggle_light_opened');
    hamburgerBtn.classList.toggle('header__toggle_light_closed');
    navigation.classList.toggle('header__nav_is-open');
  }

  if (event.target.closest('#logout')) {
    navigation.classList.remove('header__nav_is-auth');
  }
});

popupIn.addEventListener('click', (event) => {
  if (event.target.closest('#popup-close')) {
    popupIn.classList.remove('popup_is-opened');
  }

  if (event.target.closest('#signup-button')) {
    popupIn.classList.remove('popup_is-opened');
    popupUp.classList.add('popup_is-opened');
  }

  if (event.target.closest('#signin-button')) {
    popupIn.classList.remove('popup_is-opened');
    navigation.classList.add('header__nav_is-auth');
  }
});

popupUp.addEventListener('click', (event) => {
  if (event.target.closest('#popup-close')) {
    popupUp.classList.remove('popup_is-opened');
  }
});

popupReg.addEventListener('click', (event) => {
  if (event.target.closest('#popup-close')) {
    popupReg.classList.remove('popup_is-opened');
  }
});
