
//function openPopup(popup) {
//  popup.classList.add('popup_visible');
//  document.addEventListener('keydown', closePopupByEsc);
//}

//function closePopupByEsc(evt) {
//  const openedPopup = document.querySelector('.popup_visible');
//  if(evt.key === 'Escape' && openedPopup) {
//    closePopup(openedPopup);
//  }
//}

//function closePopup(popup) {
//  popup.classList.remove('popup_visible');
//  document.removeEventListener('keydown', closePopupByEsc)
//}

class Popup {
 constructor(popupElement) {
   this._popup = popupElement;
 }

 openPopup() {
   this._popup.classList.add('popup_visible');
   document.addEventListener('keydown', this._closePopupByEsc);
 }

 _closePopup() {
   this._popup.classList.remove('popup_visible');
   document.removeEventListener('keydown', this._closePopupByEsc);
 }

 _closePopupByEsc(evt) {
   if(evt.key === 'Escape') {
     this._closePopup();
   }
 }

 setEventListener() {
   this._closeButton = this._popup.querySelector('.popup__close-btn');

   this._closeButton.addEventListener('click', () => this._closePopup());
   this._popup.addEventListener('click', () => {
     if(evt.target === evt.currentTarget) {
       this._closePopup();
     }
   })
 }
}


function openPopup(popup) {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) {
  const openedPopup = document.querySelector('.popup_visible');
  if(evt.key === 'Escape' && openedPopup) {
    closePopup(openedPopup);
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closePopupByEsc)
}

editButton.addEventListener('click', () => {
  fillEditForm();
  openPopup(popupWithEditForm);
})

addButton.addEventListener('click', () => {

  openPopup(popupWithAddForm);
})

closeButtonList.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

popupList.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
})

photoContainer.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('element__img')) {
    getDataForBigCard(evt);
    openPopup(popupWithImage);
  }
})

editForm.addEventListener('submit', () => {
  submitFormEdit();
  closePopup(popupWithEditForm);
})

addForm.addEventListener('submit', () => {
  submitFormAdd();
  closePopup(popupWithAddForm);
})
