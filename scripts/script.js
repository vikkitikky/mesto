const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

function addCard(name, link) {
  const photoContainer = document.querySelector('.photo');
  const cardTemlplate = document.querySelector('#photo-template').content;
  const cardElement = cardTemlplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__img');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  const deleteBtn = cardElement.querySelector('.element__delete-btn');
  deleteBtn.addEventListener('click', (evt) => deleteCardItem(evt.target));

  const likeBtn = cardElement.querySelector('.element__like-btn');
  likeBtn.addEventListener('click', (evt) => likeCard(evt.target));

  cardImage.addEventListener('click', (evt) => bigImage(evt.target));

  photoContainer.prepend(cardElement);
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

function bigImage(element) {
  modifyPopup(popupCardView);
  const image = popupCardView.querySelector('.popup__image');
  const caption = popupCardView.querySelector('.popup__card-title');

  image.src = element.src;
  image.alt = element.alt;
  caption.textContent = element.alt;
}

function fillInputEdit () {
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  modifyPopup(editForm);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const titleValue = addForm.querySelector('.popup__input_type_title').value;
  const srcValue = addForm.querySelector('.popup__input_type_src').value;
  addCard(titleValue, srcValue);
  modifyPopup(addForm);
}

initialCards.forEach(item => addCard(item.name, item.link));

addButton.addEventListener('click', () => modifyPopup(addForm));
closeAddBtn.addEventListener('click', () => modifyPopup(addForm));
addForm.addEventListener('submit', addFormSubmitHandler);

editBtn.addEventListener('click', () => {modifyPopup(editForm); fillInputEdit()});
closeEditBtn.addEventListener('click', () => modifyPopup(editForm));
editForm.addEventListener('submit', formSubmitHandler);

closeImageBtn.addEventListener('click', () => modifyPopup(popupCardView));
