module.exports = {
  getWeather: async function () {
    return fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=bangkok&units=metric&appid=b5c09888c9bc6736845f9a1c2ca172d5",
      {
        method: "GET",
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
  forecastWeather: async function () {
    return fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=13.75&lon=100.5167&exclude=minutely,hourly&units=metric&cnt=7&appid=088e61e96376da6a3d461b65b9efd3a3",
      {
        method: "GET",
      }
    ).then(async (res) => {
      if (res.status == 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("property");
        sessionStorage.removeItem("curent_component");
        window.location.reload(false);
      } else return res.json();
    });
  },
};
