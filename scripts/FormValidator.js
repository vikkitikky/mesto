import {hideInputError} from "./utils.js";

export class FormValidator {
  constructor(objParams, formElement) {
    this._objParams = objParams;
    this._formElement = formElement;
  }

  _showInputError(formElement, inputElement, objParams) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(objParams.errorClass);
    inputElement.classList.add(objParams.inputErrorClass);
  }

  _checkInputValidation(inputElement, formElement, objParams) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, objParams);
    } else {
      hideInputError(formElement, inputElement, objParams);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState(inputList, buttonSubmit, objParams) {
    if (this._hasInvalidInput(inputList)) {
      buttonSubmit.setAttribute('disabled', 'disabled');
    } else {
      buttonSubmit.removeAttribute('disabled', 'disabled');
    }
  }

  _setEventListener(formElement, objParams) {
    const inputList = Array.from(formElement.querySelectorAll(objParams.inputSelector));
    const buttonSubmit = formElement.querySelector(objParams.submitButtonSelector);

    this._toggleButtonState(inputList, buttonSubmit, objParams);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidation(inputElement, formElement, objParams);
        this._toggleButtonState(inputList, buttonSubmit, objParams);
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


