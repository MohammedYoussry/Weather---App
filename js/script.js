
const searchLocationInput = document.getElementById("searchLocationInput")
const todayWeekDayMaekup = document.getElementById("todayWeekDayMaekup")
const cityToday = document.getElementById("cityToday")
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (pos) {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;
    console.log(lat);
    console.log(long);
    getWeatherData(`${lat},${long}`)
  })

} else {
  console.log('not Allowed');
}


async function getWeatherData(query) {

  let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=f0cdb2d2145d4ca986c175913242706`);
  let data = await res.json()
  console.log(data);  
  displayTodayWeather(data);
  displayTomm(data)
  displayAfterTomm(data)
}

searchLocationInput.addEventListener('change', function (e) {

  getWeatherData(e.target.value)

})


function displayTodayWeather(data) {
  console.log(data, 'from display');
  console.log(data.current.last_updated, "Date");
  const todayDate = data.current.last_updated
  let date = new Date(todayDate);
  const todayWeekDay = date.toLocaleString("en-us", { weekday: "long" });
  const todayDay = date.getDate();
  const todayMonth = date.toLocaleString("en-us", { month: "long" });
  const cityName = data.location.name;
  const TodayDegree = data.current.temp_c;
  const todayCondition = data.current.condition.text;
  const humidity = data.current.humidity;
  cityToday.innerHTML = cityName;
  todayWeekDayMaekup.innerHTML = todayWeekDay;
  dateToday.innerHTML = `${todayDay} ${todayMonth}`;
  tempToday.innerHTML = TodayDegree;
  todayCond.innerHTML = todayCondition;
  imgToday.setAttribute('src',`https:${data.current.condition.icon}`)
  humidityToday.innerHTML = humidity;
  windSpeedToday.innerHTML = data.current.wind_kph;
  driToday.innerHTML = data.current.wind_dir;
}


function displayTomm({ forecast }) {
  tomorrowDay.innerHTML = new Date(forecast.forecastday[1].date).toLocaleString('en-us', { weekday: 'long' });
  iconTommorow.setAttribute('src', `https:${forecast.forecastday[1].day.condition.icon}`)
  tMaxTemp.innerHTML = forecast.forecastday[1].day.maxtemp_c
  tMinTemp.innerHTML = forecast.forecastday[1].day.mintemp_c
}
function displayAfterTomm({ forecast }) {
  afterTomorrow.innerHTML = new Date(forecast.forecastday[2].date).toLocaleString('en-us', { weekday: 'long' });
  iconAfterTom.setAttribute('src',`https:${ forecast.forecastday[2].day.condition.icon}`)
  afterTomMaxTemp.innerHTML = forecast.forecastday[2].day.maxtemp_c
  afterTomMinTemp.innerHTML = forecast.forecastday[2].day.mintemp_c
}