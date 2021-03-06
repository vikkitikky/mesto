import Section from "../components/Section.js";
import {Card} from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import {FormValidator} from "../components/FormValidator.js";
import objectParams from "../components/constants.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithSubmit from "../components/PopupWithSubmit";
import './index.css';

const addButton = document.querySelector('.profile__add-btn');
const editButton = document.querySelector('.profile__edit-btn');
const avatarButton = document.querySelector('.profile__edit-avatar');
const addImageForm = document.querySelector('.popup__form_type_add');
const editProfileForm = document.querySelector('.popup__form_type_edit');
const editAvatarForm = document.querySelector('.popup__form_type_edit-avatar')
const inputName = editProfileForm.querySelector('.popup__input_type_name');
const inputAbout = editProfileForm.querySelector('.popup__input_type_job');
const avatarSubmitButton = editAvatarForm.querySelector('.popup__submit-btn');
const profileSubmitButton = editProfileForm.querySelector('.popup__submit-btn');
const addSubmitButton = addImageForm.querySelector('.popup__submit-btn');

let userId = '';

const setButtonText = (button, text) => {
  button.textContent = text;
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18/',
  headers: {
    authorization: '3f1525c8-6553-40b2-a3fa-d91718e64979',
    'Content-Type': 'application/json'
  }
});

const profileData = new UserInfo({
  name: '.profile__name',
  about: '.profile__about',
  avatar: '.profile__avatar'
});

const bigCard = new PopupWithImage('.popup_type_card-view');

const deleteSubmitPopup = new PopupWithSubmit('.popup_type_confirm', {
  submitAction: (item) => {
    api.deleteCard(item._cardId)
      .then(() => {
        item.removeCard();
        deleteSubmitPopup.close();
      })
      .catch((err) => {
        console.log(`Удаление не удалось. Ошибка ${err}`)
      })
  }
})

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', {
  submittingForm: (item) => {
    setButtonText(avatarSubmitButton, 'Сохранение...');
    api.editAvatar(item.avatar)
      .then(() => {
        profileData.setUserAvatar(item);
        popupEditAvatar.close();
      })
      .catch((err) =>{
        console.log(`Редактирование аватара. Ошибка: ${err}`)
      })
      .finally(() => setButtonText(avatarSubmitButton, 'Сохранить'))
  }
});

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
  submittingForm: (item) => {
    setButtonText(profileSubmitButton, 'Сохранение...');
    api.editUserData(item)
      .then(() => {
        profileData.setUserInfo(item);
        popupEditProfile.close();
      })
      .catch((err) =>{
        console.log(`Редактирование профиля. Ошибка: ${err}`)
      })
      .finally(() => setButtonText(profileSubmitButton, 'Сохранить'))
  }
});

const createCard = (item) => {
  const newCard = new Card({
      data: item,
      handleCardClick: bigCard.open.bind(bigCard),
      handleLikeClick: (init, item) => {
        if (!init) {
          api.setLike(item)
            .then((res) => {
              newCard.updateLikeCount(res.likes.length);
              newCard.setLike()
            })
        } else {
          api.removeLike(item)
            .then((res) => {
              newCard.updateLikeCount(res.likes.length);
              newCard.removeLike();
            })
        }
      },
      handleDeleteIconClick: item => {
        deleteSubmitPopup.open(item)
      }
    },
    '#photo-template', userId);

  return newCard.generateCard();
}

const section = new Section({
  renderer: createCard
}, '.photo');

const popupAddCard = new PopupWithForm('.popup_type_add-img', {
  submittingForm: (item) => {
    setButtonText(addSubmitButton, 'Сохранение...');
    api.addNewCard(item)
      .then((res) => {
        section.addItem(createCard(res));
        popupAddCard.close()
      })
      .catch((err) => {
        console.log(`Добавление карточки. Ошибка: ${err}`)
      })
      .finally(() => setButtonText(addSubmitButton, 'Создать'))
  }
})

const addImageValidator = new FormValidator(objectParams, addImageForm);
const editProfileValidator = new FormValidator(objectParams, editProfileForm);
const editAvatarValidator = new FormValidator(objectParams, editAvatarForm);

addButton.addEventListener('click', () => {
  addImageValidator.resetValidation();
  popupAddCard.open();
})

api.prepareDataForRender()
  .then(data => {
    const [userData, initialCards] = data;
    userId = userData._id;

    initialCards.sort((a,b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB
    });

    profileData.setUserAvatar(userData);
    profileData.setUserInfo(userData);

    section.renderItems(initialCards);
  })
  .catch(err => {
    console.log(`Не получилось получить данные. ${err}`)
  })


bigCard.setEventListener();
deleteSubmitPopup.setEventListener();
addImageValidator.enableValidation();
editProfileValidator.enableValidation();
editAvatarValidator.enableValidation();

popupAddCard.setEventListener();
popupEditAvatar.setEventListener();
popupEditProfile.setEventListener();

editButton.addEventListener('click', () => {
  editProfileValidator.resetValidation();
  inputName.value = profileData.getUserInfo().name;
  inputAbout.value = profileData.getUserInfo().about;
  popupEditProfile.open();
})

avatarButton.addEventListener('click', () => {
  editAvatarValidator.resetValidation();
  popupEditAvatar.open();
});


