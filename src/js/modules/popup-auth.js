import Popup from './popup';

export default class PopupAuth extends Popup {
  constructor(...args) {
    super(...args);
    this.setHandlers = this.setHandlers.bind(this);
    this._validateSigninForm = this._validateSigninForm.bind(this);
  }

  _validateSigninForm() {
    const { validation } = this._dependencies;
    const form = this._currentFormElement();
    const { email, password } = form;
    const emailResult = validation._validateInput(email);
    const passwordResult = validation._validateInput(password);

    if (emailResult && passwordResult) {
      this._setButtonActive();
    } else {
      this._setButtonDisabled();
    }
  }

  open() {
    this._open();
    this._setButtonDisabled();
    this.setHandlers();
  }

  close() {
    this._close();
  }

  /* *
   * Отправляет запрос на авторизацию, отключает кнопки и поля до ответа сервера
  * */
  submit(event) {
    event.preventDefault();
    const { email, password } = this._elements;

    const { mainApi } = this._dependencies;

    const inputValues = this._getInputFormValues(event, email, password);

    this._setButtonDisabled();
    this._setInputsDisabled();

    mainApi
      .signin(inputValues)
      .then((res) => {
        if (res.status === 200) {
          const { auth } = this._dependencies;
          auth.sendCheckRequest();
          this.close();
        } else if (res.status === 400) {
          throw new Error('400');
        } else if (res.status === 401) {
          throw new Error('401');
        } else if (res.status === 500) {
          throw new Error('500');
        } else {
          throw new Error('666');
        }
      })
      .catch((err) => {
        this._setServerError(err.message);
        this._setInputsActive();
        this._setButtonActive();
      });
  }

  setHandlers() {
    const { subButtonLinkReg, email } = this._elements;
    const { popupReg } = this._dependencies;

    this._setHandlers(subButtonLinkReg, [this.close], 'click');
    this._setHandlers(subButtonLinkReg, [popupReg.open.bind(popupReg)], 'click');
    this._setHandlers(email, [this.removeFormErrors.bind(this)], 'input');
    this._mountLocalHandlers([
      { element: this._container, handlers: [this._validateSigninForm], event: 'input' },
      { element: this._container, handlers: [this.submit.bind(this)], event: 'submit' }]);
  }
}
