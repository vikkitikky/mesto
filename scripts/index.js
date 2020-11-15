import {initialCards} from "./cadsData.js";
import {FormValidator} from "./FormValidator.js";
import {Card} from "./Cards.js";

const photoContainer = document.querySelector('.photo');

const editValidator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}, '.popup__form_type_edit');
editValidator.enableValidation();

const addValidator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}, '.popup__form_type_add');
addValidator.enableValidation();

function renderCards(data) {
  const newCard = new Card(data, '#photo-template');
  newCard.generateCard();
}

const cardsList = initialCards.map((item) => renderCards(item));
photoContainer.prepend(...cardsList);

