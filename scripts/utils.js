export function hideInputError(formElement, inputElement, objParams) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(objParams.errorClass);
  inputElement.classList.remove(objParams.inputErrorClass);
}
