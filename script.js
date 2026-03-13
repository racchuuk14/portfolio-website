const API_KEY = "46f87a3d61e5029d6555757fa4f71caa";

function getWeather(){

const city = document.getElementById("cityInput").value;

if(city === ""){
alert("Please enter city name");
return;
}

const currentURL =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

fetch(currentURL)
.then(response => {

if(!response.ok){
throw new Error("City not found");
}

return response.json();

})
.then(data => {

displayCurrentWeather(data);

})
.catch(error => {

document.getElementById("weatherResult").innerHTML =
`<p style="color:red;">${error.message}</p>`;

});


fetch(forecastURL)
.then(response => response.json())
.then(data => {

displayForecast(data);

});

}

function displayCurrentWeather(data){

const weatherHTML = `
<h2>${data.name}</h2>
<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
<p>Temperature: ${data.main.temp}°C</p>
<p>Weather: ${data.weather[0].description}</p>
<p>Humidity: ${data.main.humidity}%</p>
`;

document.getElementById("weatherResult").innerHTML = weatherHTML;

}

function displayForecast(data){

let forecastHTML = "";

for(let i=0;i<5;i++){

let day = data.list[i*8];

forecastHTML += `
<div class="forecast-day">

<p>${day.dt_txt.split(" ")[0]}</p>

<img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">

<p>${day.main.temp}°C</p>

</div>
`;

}

document.getElementById("forecast").innerHTML = forecastHTML;

}