const apiKey = "api_key";
const button = document.getElementById("submit");

const cloud = '<i class="fa-solid fa-cloud" id="cloud"></i>';
const bolt = '<i class="fa-solid fa-bolt" id="bolt"></i>';
const umbrella = '<i class="fa-solid fa-umbrella" id="umbrella"></i>';
const snow = '<i class="fa-solid fa-snowflake" id="snow"></i>';
const sun = '<i class="fa-solid fa-sun" id="sun"></i>';
const error = '<i class="fa-solid fa-triangle-exclamation" id="error"></i>';

const location_text = document.getElementById("location_text");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");

button.addEventListener("click", (e) => {
  e.preventDefault();
  const city = document.getElementById("search").value;
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Erreur de saisie, veuillez vérifier le nom de la ville."
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const tempCelsius = Math.round(data.main.temp - 273.15);
      const windKmh = Math.round(data.wind.speed * 3.6);

      location_text.innerHTML = ` ${data.name}`;
      wind.innerHTML = `
      <div id="wind_container">
        <i class="fa-solid fa-wind" id="wind_icon"></i>
        <div id="text_container">
          <p id="wind_kmh">${windKmh} Km/h</p>
          <p id="wind_descri">Vent</p>
        </div>
      </div>`;
      humidity.innerHTML = `
      <div id="humidity_container">
        <i class="fa-solid fa-water" id="humidity_icon"></i>
        <div id="humidity_text_container">
          <p id="humidity_percent">${data.main.humidity}%</p>
          <p id="humidity_descri">Humidité</p>
        </div>
      </div>`;

      if (data.weather[0].main === "Clouds") {
        document.getElementById("Weather").innerHTML =
          cloud +
          `<p id="temp_text">${tempCelsius} °C </p>` +
          "<p id='temp_descri'>Nuageux</p>";
      }
      if (data.weather[0].main === "Thunderstorm") {
        document.getElementById("Weather").innerHTML =
          bolt +
          `<p id="temp_text">${tempCelsius} °C </p>` +
          "<p id='temp_descri'>Orageux</p>";
      }
      if (data.weather[0].main === "Rain") {
        document.getElementById("Weather").innerHTML =
          umbrella +
          `<p id="temp_text">${tempCelsius} °C </p>` +
          "<p id='temp_descri'>Pluvieux</p>";
      }
      if (data.weather[0].main === "Snow") {
        document.getElementById("Weather").innerHTML =
          snow +
          `<p id="temp_text">${tempCelsius} °C </p>` +
          "<p id='temp_descri'>Neigeux</p>";
      }
      if (data.weather[0].main === "Clear") {
        document.getElementById("Weather").innerHTML =
          sun +
          `<p id="temp_text">${tempCelsius} °C </p>` +
          "<p id='temp_descri'>Ensoleillé</p>";
      }
      if (data.weather[0].main === "Drizzle") {
        document.getElementById("Weather").innerHTML =
          umbrella +
          `<p id="temp_text">${tempCelsius} °C </p>` +
          "<p id='temp_descri'>Pluie fine</p>";
      }
      if (data.weather[0].main === "Mist") {
        document.getElementById("Weather").innerHTML =
          cloud +
          `<p id="temp_text">${tempCelsius} °C </p>` +
          "<p id='temp_descri'>Brumeux</p>";
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("Weather").innerHTML =
        error + "<p>Votre localisation est introuvable :/</p>";
    });
});
