var getCityWeather = function(city) {
    // format the weather api url
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=q' +
                  city +
                  '&appid=d56419ea112eca988ba1fe6c4ef3eae0';

    // request the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
        console.log(data);
        });
    });
};

var cityFormE1 = document.querySelector("#city-form");
var cityInputE1 = document.querySelector("#cityname");

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
    console.log(event);
};

cityFormE1.addEventListener("submit", formSubmitHandler);

