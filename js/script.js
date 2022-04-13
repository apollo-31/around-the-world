var primarySlide = document.querySelector(".primarySlide");
var secondarySlide = document.querySelector(".availFlights");
var destinationInput = document.querySelector(".whereYouGo").value();

var firstSlide = function() {
    primarySlide.style.display = "flex";
    secondarySlide.style.display = "none";

    var goBtn = document.qquerySelector(".goBtn");
    goBtn.addEventListener("click", secondSlide);
}

var secondSlide = function() {
    primarySlide.style.display = "flex";
    secondSlide.style.display = "none";
}

firstSlide();