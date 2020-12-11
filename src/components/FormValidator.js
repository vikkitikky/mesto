export class FormValidator {
  constructor(objParams, formElement) {
    this._objParams = objParams;
    this._formElement = formElement;
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._buttonSubmit = this._formElement.querySelector('.popup__submit-btn');
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._objParams.inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._objParams.inputErrorClass);
  }

  _checkInputValidation(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonSubmit.setAttribute('disabled', 'disabled');
    } else {
      this._buttonSubmit.removeAttribute('disabled', 'disabled');
    }
  }

  _setEventListener() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidation(inputElement);
        this._toggleButtonState();
      })
    })
  }

  resetValidation() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    })
    this._buttonSubmit.setAttribute('disabled', 'disabled');
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
  }
}


