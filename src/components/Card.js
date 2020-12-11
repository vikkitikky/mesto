export class Card {
  constructor({data, handleCardClick, setLike, removeLike, handleDeleteIconClick}, templateSelector, userId) {
    this._templateSelector = templateSelector;
    this._cardInfo = data;
    this._handleCardClick = handleCardClick;
    this._setLike = setLike;
    this._removeLike = removeLike;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._userId = userId;
    this._cardId = this._cardInfo._id;
    this._ownerCardId = this._cardInfo.owner._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _checkLike() {
   if(this._cardInfo.likes.some((item) => item._id === this._userId)) {
     this._likeButton.classList.add('element__like-btn_active');
   }
  }

  _changeLikeState() {
    if(!this._likeButton.classList.contains('element__like-btn_active')) {
      this._setLike(this._cardId);
      this._likeButton.classList.add('element__like-btn_active');
    } else {
      this._removeLike(this._cardId);
      this._likeButton.classList.remove('element__like-btn_active');
    }
  }

  updateLikeCount(item) {
    this._likeCount.textContent = item;
  }

  removeCard() {
    this._element.remove();
  }

  _setEventListener () {
    this._likeButton.addEventListener('click', () => this._changeLikeState());
    this._deleteButton.addEventListener('click', () => this._handleDeleteIconClick(this));
    this._card.addEventListener('click', () => this._handleCardClick(this._cardInfo));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-btn');
    this._deleteButton = this._element.querySelector('.element__delete-btn');
    this._card = this._element.querySelector('.element__img');
    this._likeCount = this._element.querySelector('.element__like-count');

    this._element.querySelector('.element__title').textContent = this._cardInfo.name;
    this._card.alt = this._cardInfo.name;
    this._card.src = this._cardInfo.link;

    if (this._ownerCardId !== this._userId) {
      this._deleteButton.remove();
    }

    this.updateLikeCount(this._cardInfo.likes.length);
    this._checkLike();
    this._setEventListener();

    return this._element;
  }
}
