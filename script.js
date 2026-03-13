// Состояние приложения
let state = {
    token: localStorage.getItem('lap1x6_token'),
    user: null,
    settings: {},
    favorites: [],
    heroes: [],
    currentHero: null,
    currentSkill: null
};

// Кеш
const cache = {
    get(key) {
        try {
            const item = localStorage.getItem(`lap1x6_${key}`);
            if (item) {
                const { data, expiry } = JSON.parse(item);
                if (expiry > Date.now()) return data;
                localStorage.removeItem(`lap1x6_${key}`);
            }
        } catch (e) {}
        return null;
    },
    
    set(key, data, hours = 24) {
        try {
            localStorage.setItem(`lap1x6_${key}`, JSON.stringify({
                data,
                expiry: Date.now() + (hours * 60 * 60 * 1000)
            }));
        } catch (e) {}
    }
};

// API вызовы
async function callAPI(params) {
    try {
        const url = new URL(CONFIG.API_URL);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        
        const res = await fetch(url, { 
            method: 'GET', 
            mode: 'cors',
            cache: 'no-cache'
        });
        return await res.json();
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, error: 'Ошибка соединения' };
    }
}

async function postAPI(data) {
    try {
        const res = await fetch(CONFIG.API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await res.json();
    } catch (error) {
        console.error('API Error:', error);
        return { success: false };
    }
}

// АВТОМАТИЧЕСКИЙ ВХОД - проверяем сохраненный токен
async function autoLogin() {
    if (!state.token) return false;
    
    const device = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
    
    // Проверяем кеш
    let userData = cache.get(`user_${state.token}`);
    if (userData) {
        state.user = userData.user;
        state.settings = userData.settings || CONFIG.DEFAULT_BINDS;
        state.favorites = userData.favorites || [];
        showScreen('main-screen');
        if (state.user.role === 'admin') document.getElementById('admin-btn').style.display = 'inline-block';
        loadHeroes();
        return true;
    }
    
    // Проверяем через API
    const res = await callAPI({ token: state.token, device });
    if (res.success) {
        state.user = res.user;
        state.settings = res.settings || CONFIG.DEFAULT_BINDS;
        state.favorites = res.favorites || [];
        
        cache.set(`user_${state.token}`, {
            user: res.user,
            settings: res.settings,
            favorites: res.favorites
        }, 24);
        
        showScreen('main-screen');
        if (res.user.role === 'admin') document.getElementById('admin-btn').style.display = 'inline-block';
        loadHeroes();
        return true;
    }
    
    // Токен недействителен
    state.token = null;
    localStorage.removeItem('lap1x6_token');
    return false;
}

// Вход
async function login() {
    const token = document.getElementById('token-input').value.trim();
    if (!token) return;
    
    const device = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
    
    // Проверяем кеш
    let userData = cache.get(`user_${token}`);
    if (userData) {
        state.token = token;
        state.user = userData.user;
        state.settings = userData.settings || CONFIG.DEFAULT_BINDS;
        state.favorites = userData.favorites || [];
        
        localStorage.setItem('lap1x6_token', token);
        showScreen('main-screen');
        if (state.user.role === 'admin') document.getElementById('admin-btn').style.display = 'inline-block';
        loadHeroes();
        return;
    }
    
    // Проверяем через API
    const res = await callAPI({ token, device });
    if (res.success) {
        state.token = token;
        state.user = res.user;
        state.settings = res.settings || CONFIG.DEFAULT_BINDS;
        state.favorites = res.favorites || [];
        
        localStorage.setItem('lap1x6_token', token);
        
        cache.set(`user_${token}`, {
            user: res.user,
            settings: res.settings,
            favorites: res.favorites
        }, 24);
        
        showScreen('main-screen');
        if (res.user.role === 'admin') document.getElementById('admin-btn').style.display = 'inline-block';
        loadHeroes();
    } else {
        document.getElementById('auth-error').textContent = 'Неверный токен';
    }
}

// Загрузка героев
async function loadHeroes() {
    try {
        let heroes = cache.get('heroes');
        if (heroes) {
            state.heroes = heroes;
            renderHeroes();
            return;
        }
        
        const res = await fetch(CONFIG.GITHUB_URL + 'heroes.json?t=' + Date.now());
        heroes = await res.json();
        state.heroes = heroes.heroes;
        cache.set('heroes', state.heroes, 168);
        renderHeroes();
    } catch (error) {
        console.error('Heroes load error:', error);
    }
}

// Рендер героев
function renderHeroes() {
    const grid = document.getElementById('heroes-grid');
    const search = document.getElementById('search-input')?.value.toLowerCase() || '';
    
    let heroes = state.heroes;
    if (search) {
        heroes = heroes.filter(h => 
            h.name.toLowerCase().includes(search) || 
            h.id.toLowerCase().includes(search)
        );
    }
    
    if (!heroes.length) {
        grid.innerHTML = '<div style="text-align: center; color: #666c7a; padding: 40px;">Ничего не найдено</div>';
        return;
    }
    
    grid.innerHTML = heroes.map(hero => `
        <div class="hero-card ${state.favorites.includes(hero.id) ? 'favorite' : ''}" onclick="selectHero('${hero.id}')">
            <img src="${CONFIG.GITHUB_URL + hero.image}" alt="${hero.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/80/141619/9f7aea?text=?'">
            <h4>${hero.name}</h4>
        </div>
    `).join('');
}

// Выбор героя
function selectHero(heroId) {
    state.currentHero = state.heroes.find(h => h.id === heroId);
    document.getElementById('hero-name').textContent = state.currentHero.name;
    
    const isFav = state.favorites.includes(heroId);
    document.getElementById('hero-favorite').textContent = isFav ? '⭐' : '☆';
    
    renderSkills();
    showScreen('hero-screen');
}

// Рендер способностей
function renderSkills() {
    const container = document.getElementById('skills-container');
    const hero = state.currentHero;
    
    container.innerHTML = hero.skills.map(skill => `
        <div class="skill-card" onclick="selectSkill('${skill.key}')">
            <img src="${CONFIG.GITHUB_URL + skill.icon}" alt="${skill.name}" onerror="this.src='https://via.placeholder.com/64/141619/9f7aea?text=?'">
            <div class="skill-info">
                <h4>${skill.name}</h4>
                <p>${skill.description}</p>
                <span class="skill-key">${state.settings[skill.key] || skill.key}</span>
            </div>
        </div>
    `).join('');
}

// Выбор способности
function selectSkill(skillKey) {
    state.currentSkill = state.currentHero.skills.find(s => s.key === skillKey);
    document.getElementById('build-title').textContent = `${state.currentHero.name} - ${state.currentSkill.name}`;
    document.getElementById('build-image').src = CONFIG.GITHUB_URL + state.currentSkill.build;
    showScreen('build-screen');
}

// Переключение экранов
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    document.getElementById('app').scrollTop = 0;
}

