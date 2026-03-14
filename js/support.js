// Отправка жалоб в Google Sheets
// Apps Script URL - ЗАМЕНИТЕ НА СВОЙ!
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyll3lmKAoU4xllrdtSzZAKXTWBum6ey-_2Euqp1qnkOaIvPClYKqxe73PfQhy-_5eTEQ/exec';

// Отправка тикета в поддержку
function submitSupportTicket(problemType, hero, skill, description) {
    // Показываем загрузку
    const submitBtn = document.getElementById('submitSupport');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    // Преобразуем тип проблемы в читаемый текст
    let problemText = '';
    switch(problemType) {
        case 'settings':
            problemText = 'Не работают настройки';
            break;
        case 'missing_skill':
            problemText = 'Нет скилла';
            break;
        case 'wrong_build':
            problemText = 'Сборка неправильная';
            break;
        case 'missing_hero':
            problemText = 'Нет персонажа';
            break;
        default:
            problemText = 'Другое';
    }
    
    // Данные для отправки
    const data = {
        problem: problemText,
        hero: hero || '-',
        skill: skill || '-',
        description: description,
        url: window.location.href,
        timestamp: new Date().toLocaleString('ru-RU')
    };
    
    // Отправляем через Apps Script
    fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Важно для Google Apps Script
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        // Даже если no-cors, мы не получим ответ, но считаем что отправилось
        showToast('Спасибо! Жалоба отправлена');
        
        // Закрываем модалку
        document.getElementById('supportModal').classList.remove('active');
        resetSupportModal();
    })
    .catch(error => {
        console.error('Ошибка:', error);
        showToast('Ошибка отправки. Попробуйте позже');
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Альтернативный способ - открыть форму в новом окне (на случай если fetch не работает)
function openSupportForm(problem, hero, skill, description) {
    // Создаем URL с параметрами
    const params = new URLSearchParams({
        problem: problem,
        hero: hero || '',
        skill: skill || '',
        description: description
    });
    
    // Открываем в маленьком окне
    window.open(
        `https://docs.google.com/forms/d/e/1FAIpQLSdXXXXXXXXXX/viewform?${params.toString()}`,
        'support',
        'width=600,height=600'
    );
}

// Сохраняем функцию глобально
window.submitSupportTicket = submitSupportTicket;

// Функция для ручного тестирования
function testSupportTicket() {
    submitSupportTicket('test', 'Luna', 'Eclipse', 'Тестовое сообщение');
}
