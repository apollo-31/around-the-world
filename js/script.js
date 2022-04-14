var primarySlide = document.querySelector(".primarySlide");
var secondarySlide = document.querySelector(".trip-summary");
var destinationInput = document.querySelector("#destination").value;
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

    var goBtn = document.querySelector("#goBtn");
    goBtn.addEventListener("click", secondSlide);
}

var secondSlide = function() {
    secondarySlide.style.display = "initial";
    primarySlide.style.display = "none";
    
    
    

    var nextpageBtn = document.querySelector("#selectFlightBtn");
    nextpageBtn.addEventListener("click", thirdSlide);
}


firstSlide();