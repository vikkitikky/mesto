import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, {submitAction}) {
    super(popupSelector);
    this._submitAction = submitAction;
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListener() {
    super.setEventListener();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitAction(this._element);
    })
  }

  open(element) {
    this._element = element;
    super.open();
  }
}
