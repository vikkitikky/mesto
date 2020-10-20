let formContainer = document.querySelector('.popup');
let form = formContainer.querySelector('.popup__container');
let editBtn = document.querySelector('.profile__edit-btn');
let closeBtn = form.querySelector('.popup__close-btn');
let nameInput = form.querySelector('.popup__input_field_name');
let jobInput = form.querySelector('.popup__input_field_job');
let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__about');


function formVisibility() {
  formContainer.classList.add('popup_visible');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function formHidden() {
  formContainer.classList.remove('popup_visible');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    formHidden();
}

editBtn.addEventListener('click', formVisibility);
closeBtn.addEventListener('click', formHidden);
form.addEventListener('submit', formSubmitHandler);

//карточки из коробки

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

const photoContainer = document.querySelector('.photo');

function addCard(name, link) {
  const cardTemlplate = document.querySelector('#photo-template').content;
  const cardElement = cardTemlplate.cloneNode(true);

  cardElement.querySelector('.element__title').textContent = name;
  cardElement.querySelector('.element__img').src = link;
  cardElement.querySelector('.element__img').alt = name;
  photoContainer.prepend(cardElement);
}

initialCards.forEach(item => addCard(item.name, item.link))

