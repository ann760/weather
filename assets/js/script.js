var cityFormE1 = document.querySelector("#city-form");
var cityInputE1 = document.querySelector("#cityname");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var forecastContainerE1 = document.querySelector("#forecast-container");

var getCityWeather = function(city) {
    // format the weather api url
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' +
                  city +
                  '&appid=7469199830961006664088f66c57f0e7';

    // request the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            displayCity(data, city);    
            console.log(data, city);
           
            });
        } else {
            alert("Error: " + response.ststusText);
        };
    })
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to api");
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault()
    // get input element value
    var cityname = cityInputE1.value.trim();
    if (cityname) {
        getCityWeather(cityname);
        cityInputE1.value = "";
    } else {
        alert("Please enter a city");
    }
};

cityFormE1.addEventListener("submit", formSubmitHandler);

var displayCity = function(list, searchTerm) {
    // clear old content
  cityContainerEl.textContent = "";
  forecastContainerE1.textContent = "";
  citySearchTerm.textContent = searchTerm.toUpperCase().charAt(0) + searchTerm.slice(1);
  // check if api returned any repos
  if (list.length === 0) {
    cityContainerEl.textContent = "No city found.";
    return;
  }
  
  //loop over forecasts
  for (var i = 0; i < list.length; i++){
    //format forecast name
    var forecastDay = list[i].city + "/" + list[i].dt_txt;

    // create a container for each repo
    var forecastE1 = document.createElement("div");
    forecastE1.classList = "list-item flex-row justify-space-between align-center"

    // create a span element to hold repository name
    var forecastDayE1 = document.createElement("span");
    forecastDayE1.textContent = forecastDay;

    // append to container
    forecastE1.appendChild(forecastDayE1);
    
/*    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

   // check if current repo has issues or not
      if (list[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + list[i].open_issues_count";
    } else {
    statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
  } 
    // append to container
    repoE1.appendChild(statusEl);*/

    // append container to the dom
    forecastContainerE1.appendChild(forecastE1);
    console.log 
    
  }
};