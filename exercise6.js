const apiKey = "YOUR_API_KEY"; // e.g., from OpenWeatherMap
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeather");
const weatherResult = document.getElementById("weatherResult");

const fetchWeather = async (city) => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    weatherResult.textContent = `${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
    localStorage.setItem("lastCity", city);
  } catch (err) {
    weatherResult.textContent = `Error: ${err.message}`;
  }
};

// Event listener for button click
getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
  else weatherResult.textContent = "Please enter a city";
});

// Check localStorage on page load
window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    cityInput.value = lastCity;
    fetchWeather(lastCity);
  }
});
