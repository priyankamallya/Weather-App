document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "b00c82774728ada54d9a44089405c2a3";
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const searchBox = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search button");
  const weatherIcon = document.querySelector(".weather-icon");

  async function checkWeather(city) {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      var data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " Kmph";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
        document.querySelector(".card").style.background =
          "linear-gradient(155deg,#696974,#6487aa)";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
        document.querySelector(".card").style.background =
          "linear-gradient(155deg,#f5eb8c,#3c88fa)";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
        document.querySelector(".card").style.background =
          "linear-gradient(155deg,#f5eb8c,#3c88fa)";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
        document.querySelector(".card").style.background =
          "linear-gradient(155deg,#4378c2,#9acaf9)";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "mist/rain.png";
        document.querySelector(".card").style.background =
          "linear-gradient(155deg,#76aaf2,#387bbf)";
      }

      document.querySelector(".weather").style.display = "block";
    } catch (error) {
      console.error("Error fetching data:", error.message);
      // Handle the error (e.g., display an error message to the user)
    }
  }

  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
  });
});
