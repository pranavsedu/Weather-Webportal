const myKey = "1cec06989504145a48dc9a1ee1d3868a";
const defaultCity = "Delhi";
// const date = new Date();
console.log(localStorage);
const search = document.getElementById("searchUser");
const button = document.getElementById("submit");

window.onload = loadData();

function loadData() {
    var cityData = getDataFromLS();
    if (cityData == defaultCity) {
        // console.log(cityData);
        fetchWeather(defaultCity);
    } else {
        dispData(cityData, getTimeFromLS());
    }
}

search.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        fetchUserInput();
    }
});

button.addEventListener("click", fetchUserInput());

function fetchUserInput() {
    const currentVal = search.value.trim();
    // console.log(Number(currentVal.length) );
    if (currentVal.length > 1) {
        fetchWeather(currentVal);
    }

};


function fetchWeather(input) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${myKey}`)
        .then((response) => response.json())
        .then((data) => newData(data))
        .catch((error) => console.error(error));
}

function newData(data) {
    const date = new Date();
    dispData(data, date);
    saveToLS(data, date);
}
function dispData(data, updateTime) {
    var tempmicl = data.main.temp_min;
    var tempmxcl = data.main.temp_max;
    var tempflcl = data.main.feels_like;
    var tempcl = data.main.temp;

    var humi = data.main.humidity;
    var winspd = data.wind.speed;
    var windeg = data.wind.deg;
    var icn = data.weather[0].icon;
    const uiContainer = document.getElementById("data.hp");
    uiContainer.innerHTML = `
    
    <center>
    <br><br><br><br>
      <div class="card big_card">
      <div class="card-body info_crd">
      
      <p class="city">${data.name}<span class="state">, ${data.sys.country}</span></p>    
      <p class="temp">${tempcl}<br>°C</p><br>
      <p class="fls_lik info_txts">Feels Like: ${tempflcl} °C</p>
      <div class="day flex_box info_txts" id="min_max"><p class="max_tmpr tmprt">Min: ${tempmicl} °C  </p><p  class="min_tmpr tmprt">Max: ${tempmxcl} °C</div><br>
      <div class="icon__info">
         <p><img class="info_icnn" src="api-icons/icons/${icn}.png" alt="${data.weather[0].main}@2x.png"/></p>
          <p class="info_txts">Weather Condition: ${data.weather[0].description}</p>
          </div>
          <p class="info_txts">Humidity: ${humi} %</p>
          <p class="info_txts">Wind Speed: ${winspd} meter/s<br> Wind Direction: ${windeg}°</p>
          </div>
          </div>
          <span>Last Updated : ${updateTime}</span>
          </center> 
          `;
}

function saveToLS(data, date) {
    localStorage.setItem("city", JSON.stringify(data));
    localStorage.setItem("date", date);
}
function getDataFromLS() {
    var cityData;
    if (localStorage.getItem("city") == null) {
        return defaultCity;
    } else {
        cityData = JSON.parse(localStorage.city);
    }

    return cityData;
}

function getTimeFromLS() {
    return localStorage.getItem("date");
}

function clearLS() {
    localStorage.clear();
}