var $nonProfitsEl = document.getElementById("nonprofits");
<<<<<<< HEAD
=======
var $cityFormEl = document.getElementById("city-form");
var $citySearch = document.getElementById("city-search");
var $modalEl = document.getElementById("myModal");
var $closeSpan = document.getElementsByClassName("close")[0];
var $modalText = document.getElementById("modal-text");
var $searchHistoryEl = document.getElementById("search-history");

var cities = [];

var $modalBtn = document.getElementById("modalBtn");


function formSubmitHandler(event) {
  event.preventDefault();

  var cityName = $citySearch.value.trim();

  $citySearch.value = "";

  if (cityName === "") {
    openModal("Please enter a city name.");
  } else {
    localStorage.setItem("search-history",JSON.stringify(cities));
    renderCityList();
    getNonProfits(cityName);
  }
}

function buttonSearchHandler(event){
    event.preventDefault();
    var btn = event.target;
    var city = btn.getAttribute("data-search");

    getNonProfits(city);
}

function renderCityList () {
    $searchHistoryEl.innerHTML = "";

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
    
        var button = document.createElement("button");
        button.setAttribute("type", "button");
        button.setAttribute("data-search","city");
        button.textContent = city;
        $searchHistoryEl.appendChild(button);
    }
}

function openModal(errorText) {
  $modalText.textContent = errorText;
  $modalEl.style.display = "block";
}

$closeSpan.onclick = function() {
  $modalEl.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == $modalEl) {
    $modalEl.style.display = "none";
  }
}
>>>>>>> 1366b1d2e680a7c9f830d0b6ee96af2e95c6f8dd

function getNonProfits(str) {
  var nonProfitURL =
    "https://projects.propublica.org/nonprofits/api/v2/search.json?q=" + str;

  var corsWorkAroundURL = "https://corsanywhere.herokuapp.com/" + nonProfitURL;

  fetch(corsWorkAroundURL, {
    headers: {
<<<<<<< HEAD
      "accept": "application/json",
      "x-requested-with": "xmlhttprequest",
      "Access-Control-Allow-Origin": "*"
    }
=======
      accept: "application/json",
      "x-requested-with": "xmlhttprequest",
      "Access-Control-Allow-Origin": "*",
    },
>>>>>>> 1366b1d2e680a7c9f830d0b6ee96af2e95c6f8dd
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
<<<<<<< HEAD
  console.log(data);
  
  for (var i = 0; i < data.length; i++) {
    
  }
  var orgNameEl = document.createElement("h2");
  var orgCityEl = document.createElement("h3");
  var orgStateEl = document.createElement("h3");

  orgNameEl.textContent = data.organizations[0].name;
  orgCityEl.textContent = data.organizations[0].city;
  orgStateEl.textContent = data.organizations[0].state;

  $nonProfitsEl.appendChild(orgNameEl);
  $nonProfitsEl.appendChild(orgCityEl);
  $nonProfitsEl.appendChild(orgStateEl);
}

getNonProfits("chicago");
=======
  // console.log(data);
  $nonProfitsEl.innerHTML = "";
  for (var i = 0; i < data.organizations.length; i++) {
    var $resultsDiv = document.createElement("div");
    var $orgNameEl = document.createElement("h2");
    var $orgCityAndStateEl = document.createElement("h3");

    $orgNameEl.textContent = data.organizations[i].name;
    $orgCityAndStateEl.textContent = data.organizations[i].city + ", " + data.organizations[i].state;

    $resultsDiv.classList.add("box");
    $resultsDiv.classList.add("content");

    $nonProfitsEl.appendChild($resultsDiv);
    $resultsDiv.appendChild($orgNameEl);
    $resultsDiv.appendChild($orgCityAndStateEl);
  }
}

function init(){
    var storedHistory = JSON.parse(localStorage.getItem("search-history"));
    if (storedHistory !== null){
        cities = storedHistory;
    }
    renderCityList();

}

init();
$cityFormEl.addEventListener("submit", formSubmitHandler);
$searchHistoryEl.addEventListener("click",buttonSearchHandler);
>>>>>>> 1366b1d2e680a7c9f830d0b6ee96af2e95c6f8dd
