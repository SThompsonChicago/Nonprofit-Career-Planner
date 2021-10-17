var $nonProfitsEl = document.getElementById("nonprofits");
var $cityFormEl = document.getElementById("city-form");
var $citySearch = document.getElementById("city-search");
var $searchHistoryEl = document.getElementById("search-history");
var $rentDiv = document.getElementById("rent");
var $bedroomSelectForm = document.getElementById("bedrooms-select");
var $bedroomSelection = document.getElementById("bedrooms");
var $modalEl = document.getElementById("myModal");
var $modalText = document.getElementById("modal-text");
var $closeSpan = document.getElementsByClassName("close")[0];

const openAPIKey = "17df62e6c611e766e40ad0ad3ee5ec14";
const rapidAPIKey = "b13b2a8716msha990e8ed4308bffp1b1aebjsn790614efd52b";

var currentCity = "";
var cities = [];

function searchFormSubmitHandler(event) {
  event.preventDefault();

  var cityName = $citySearch.value.trim();

  $citySearch.value = "";

  if (cityName === "") {
    openModal("Please enter a city name.");
    return;
  } else {
    cityName = capFirstLetter(cityName);

    if (cities.indexOf(cityName) === -1) {
      cities.push(cityName);
    }

    localStorage.setItem("city-history", JSON.stringify(cities));
    currentCity = cityName;
    renderCityList();
    getLatAndLon(cityName, 0);
    getNonProfits(cityName);
  }
}

function bedroomFormSubmitHandler(event) {
  event.preventDefault();
  var numOfBedrooms = $bedroomSelection.value;
  getLatAndLon(currentCity, numOfBedrooms);
}

function buttonSearchHandler(event) {
  event.preventDefault();
  var btn = event.target;
  var city = btn.getAttribute("data-search");

  currentCity = city;
  getLatAndLon(city, 0);
  getNonProfits(city);
}

function renderCityList() {
  $searchHistoryEl.innerHTML = "";

  var $pastSearchesLabel = document.createElement("label");
  $pastSearchesLabel.textContent = "Past Searches";
  $pastSearchesLabel.classList.add("label");
  $searchHistoryEl.appendChild($pastSearchesLabel);

  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    var button = document.createElement("button");

    button.setAttribute("data-search", city);
    button.textContent = city;

    button.classList.add("button");
    button.classList.add("is-link");
    button.classList.add("column");
    button.classList.add("is-fullwidth");

    $searchHistoryEl.appendChild(button);
  }
}

function getLatAndLon(cityName, numOfBedrooms) {
  var openWeatherURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    openAPIKey;

  fetch(openWeatherURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        getRentInfo(cityName, lat, lon, numOfBedrooms);
      });
    }
  });
}

function getNonProfits(str) {
  var nonProfitURL =
    "https://projects.propublica.org/nonprofits/api/v2/search.json?q=" + str;

  var corsWorkAroundURL = "https://corsanywhere.herokuapp.com/" + nonProfitURL;

  fetch(corsWorkAroundURL, {
    headers: {
      accept: "application/json",
      "x-requested-with": "xmlhttprequest",
      "Access-Control-Allow-Origin": "*",
    },
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayNonProfits(str, data);
      });
    }
  });
}

function getRentInfo(city, lat, lon, numOfBedrooms) {
  var rentAPIURL =
    "https://realtymole-rental-estimate-v1.p.rapidapi.com/rentalPrice?";
  if (numOfBedrooms > 0) {
    rentAPIURL = rentAPIURL + "bedrooms=" + numOfBedrooms;
  }

  rentAPIURL = rentAPIURL + "&latitude=" + lat + "&longitude=" + lon;

  fetch(rentAPIURL, {
    headers: {
      "X-RapidAPI-Key": rapidAPIKey,
    },
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRentInfo(city, data);
      });
    }
  });
}

function displayNonProfits(str, data) {
  $nonProfitsEl.innerHTML = "";

  var $nonProfitsLabel = document.createElement("label");
  $nonProfitsLabel.textContent = "Non-Profits in " + str;
  $nonProfitsLabel.classList.add("label");
  $nonProfitsEl.appendChild($nonProfitsLabel);
  for (var i = 0; i < data.organizations.length; i++) {
    if (data.organizations[i].city === str.toUpperCase()) {
      var $resultsDiv = document.createElement("div");
      var $orgNameEl = document.createElement("a");
      var $orgCityAndStateEl = document.createElement("h3");
  
      $orgNameEl.textContent = data.organizations[i].name;
      $orgNameEl.setAttribute(
        "href",
        "https://www.google.com/search?q=" + data.organizations[i].name
      );
      $orgNameEl.setAttribute("target", "_blank");
      $orgCityAndStateEl.textContent =
        data.organizations[i].city + ", " + data.organizations[i].state;
  
      $resultsDiv.classList.add("box");
      $resultsDiv.classList.add("content");
  
      $nonProfitsEl.appendChild($resultsDiv);
      $resultsDiv.appendChild($orgNameEl);
      $resultsDiv.appendChild($orgCityAndStateEl);
    }
    
  }
}

function displayRentInfo(city, data) {
  $rentDiv.innerHTML = "";

  var $rentLabel = document.createElement("label");
  var $aveRent = document.createElement("p");
  var $highRent = document.createElement("p");
  var $lowRent = document.createElement("p");

  $rentLabel.textContent = "Rent costs in " + city;
  $rentLabel.classList.add("label");
  $rentDiv.appendChild($rentLabel);

  $aveRent.textContent = "Average Rent: $" + data.rent;
  $highRent.textContent = "High End Rent: $" + data.rentRangeHigh;
  $lowRent.textContent = "Low End Rent: $" + data.rentRangeLow;

  $rentDiv.appendChild($aveRent);
  $rentDiv.appendChild($lowRent);
  $rentDiv.appendChild($highRent);

  $bedroomSelectForm.style.display = "block";
}

// Modal stuff
function openModal(errorText) {
  $modalText.textContent = errorText;
  $modalEl.style.display = "block";
}

$closeSpan.onclick = function () {
  $modalEl.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == $modalEl) {
    $modalEl.style.display = "none";
  }
};

// Helper function to capitalize the first letter of each word
function capFirstLetter(str) {
  var words = str.split(" ");
  for (var i = 0; i < words.length; i++) {
    var j = words[i].charAt(0).toUpperCase();
    words[i] = j + words[i].substr(1);
  }
  return words.join(" ");
}

// Gets stored cities from local storage
function init() {
  var storedHistory = JSON.parse(localStorage.getItem("city-history"));
  if (storedHistory !== null) {
    cities = storedHistory;
  }
  renderCityList();
}

init();

$cityFormEl.addEventListener("submit", searchFormSubmitHandler);
$searchHistoryEl.addEventListener("click", buttonSearchHandler);
$bedroomSelectForm.addEventListener("submit", bedroomFormSubmitHandler);
