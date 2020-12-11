import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submittingForm}) {
    super(popupSelector);
    this._submitForm = submittingForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
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
    this._form.reset();//по ТЗ должно быть здесь, но я бы унесла в валидатор
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', () => this._submitForm(this._getInputValues()));
  }
}
