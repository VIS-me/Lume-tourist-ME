const tg = window.Telegram.WebApp;

// 1. Инициализация
tg.ready();
tg.expand();

// 2. Управление Splash Screen
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    // Имитация загрузки данных (1.8 сек для красоты анимации)
    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => splash.style.display = 'none', 500);
    }, 1800);
});

// 3. Адаптация высоты под мобильные браузеры
function fixVH() {
    document.documentElement.style.setProperty('--vh', ${window.innerHeight * 0.01}px);
}
window.addEventListener('resize', fixVH);
fixVH();

// 4. Переключение вкладок
const tabs = document.querySelectorAll('.tab-link');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        
        tg.HapticFeedback.impactOccurred('medium');

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(target).classList.add('active');
    });
});

// 5. Данные пользователя
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    const user = tg.initDataUnsafe.user;
    document.getElementById('user-name').innerText = ${user.first_name} ${user.last_name || ''};
    // Если есть фото профиля
    if (user.photo_url) {
        document.getElementById('user-photo').style.backgroundImage = url(${user.photo_url});
    }
}

// 6. Обработка рефералок (заглушка)
function handleReferral(type) {
    tg.HapticFeedback.notificationOccurred('success');
    tg.showConfirm(Открыть сервис ${type}?, (confirm) => {
        if (confirm) {
            // Здесь будет твоя ссылка из Travelpayouts
            tg.openLink('https://google.com'); 
        }
    });
}

// Слушатель смены темы
tg.onEvent('themeChanged', () => {
    document.body.style.backgroundColor = tg.backgroundColor;
});
