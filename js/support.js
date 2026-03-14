// Отправка жалоб в Google Sheets
// Apps Script URL - ВАША ССЫЛКА (уже вставлена)
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
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(() => {
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

// Сохраняем функцию глобально
window.submitSupportTicket = submitSupportTicket;
