'use strict';

const days = getSavedDays();

refresh(days);

document.querySelector('#new-day').addEventListener('click', (e) => {
  // ternary operator to validate dsr value
  daysInput.value < 0
    ? (errorMssg.innerText = `⚠ Error: Invalid number of days since restock`)
    : createNewDay();
  // prevents refresh
  e.preventDefault();
});

// when show all bttn is pressed, lists everything is the days arr in outputBottom
document.querySelector('#showAll').addEventListener('click', (e) => {
  refresh(days);
});
