let formContainer = document.querySelector('.popup');
//let form = formContainer.querySelector('.popup__container');
//let editBtn = document.querySelector('.profile__edit-btn');
//let closeBtn = form.querySelector('.popup__close-btn');
//let nameInput = form.querySelector('.popup__input_field_name');
//let jobInput = form.querySelector('.popup__input_field_job');
//let userName = document.querySelector('.profile__name');
//let userJob = document.querySelector('.profile__about');
//
//
//function formVisibility() {
//  formContainer.classList.add('popup_visible');
//  nameInput.value = userName.textContent;
//  jobInput.value = userJob.textContent;
//}
//
//function formHidden() {
//  formContainer.classList.remove('popup_visible');
//}
//
//function formSubmitHandler (evt) {
//  evt.preventDefault();
//    userName.textContent = nameInput.value;
//    userJob.textContent = jobInput.value;
//    formHidden();
//}
//
//editBtn.addEventListener('click', formVisibility);
//closeBtn.addEventListener('click', formHidden);
//form.addEventListener('submit', formSubmitHandler);
//
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

function modifyPopup(form) {
  form.classList.toggle('popup_visible');
}

const addButton = document.querySelector('.profile__add-btn'); //нашли кнопку добавления картинки
const addForm = document.querySelector('.popup_type_add-img');//нашли попап с формой добавления
const closeAddBtn = document.querySelector('.popup__close-btn_add-form');//нашли закрывающую форму добавления кнопку
addButton.addEventListener('click', () => modifyPopup(addForm));//открываем попап добавления фото
closeAddBtn.addEventListener('click', () => modifyPopup(addForm));//закрываем попап добавления фото


const editBtn = document.querySelector('.profile__edit-btn');//нашли кнопку редактирования профиля
const editForm = document.querySelector('.popup_type_edit-profile')//нашли форму редактирования
const closeEditBtn = editForm.querySelector('.popup__close-btn_edit-form')//нашли кнопку закрытия формы редактирования
editBtn.addEventListener('click', () => {modifyPopup(editForm); fillInputEdit()});//как добавить вторую функцию?
closeEditBtn.addEventListener('click', () => modifyPopup(editForm));

//собрали данные для первичного заполнения формы - вынести константы для другой функции
const nameValue = document.querySelector('.profile__name');
const nameInput = editForm.querySelector('.popup__input_type_name');

const jobValue = document.querySelector('.profile__about');
const jobInput = editForm.querySelector('.popup__input_type_job');


function fillInputEdit () {
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
}

//фунция для кнопки сохранить формы изменения профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  modifyPopup(editForm);
}

//добавляем обработчик формы
editForm.addEventListener('submit', formSubmitHandler);

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const titleValue = addForm.querySelector('.popup__input_type_title').value;
  const srcValue = addForm.querySelector('.popup__input_type_src').value;
  addCard(titleValue, srcValue);
  modifyPopup(addForm);
}

addForm.addEventListener('submit', addFormSubmitHandler);