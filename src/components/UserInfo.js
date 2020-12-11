export default class UserInfo {
  constructor({name, about, avatar}) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const profileInfo = {};
    profileInfo.name = this._name.textContent;
    profileInfo.about = this._about.textContent;

    return profileInfo;
  }

  setUserInfo(element) {
    this._name.textContent = element.name;
    this._about.textContent = element.about;
  }

  setUserAvatar(element) {
    this._avatar.src = element.avatar;
  }
}
