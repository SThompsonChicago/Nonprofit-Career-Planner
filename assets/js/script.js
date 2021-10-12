var debugDiv = document.getElementById("debug");

function getNonProfits(str) {
  var nonProfitURL =
    "https://projects.propublica.org/nonprofits/api/v2/search.json?q=" + str;

  var corsWorkAroundURL = "https://corsanywhere.herokuapp.com/" + nonProfitURL;

  fetch(corsWorkAroundURL, {
    headers: {
      "accept": "application/json",
      "x-requested-with": "xmlhttprequest",
      "Access-Control-Allow-Origin": "*",
      // "Authorization": `Bearer ${apiKey}`
      // 'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayNonProfits(data);
      });
    }
  });
}

function getRents(str) {}

function displayNonProfits(data) {
  console.log(data);
  
  var orgNameEl = document.createElement("h2");
  var orgCityEl = document.createElement("h3");
  var orgStateEl = document.createElement("h3");

  orgNameEl.textContent = data.organizations[0].name;
  orgCityEl.textContent = data.organizations[0].city;
  orgStateEl.textContent = data.organizations[0].state;

  debugDiv.appendChild(orgNameEl);
  debugDiv.appendChild(orgCityEl);
  debugDiv.appendChild(orgStateEl);
}

getNonProfits("chicago");
