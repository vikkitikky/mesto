import {Popup} from "./Popup.js";
import {hideInputError} from "./utils.js";

export class PopupWithForm extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__submit-btn');
  }

  _resetForm() {
    this._inputList.forEach((item) => {
      hideInputError(this._form, item, {inputErrorClass: 'popup__input_type_error', errorClass: 'popup__error_visible'})
    });
    this._submitButton.setAttribute('disabled', 'disabled');
    this._form.reset();
  }

  _closePopup() {
    super._closePopup();
    this._resetForm();
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', () => this._closePopup());
  }
}
