var $nonProfitsEl = document.getElementById("nonprofits");

function getNonProfits(str) {
  var nonProfitURL =
    "https://projects.propublica.org/nonprofits/api/v2/search.json?q=" + str;

  var corsWorkAroundURL = "https://corsanywhere.herokuapp.com/" + nonProfitURL;

  fetch(corsWorkAroundURL, {
    headers: {
      "accept": "application/json",
      "x-requested-with": "xmlhttprequest",
      "Access-Control-Allow-Origin": "*"
    }
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
