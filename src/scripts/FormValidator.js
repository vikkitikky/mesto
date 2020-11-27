export class FormValidator {
  constructor(objParams, formElement) {
    this._objParams = objParams;
    this._formElement = formElement;
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }

  _showInputError(formElement, inputElement, objParams) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(objParams.inputErrorClass);
  }

  _hideInputError(formElement, inputElement, objParams) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(objParams.inputErrorClass);
  }

  _checkInputValidation(inputElement, formElement, objParams) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, objParams);
    } else {
      this._hideInputError(formElement, inputElement, objParams);
    }
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(buttonSubmit) {
    if (this._hasInvalidInput()) {
      buttonSubmit.setAttribute('disabled', 'disabled');
    } else {
      buttonSubmit.removeAttribute('disabled', 'disabled');
    }
  }

  _setEventListener(formElement, objParams) {
    const buttonSubmit = formElement.querySelector(objParams.submitButtonSelector);

    this._toggleButtonState(buttonSubmit, objParams);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidation(inputElement, formElement, objParams);
        this._toggleButtonState(buttonSubmit, objParams);
      })
    })
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener(this._formElement, this._objParams);
  }
}


