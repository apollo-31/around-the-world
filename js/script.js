var primarySlide = document.querySelector(".primarySlide");
var secondarySlide = document.querySelector(".trip-summary");
var eventSection = document.querySelector(".local");
var forecastSection = document.querySelector("#forecastSection");

var goingDate = document.querySelector("#goingDate");
var comingBackDate = document.querySelector("#comingBackDate");

var leavingDatePicker = new Datepicker(goingDate, {
        autohide: "true"
    });
    

var comingBackDatePicker = new Datepicker(comingBackDate, {
        autohide: "true"
    });




var firstSlide = function() {
    primarySlide.style.display = "initial";
    secondarySlide.style.display = "none";

    

    var goBtn = document.querySelector("#goBtn");
    goBtn.addEventListener("click", function() {
        function getInputValue() {
           var destinationInput = document.querySelector("#destination").value; 

           localStorage.setItem("destination", destinationInput);
        };
        getInputValue();

        secondSlide();
    });
 
}

var lat;
var lon;

var secondSlide = function() {
    secondarySlide.style.display = "initial";
    primarySlide.style.display = "none";
    var leavingDate = leavingDatePicker.getDate("yyyy-mm-dd");
    var comingDate = comingBackDatePicker.getDate("yyyy-mm-dd");
    var destName = localStorage.getItem("destination");
        var getCoordsApi = "https://api.openweathermap.org/data/2.5/weather?q=" + destName + "&units=imperial&appid=5a5307ea2f6a35b62ce0461de8e45a8d";

        fetch(getCoordsApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

           lon = data.coord.lon;
           lat = data.coord.lat;

        }).then(function() {

            var oneCallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=5a5307ea2f6a35b62ce0461de8e45a8d&units=imperial";

            fetch(oneCallApi)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);

                for (i = 0; i < data.daily.length; i++) {
                    var weatherDay = document.createElement("div");
                    weatherDay.classList = "weatherDivs column is-seven";

                    var dt = data.daily[i].dt;
                    var milliseconds = dt * 1000;
                    var dateObject = new Date(milliseconds);
                    var dateFormatted = dateObject.toLocaleString("en-US", { month: "numeric", year: "numeric" ,day: "numeric"});
                        
                    var date = document.createElement("p");
                    date.textContent = dateFormatted;
                    date.className = "weatherDates";

                    var temp = document.createElement("p");
                    temp.textContent = "Temp: " + data.daily[i].temp.day + "°F";

                    var feelsLike = document.createElement("p");
                    feelsLike.textContent = "Feels like: " + data.daily[i].feels_like.day + "°F";

                    var humidity = document.createElement("p");
                    humidity.textContent = "Humidity: " + data.daily[i].humidity + "%";

                    var windSpeed = document.createElement("p");
                    windSpeed.textContent = "Wind Speed" + data.daily[i].wind_speed + "MPH";

                    var weatherDescription = document.createElement("p");
                    weatherDescription.textContent = "Conditions: " + data.daily[i].weather[0].description;

                    weatherDay.appendChild(date);
                    weatherDay.appendChild(temp);
                    weatherDay.appendChild(feelsLike);
                    weatherDay.appendChild(humidity);
                    weatherDay.appendChild(windSpeed);
                    weatherDay.appendChild(weatherDescription);
                    forecastSection.appendChild(weatherDay);
                }
            })
        })
        .then(function() {
            var eventsApi = "https://app.ticketmaster.com/discovery/v2/events.json?latlong=" + lat + "," + lon + "&apikey=FKA8aYhM8iHaCS67OhDL1AgP1DUITuPw&size=10";

        fetch(eventsApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            for (i = 0; i < data._embedded.events.length; i++) {
                var eventCard = document.createElement("div");
                eventCard.classList = "eventCards column is-three";
                var eventName = document.createElement("p");
                eventName.textContent = data._embedded.events[i].name;
                
                var eventType = document.createElement("p");
                eventType.textContent = "type of event: " + data._embedded.events[i].classifications[0].segment.name;

                eventCard.appendChild(eventName);
                eventCard.appendChild(eventType);
                eventSection.appendChild(eventCard);

            }
        })
        })    
}


firstSlide();