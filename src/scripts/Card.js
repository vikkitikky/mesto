export class Card {
  constructor(data, {handleCardClick}, templateSelector) {
    this._templateSelector = templateSelector;
    this._cardInfo = data;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _setLike() {
    this._likeButton.classList.toggle('element__like-btn_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListener () {
    this._likeButton.addEventListener('click', () => this._setLike());
    this._deleteButton.addEventListener('click', () => this._deleteCard());
    this._card.addEventListener('click', () => this._handleCardClick(this._cardInfo));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-btn');
    this._deleteButton = this._element.querySelector('.element__delete-btn');
    this._card = this._element.querySelector('.element__img');

    this._element.querySelector('.element__title').textContent = this._cardInfo.name;
    this._card.alt = this._cardInfo.name;
    this._card.src = this._cardInfo.link;

    this._setEventListener();

    return this._element;
  }
}
