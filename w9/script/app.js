'use strict';

const days = getSavedDays();
const outputBottom = document.querySelector('#bottom-output');
const errorMssg = document.querySelector('.error');
const daysInput = document.querySelector('#lastRestock');

// takes values from form when bttn is clicked
document.querySelector('#new-day').addEventListener('click', function (e) {
  if (daysInput.value < 0) {
    errorMssg.innerText = `⚠ Error: Invalid number of days since restock`;
  } else {
    // clears the output div
    outputBottom.textContent = '';
    errorMssg.innerText = '';

    // grabs from user input
    const daysSinceRestock = daysInput.value;

    const dayTitle = document.querySelector('#day-of-week');
    const dayOfWeek = dayTitle.value;

    const ateOutCB = document.querySelector('#ate-out');
    const ateOut = ateOutCB.checked;

    const fridgeStat = detFridgeStatus(daysSinceRestock, ateOut);

    const id = uuidv4();

    days.push({
      id: id,
      dayNumber: days.length + 1,
      daysSinceRestock: daysSinceRestock,
      dayOfWeek: dayOfWeek,
      fridgeStatus: fridgeStat,
      ateOut: ateOut,
    });

    daysInput.value = '';
    dayTitle.value = 'Monday';
    ateOutCB.checked = false;

    saveDays(days);
    generateDOM(days[days.length - 1]);
  }
  // prevents refresh
  e.preventDefault();
});

// when clear bttn is pressed, gets rid of text in outputBottom
document.querySelector('#clear').addEventListener('click', function (e) {
  outputBottom.textContent = '';
});

// when show all bttn is pressed, lists everything is the days arr in outputBottom
document.querySelector('#showAll').addEventListener('click', function (e) {
  refresh(days);
});
