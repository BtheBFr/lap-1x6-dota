// Настройки клавиш

// Клавиши по умолчанию
const DEFAULT_KEYS = {
    q: 'Q',
    w: 'W',
    e: 'E',
    r: 'R',
    d: 'D',
    f: 'F'
};

// Текущая записываемая кнопка
let recordingSkill = null;

// Загрузка настроек при старте
document.addEventListener('DOMContentLoaded', function() {
    loadKeybindings();
    setupSettingsListeners();
});

// Загрузка сохраненных клавиш
function loadKeybindings() {
    const savedKeys = localStorage.getItem('keybindings');
    let keybindings = savedKeys ? JSON.parse(savedKeys) : DEFAULT_KEYS;
    
    // Обновляем все кнопки
    Object.keys(keybindings).forEach(skill => {
        const btn = document.getElementById(`key-${skill.toUpperCase()}`);
        if (btn) {
            btn.textContent = keybindings[skill];
            btn.setAttribute('data-key', keybindings[skill]);
        }
    });
}

// Настройка слушателей
function setupSettingsListeners() {
    // Кнопки клавиш
    document.querySelectorAll('.keybind-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            startRecording(this);
        });
    });
    
    // Сброс настроек
    const resetBtn = document.getElementById('resetKeys');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetToDefault);
    }
    
    // Слушатель клавиш для записи
    document.addEventListener('keydown', handleKeyDown);
}

// Начать запись клавиши
function startRecording(btn) {
    stopRecording();
    
    recordingSkill = btn.getAttribute('data-skill');
    btn.classList.add('recording');
    btn.textContent = '...';
    
    showToast(`Нажмите новую клавишу для ${recordingSkill.toUpperCase()}`);
}

// Остановить запись
function stopRecording() {
    if (recordingSkill) {
        const oldBtn = document.querySelector('.keybind-btn.recording');
        if (oldBtn) {
            const keybindings = JSON.parse(localStorage.getItem('keybindings')) || DEFAULT_KEYS;
            oldBtn.textContent = keybindings[recordingSkill] || DEFAULT_KEYS[recordingSkill];
            oldBtn.classList.remove('recording');
        }
        recordingSkill = null;
    }
}

// Обработка нажатия клавиши
function handleKeyDown(e) {
    if (!recordingSkill) return;
    
    e.preventDefault();
    
    let key = e.key.toUpperCase();
    
    // Игнорируем специальные клавиши
    if (key === 'ESCAPE' || key === 'CONTROL' || key === 'ALT' || key === 'SHIFT' || key === 'META') {
        return;
    }
    
    // Обработка цифр
    if (e.key >= 0 && e.key <= 9) {
        key = e.key;
    }
    
    // Сохраняем новую клавишу
    const keybindings = JSON.parse(localStorage.getItem('keybindings')) || DEFAULT_KEYS;
    keybindings[recordingSkill] = key;
    localStorage.setItem('keybindings', JSON.stringify(keybindings));
    
    // Обновляем кнопку
    const btn = document.getElementById(`key-${recordingSkill.toUpperCase()}`);
    if (btn) {
        btn.textContent = key;
        btn.classList.remove('recording');
        btn.setAttribute('data-key', key);
    }
    
    showToast(`Клавиша ${recordingSkill.toUpperCase()} изменена на ${key}`);
    recordingSkill = null;
}

// Сброс на стандартные клавиши
function resetToDefault() {
    localStorage.setItem('keybindings', JSON.stringify(DEFAULT_KEYS));
    loadKeybindings();
    showToast('Сброшено на Q,W,E,R,D,F');
}

// Получить текущую клавишу для скилла
function getKeyForSkill(skill) {
    const keybindings = JSON.parse(localStorage.getItem('keybindings')) || DEFAULT_KEYS;
    return keybindings[skill] || DEFAULT_KEYS[skill];
}
