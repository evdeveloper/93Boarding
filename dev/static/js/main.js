// Импорт модулей
import { Header } from './modules/header.js';
import { Footer } from './modules/footer.js';
import { Navigation } from './modules/navigation.js';
import { helpers } from './utils/helpers.js';
import { validators } from './utils/validators.js';

// Главный класс приложения
class App {
    constructor() {
        this.init();
    }

    init() {
        console.log('App initialized');
        
        // Инициализация модулей
        this.header = new Header();
        this.footer = new Footer();
        this.navigation = new Navigation();
        
        // Инициализация утилит
        this.setupHelpers();
        this.setupValidators();
        
        // Инициализация общих обработчиков
        this.setupGlobalHandlers();
    }

    setupHelpers() {
        // Делаем утилиты доступными глобально для удобства
        window.helpers = helpers;
        console.log('Helpers initialized');
    }

    setupValidators() {
        // Делаем валидаторы доступными глобально
        window.validators = validators;
        console.log('Validators initialized');
    }

    setupGlobalHandlers() {
        // Обработчик изменения размера окна
        window.addEventListener('resize', helpers.debounce(() => {
            console.log('Window resized');
            // Здесь можно добавить логику для обработки изменения размера
        }, 250));

        // Обработчик прокрутки
        window.addEventListener('scroll', helpers.throttle(() => {
            // Здесь можно добавить логику для обработки прокрутки
        }, 100));
    }
}

// Инициализация приложения после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    window.app = new App();
});