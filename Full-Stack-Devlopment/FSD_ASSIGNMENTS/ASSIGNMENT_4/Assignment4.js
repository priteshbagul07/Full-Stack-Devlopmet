// Fake Weather Data (Mumbai + other cities)
let weatherData = {
    "Mumbai": {
        temp: 32,
        condition: "Clear Sky",
        icon: "☀️",
        feelsLike: 34,
        humidity: 42,
        wind: 12,
        uv: 6,
        sunrise: "06:12 AM",
        sunset: "19:05 PM",
        rainChance: 10,
        visibility: 8,
        hourlyTemp: [29, 30, 31, 32, 33, 34, 33, 32, 30, 29],
        hourlyTime: ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM", "12AM"],
        sevenDay: [
            { day: "Mon", high: 34, low: 26, icon: "🌤️" },
            { day: "Tue", high: 33, low: 25, icon: "🌥️" },
            { day: "Wed", high: 31, low: 24, icon: "🌧️" },
            { day: "Thu", high: 32, low: 25, icon: "☀️" },
            { day: "Fri", high: 35, low: 27, icon: "🌤️" },
            { day: "Sat", high: 33, low: 26, icon: "⛅" },
            { day: "Sun", high: 30, low: 24, icon: "🌧️" }
        ],
        aqi: 48
    },
    "Delhi": { temp: 28, condition: "Haze", icon: "🌫️", feelsLike: 29, humidity: 35, wind: 8, uv: 4, sunrise: "06:05 AM", sunset: "18:45 PM", rainChance: 5, visibility: 3, hourlyTemp: [26,27,28,29,30,29,27,26], hourlyTime: ["6AM","8AM","10AM","12PM","2PM","4PM","6PM","8PM"], sevenDay: [{day:"Mon",high:30,low:18,icon:"🌫️"},{day:"Tue",high:31,low:19,icon:"☀️"},{day:"Wed",high:29,low:17,icon:"🌥️"},{day:"Thu",high:32,low:20,icon:"🌤️"},{day:"Fri",high:30,low:18,icon:"🌫️"},{day:"Sat",high:28,low:17,icon:"☀️"},{day:"Sun",high:29,low:19,icon:"🌥️"}], aqi: 162 },
    "Bangalore": { temp: 26, condition: "Partly Cloudy", icon: "⛅", feelsLike: 27, humidity: 55, wind: 15, uv: 7, sunrise: "06:20 AM", sunset: "18:35 PM", rainChance: 20, visibility: 10, hourlyTemp: [24,25,26,27,28,27,26,25], hourlyTime: ["6AM","8AM","10AM","12PM","2PM","4PM","6PM","8PM"], sevenDay: [{day:"Mon",high:28,low:19,icon:"⛅"},{day:"Tue",high:27,low:18,icon:"🌧️"},{day:"Wed",high:29,low:20,icon:"☀️"},{day:"Thu",high:26,low:19,icon:"🌥️"},{day:"Fri",high:28,low:20,icon:"⛅"},{day:"Sat",high:27,low:18,icon:"🌧️"},{day:"Sun",high:29,low:21,icon:"☀️"}], aqi: 32 }
};

let currentCity = "Mumbai";
let isCelsius = true;
let hourlyChartInstance = null;
let aqiChartInstance = null;

// Render Current Weather
function renderCurrentWeather(city) {
    const data = weatherData[city];
    if (!data) return;

    document.getElementById("currentCity").textContent = `${city}, India`;
    document.getElementById("currentTemp").textContent = isCelsius ? `${data.temp}°` : `${Math.round(data.temp * 1.8 + 32)}°`;
    document.getElementById("currentCondition").textContent = data.condition;
    document.getElementById("currentIcon").innerHTML = data.icon;
    document.getElementById("feelsLike").innerHTML = `Feels like <strong>${isCelsius ? data.feelsLike : Math.round(data.feelsLike * 1.8 + 32)}°</strong>`;
    document.getElementById("humidity").textContent = `${data.humidity}%`;
    document.getElementById("windSpeed").textContent = `${data.wind} km/h`;
    document.getElementById("uvIndex").textContent = data.uv;
    document.getElementById("sunrise").textContent = data.sunrise;
    document.getElementById("sunset").textContent = data.sunset;
    document.getElementById("rainChance").textContent = `${data.rainChance}%`;
    document.getElementById("visibility").textContent = `${data.visibility} km`;
}

