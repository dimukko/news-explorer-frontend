import Form from './form';

export default class Popup extends Form {
  constructor(...args) {
    super(...args);

    this._template = this._elements.templateName;
    this._popup = this._elements.popup;
    this._closeElement = this._elements.closeElement;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.clearContent = this.clearContent.bind(this);
    this._checkUserEvents = this._checkUserEvents.bind(this);
  }

  _createPopup() {
    const { templateName } = this._elements;
    const clone = templateName.cloneNode(true).content;

    return clone;
  }

  _open() {
    this._initPopup();
    this._container.classList.add('popup_is-opened');
  }

  _close() {
    this._container.classList.remove('popup_is-opened');
    this.clearContent();
  }

  clearContent() {
    this._unmount();
    this._clearNodeContent(this._container);
  }

  _initPopup() {
    this._container.appendChild(this._createPopup());
    this._mountLocalHandlers([
      { element: this._elements.closeElement, handlers: [this.close], event: 'click' },
      { element: document, handlers: [this._checkUserEvents], event: 'keydown' },
      { element: this._container, handlers: [this._checkUserEvents], event: 'mousedown' }]);
  }

  removeFormErrors() {
    const allButtonErrors = this._currentFormElement()
      .querySelectorAll(this._elements.buttonErrors);

    allButtonErrors.forEach((error) => {
      error.textContent = '';
    });
  }

  _checkUserEvents(event) {
    if (event.key === 'Escape' || event.target.classList.contains('popup')) {
      this.close();
    }
  }
}
