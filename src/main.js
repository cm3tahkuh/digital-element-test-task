import "./assets/styles/main.scss";


export default class Header {
  constructor() {
    this.burger = document.querySelector('.header__burger');
    this.nav = document.querySelector('.header__nav');

    this.init();
  }

  init() {
    if (this.burger) {
      this.burger.addEventListener('click', () => this.toggleMenu());
    }
  }

  toggleMenu() {
    this.nav.classList.toggle('header__nav-active');
    document.body.classList.toggle('no-scroll'); // опционально блокируем скролл
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  new Header();
});