// Render 7-Day Cards
function renderSevenDay() {
    const container = document.getElementById("sevenDayCards");
    container.innerHTML = "";
    const data = weatherData[currentCity].sevenDay;

    data.forEach(day => {
        const high = isCelsius ? day.high : Math.round(day.high * 1.8 + 32);
        const low = isCelsius ? day.low : Math.round(day.low * 1.8 + 32);

        container.innerHTML += `
        <div class="col-6 col-md-4 col-lg-3 col-xl-2">
            <div class="card text-center p-3 h-100">
                <h6>${day.day}</h6>
                <div class="fs-1 my-2">${day.icon}</div>
                <div class="d-flex justify-content-center gap-3">
                    <strong>${high}°</strong>
                    <span class="text-muted">${low}°</span>
                </div>
            </div>
        </div>`;
    });
}

// Create Hourly Chart
function createHourlyChart() {
    const ctx = document.getElementById("hourlyChart");
    const data = weatherData[currentCity];

    if (hourlyChartInstance) hourlyChartInstance.destroy();

    hourlyChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.hourlyTime,
            datasets: [{
                label: 'Temperature (°C)',
                data: data.hourlyTemp,
                borderColor: '#00b4d8',
                backgroundColor: 'rgba(0, 180, 216, 0.2)',
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: '#334155' }, ticks: { color: '#64748b' } },
                x: { grid: { color: '#334155' }, ticks: { color: '#64748b' } }
            }
        }
    });
}

// Create AQI Chart
function createAQIChart() {
    const ctx = document.getElementById("aqiChart");
    if (aqiChartInstance) aqiChartInstance.destroy();

    aqiChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['PM2.5', 'PM10', 'NO₂', 'SO₂', 'CO', 'O₃'],
            datasets: [{
                label: 'Concentration',
                data: [22, 45, 12, 8, 0.8, 35],
                backgroundColor: '#22c55e',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, grid: { color: '#334155' } } }
        }
    });
}

// Tab Switching
function switchTab(tabIndex) {
    document.querySelectorAll('.menu-item').forEach(el => el.classList.remove('active'));
    document.getElementById(`tab-${tabIndex}`).classList.add('active');

    document.querySelectorAll('#tabContent > div').forEach(div => div.classList.add('d-none'));
    document.getElementById(`tabContent-${tabIndex}`).classList.remove('d-none');

    if (tabIndex === 1) {
        // Full hourly chart
        createHourlyChart();
    }
    if (tabIndex === 2) renderSevenDay();
}

// Search City
function searchCity() {
    const input = document.getElementById("citySearch").value.trim();
    if (!input) return;
    
    const cityKey = Object.keys(weatherData).find(city => 
        city.toLowerCase() === input.toLowerCase()
    );
    
    if (cityKey) {
        currentCity = cityKey;
        renderCurrentWeather(currentCity);
        createHourlyChart();
        renderSevenDay();
        document.getElementById("pageTitle").textContent = `${currentCity} Weather`;
    } else {
        alert("City not in demo database. Try: Mumbai, Delhi, Bangalore");
    }
}

// Toggle °C / °F
function toggleUnit() {
    isCelsius = !isCelsius;
    document.getElementById("celsiusBtn").classList.toggle("active", isCelsius);
    document.getElementById("fahrenheitBtn").classList.toggle("active", !isCelsius);
    
    renderCurrentWeather(currentCity);
    renderSevenDay();
}

// Refresh Dashboard
function refreshDashboard() {
    const icon = document.querySelector(".btn-refresh i");
    icon.classList.add("fa-spin");
    
    setTimeout(() => {
        renderCurrentWeather(currentCity);
        createHourlyChart();
        renderSevenDay();
        icon.classList.remove("fa-spin");
    }, 800);
}

// Initialize Dashboard
window.onload = function() {
    renderCurrentWeather(currentCity);
    createHourlyChart();
    renderSevenDay();
    createAQIChart();

    // Show current date
    const dateEl = document.getElementById("currentDate");
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' });

    console.log('%c✅ ClimaDash Weather Dashboard Loaded (Full Stack Development Demo)', 'color:#00b4d8; font-size:16px; font-weight:bold');
};
