// Конфигурация Lap 1x6 Pack
const CONFIG = {
    // API Google Apps Script
    API_URL: 'https://script.google.com/macros/s/AKfycbwR8PJEEXPid3KUezDwPxbAQILlIWJjE2iIWaXC0eJhjQV66kb8NjpRqi9Uz6PhAVpJVg/exec',
    
    // GitHub raw URL
    GITHUB_URL: 'https://raw.githubusercontent.com/BtheBFr/Lap-1x6-dota/main/',
    
    // Telegram Bot
    BOT_URL: 'https://t.me/Lap1x6Dota_bot',
    
    // Настройки клавиш по умолчанию
    DEFAULT_BINDS: {
        Q: 'Q',
        W: 'W',
        E: 'E',
        D: 'D',
        F: 'F',
        R: 'R'
    },
    
    // Настройки кеша (в часах)
    CACHE: {
        HEROES: 168,        // 7 дней
        USER_DATA: 24,      // 1 день
        SETTINGS: 24        // 1 день
    },
    
    // Версия приложения
    VERSION: '1.0.0'
};

// Проверка подключения
console.log('Lap 1x6 Pack v' + CONFIG.VERSION + ' загружен');
