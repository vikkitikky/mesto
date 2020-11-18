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

  _setEventListener (element, likeBtn, deleteBtn) {
    likeBtn.addEventListener('click', () => this._setLike(likeBtn));
    deleteBtn.addEventListener('click', () => this._deleteCard(element));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.element__like-btn');
    this._deleteButton = this._element.querySelector('.element__delete-btn');

    this._element.querySelector('.element__title').textContent = this._title;
    this._element.querySelector('.element__img').alt = this._title;
    this._element.querySelector('.element__img').src = this._image;

    this._setEventListener(this._element, this._likeButton, this._deleteButton);

    return this._element;
  }
}
