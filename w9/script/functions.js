'use strict';

/*
  READING/WRITING TO LOCAL STORAGE
*/
// retrieve & render array from l.s.
const getSavedDays = () => {
  const daysJSON = localStorage.getItem('days');

  try {
    return daysJSON ? JSON.parse(daysJSON) : [];
  } catch (e) {
    return [];
  }
};
// overwriting existing array in l.s.
const saveDays = (days) => {
  localStorage.setItem('days', JSON.stringify(days));
};

const removeDay = (id) => {
  const index = days.findIndex((day) => day.id === id);

  if (index > -1) {
    days.splice(index, 1);
  }
};

/*
  DETERMINING FRIDGE STATUS & WHAT THE USER CAN EAT THAT DAY
*/
// get fridge status using daysSinceRestock and ateOut
// dsr = daysSinceRestock
// ao = ateOut
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
//  function resultOutput() - Printing output based off of fridgeStatus/isFridgeEmpty
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
  BUILDING DOM
*/
// creates header for each day
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
// creates delete day bttn
const generateDeleteDayBttn = function (id) {
  const bttn = document.createElement('button');
  bttn.textContent = 'Delete Day';
  bttn.classList.add('delete-day');
  bttn.addEventListener('click', function (e) {
    removeDay(id);
    saveDays(days);
    refresh(days);
  });
  outputBottom.appendChild(bttn);
};
// creates message listing what we have to make
const generateFridgeContentsMssg = function (fs) {
  const text = resultOutput(fs);
  const p = document.createElement('p');
  p.textContent = text;
  outputBottom.appendChild(p);
};
// shows a special mssg if user selects 'eat out' on that day
const generateAteOutMssg = function (ao, dsr) {
  if (!ao) {
    return;
  } else {
    const p = document.createElement('p');
    p.textContent = `Since you ate out this week, you have one meals worth of ingredients more than you usually would ${dsr} days after a restock!`;
    outputBottom.appendChild(p);
  }
};
// uses all of the above functions and builds the DOM
const generateDOM = function (day) {
  generateDayHeader(day.dayOfWeek, day.dayNumber);
  generateDaysSinceRestock(day.daysSinceRestock);
  if (day.ateOut) {
    generateAteOutMssg(day.ateOut, day.daysSinceRestock);
  }
  generateFridgeContentsMssg(day.fridgeStatus);
  generateDeleteDayBttn(day.id);
};

const refresh = function (days) {
  outputBottom.textContent = '';

  days.forEach(function (day) {
    generateDOM(day);
  });
};
