/* DAILY DECISION - Putting together dinner
    code that helps me decide what main dish to have for dinner.
    how well stocked my fridge is determines whether or not i'll
    have the means to make certain dinners.
*/

/* showOnPage - prints output to page

*/
const showOnPage = function (text) {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById('output');
  outputDiv.append(newParagraph);
};

/* fridge object - meant to represent my fridge.
  parameters  // daysSinceRestock, fridgeStatus, isFridgeEmpty
*/
const fridge = {
  daysSinceRestock: 0,
  fridgeStatus: 'fullyStocked',
  isFridgeEmpty: false,  
};

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
  }

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
  let results = ['You have the ingredients to make enchiladas, baked chicken, beef tacos, spaghetti, or pork chops.',
    'You have the ingredients to make baked chicken or spagetthi.',
    "You don't have the ingredients to make any main dishes! Time for left overs, to eat out, or to go to the grocery store!"
  ];

  // deciding which output to print
  if (fridge.isFridgeEmpty) {
    showOnPage(results[2]);
  } else {
    if (fridge.fridgeStatus === 'fullyStocked') {
      showOnPage(results[0]);
    } else if (fridge.fridgeStatus === 'partiallyStocked') {
      showOnPage(results[1]);
    }
  }

  showOnPage(
    ' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
  );
};

/* |    MAIN FUNCTION
        first determines fridgeStatus and isFridgeEmpty using the daysSinceRestock variable
        fridgeStatus = fullyStocked || partiallyStocked || null
        isFridgeEmpty = true || false
*/
const main = function (obj, daysSinceRestock) {
  for (let i = daysSinceRestock; i < 6; i++) {
    obj.daysSinceRestock = i;
    showOnPage(
      `- - - - - - - - - - - - DAYS SINCE RESTOCK = ${obj.daysSinceRestock} - - - - - - - - - - - -`
    );
    showOnPage(
      'VARIABLES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
    );

    obj.fridgeStatus = detFridgeStatus();
    obj.isFridgeEmpty = detFridgeEmpty();

    showOnPage(`(local) fridgeStatus = ${obj.fridgeStatus}`);
    showOnPage(`(local) isFridgeEmpty = ${obj.isFridgeEmpty}`);
    showOnPage(
      'OUTPUT - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
    );

    resultOutput();
  }
  showOnPage(
    "We've hit day 6, after that it's all the same! No more ingredients :("
  );
};

// Executes main method, changing fridge status value each time.
main(fridge, 1);
