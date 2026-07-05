const API_KEY = 'd934f7ab604c1df4d45d11069b2df77d'; 
const CITY = 'Kyiv'; 
const API_URL = `https://openweathermap.org{CITY}&appid=${API_KEY}&units=metric&lang=uk`;

async function fetchWeather() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных погоды');
        }
        
        const data = await response.json();
        updateWidget(data);
    } catch (error) {
        console.error(error);
        alert('Не удалось обновить погоду. Если ключ новый, подождите 30-60 минут для его активации.');
    }
}

function updateWidget(data) {
    document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('feels-like').innerText = `Відчувається як: ${Math.round(data.main.feels_like)}°C`;
    document.getElementById('description').innerText = data.weather[0].description; // Исправлено обращение к массиву weather
    
    document.getElementById('humidity').innerText = data.main.humidity;
    document.getElementById('pressure').innerText = data.main.pressure;
    document.getElementById('wind').innerText = (data.wind.speed * 3.6).toFixed(1);

    const iconCode = data.weather[0].icon;
    const iconImg = document.getElementById('weather-icon');
    iconImg.src = `https://openweathermap.org{iconCode}@2x.png`;
    iconImg.style.display = 'block';

    const now = new Date();
    
    const dateOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    document.getElementById('current-date').innerText = now.toLocaleDateString('en-US', dateOptions);
    
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    document.getElementById('current-time').innerText = now.toLocaleTimeString('en-US', timeOptions);
    
    document.getElementById('last-update').innerText = `Останнє оновлення: ${now.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
}

document.getElementById('refresh-btn').addEventListener('click', fetchWeather);

fetchWeather();

