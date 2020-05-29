import BaseComponent from '../components/BaseComponent';

export default class Form extends BaseComponent {
  _currentFormElement() {
    return this._container.querySelector(this._elements.form);
  }

  /* *
   * Устанавливает ошибку в попап
  * */
  _setServerError(errorStatus) {
    const errorField = this._container.querySelector(this._elements.form).querySelector('#error-server');

    const {
      badRequest, wrongEmailOrPassword, conflict, serverError, connectionLost,
    } = this._dependencies.FORM_ERRORS.errors;

    if (errorStatus === '400') {
      errorField.textContent = badRequest;
    } else if (errorStatus === '401') {
      errorField.textContent = wrongEmailOrPassword;
    } else if (errorStatus === '409') {
      errorField.textContent = conflict;
    } else if (errorStatus === '500') {
      errorField.textContent = serverError;
    } else if (errorStatus === '666') {
      errorField.textContent = connectionLost;
    } else {
      errorField.textContent = '';
    }
  }

  _setInputsDisabled() {
    const formInputs = this._currentFormElement().querySelectorAll('input');
    formInputs.forEach((input) => {
      input.setAttribute('disabled', true);
      input.value = '';
    });
  }

  _setInputsActive() {
    const formInputs = this._currentFormElement().querySelectorAll('input');

    formInputs.forEach((input) => {
      input.removeAttribute('disabled');
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
