const popupCardView = document.querySelector('.popup_type_card-view');
const addForm = document.querySelector('.popup_type_add-img');
const editForm = document.querySelector('.popup_type_edit-profile');

const addButton = document.querySelector('.profile__add-btn');
const editBtn = document.querySelector('.profile__edit-btn');

const closeAddBtn = addForm.querySelector('.popup__close-btn');
const closeEditBtn = editForm.querySelector('.popup__close-btn');
const closeImageBtn = popupCardView.querySelector('.popup__close-btn');

const nameValue = document.querySelector('.profile__name');
const jobValue = document.querySelector('.profile__about');

const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_job');

const photoContainer = document.querySelector('.photo');
const cardTemlplate = document.querySelector('#photo-template').content;

function getCard(data) {
  const cardElement = cardTemlplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__img');

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  const deleteBtn = cardElement.querySelector('.element__delete-btn');
  deleteBtn.addEventListener('click', (evt) => deleteCardItem(evt.target));

  const likeBtn = cardElement.querySelector('.element__like-btn');
  likeBtn.addEventListener('click', (evt) => likeCard(evt.target));

  cardImage.addEventListener('click', () => getBigImage(data));

  return cardElement;
}

function renderCard(data) {
  photoContainer.prepend(getCard(data));
}

function deleteCardItem(button) {
  const currentCard = button.closest('.element');
  currentCard.remove();
}

function likeCard(button) {
  button.classList.toggle('element__like-btn_active');
}

function modifyPopup(form) {
  form.classList.toggle('popup_visible');
}

function getBigImage(data) {
  modifyPopup(popupCardView);
  const image = popupCardView.querySelector('.popup__image');
  const caption = popupCardView.querySelector('.popup__card-title');

  image.src = data.link;
  image.alt = data.name;
  caption.textContent = data.name;
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

const prepareCard = initialCards.map(card => getCard(card));
photoContainer.prepend(...prepareCard);

addButton.addEventListener('click', () => modifyPopup(addForm));
closeAddBtn.addEventListener('click', () => modifyPopup(addForm));
addForm.addEventListener('submit', addFormSubmitHandler);

editBtn.addEventListener('click', () => {modifyPopup(editForm); fillInputEdit()});
closeEditBtn.addEventListener('click', () => modifyPopup(editForm));
editForm.addEventListener('submit', editSubmitHandler);

closeImageBtn.addEventListener('click', () => modifyPopup(popupCardView));
