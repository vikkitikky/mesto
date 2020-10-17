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
