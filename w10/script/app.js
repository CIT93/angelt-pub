'use strict';

const days = getSavedDays();
const outputBottom = document.querySelector('#bottom-output');
const errorMssg = document.querySelector('.error');
const daysInput = document.querySelector('#lastRestock');

refresh(days);
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
    const timestamp = moment().valueOf();

    days.push({
      id: id,
      dayNumber: days.length + 1,
      daysSinceRestock: daysSinceRestock,
      dayOfWeek: dayOfWeek,
      fridgeStatus: fridgeStat,
      ateOut: ateOut,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    daysInput.value = '';
    dayTitle.value = 'Monday';
    ateOutCB.checked = false;

    saveDays(days);
    refresh(days);
  }
  // prevents refresh
  e.preventDefault();
});

// when show all bttn is pressed, lists everything is the days arr in outputBottom
document.querySelector('#showAll').addEventListener('click', function (e) {
  refresh(days);
});
