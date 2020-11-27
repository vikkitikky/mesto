export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._itemsForRender = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._itemsForRender.forEach((item) => {
      this._renderer(item);
    })
  }
}
