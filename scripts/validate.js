function showInputError (formElement, inputElement, objParams) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(objParams.errorClass);
  inputElement.classList.add(objParams.inputErrorClass);
}

function hideInputError (formElement, inputElement, objParams) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(objParams.errorClass);
  inputElement.classList.remove(objParams.inputErrorClass);
}

function checkInputValidation (inputElement, formElement, objParams) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, objParams)
  } else {
    hideInputError(formElement, inputElement, objParams)
  }
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState (inputList, buttonSubmit, objParams) {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.classList.add(objParams.inactiveButtonClass);
    buttonSubmit.setAttribute('disabled','disabled');
  } else {
    buttonSubmit.classList.remove(objParams.inactiveButtonClass);
    buttonSubmit.removeAttribute('disabled','disabled');
  }
}

function setEventListener (formElement, objParams) {
  const inputList = Array.from(formElement.querySelectorAll(objParams.inputSelector));
  const buttonSubmit = formElement.querySelector(objParams.submitButtonSelector);
  toggleButtonState(inputList, buttonSubmit, objParams);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidation (inputElement, formElement, objParams);
      toggleButtonState(inputList, buttonSubmit, objParams);
    })
  })
}

function enableValidation ({formSelector, ...rest}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement, rest);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
