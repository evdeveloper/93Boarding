// Модуль для работы с header
export class Header {
    constructor() {
        this.init();
    }

    init() {
        console.log('Header module initialized');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Здесь можно добавить обработчики событий для header
        document.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    handleScroll() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }
}
