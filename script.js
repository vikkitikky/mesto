let formContainer = document.querySelector('.popup');
let form = formContainer.querySelector('.popup__container');
let editBtn = document.querySelector('.profile__edit-btn');
let closeBtn = form.querySelector('.popup__close-btn');
let nameInput = form.querySelector('.popup__input_field_name');
let jobInput = form.querySelector('.popup__input_field_job');
let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__about');

nameInput.value = userName.textContent;
jobInput.value = userJob.textContent;

function formVisibility() {
  formContainer.classList.toggle('popup_hidden');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    formContainer.classList.add('popup_hidden');
}

editBtn.addEventListener('click', formVisibility);
closeBtn.addEventListener('click', formVisibility);
form.addEventListener('submit', formSubmitHandler);
