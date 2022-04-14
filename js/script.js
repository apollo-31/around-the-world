var primarySlide = document.querySelector(".primarySlide");
var secondarySlide = document.querySelector(".trip-summary");
var eventSection = document.querySelector(".local");

var goingDate = document.querySelector("#goingDate");
var comingBackDate = document.querySelector("#comingBackDate");

var leavingDatePicker = new Datepicker(goingDate, {
        autohide: "true"
    });
    

var comingBackDatePicker = new Datepicker(comingBackDate, {
        autohide: "true"
    });
    
var leavingDate = leavingDatePicker.getDate("yyyy.mm.dd");
var comingDate = comingBackDatePicker.getDate("yyyy.mm.dd");

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

var secondSlide = function() {
    secondarySlide.style.display = "initial";
    primarySlide.style.display = "none";

    var destName = localStorage.getItem("destination");
        var getCoordsApi = "https://api.openweathermap.org/data/2.5/weather?q=" + destName + "&units=imperial&appid=5a5307ea2f6a35b62ce0461de8e45a8d";

        fetch(getCoordsApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            var lon = data.coord.lon;
            var lat = data.coord.lat;

            return[lat,lon];

        })
        // .then(function([lat,lon]) {
        //     var startUnix = Math.round((new Date(leavingDate)).getTime() / 1000).toString();
        //     var endUnix = Math.round((new Date(comingDate)).getTime() / 1000).toString();
        //     console.log(startUnix);

        //     var getWeather = "http://history.openweathermap.org/data/2.5/history/city?lat=" + lat + "&lon=" + lon + "&type=hour&start=" + startUnix + "&end=" + endUnix + "&appid=5a5307ea2f6a35b62ce0461de8e45a8d";

        //     fetch(getWeather)
        //     .then(function(response) {
        //         return response.json();
        //     })
        //     .then(function(data) {
        //         console.log(data);
        //     })
        // })
        .then(function([lat,lon]) {
            var eventsApi = "https://app.ticketmaster.com/discovery/v2/events.json?latlong=" + lat + "," + lon + "&apikey=FKA8aYhM8iHaCS67OhDL1AgP1DUITuPw&size=10";
        
        fetch(eventsApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            for (i = 0; i < data._embedded.events.length; i++) {
                var eventCard = document.createElement("div");
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