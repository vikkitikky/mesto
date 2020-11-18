export class Popup {
  constructor(popupElement) {
    this._popup = popupElement;
    this._closePopupByEsc = this._closePopupByEsc.bind(this);
  }

  openPopup() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown', this._closePopupByEsc);
  }

  _closePopup() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._closePopupByEsc);
  }

  _closePopupByEsc(evt) {
    if(evt.key === 'Escape') {
      this._closePopup();
    }
  }

  setEventListener() {
    this._closeButton = this._popup.querySelector('.popup__close-btn');

    this._closeButton.addEventListener('click', () => this._closePopup());
    this._popup.addEventListener('mousedown', ( evt) => {
      if(evt.target === evt.currentTarget) {
        this._closePopup();
      }
    });
  }
}

