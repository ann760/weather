// create variables and select the div where the responce will be displayed
var cityFormE1 = document.querySelector("#city-form");
var cityInputE1 = document.querySelector("#cityname");
var cityContainerEl = document.querySelector("#city-container");
var citySearchTerm = document.querySelector("#city-search-term");
var tempContainer = document.querySelector("#today-temp");
var historySearch = document.querySelector("#history-search")
var forecastContainer = document.querySelector("#forecast-container");
var fBox1 = document.querySelector("#forecastBox1");

var formSubmitHandler = function(event) {
    event.preventDefault()
    
    // get input element value
    var cityname = cityInputE1.value.trim();
    if (!cityname) {
        cityInputE1.value = "";
        cityContainerEl.textContent = "Please enter a city";
    } else {
        citySearchTerm.innerHTML = "";
        cityInputE1.value = "";
        getCityWeather(cityname);
    }
};

var getForecast = function(lat, lon) {
    // format the forecast api url
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?' + 
                      '&lat=' + lat + 
                      '&lon=' + lon + 
                      '&exclude=minutely,hourly?q=' +
                      '&appid=7368e92b540c77a93bea6caea5afaeec&units=imperial';

    // reruest the forecast url
    fetch(forecastUrl).then(function(response) {
        console.log(response)
        if (response.ok) {
            return response.json()

            .then(function(response) {
                console.log(response.daily);
                for (var i = 0; i < response.daily.length; i++) {
                    var day = response.daily[i].dt;
                    var dayTemp = response.daily[i].temp.day;
                    var dayHumidity = response.daily[i].humidity;
                    var dayWind = response.daily[i].wind_speed;

                    // create day container and append to the DOM
                    var forecastDay = document.createElement("div")
                    forecastContainer.appendChild(forecastDay);
                    // create and append day 
                    var dayEl = document.createElement("p");
                    dayEl.textContent = day;
                    forecastDay.appendChild(dayEl);
                    
                    // create and append temp
                    var tempEl = document.createElement("p");
                    tempEl.textContent = dayTemp;
                    forecastDay.appendChild(tempEl);

                    // create and append humidity
                    var humidityEl = document.createElement("p");
                    humidityEl.textContent = dayHumidity;
                    forecastDay.appendChild(humidityEl );

                    // create and append wind
                    var windEl = document.createElement("p");
                    windEl.textContent = dayWind;
                    forecastDay.appendChild(windEl);

                }

            }) 

        } else {
             // empty out the div
           //  forecastContainer.innerHTML = "";
        }
    })
    
}

var getCityWeather = function(cityname) {
    // format the weather api url
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' +
                  cityname +
                  '&appid=7469199830961006664088f66c57f0e7';

    // request the url
    fetch(apiUrl).then(function(response) {
        console.log(response)
        if (response.ok) {
            return response.json()
            
            .then(function(response) { 
                // Empty out the div
                tempContainer.innerHTML = "";

                // get the lat and lon needed to call the forecast function.
                var lat = response.coord.lat;
                var lon = response.coord.lon;
                console.log(lat)
                console.log(lon)
                getForecast(lat, lon)

                // create and display the current weather 
                var degree = document.createElement('h4');
                var temF = (response.main.temp - 273.15) * 1.80 + 32;
                degree.textContent = "Tempurature real time: " + Math.floor(temF)
                tempContainer.appendChild(degree);

                var humidity = document.createElement("h4");
                humidity.textContent = "Humidity is: " +
                    response.main.humidity + " Percent"
                tempContainer.appendChild(humidity);

                var wind = document.createElement("h4");
                wind.textContent = "Wind Speed is: " + response.wind.speed + " mph"
                tempContainer.appendChild(wind);
               
            });
           
        } else {
            // empty out the div
           citySearchTerm.innerHTML = "";
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

cityFormE1.addEventListener("submit", formSubmitHandler);

