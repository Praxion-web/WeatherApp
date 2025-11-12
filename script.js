document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherButton = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const cityTemperature = document.getElementById("temperature");
  const citydescription = document.getElementById("description");
  const errorMsg = document.getElementById("error-message");

  const API_KEY = "775a685593aab2f297398cc34910904f"; //env variables

  getWeatherButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    cityInput.value = "";

    // it may throw an error
    // server/database is always in another continent
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    // gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);
    if (!response.ok) {
      throw new Error("city not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    //display
    console.log(data);
    const { name, main, weather } = data;
    cityNameDisplay.textContent = name;
    cityTemperature.textContent = `temperature : ${main.temp}`;
    citydescription.textContent = ` weather : ${weather[0].description}`;
    // to unlock display
    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }
});
