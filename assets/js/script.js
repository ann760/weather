// create variables and select the div where the responce will be displayed
var cityFormE1 = document.querySelector("#city-form");
var cityInputE1 = document.querySelector("#cityname");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var tempContainer = document.querySelector("#today-temp");
var historySearch = document.querySelector("#history-search")
var forecastContainerE1 = document.querySelector("#forecast-container");


var getCityWeather = function(cityname) {
    // format the weather api url
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' +
                  cityname +
                  '&appid=7469199830961006664088f66c57f0e7';

    // request the url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            return response.json()


            .then(function(response) { 
                // Empty out the div
                tempContainer.innerHTML = "";

                var degree = document.createElement('h3');
                var humidity = document.createElement("h3");
                var wind = document.createElement("h3");

                degree.textContent = "Tempurature real time: " +
                    response.main.temp;
                humidity.textContent = "Humidity is: " +
                    response.main.humidity + " Percent"
                wind.textContent = "Wind Speed is: " + response.wind.speed + " mph"

                tempContainer.appendChild(degree);
                tempContainer.appendChild(humidity);
                tempContainer.appendChild(wind);
               
            });
           
        } else {
            // empty out the div
            cityContainerEl.innerHTML = "";
            cityContainerEl.textContent = "No city found.";
        };
    })
    .catch(function(error) {
        // This `.catch()` ie chained onto the end of the `.then()` method
        cityContainerEl.innerHTML = "";
        cityContainerEl.textContent = "Unable to connect to api";
    });

    citySearchTerm.textContent = cityname.toUpperCase().charAt(0) + cityname.slice(1);

    console.log(cityname);

    var searchHistoryEl = document.createElement("li");
    searchHistoryEl.className = "card";
    searchHistoryEl.textContent = cityname.toUpperCase().charAt(0) + cityname.slice(1);
    historySearch.appendChild(searchHistoryEl);
      // check if api returned any repos
    
};

var formSubmitHandler = function(event) {
    event.preventDefault()
    
    // get input element value
    var cityname = cityInputE1.value.trim();
    if (cityname) {
        getCityWeather(cityname);
        cityInputE1.value = "";
    } else {
        cityContainerEl.textContent = "Please enter a city";
    } 
};

cityFormE1.addEventListener("submit", formSubmitHandler);

