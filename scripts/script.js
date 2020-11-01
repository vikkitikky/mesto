const photoContainer = document.querySelector('.photo');
const cardTemlplate = document.querySelector('#photo-template').content;

const popupList = Array.from(document.querySelectorAll('.popup'));
const editFormPopup = document.querySelector('.popup_type_edit-profile');
const addFormPopup = document.querySelector('.popup_type_add-img');
const titleInput = addFormPopup.querySelector('.popup__input_type_title');
const linkInput = addFormPopup.querySelector('.popup__input_type_src');

const popupCardView = document.querySelector('.popup_type_card-view');
const image = popupCardView.querySelector('.popup__image');
const caption = popupCardView.querySelector('.popup__card-title');

const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');

const nameValue = document.querySelector('.profile__name');
const jobValue = document.querySelector('.profile__about');

const nameInput = editFormPopup.querySelector('.popup__input_type_name');
const jobInput = editFormPopup.querySelector('.popup__input_type_job');

//добаление карточки, рендер карточки, описание действий всех интерактивных элементов карточки
function getCard(data) {
  const cardElement = cardTemlplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__img');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  return cardElement;
}

function renderCards(data) {
  photoContainer.prepend(getCard(data));
}

const prepareCard = initialCards.map(card => getCard(card));
photoContainer.prepend(...prepareCard);

function deleteCardItem(button) {
  const currentCard = button.closest('.element');
  currentCard.remove();
}

function likeCard(button) {
  button.classList.toggle('element__like-btn_active');
}

function getBigImage(data) {
  modifyPopup(popupCardView);

  image.src = data.src;
  image.alt = data.alt;
  caption.textContent = data.alt;
}

function selectAction (target) {
  if (target.classList.contains('element__like-btn')) {
    likeCard(target);
  }
  if (target.classList.contains('element__delete-btn')) {
    deleteCardItem(target);
  }
  if (target.classList.contains('element__img')) {
    getBigImage(target);
  }
}
//открытие/закрытие форм, функции отправки форм, заполнение форм исходными данными, отмена стандартной
//отправки происходит в validate.js, там же находятся функции скрытия ошибок и переключатель кнопки submit
function modifyPopup(popup) {
  popup.classList.toggle('popup_visible');
  if (popup.classList.contains('popup_visible')) {
    document.addEventListener('keydown', (evt) => closePopupEsc(evt));
  }
  document.removeEventListener('keydown', (evt)=> closePopupEsc(evt));
}

function editSubmitHandler () {
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  modifyPopup(editFormPopup);
  editFormPopup.querySelector('.popup__form').reset();
}

function addFormSubmitHandler() {
  const cardUser = {};
  cardUser.name = titleInput.value;
  cardUser.link = linkInput.value;
  renderCards(cardUser);
  modifyPopup(addFormPopup);
  addFormPopup.querySelector('.popup__form').reset();
}

function fillInputEdit () {
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
}

function resetError (form, inputList) {
  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement);
  })
}

function initialForm(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const button = form.querySelector('.popup__submit-btn')
  modifyPopup(form);
  resetError (form, inputList);
  toggleButtonState(inputList, button);
}

function closePopupEsc (evt) {
  const openedPopup = document.querySelector('.popup_visible')
  if (evt.key === 'Escape' && openedPopup) {
    modifyPopup(openedPopup);
  }
}

function closePopupBtn (popup) {
  const closeBtn = popup.querySelector('.popup__close-btn');
  closeBtn.addEventListener('click', () => {
    modifyPopup(popup);
  });
}

function addListenerForPopup (popupElement) {
  popupElement.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) {
    modifyPopup(popupElement)
    }
  });
  closePopupBtn(popupElement);
}


editBtn.addEventListener('click', () => {
  initialForm(editFormPopup);
  fillInputEdit();
});
editFormPopup.addEventListener('submit', () => editSubmitHandler());

popupList.forEach((popupElement) => addListenerForPopup(popupElement));

addBtn.addEventListener('click', () => initialForm(addFormPopup));
addFormPopup.addEventListener('submit', () => addFormSubmitHandler());

photoContainer.addEventListener('click', (evt) => selectAction(evt.target));
