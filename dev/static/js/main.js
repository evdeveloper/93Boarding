import { theme } from './modules/theme.js';
import { accordionGroups } from './modules/groups.js';
import { fadeIn, fadeOut } from './helpers/fade.js';
import { siblings } from './helpers/siblings.js';
import { initFileUploads } from './modules/uploadFileForm.js';
import { openModal, closeModal } from './modules/modal.js';

document.addEventListener("DOMContentLoaded", () => {
  const isTablet = window.matchMedia("(max-width: 821px)").matches;
  const newsSlider = document.querySelector('.news__splide');
  // Инициализация модуля темы
  theme.init();

  // Инициализация модуля загрузки файлов
  initFileUploads();
  
  // Инициализация модуля групп
  accordionGroups();

  // Инициализация модуля fancybox
  if (typeof Fancybox !== 'undefined') {
    Fancybox.bind("[data-fancybox]", {});
  }
  if(newsSlider) {
    const splideNews = new Splide(newsSlider, {
      arrows: false,
      pagination: false,
      breakpoints: {
        821: { fixedWidth: 248 }
      }
    });
    if(isTablet) { splideNews.mount(); }
  }

  document.addEventListener('click', (e) => {
    const target = e.target;
    target.closest('.controls__item')?.classList.toggle('active');
    if(target.closest('.accordion__top')) {
      const parent = target.closest('.accordion__item');
      const body = parent.querySelector('.accordion__body');
      parent.classList.toggle('active');
      const isActive = parent.classList.contains('active');
      isActive ? fadeIn(body, 'block', 300) : fadeOut(body, 300);
      const sibling = siblings(parent);
      sibling.forEach(item => {
        item.classList.remove('active');
        fadeOut(item.querySelector('.accordion__body'), 300);
      });
    }
    if(target.closest('[data-modal-open]')) {
      e.preventDefault();
      openModal(e.target.closest('[data-modal-open]').getAttribute('data-modal-open'));
    }
    if(target.closest('[data-modal-close]')) {
      closeModal(e.target.closest('.modal').getAttribute('data-modal-target'));
    }
  });
  
});