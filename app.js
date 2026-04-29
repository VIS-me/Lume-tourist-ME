const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// ТВОЯ ЛОГИКА ТАЙМИНГОВ ДЛЯ ЗАСТАВКИ
window.lumeStartTime = Date.now();

function hideLumeSplash() {
    const splash = document.getElementById('splash-screen');
    if (!splash) return;

    const currentTime = Date.now();
    const elapsedTime = currentTime - window.lumeStartTime;
    const minDuration = 3000; // Минимум 3 секунды

    const remainingTime = Math.max(0, minDuration - elapsedTime);

    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.remove();
        }, 500); 
    }, remainingTime);
}

// Запускаем скрытие
window.addEventListener('load', hideLumeSplash);

// АДАПТИВНОСТЬ ВЫСОТЫ
function fixVH() {
    document.documentElement.style.setProperty('--vh', ${window.innerHeight * 0.01}px);
}
window.addEventListener('resize', fixVH);
fixVH();

// ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
const tabs = document.querySelectorAll('.tab-link');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        
        tg.HapticFeedback.impactOccurred('light');

        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        document.getElementById(target).classList.add('active');
    });
});

// ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    document.getElementById('user-name').innerText = tg.initDataUnsafe.user.first_name;
}

// СЕРВИСЫ
function handleService(name) {
    tg.HapticFeedback.notificationOccurred('success');
    tg.showAlert(Сервис ${name} будет доступен скоро!);
}
