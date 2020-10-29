const popupCardView = document.querySelector('.popup_type_card-view');
const addForm = document.querySelector('.popup_type_add-img');
const editForm = document.querySelector('.popup_type_edit-profile');

const addButton = document.querySelector('.profile__add-btn');
const editBtn = document.querySelector('.profile__edit-btn');

const nameValue = document.querySelector('.profile__name');
const jobValue = document.querySelector('.profile__about');

const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_job');

const photoContainer = document.querySelector('.photo');
const cardTemlplate = document.querySelector('#photo-template').content;

const closeButton = Array.from(document.querySelectorAll('.popup__close-btn'));

const popupOverlay = Array.from(document.querySelectorAll('.popup'));

popupOverlay.forEach((element) => element.addEventListener('mousedown', (evt) => modifyPopup(evt.target)));

closeButton.forEach((button) => {
  button.addEventListener('click', () => {
    modifyPopup(button.closest('.popup'))})
})

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

function modifyPopup(form) {
  form.classList.toggle('popup_visible');
}

function deleteCardItem(button) {
  const currentCard = button.closest('.element');
  currentCard.remove();
}

function likeCard(button) {
  button.classList.toggle('element__like-btn_active');
}

function getBigImage(data) {
  const image = popupCardView.querySelector('.popup__image');
  const caption = popupCardView.querySelector('.popup__card-title');

  image.src = data.src;
  image.alt = data.alt;
  caption.textContent = data.alt;
}

function chooseAction (element) {
  if (element.classList.contains('element__like-btn')) {
    likeCard(element);
  }
  if (element.classList.contains('element__delete-btn')) {
    deleteCardItem(element);
  }
  if (element.classList.contains('element__img')) {
    modifyPopup(popupCardView);
    getBigImage(element);
  }
}

function fillInputEdit () {
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
}

function editSubmitHandler (evt) {
  evt.preventDefault();
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  modifyPopup(editForm);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardUser = {};
  cardUser.name = addForm.querySelector('.popup__input_type_title').value;
  cardUser.link = addForm.querySelector('.popup__input_type_src').value;
  renderCard(cardUser);
  modifyPopup(addForm);
  addForm.querySelector('.popup__form').reset();
}

addButton.addEventListener('click', () => modifyPopup(addForm));
addForm.addEventListener('submit', addFormSubmitHandler);
addForm.addEventListener('keydown', (evt) => {
  if (evt.key === "Esc") {
    modifyPopup(addForm);
  }
})

editBtn.addEventListener('click', () => {modifyPopup(editForm); fillInputEdit()});
editForm.addEventListener('submit', editSubmitHandler);

photoContainer.addEventListener('click', (evt) => {
  chooseAction(evt.target);
})
