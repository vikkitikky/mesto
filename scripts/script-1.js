//первоначальный набор карточек
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
const addButton = document.querySelector('.profile__add-btn'); //нашли кнопку добавления картинки
const addForm = document.querySelector('.popup_type_add-img');//нашли попап с формой добавления
const closeAddBtn = document.querySelector('.popup__close-btn_add-form');//нашли закрывающую форму добавления кнопку
const editBtn = document.querySelector('.profile__edit-btn');//нашли кнопку редактирования профиля
const editForm = document.querySelector('.popup_type_edit-profile')//нашли форму редактирования
const closeEditBtn = editForm.querySelector('.popup__close-btn_edit-form')//нашли кнопку закрытия формы редактирования
const closeImageBtn = popupCardView.querySelector('.popup__close-btn');
const addBtn = addForm.querySelector('.popup__submit-btn_type_add-form')
const nameValue = document.querySelector('.profile__name');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobValue = document.querySelector('.profile__about');
const jobInput = editForm.querySelector('.popup__input_type_job');

function addCard(name, link) {
  const photoContainer = document.querySelector('.photo');//нашли секцию карточек
  const cardTemlplate = document.querySelector('#photo-template').content; //нашли шаблон
  const cardElement = cardTemlplate.cloneNode(true);//склонировали карточку
  const cardTitle = cardElement.querySelector('.element__title');//нашли заголовок карточки
  const cardImage = cardElement.querySelector('.element__img');//нашли картинку карточки

  cardTitle.textContent = name; //присвоили название карточки
  cardImage.src = link;//присвоили источник картинки
  cardImage.alt = name;//присвоили альт для картинки

  const deleteBtn = cardElement.querySelector('.element__delete-btn');//нашли кнопку удаления в карточке
  deleteBtn.addEventListener('click', (evt) => deleteCardItem(evt.target));//добавить обработчик

  const likeBtn = cardElement.querySelector('.element__like-btn');//нашли кнопку лайка в карточке
  likeBtn.addEventListener('click', (evt) => likeCard(evt.target));//добавлен обработчик

  cardImage.addEventListener('click', (evt) => bigImage(evt.target));


  photoContainer.prepend(cardElement);//добавили карточку в начало секции
}

initialCards.forEach(item => addCard(item.name, item.link))


//функция удаления карточки
function deleteCardItem(button) {
  const currentCard = button.closest('.element');
  currentCard.remove();
}

//функция лайка на карточке
function likeCard(button) {
  button.classList.toggle('element__like-btn_active');
}

//функция переключения видимости попапа
function modifyPopup(form) {
  form.classList.toggle('popup_visible');
}

//функция открытия большого изображения
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

addButton.addEventListener('click', () => modifyPopup(addForm));//открываем попап добавления фото
closeAddBtn.addEventListener('click', () => modifyPopup(addForm));//закрываем попап добавления фото
addBtn.addEventListener('click', addFormSubmitHandler);

editBtn.addEventListener('click', () => {modifyPopup(editForm); fillInputEdit()});
closeEditBtn.addEventListener('click', () => modifyPopup(editForm));
editForm.addEventListener('submit', formSubmitHandler);

closeImageBtn.addEventListener('click', () => modifyPopup(popupCardView));
