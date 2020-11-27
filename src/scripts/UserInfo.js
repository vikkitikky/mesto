export default class UserInfo {
  constructor({name, job}) {
    this._name = document.querySelector(name);
    this._job = document.querySelector(job);
  }

  getUserInfo() {
    const profileInfo = {};
    profileInfo.name = this._name.textContent;
    profileInfo.job = this._job.textContent;

    return profileInfo;
  }

  setUserInfo(element) {
    this._name.textContent = element.name;
    this._job.textContent = element.job;
  }
}
