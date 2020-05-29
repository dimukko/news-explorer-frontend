import Popup from './popup';

export default class PopupSuccess extends Popup {
  constructor(...args) {
    super(...args);
    this.setHandlers = this.setHandlers.bind(this);
  }

  open() {
    this._open();
    this.setHandlers();
  }

  close() {
    this._close();
  }

  setHandlers() {
    const { subButtonLinkAuth } = this._elements;

    const { popupAuth } = this._dependencies;

    this._setHandlers(subButtonLinkAuth, [this.close], 'click');
    this._setHandlers(subButtonLinkAuth, [popupAuth.open.bind(popupAuth)], 'click');
  }
}
