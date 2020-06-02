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
        if (res.status === '200') {
          const { auth } = this._dependencies;
          auth.sendCheckRequest();
          this.close();
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        this._setError('popup', err.message);
        this._setInputsActive();
      });
  }

  setHandlers() {
    const { subButtonLinkReg, password } = this._elements;
    const { popupReg } = this._dependencies;

    this._setHandlers(subButtonLinkReg, [this.close], 'click');
    this._setHandlers(subButtonLinkReg, [popupReg.open.bind(popupReg)], 'click');
    this._setHandlers(password, [this.removeFormErrors.bind(this)], 'input');
    this._mountLocalHandlers([
      { element: this._container, handlers: [this._validateSigninForm], event: 'input' },
      { element: this._container, handlers: [this.submit.bind(this)], event: 'submit' }]);
  }
}
