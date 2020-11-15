export class FormValidator {
  constructor(objParams, formElementSelector) {
    this._objParams = objParams;
    this._formElement = document.querySelector(formElementSelector);
  }
//функция-рендер ошибок
  _showInputError(formElement, inputElement, objParams) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(objParams.errorClass);
    inputElement.classList.add(objParams.inputErrorClass);
  }
//убирает ошибки
  _hideInputError(formElement, inputElement, objParams) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(objParams.errorClass);
    inputElement.classList.remove(objParams.inputErrorClass);
  }
//проверка валидности ввода, условия отображения ошибок
  _checkInputValidation(inputElement, formElement, objParams) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, objParams);
    } else {
      this._hideInputError(formElement, inputElement, objParams);
    }
  }
//проверка всех полей ввода на валидность
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
//переключение состояния кнопки отправки формы
  _toggleButtonState(inputList, buttonSubmit, objParams) {
    if (this._hasInvalidInput(inputList)) {
      buttonSubmit.classList.add(objParams.inactiveButtonClass);
      buttonSubmit.setAttribute('disabled', 'disabled');
    } else {
      buttonSubmit.classList.remove(objParams.inactiveButtonClass);
      buttonSubmit.removeAttribute('disabled', 'disabled');
    }
  }
//установка обработчиков на элементы формы
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
//отмена стандартной отправки формы
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener(this._formElement, this._objParams);
  }
}
