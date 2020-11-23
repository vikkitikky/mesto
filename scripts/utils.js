export function openPopup(popup) {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopupByEsc(evt) {
  const openedPopup = document.querySelector('.popup_visible');
  if(evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

export function closePopup(popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', closePopupByEsc)
}