// Сохранение настроек
async function saveSettings() {
    const binds = {
        Q: document.getElementById('bind-q').value,
        W: document.getElementById('bind-w').value,
        E: document.getElementById('bind-e').value,
        D: document.getElementById('bind-d').value,
        F: document.getElementById('bind-f').value,
        R: document.getElementById('bind-r').value
    };
    
    state.settings = binds;
    
    const userCache = cache.get(`user_${state.token}`) || {};
    userCache.settings = binds;
    cache.set(`user_${state.token}`, userCache, 24);
    
    await postAPI({
        action: 'saveSettings',
        token: state.token,
        key_bindings: binds
    });
    
    showScreen('main-screen');
}

// Избранное
async function toggleFavorite(heroId) {
    const isFavorite = state.favorites.includes(heroId);
    
    if (isFavorite) {
        state.favorites = state.favorites.filter(h => h !== heroId);
    } else {
        state.favorites.push(heroId);
    }
    
    const userCache = cache.get(`user_${state.token}`) || {};
    userCache.favorites = state.favorites;
    cache.set(`user_${state.token}`, userCache, 24);
    
    await postAPI({
        action: isFavorite ? 'removeFavorite' : 'addFavorite',
        token: state.token,
        hero: heroId
    });
    
    renderHeroes();
    if (state.currentHero) {
        const isFav = state.favorites.includes(state.currentHero.id);
        document.getElementById('hero-favorite').textContent = isFav ? '⭐' : '☆';
    }
}

// Загрузка избранного
function loadFavorites() {
    const favGrid = document.getElementById('favorites-grid');
    const favHeroes = state.heroes.filter(h => state.favorites.includes(h.id));
    
    if (!favHeroes.length) {
        favGrid.innerHTML = '<div style="text-align: center; color: #666c7a; padding: 40px;">Нет избранных героев</div>';
    } else {
        favGrid.innerHTML = favHeroes.map(hero => `
            <div class="hero-card" onclick="selectHero('${hero.id}')">
                <img src="${CONFIG.GITHUB_URL + hero.image}" alt="${hero.name}">
                <h4>${hero.name}</h4>
            </div>
        `).join('');
    }
    
    showScreen('favorites-screen');
}

// Скачать сборку
function downloadBuild() {
    const link = document.createElement('a');
    link.href = document.getElementById('build-image').src;
    link.download = `build_${state.currentHero.id}_${state.currentSkill.key}.jpg`;
    link.click();
}

