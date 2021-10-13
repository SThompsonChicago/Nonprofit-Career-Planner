var cityInput = document.querySelector("#city-text");
var cityForm = document.querySelector("#city-form");
var cityList = document.querySelector("#city-list");
var cityCountSpan = document.querySelector("#city-count");

var cities = [];

function renderCityList(){

    cityList.innerHTML = "";
    cityCountSpan.textContent = city.length;

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
    
        var li = document.createElement("li");
        li.textContent = city;
        li.setAttribute("data-index", i);
        cityList.appendChild(li);
    }

}


