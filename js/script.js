var primarySlide = document.querySelector(".primarySlide");
var secondarySlide = document.querySelector(".trip-summary");
var destinationInput = document.querySelector("#destination");
var goingDate = document.querySelector("#goingDate");
var comingBackDate = document.querySelector("#comingBackDate");

var firstSlide = function() {
    primarySlide.style.display = "initial";
    secondarySlide.style.display = "none";

    var leavingDatePicker = new Datepicker(goingDate, {
        autohide: "true"
    });
    

    var comingBackDatePicker = new Datepicker(comingBackDate, {
        autohide: "true"
    });
    
    var leavingDate = leavingDatePicker.getDate("yyyy-mm-dd");
    var comingDate = comingBackDatePicker.getDate("yyyy-mm-dd");

    var destName = destinationInput.value;

    var goBtn = document.querySelector("#goBtn");
    goBtn.addEventListener("click", secondSlide);

    
}

var secondSlide = function(destName,leavingDate,comingDate) {
    secondarySlide.style.display = "initial";
    primarySlide.style.display = "none";
    
        var getCoordsApi = "https://api.openweathermap.org/data/2.5/weather?q=" + destName + "&units=imperial&appid=5a5307ea2f6a35b62ce0461de8e45a8d";

        fetch(getCoordsApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            var lon = data.coord.lon;
            var lat = data.coord.lat;
            var nameOfCity = data.name;

            return[lat,lon,nameOfCity];

        // }).then(function([lat,lon,nameOfCity]) {
        //     var weatherApi = ""
        })
    
}


firstSlide();