import Section from "../scripts/Section.js";
import {initialCards} from "../scripts/constants.js";
import {Card} from "../scripts/Card.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import {FormValidator} from "../scripts/FormValidator.js";
import objectParams from "../scripts/constants.js";
import UserInfo from "../scripts/UserInfo.js";
import './index.css';

const addButton = document.querySelector('.profile__add-btn');
const editButton = document.querySelector('.profile__edit-btn');
const addImageForm = document.querySelector('.popup__form_type_add');
const editProfileForm = document.querySelector('.popup__form_type_edit');
const inputName = editProfileForm.querySelector('.popup__input_type_name');
const inputAbout = editProfileForm.querySelector('.popup__input_type_job');

function createNewCard(item) {
  const newCard = new Card(item, {handleCardClick: (item) => bigCard.open(item)}, '#photo-template');
  const readyCard = newCard.generateCard();

  cardsSection.addItem(readyCard);
}

const profileData = new UserInfo({name: '.profile__name', job: '.profile__about'});

const bigCard = new PopupWithImage('.popup_type_card-view');

const cardsSection = new Section({items: initialCards, renderer: createNewCard}, '.photo');

const popupWithEditForm = new PopupWithForm('.popup_type_edit-profile', {submittingForm: (item) => {
    profileData.setUserInfo(item);
    popupWithEditForm.close();
  }
});

const popupWithAddImgForm = new PopupWithForm('.popup_type_add-img', {
  submittingForm: (item) => {
    createNewCard(item);
    popupWithAddImgForm.close();
  }
});

const addFormValidator = new FormValidator(objectParams, addImageForm);
const editFormValidator = new FormValidator(objectParams, editProfileForm);

cardsSection.renderItems();

bigCard.setEventListener();
popupWithEditForm.setEventListener();
popupWithAddImgForm.setEventListener();

editButton.addEventListener('click', () => {
  inputName.value = profileData.getUserInfo().name;
  inputAbout.value = profileData.getUserInfo().job;
  popupWithEditForm.open();
});

addButton.addEventListener('click', () => popupWithAddImgForm.open());

addFormValidator.enableValidation();
editFormValidator.enableValidation();