// Отправка в поддержку
async function sendSupport(data) {
    await postAPI({
        action: 'sendSupport',
        token: state.token,
        name: state.user.name,
        ...data
    });
    
    document.getElementById('custom-message-container').style.display = 'none';
    document.getElementById('custom-message').value = '';
    document.getElementById('missing-hero').value = '';
    document.getElementById('missing-skill').value = '';
    
    showScreen('main-screen');
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // Пробуем автоматический вход
    autoLogin().then(loggedIn => {
        if (!loggedIn) {
            showScreen('auth-screen');
        }
    });
    
    // Авторизация
    document.getElementById('login-btn').addEventListener('click', login);
    document.getElementById('token-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });
    
    // Навигация
    document.getElementById('back-to-main').addEventListener('click', () => showScreen('main-screen'));
    document.getElementById('back-to-hero').addEventListener('click', () => showScreen('hero-screen'));
    document.getElementById('back-from-settings').addEventListener('click', () => showScreen('main-screen'));
    document.getElementById('back-from-favorites').addEventListener('click', () => showScreen('main-screen'));
    document.getElementById('back-from-support').addEventListener('click', () => showScreen('main-screen'));
    document.getElementById('back-from-admin').addEventListener('click', () => showScreen('main-screen'));
    
    // Кнопки
    document.getElementById('favorites-btn').addEventListener('click', loadFavorites);
    document.getElementById('settings-btn').addEventListener('click', () => {
        document.getElementById('bind-q').value = state.settings.Q || 'Q';
        document.getElementById('bind-w').value = state.settings.W || 'W';
        document.getElementById('bind-e').value = state.settings.E || 'E';
        document.getElementById('bind-d').value = state.settings.D || 'D';
        document.getElementById('bind-f').value = state.settings.F || 'F';
        document.getElementById('bind-r').value = state.settings.R || 'R';
        showScreen('settings-screen');
    });
    
    document.getElementById('save-settings').addEventListener('click', saveSettings);
    document.getElementById('hero-favorite').addEventListener('click', () => toggleFavorite(state.currentHero.id));
    document.getElementById('favorite-build').addEventListener('click', () => toggleFavorite(state.currentHero.id));
    document.getElementById('download-build').addEventListener('click', downloadBuild);
    
    // Поиск
    document.getElementById('search-input').addEventListener('input', renderHeroes);
    
    // Поддержка
    document.getElementById('support-btn').addEventListener('click', () => showScreen('support-screen'));
    document.getElementById('no-hero-btn').addEventListener('click', () => {
        document.getElementById('hero-selector').style.display = 'block';
        document.getElementById('skill-selector').style.display = 'none';
        document.getElementById('custom-message-container').style.display = 'flex';
        showScreen('support-screen');
    });
    
    document.getElementById('hero-support-btn').addEventListener('click', () => {
        document.getElementById('hero-selector').style.display = 'none';
        document.getElementById('skill-selector').style.display = 'block';
        document.getElementById('custom-message-container').style.display = 'flex';
        showScreen('support-screen');
    });
    
    document.getElementById('build-support-btn').addEventListener('click', () => {
        document.getElementById('hero-selector').style.display = 'none';
        document.getElementById('skill-selector').style.display = 'block';
        document.getElementById('custom-message-container').style.display = 'flex';
        showScreen('support-screen');
    });
    
    document.getElementById('support-no-hero').addEventListener('click', () => {
        document.getElementById('hero-selector').style.display = 'block';
        document.getElementById('skill-selector').style.display = 'none';
        document.getElementById('custom-message-container').style.display = 'flex';
    });
    
    document.getElementById('support-old-build').addEventListener('click', () => {
        sendSupport({
            message: 'Старая сборка',
            hero: state.currentHero?.id || '',
            skill: state.currentSkill?.key || ''
        });
    });
    
    document.getElementById('support-wrong-build').addEventListener('click', () => {
        sendSupport({
            message: 'Неверная сборка',
            hero: state.currentHero?.id || '',
            skill: state.currentSkill?.key || ''
        });
    });
    
    document.getElementById('support-custom').addEventListener('click', () => {
        document.getElementById('hero-selector').style.display = 'none';
        document.getElementById('skill-selector').style.display = 'none';
        document.getElementById('custom-message-container').style.display = 'flex';
    });
    
    document.getElementById('send-support').addEventListener('click', () => {
        const message = document.getElementById('custom-message').value;
        const hero = document.getElementById('missing-hero').value;
        const skill = document.getElementById('missing-skill').value;
        
        sendSupport({ message, hero, skill });
    });
    
    // Админка
    document.getElementById('admin-btn').addEventListener('click', async () => {
        const res = await postAPI({
            action: 'getSupportMessages',
            token: state.token
        });
        
        if (res.success) {
            document.getElementById('support-messages').innerHTML = res.messages.map(msg => `
                <div class="support-message">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span class="skill-key">${msg.name}</span>
                        <span style="color: #a0a8b8; font-size: 12px;">${new Date(msg.date).toLocaleString()}</span>
                    </div>
                    <div style="margin-bottom: 4px;">${msg.message}</div>
                    ${msg.hero ? `<div style="color: #a0a8b8; font-size: 12px;">Герой: ${msg.hero} ${msg.skill ? '/ ' + msg.skill : ''}</div>` : ''}
                </div>
            `).join('');
        }
        
        showScreen('admin-screen');
    });
    
    // Табы
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`admin-${tab.dataset.tab}`).classList.add('active');
        });
    });
});

// Глобальные функции
window.selectHero = selectHero;
window.selectSkill = selectSkill;
