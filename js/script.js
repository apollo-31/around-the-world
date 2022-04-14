var primarySlide = document.querySelector(".primarySlide");
var secondarySlide = document.querySelector(".trip-summary");
var destinationInput = document.querySelector("#destination").value;
var goingDate = document.querySelector("#goingDate");
var comingBackDate = document.querySelector("#comingBackDate");

var leavingDatePicker = new Datepicker(goingDate, {
        autohide: "true"
    });
    

var comingBackDatePicker = new Datepicker(comingBackDate, {
        autohide: "true"
    });
    
var leavingDate = leavingDatePicker.getDate("yyyy-mm-dd");
var comingDate = comingBackDatePicker.getDate("yyyy-mm-dd");

var firstSlide = function() {
    primarySlide.style.display = "initial";
    secondarySlide.style.display = "none";

    

    var goBtn = document.querySelector("#goBtn");
    goBtn.addEventListener("click", secondSlide);

    console.log(destinationInput);

    
}

var secondSlide = function() {
    secondarySlide.style.display = "initial";
    primarySlide.style.display = "none";
    
        var getCoordsApi = "https://api.openweathermap.org/data/2.5/weather?q=" + destinationInput + "&units=imperial&appid=5a5307ea2f6a35b62ce0461de8e45a8d";

        fetch(getCoordsApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            var lon = data.coord.lon;
            var lat = data.coord.lat;

            return[lat,lon];

        // }).then(function([lat,lon])
        })
    
}


firstSlide();