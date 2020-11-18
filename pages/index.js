import {initialCards} from "../scripts/cadsData.js";
import {FormValidator} from "../scripts/FormValidator.js";
import {Card} from "../scripts/Card.js";
import {Popup} from "../scripts/Popup.js";
import {PopupWithForm} from "../scripts/PopupWithForm.js";

const photoContainer = document.querySelector('.photo');

const popupWithImage = document.querySelector('.popup_type_card-view');
const popupWithEditForm = document.querySelector('.popup_type_edit-profile');
const popupWithAddForm = document.querySelector('.popup_type_add-img');

const editForm = popupWithEditForm.querySelector('.popup__form_type_edit');
const addForm = popupWithAddForm.querySelector('.popup__form_type_add');

const inputName = editForm.querySelector('.popup__input_type_name');
const inputAbout = editForm.querySelector('.popup__input_type_job');

const inputSource = addForm.querySelector('.popup__input_type_src');
const inputTitle = addForm.querySelector('.popup__input_type_title');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');

const popupImage = popupWithImage.querySelector('.popup__image');
const popupCaption = popupWithImage.querySelector('.popup__card-title');

function renderCard(data) {
  const newCard = new Card(data, '#photo-template');
  const readyCard = newCard.generateCard();

  return readyCard;
}

const cardsList = initialCards.map((item) => renderCard(item));
photoContainer.prepend(...cardsList);

function getDataForBigCard(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
}

function fillEditForm() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function submitFormEdit() {
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;

  editForm.reset();
}

function submitFormAdd() {
  const userCard = {};
  userCard.name = inputTitle.value;
  userCard.link = inputSource.value;
  photoContainer.prepend(renderCard(userCard));

  addForm.reset();
}

const editValidator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}, editForm);

const addValidator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}, addForm);

editValidator.enableValidation();
addValidator.enableValidation();

editForm.addEventListener('submit', submitFormEdit);
addForm.addEventListener('submit', submitFormAdd);

const popupEdit = new PopupWithForm(popupWithEditForm);
popupEdit.setEventListener();
editButton.addEventListener('click', () => {
  fillEditForm();
  popupEdit.openPopup();
  }
)

const popupAdd = new PopupWithForm(popupWithAddForm);
popupAdd.setEventListener();
addButton.addEventListener('click', () => {
  popupAdd.openPopup();
})

const popupCard = new Popup(popupWithImage);
popupCard.setEventListener();

photoContainer.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('element__img')) {
    getDataForBigCard(evt);
    popupCard.openPopup();
  }
});
