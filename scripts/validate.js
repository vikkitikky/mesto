const formObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error'
}

function showInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(formObject.inputErrorClass);
}

function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(formObject.inputErrorClass);
}

function checkInputValidation (inputElement, formElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement)
  } else {
    hideInputError(formElement, inputElement)
  }
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState (inputList, buttonSubmit) {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.classList.add(formObject.inactiveButtonClass);
    buttonSubmit.setAttribute('disabled','disabled');
  } else {
    buttonSubmit.classList.remove(formObject.inactiveButtonClass);
    buttonSubmit.removeAttribute('disabled','disabled');
  }
}

function setEventListener (formElement) {
  const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
  const buttonSubmit = formElement.querySelector(formObject.submitButtonSelector);
  toggleButtonState(inputList, buttonSubmit);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidation (inputElement, formElement);
      toggleButtonState(inputList, buttonSubmit);
    })
  })
}

function enableValidation (formParams) {
  const formList = Array.from(document.querySelectorAll(formParams.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement);
  })
}

enableValidation(formObject);
