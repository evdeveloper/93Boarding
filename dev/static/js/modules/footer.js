// Модуль для работы с footer
export class Footer {
    constructor() {
        this.init();
    }

    init() {
        console.log('Footer module initialized');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Здесь можно добавить обработчики событий для footer
        const footerLinks = document.querySelectorAll('.footer a');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleFooterLinkClick(e);
            });
        });
    }

    handleFooterLinkClick(event) {
        console.log('Footer link clicked:', event.target.href);
        // Здесь можно добавить логику обработки кликов по ссылкам в footer
    }
}
