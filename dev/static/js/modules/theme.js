const THEME_CONFIG = {
  key: 'theme',
  light: 'light',
  dark: 'dark'
};

let currentTheme = THEME_CONFIG.light;

const getThemeFromCookie = () => {
  const cookies = Object.fromEntries(
    document.cookie.split(';').map(cookie => {
      const [name, value] = cookie.trim().split('=');
      return [name, value ? decodeURIComponent(value) : ''];
    }).filter(([name]) => name)
  );
  return cookies[THEME_CONFIG.key] || THEME_CONFIG.light;
};

const setCookie = (name, value, days = 365) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/`;
};

const updateThemeToggle = (theme) => {
  document.querySelectorAll('.themeToggle__item').forEach(item => {
    const isActive = (theme === THEME_CONFIG.light && item.classList.contains('themeToggle__light')) || (theme === THEME_CONFIG.dark && item.classList.contains('themeToggle__dark'));
    item.classList.toggle('active', isActive);
  });
};

const setTheme = (theme) => {
  currentTheme = theme;
  document.body.setAttribute('data-theme', theme);
  setCookie(THEME_CONFIG.key, theme);
  updateThemeToggle(theme);
};

const toggleTheme = () => {
  setTheme(currentTheme === THEME_CONFIG.light ? THEME_CONFIG.dark : THEME_CONFIG.light);
};

const bindThemeEvents = () => {
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.themeToggle__item');
    if (!item) return;
    
    e.preventDefault();
    
    if (item.classList.contains('themeToggle__light')) {
      setTheme(THEME_CONFIG.light);
    } else if (item.classList.contains('themeToggle__dark')) {
      setTheme(THEME_CONFIG.dark);
    }
  });
};

const initTheme = () => {
  currentTheme = getThemeFromCookie();
  setTheme(currentTheme);
  bindThemeEvents();
};

export const theme = {
  init: initTheme,
  setTheme,
  toggleTheme,
  getCurrentTheme: () => currentTheme,
  isDarkTheme: () => currentTheme === THEME_CONFIG.dark,
  isLightTheme: () => currentTheme === THEME_CONFIG.light,
  
  THEMES: {
    LIGHT: THEME_CONFIG.light,
    DARK: THEME_CONFIG.dark
  }
};