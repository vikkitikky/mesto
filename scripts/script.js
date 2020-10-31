const photoContainer = document.querySelector('.photo');
const cardTemlplate = document.querySelector('#photo-template').content;

const popupList = Array.from(document.querySelectorAll('.popup'));
const editFormPopup = document.querySelector('.popup_type_edit-profile');
const addFormPopup = document.querySelector('.popup_type_add-img');
const popupCardView = document.querySelector('.popup_type_card-view');

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

function renderCard(data) {
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
  const image = popupCardView.querySelector('.popup__image');
  const caption = popupCardView.querySelector('.popup__card-title');

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
function modifyPopup(form) {
  form.classList.toggle('popup_visible');
}

function editSubmitHandler (form) {
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  modifyPopup(form);
  form.querySelector('.popup__form').reset();
}

function addFormSubmitHandler(form) {
  const cardUser = {};
  cardUser.name = form.querySelector('.popup__input_type_title').value;
  cardUser.link = form.querySelector('.popup__input_type_src').value;
  renderCard(cardUser);
  modifyPopup(form);
  form.querySelector('.popup__form').reset();
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
//добавлять на весь документ
function closePopupEsc (form, evt) {
  if (evt.key === 'Escape' && form.classList.contains('popup_visible')) {
    modifyPopup(form);
  }
}

function closePopupBtn (form) {
  const closeBtn = form.querySelector('.popup__close-btn');
  closeBtn.addEventListener('click', () => {
    modifyPopup(form);
  });
}

function addListenerForPopup (popupElement) {
  popupElement.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup')) {
    modifyPopup(popupElement)
    }
  });
  document.addEventListener('keydown', (evt) => closePopupEsc(popupElement, evt));
  closePopupBtn(popupElement);
}


editBtn.addEventListener('click', () => {
  initialForm(editFormPopup);
  fillInputEdit();
});
editFormPopup.addEventListener('submit', () => editSubmitHandler(editFormPopup));

popupList.forEach((popupElement) => addListenerForPopup(popupElement))
addBtn.addEventListener('click', () => initialForm(addFormPopup));
addFormPopup.addEventListener('submit', () => addFormSubmitHandler(addFormPopup));
photoContainer.addEventListener('click', (evt) => selectAction(evt.target));
