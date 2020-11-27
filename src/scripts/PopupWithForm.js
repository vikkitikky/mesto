import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submittingForm}) {
    super(popupSelector);
    this._submitForm = submittingForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._errorMessages = Array.from(this._form.querySelectorAll('.popup__error'));
    this._submitButton = this._form.querySelector('.popup__submit-btn');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  close() {
    super.close();
    this._form.reset();
    this._resetForm()
  }

  _resetForm() {
    this._inputList.forEach(input => input.classList.remove('popup__input_type_error'));
    this._errorMessages.forEach(message => message.textContent = '');
    this._submitButton.setAttribute('disabled', true);
    this._form.reset();
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', () => this._submitForm(this._getInputValues()));
  }
}
