import {Card} from "../scripts/Card.js";
import {
  popupWithImage,
  initialCards
} from "../scripts/constants.js";
import objectParams from "../scripts/constants.js";
import {
  openPopup,
  closePopup
} from "../scripts/utils.js";
import {FormValidator} from "../scripts/FormValidator.js";

const photoContainer = document.querySelector('.photo');

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');

const popupEditForm = document.querySelector('.popup_type_edit-profile');
const popupAddForm = document.querySelector('.popup_type_add-img');

const editForm = popupEditForm.querySelector('.popup__form');
const addForm = popupAddForm.querySelector('.popup__form');

const inputName = editForm.querySelector('.popup__input_type_name');
const inputAbout = editForm.querySelector('.popup__input_type_job');

const inputSource = addForm.querySelector('.popup__input_type_src');
const inputTitle = addForm.querySelector('.popup__input_type_title');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const closeButtonsList = document.querySelectorAll('.popup__close-btn');

const addFormValidator = new FormValidator(objectParams, addForm);
const editFormValidator = new FormValidator(objectParams, editForm);


function renderCard(data) {
  const newCard = new Card(data, '#photo-template');
  const readyCard = newCard.generateCard();

  return readyCard;
}

function fillEditForm() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function submitFormEdit() {
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;

  closePopup(popupEditForm);
}

function submitFormAdd() {
  const userCard = {};
  userCard.name = inputTitle.value;
  userCard.link = inputSource.value;
  photoContainer.prepend(renderCard(userCard));

  closePopup(popupAddForm);
}

function resetForm(form) {
  const errorMessages = form.querySelectorAll('.popup__error');
  errorMessages.forEach(message => {
    message.textContent = ''
  });
  const inputList = form.querySelectorAll('.popup__input');
   inputList.forEach(input => {
     input.classList.remove('popup__input_type_error');
   });
  const submitButton = form.querySelector('.popup__submit-btn');
  submitButton.setAttribute('disabled', true);
  form.reset();
}


const cardsList = initialCards.map((item) => renderCard(item));
photoContainer.prepend(...cardsList);

editButton.addEventListener('click', () => {
  openPopup(popupEditForm);
  resetForm(editForm);
  fillEditForm();
});

addButton.addEventListener('click', () => {
  openPopup(popupAddForm);
  resetForm(addForm);
});

popupAddForm.addEventListener('click', evt => {
  if(evt.target === evt.currentTarget) {
    closePopup(popupAddForm);
  }
})

popupEditForm.addEventListener('mousedown', evt => {
  if(evt.target === evt.currentTarget) {
    closePopup(popupEditForm);
  }
})

popupWithImage.addEventListener('click', evt => {
  if(evt.target === evt.currentTarget) {
    closePopup(popupWithImage);
  }
})

Array.from(closeButtonsList).forEach(button => {
  button.addEventListener('click', () => closePopup(button.closest('.popup')))
})

editFormValidator.enableValidation();
addFormValidator.enableValidation();

editForm.addEventListener('submit', submitFormEdit);
addForm.addEventListener('submit', submitFormAdd);
