'use strict';

const outputBottom = document.querySelector('#bottom-output');
const errorMssg = document.querySelector('.error');
const daysInput = document.querySelector('#lastRestock');

/*
  READING/WRITING/DELETING LOCAL STORAGE (L.S.)
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
// creating a new day + adding to l.s.
const createNewDay = () => {
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
};
// deleting day from l.s.
const removeDay = (id) => {
  const index = days.findIndex((day) => day.id === id);

  if (index > -1) {
    days.splice(index, 1);
  }
};
// edit existing day and update in l.s.
const editDay = (id) => {
  outputBottom.textContent = '';

  const index = days.findIndex((day) => day.id === id);

  const dayInput = document.createElement('input');
  dayInput.type = 'number';
  dayInput.placeholder = '0';
  outputBottom.appendChild(dayInput);
  const bttn = document.createElement('button');
  bttn.textContent = 'Update';
  outputBottom.appendChild(bttn);

  bttn.addEventListener('click', (e) => {
    if (dayInput.value < 0) {
      const errorMssg = document.createElement('p');
      errorMssg.textContent = `⚠ Error: Invalid number of days since restock`;
      outputBottom.appendChild(errorMssg);
    } else {
      let day = days[index];
      const timestamp = moment().valueOf();
      day.daysSinceRestock = dayInput.value;
      day.fridgeStatus = detFridgeStatus(day.daysSinceRestock, day.ateOut);

      day.updatedAt = timestamp;

      saveDays(days);
      outputBottom.textContent = '';
      generateFullMssg(days[index]);
    }
  });
};

/*
  DETERMINING FRIDGE STATUS & WHAT THE USER CAN EAT THAT DAY
*/
// get fridge status using daysSinceRestock and ateOut
// dsr = daysSinceRestock
// ao = ateOut
const detFridgeStatus = (dsr, ao) => {
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
const resultOutput = (fridgeStatus) => {
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
const generateDayHeader = (dWeek, dNum) => {
  const h2 = document.createElement('h2');
  h2.textContent = `${dWeek}, Recorded Day # ${dNum}`;
  outputBottom.appendChild(h2);
};
// creates dsr message
const generateDaysSinceRestock = (days) => {
  const p = document.createElement('p');
  p.textContent = `Days since fridge has been restocked: ${days}`;
  outputBottom.appendChild(p);
};
// creates timestamp text
const generateTimestamp = (text, createdAt) => {
  const p = document.createElement('p');
  p.textContent = `${text} ${moment(createdAt).fromNow()}`;
  outputBottom.appendChild(p);
};
// creates delete day bttn
const generateDeleteDayBttn = (id) => {
  const bttn = document.createElement('button');
  bttn.textContent = 'Delete Day';
  bttn.classList.add('delete-day');
  bttn.addEventListener('click', (e) => {
    removeDay(id);
    saveDays(days);
    refresh(days);
  });
  outputBottom.appendChild(bttn);
};
// creates edit day bttn
const generateEditDayBttn = (id) => {
  const bttn = document.createElement('button');
  bttn.textContent = 'Edit Day';
  bttn.classList.add('edit-day');
  bttn.addEventListener('click', (e) => {
    editDay(id);
  });
  outputBottom.appendChild(bttn);
};
// creates expanded view bttn
const generateExpandedViewBttn = (id) => {
  const bttn = document.createElement('button');
  bttn.textContent = 'Expanded View >';
  bttn.classList.add('expanded-view');
  bttn.addEventListener('click', (e) => {
    outputBottom.textContent = '';
    const index = days.findIndex((day) => day.id === id);
    generateFullMssg(days[index]);
  });
  outputBottom.appendChild(bttn);
};
// creates message listing what we have to make
const generateFridgeContentsMssg = (fs) => {
  const text = resultOutput(fs);
  const p = document.createElement('p');
  p.textContent = text;
  outputBottom.appendChild(p);
};
// shows a special mssg if user selects 'eat out' on that day
const generateAteOutMssg = (ao, dsr) => {
  if (!ao) {
    return;
  } else {
    const p = document.createElement('p');
    p.textContent = `Since you ate out this week, you have one meals worth of ingredients more than you usually would ${dsr} days after a restock!`;
    outputBottom.appendChild(p);
  }
};
// uses all of the above functions and builds the DOM
const generateFullMssg = (day) => {
  generateDayHeader(day.dayOfWeek, day.dayNumber);
  generateTimestamp('Created at:', day.createdAt);
  generateTimestamp('Updated at:', day.updatedAt);
  generateDaysSinceRestock(day.daysSinceRestock);
  if (day.ateOut) {
    generateAteOutMssg(day.ateOut, day.daysSinceRestock);
  }
  generateFridgeContentsMssg(day.fridgeStatus);
  generateEditDayBttn(day.id);
  generateDeleteDayBttn(day.id);
};
// creates teaser message when
const generateShortMssg = (day) => {
  generateDayHeader(day.dayOfWeek, day.dayNumber);
  generateDeleteDayBttn(day.id);
  generateExpandedViewBttn(day.id);
};
// re-renders page
const refresh = (days) => {
  outputBottom.textContent = '';

  // create 'sorted by last updated' mssg
  const sortMssg = document.createElement('p');
  sortMssg.classList = 'bottom-container-sorted';
  sortMssg.textContent = 'Sorted by last updated';
  outputBottom.appendChild(sortMssg);

  const sortedDays = days.sort((a, b) => {
    if (a.updatedAt > b.updatedAt) {
      return -1;
    } else if (a.updatedAt < b.updatedAt) {
      return 1;
    } else {
      return 0;
    }
  });

  sortedDays.forEach((day) => {
    generateShortMssg(day);
  });
};
