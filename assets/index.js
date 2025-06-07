function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temperature-icon" /img>`;

  console.log(response.data);

  cityElement.innerHTML = response.data.city;

  // Dynamic day and time
  function updateTime() {
    let now = new Date();
    let options = { weekday: "long" };
    let day = now.toLocaleDateString(undefined, options);
    let time = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    timeElement.textContent = `${day} ${time}`;
  }

  updateTime();
  // Optional: refresh time every minute
  setInterval(updateTime, 60000);

  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  // make api call and update interface
  // separation of concerns
  let apiKey = "33f9c6b8coa7bba90bf8ft0bb4f4da34";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
     <div class="forecast-days">
      <div class="forecast-day">Tue</div>
      <div class="forecast-icon">sunny</div>
      <div class="forecast-temp">
        <div class="forecast-temp-day">13</div>
        <div class="forecast-temp-night">11</div>
      </div>
     </div>
     `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");

displayForecast();
