const fridge = {
  daysSinceRestock: 0,
  fridgeStatus: 'fullyStocked',
  isFridgeEmpty: false,
};

const output = document.querySelector('#output');

const button = document
  .querySelector('#new-day')
  .addEventListener('click', function (e) {
    fridge.daysSinceRestock = Math.floor(Math.random() * 8);
    generateDOM(fridge);
  });

/* |  function detFridgeStatus() - returns a value to be assigned to fridgeStatus based 
        on the value of daysSinceRestock

  */
const detFridgeStatus = function () {
  if (fridge.daysSinceRestock < 3) {
    return 'fullyStocked';
  } else if (fridge.daysSinceRestock >= 3 && fridge.daysSinceRestock <= 5) {
    return 'partiallyStocked';
  } else {
    return 'empty';
  }
};

/* |  function detFridgeEmpty() - returns a value to be assigned to isFridgeEmpty based 
        on the value of fridgeStatus

    */
const detFridgeEmpty = function () {
  if (
    fridge.fridgeStatus === 'fullyStocked' ||
    fridge.fridgeStatus === 'partiallyStocked'
  ) {
    return false;
  } else {
    return true;
  }
};

/* |  function resultOutput() - Printing output based off of fridgeStatus/isFridgeEmpty

  */
const resultOutput = function () {
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
      rText: 'You have the ingredients to make baked chicken or spagetthi.',
    },
    {
      rStat: 'empty',
      rText:
        "You don't have the ingredients to make any main dishes! Time for left overs, to eat out, or to go to the grocery store!",
    },
  ];

  // deciding which output to print
  if (fridge.isFridgeEmpty) {
    generateP(results[2].rText);
  } else {
    if (fridge.fridgeStatus === results[0].rStat) {
      generateP(results[0].rText);
    } else if (fridge.fridgeStatus === results[1].rStat) {
      generateP(results[1].rText);
    }
  }
};

/* |    MAIN FUNCTION
        first determines fridgeStatus and isFridgeEmpty using the daysSinceRestock variable
        fridgeStatus = fullyStocked || partiallyStocked || null
        isFridgeEmpty = true || false
*/
const main = function (obj) {
  generateDaysSinceRestock(obj.daysSinceRestock);
  generateH3('Variables:');

  obj.fridgeStatus = detFridgeStatus();
  obj.isFridgeEmpty = detFridgeEmpty();

  generateP(`(local) fridgeStatus = ${obj.fridgeStatus}`);
  generateP(`(local) isFridgeEmpty = ${obj.isFridgeEmpty}`);
  generateH3('Output:');

  resultOutput();
};

/** generating DOM */
// create H1
const generateH1 = function (text) {
  const title = document.createElement('h1');
  title.textContent = text;
  output.appendChild(title);
};
// create H2
const generateDaysSinceRestock = function (days) {
  const h2 = document.createElement('h2');
  h2.textContent = `Days since fridge has been restocked: ${days}`;
  output.appendChild(h2);
};
// create H3
const generateH3 = function (text) {
  const h3 = document.createElement('h3');
  h3.textContent = text;
  output.appendChild(h3);
};
// create p
const generateP = function (text) {
  const p = document.createElement('p');
  p.textContent = text;
  output.appendChild(p);
};
// create hr
const generateHR = function () {};

const generateDOM = function (fridge) {
  main(fridge);
  const hr = document.createElement('hr');
  output.appendChild(hr);
};

generateH1('What I can eat in a day');
