import { fadeIn, fadeOut } from '../helpers/fade.js';

const CONFIG = {
  groupSelector: '.group',
  itemSelector: '.group__item',
  topSelector: '.group__top', 
  bodySelector: '.group__body',
  activeClass: 'active',
  dataOpenAttribute: 'data-open',
  animationDuration: 300
};


export function accordionGroups() {
  const groups = document.querySelectorAll(CONFIG.groupSelector);
  groups.forEach(group => {
    const dataOpen = group.getAttribute(CONFIG.dataOpenAttribute);
    if (dataOpen) {
      const openCount = parseInt(dataOpen, 0);
      const items = group.querySelectorAll(CONFIG.itemSelector);
      for (let i = 0; i < Math.min(openCount, items.length); i++) {
        items[i].classList.add(CONFIG.activeClass);
      }
    }
  });
  document.addEventListener('click', (e) => {
    if(e.target.closest(CONFIG.topSelector)) {
      const target = e.target.closest(CONFIG.topSelector);
      const itemElement = target.closest(CONFIG.itemSelector);
      itemElement.classList.toggle(CONFIG.activeClass);
      const bodyElement = itemElement.querySelector(CONFIG.bodySelector);
      if (itemElement.classList.contains(CONFIG.activeClass)) {
        fadeIn(bodyElement, 'block', CONFIG.animationDuration);
      } else {
        fadeOut(bodyElement, CONFIG.animationDuration);
      }
    }
  });
}