var primarySlide = document.querySelector(".primarySlide");
var secondarySlide = document.querySelector(".availFlights");
var tertiarySlide = document.querySelector(".trip-summary");
var destinationInput = document.querySelector("#whereYouGo").value;
var departureInput = document.querySelector("#departure").value;
var leavingOnDate = document.querySelector("#leavingOnDate");
var comingBackDate = document.querySelector("#comingBackDate");

var firstSlide = function() {
    primarySlide.style.display = "initial";
    secondarySlide.style.display = "none";
    tertiarySlide.style.display = "none";


    var goBtn = document.querySelector("#goBtn");
    goBtn.addEventListener("click", secondSlide);
}

var secondSlide = function() {
    secondarySlide.style.display = "initial";
    primarySlide.style.display = "none";
    tertiarySlide.style.display = "none";

    var leavingDatePicker = new Datepicker(leavingOnDate, {
        autohide: "true"
    });
    

    var comingBackDatePicker = new Datepicker(comingBackDate, {
        autohide: "true"
    });

    var searchFlightsBtn = document.querySelector("#flightSearchBtn");
    searchFlightsBtn.addEventListener("click", function() {
    var leavingDate = leavingDatePicker.getDate("yyyy-mm-dd");
    var comingDate = comingBackDatePicker.getDate("yyyy-mm-dd");
    
    var flightApi = "";
    });

    var nextpageBtn = document.querySelector("#selectFlightBtn");
    nextpageBtn.addEventListener("click", thirdSlide);
}

var thirdSlide = function() {
    primarySlide.style.display = "none";
    secondarySlide.style.display = "none";
    tertiarySlide.style.display = "initial";
}

firstSlide();