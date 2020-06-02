import BaseComponent from '../components/BaseComponent';

export default class Form extends BaseComponent {
  _currentFormElement() {
    return this._container.querySelector(this._elements.form);
  }

  _setInputsDisabled() {
    const formInputs = this._currentFormElement().querySelectorAll('input');
    formInputs.forEach((input) => {
      input.setAttribute('disabled', true);
    });
  }

  _setInputsActive() {
    const formInputs = this._currentFormElement().querySelectorAll('input');

    formInputs.forEach((input) => {
      input.removeAttribute('disabled');
      if (input.name === 'password') {
        input.value = '';
      }
    });
  }

  _getInputFormValues(event, ...args) {
    const { xss } = this._dependencies;
    return args.map((arg) => xss(event.currentTarget.querySelector(arg).value));
  }

  _setButtonDisabled() {
    const button = this._currentFormElement().querySelector('.button');

    button.classList.add('button_disabled');
    button.setAttribute('disabled', true);
  }

  _setButtonActive() {
    const button = this._currentFormElement().querySelector('.button');

    button.classList.remove('button_disabled');
    button.removeAttribute('disabled');
  }
}
