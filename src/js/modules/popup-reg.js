import Popup from './popup';

export default class PopupReg extends Popup {
  constructor(...args) {
    super(...args);
    this.setHandlers = this.setHandlers.bind(this);
    this._validateSignupForm = this._validateSignupForm.bind(this);
  }

  _validateSignupForm() {
    const { validation } = this._dependencies;
    const form = this._currentFormElement();
    const { email, password, name } = form;
    const emailResult = validation._validateInput(email);
    const passwordResult = validation._validateInput(password);
    const nameResult = validation._validateInput(name);

    if (emailResult && passwordResult && nameResult) {
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
   * Отправляет запрос на регистрацию, в случае успеха сообщает об этом
  * */
  submit(event) {
    event.preventDefault();
    const { email, password, name } = this._elements;

    const { mainApi, popupSuccess } = this._dependencies;

    const inputValues = this._getInputFormValues(event, email, password, name);
    this._setButtonDisabled();
    this._setInputsDisabled();

    mainApi
      .signup(inputValues)
      .then((res) => {
        if (res.status === 201) {
          this.close();
          popupSuccess.open();
        } else if (res.status === 400) {
          throw new Error('400');
        } else if (res.status === 409) {
          throw new Error('409');
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
    const { subButtonLinkAuth, email } = this._elements;
    const { popupAuth } = this._dependencies;

    this._setHandlers(subButtonLinkAuth, [this.close], 'click');
    this._setHandlers(subButtonLinkAuth, [popupAuth.open.bind(popupAuth)], 'click');
    this._setHandlers(email, [this.removeFormErrors.bind(this)], 'input');
    this._mountLocalHandlers([
      { element: this._container, handlers: [this._validateSignupForm], event: 'input' },
      { element: this._container, handlers: [this.submit.bind(this)], event: 'submit' }]);
  }
}
