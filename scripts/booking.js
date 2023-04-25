/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and
// elements on the screen that will be clicked or will need to be modified.
// Do any of these variables need to be initialized when the page is loaded?
// When do they need to be reset or updated?

let dailyRate = 35;
let daysSelected = [];
let dayElements = document.querySelectorAll(".day-selector li");
let calculatedCost = document.getElementById("calculated-cost");
let fullButton = document.getElementById("full");
let halfButton = document.getElementById("half");
let clearButton = document.getElementById("clear-button");

/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element,
// and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than
// once. hint: .classList.contains() might be helpful here!

// get all day elements

function updateSelectedDays() {
  daysSelected = [];
  dayElements.forEach(function (day) {
    if (day.classList.contains("clicked")) {
      daysSelected.push(day.getAttribute("id"));
    }
  });
}

dayElements.forEach(function (day) {
  day.addEventListener("click", function () {
    if (day.classList.contains("clicked")) {
      day.classList.remove("clicked");
    } else {
      day.classList.add("clicked");
    }
    updateSelectedDays();
    calculateCost();
  });
});

/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.

function clearDays() {
  dayElements.forEach(function (day) {
    day.classList.remove("clicked");
  });
  updateSelectedDays();
  calculateCost();
}

clearButton.addEventListener("click", function () {
  clearDays();
});

/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.

function updateRate(rate) {
  if (rate === "half") {
    dailyRate = 20;
    halfButton.classList.add("clicked");
    fullButton.classList.remove("clicked");
  } else {
    dailyRate = 35;
    fullButton.classList.add("clicked");
    halfButton.classList.remove("clicked");
  }
  calculateCost();
}

fullButton.addEventListener("click", function () {
  updateRate("full");
});

halfButton.addEventListener("click", function () {
  updateRate("half");
});

// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.

/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value

function calculateCost() {
  let numberOfDays = daysSelected.length;
  let cost = numberOfDays * dailyRate;
  calculatedCost.innerHTML = cost;
}
