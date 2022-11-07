'use strict';

const days = [];

/*
  assigning text values 
*/

/*
  get fridge status using daysSinceRestock and ateOut
  dsr = daysSinceRestock
  ao = ateOut
*/
const detFridgeStatus = function (dsr, ao) {
  if (ao) {
    dsr--;
  }

  if (dsr < 3) {
    return 'fullyStocked';
  } else if (dsr >= 3 && dsr <= 5) {
    return 'partiallyStocked';
  } else {
    return 'empty';
  }
};

/* |  function resultOutput() - Printing output based off of fridgeStatus/isFridgeEmpty

  */
const resultOutput = function (fridgeStatus) {
  /*  results array
      index - corresponding fridgeStatus ::: 0 - fullyStocked, 1 - partiallyStocked, 2 - empty
  */
  const results = [
    {
      rStat: 'fullyStocked',
      rText:
        'You have the ingredients to make enchiladas, baked chicken, beef tacos, spaghetti, or pork chops.',
    },
    {
      rStat: 'partiallyStocked',
      rText: 'You have the ingredients to make baked chicken or spaghetti.',
    },
    {
      rStat: 'empty',
      rText:
        "You don't have the ingredients to make any main dishes! Time for left overs, to eat out, or to go to the grocery store!",
    },
  ];

  // deciding which output to return
  if (fridgeStatus === results[2].rStat) {
    return results[2].rText;
  } else {
    if (fridgeStatus === results[0].rStat) {
      return results[0].rText;
    } else if (fridgeStatus === results[1].rStat) {
      return results[1].rText;
    }
  }
};

/*
  building dom
*/

/*
  creates day header
  dWeek = dayOfWeek
  dNum = dayNumber
*/
const generateDayHeader = function (dWeek, dNum) {
  const h2 = document.createElement('h2');
  h2.textContent = `${dWeek}, Recorded Day # ${dNum}`;
  outputBottom.appendChild(h2);
};

// creates dsr message
const generateDaysSinceRestock = function (days) {
  const p = document.createElement('p');
  p.textContent = `Days since fridge has been restocked: ${days}`;
  outputBottom.appendChild(p);
};

// creates message listing what we have to make
const generateFridgeContentsMssg = function (fs) {
  const text = resultOutput(fs);
  const p = document.createElement('p');
  p.textContent = text;
  outputBottom.appendChild(p);
};

const generateAteOutMssg = function (ao, dsr) {
  if (!ao) {
    return;
  } else {
    const p = document.createElement('p');
    p.textContent = `Since you ate out this week, you have one meals worth of ingredients more than you usually would ${dsr} days after a restock!`;
    outputBottom.appendChild(p);
  }
};

const generateDOM = function (day) {
  generateDayHeader(day.dayOfWeek, day.dayNumber);
  generateDaysSinceRestock(day.daysSinceRestock);
  if (day.ateOut) {
    generateAteOutMssg(day.ateOut, day.daysSinceRestock);
  }
  generateFridgeContentsMssg(day.fridgeStatus);
};

/*
  responding to interaction with DOM
*/

const outputBottom = document.querySelector('#bottom-output');

// takes values from form when bttn is clicked
document.querySelector('#new-day').addEventListener('click', function (e) {
  // clears the output div
  outputBottom.textContent = '';

  // grabs from user input
  const daysInput = document.querySelector('#lastRestock');
  const daysSinceRestock = daysInput.value;
  if (daysSinceRestock === '') {
    return;
  }

  const dayTitle = document.querySelector('#day-of-week');
  const dayOfWeek = dayTitle.value;

  const ateOutCB = document.querySelector('#ate-out');
  const ateOut = ateOutCB.checked;

  const fridgeStat = detFridgeStatus(daysSinceRestock, ateOut);

  days.push({
    dayNumber: days.length + 1,
    daysSinceRestock: daysSinceRestock,
    dayOfWeek: dayOfWeek,
    fridgeStatus: fridgeStat,
    ateOut: ateOut,
  });

  daysInput.value = '';
  dayTitle.value = 'Monday';
  ateOutCB.checked = false;

  generateDOM(days[days.length - 1]);

  // prevents refresh
  e.preventDefault();
});

// when clear bttn is pressed, gets rid of text in outputBottom
document.querySelector('#clear').addEventListener('click', function (e) {
  outputBottom.textContent = '';
});

// when show all bttn is pressed, gets rid of text in outputBottom
document.querySelector('#showAll').addEventListener('click', function (e) {
  outputBottom.textContent = '';

  days.forEach(function (day) {
    generateDOM(day);
  });
});
