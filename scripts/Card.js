import {
  popupWithImage,
  popupCaption,
  popupImage
} from "./constants.js";
import {openPopup} from "./utils.js";

export class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._title = data.name;
    this._image = data.link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _setLike(likeBtn) {
    likeBtn.classList.toggle('element__like-btn_active');
  }

  _deleteCard(element) {
    element.remove();
  }

  _setDataForBigImage() {
    popupImage.src = this._image;
    popupImage.alt = this._title;
    popupCaption.textContent = this._title;
  }

  _openBigCard() {
    this._setDataForBigImage();
    openPopup(popupWithImage);
  }

  _setEventListener (element, likeBtn, deleteBtn, card) {
    likeBtn.addEventListener('click', () => this._setLike(likeBtn));
    deleteBtn.addEventListener('click', () => this._deleteCard(element));
    card.addEventListener('click', () => this._openBigCard());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-btn');
    this._deleteButton = this._element.querySelector('.element__delete-btn');
    this._card = this._element.querySelector('.element__img');

    this._element.querySelector('.element__title').textContent = this._title;
    this._card.alt = this._title;
    this._card.src = this._image;

    this._setEventListener(this._element, this._likeButton, this._deleteButton, this._card);

    return this._element;
  }
}
