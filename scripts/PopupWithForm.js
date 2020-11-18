import {Popup} from "./Popup";

export class PopupWithForm extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._form = this._popup.querySelector('.popup__form');
  }

  _closePopup() {
    super._closePopup();
    this._form.reset();
  }
}
