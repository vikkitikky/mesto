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

  _setLike(likeBtn) {
    likeBtn.classList.toggle('element__like-btn_active');
  }

  _deleteCard(element) {
    element.remove();
  }

  _setEventListener (element, likeBtn, deleteBtn, card) {
    likeBtn.addEventListener('click', () => this._setLike(likeBtn));
    deleteBtn.addEventListener('click', () => this._deleteCard(element));
    card.addEventListener('click', () => this._handleCardClick(this._cardInfo));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-btn');
    this._deleteButton = this._element.querySelector('.element__delete-btn');
    this._card = this._element.querySelector('.element__img');

    this._element.querySelector('.element__title').textContent = this._cardInfo.name;
    this._card.alt = this._cardInfo.name;
    this._card.src = this._cardInfo.link;

    this._setEventListener(this._element, this._likeButton, this._deleteButton, this._card);

    return this._element;
  }
}
