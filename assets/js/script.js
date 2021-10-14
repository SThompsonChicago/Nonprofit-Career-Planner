var $nonProfitsEl = document.getElementById("nonprofits");
var $cityFormEl = document.getElementById("city-form");
var $citySearch = document.getElementById("city-search");
var $searchHistoryEl = document.getElementById("search-history");
var $modalEl = document.getElementById("myModal");
var $modalText = document.getElementById("modal-text");
var $closeSpan = document.getElementsByClassName("close")[0];

var cities = [];

function formSubmitHandler(event) {
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
    renderCityList();
    getNonProfits(cityName);
  }
}

function buttonSearchHandler(event) {
  event.preventDefault();
  var btn = event.target;
  var city = btn.getAttribute("data-search");

  getNonProfits(city);
}

function renderCityList() {
  $searchHistoryEl.innerHTML = "";

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
        displayNonProfits(data);
      });
    }
  });
}

function getRent(str) {}

function displayNonProfits(data) {
  $nonProfitsEl.innerHTML = "";
  for (var i = 0; i < data.organizations.length; i++) {
    var $resultsDiv = document.createElement("div");
    var $orgNameEl = document.createElement("h2");
    var $orgCityAndStateEl = document.createElement("h3");

    $orgNameEl.textContent = data.organizations[i].name;
    $orgCityAndStateEl.textContent =
      data.organizations[i].city + ", " + data.organizations[i].state;

    $resultsDiv.classList.add("box");
    $resultsDiv.classList.add("content");

    $nonProfitsEl.appendChild($resultsDiv);
    $resultsDiv.appendChild($orgNameEl);
    $resultsDiv.appendChild($orgCityAndStateEl);
  }
}

// Helper function to capitalize the first letter of each word
function capFirstLetter(str) {
  var words = str.split(" ");
  for (var i = 0; i < words.length; i++) {
    var j = words[i].charAt(0).toUpperCase();
    words[i] = j + words[i].substr(1);
  }
  return words.join(" ");
}

function init() {
  var storedHistory = JSON.parse(localStorage.getItem("city-history"));
  if (storedHistory !== null) {
    cities = storedHistory;
  }
  renderCityList();
}

init();
$cityFormEl.addEventListener("submit", formSubmitHandler);
$searchHistoryEl.addEventListener("click", buttonSearchHandler);
