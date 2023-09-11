const apiKey = 'cbb5aeafe874a3495a7a6853a2b24b5f'; // Replace with your API key
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const weatherConditionElement = document.getElementById('weather-condition');
const errorMessage = document.getElementById('error-message');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city.trim() === '') {
        errorMessage.textContent = 'Please enter a city name.';
        errorMessage.classList.remove('hidden');
        clearWeatherInfo();
    } else {
        fetchWeatherData(city);
    }
});

function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('City not found.');
            }
            return response.json();
        })
        .then((data) => {
            errorMessage.classList.add('hidden');
            displayWeatherInfo(data);
        })
        .catch((error) => {
            errorMessage.textContent = error.message;
            errorMessage.classList.remove('hidden');
            clearWeatherInfo();
        });
}

function displayWeatherInfo(data) {
    const cityName = data.name;
    const temperature = (data.main.temp - 273.15).toFixed(1); // Convert temperature to Celsius
    const weatherCondition = data.weather[0].description;

    locationElement.textContent = `Location: ${cityName}`;
    temperatureElement.textContent = `Temperature: ${temperature}°C`;
    weatherConditionElement.textContent = `Weather: ${weatherCondition}`;
}

function clearWeatherInfo() {
    locationElement.textContent = '';
    temperatureElement.textContent = '';
    weatherConditionElement.textContent = '';
}
