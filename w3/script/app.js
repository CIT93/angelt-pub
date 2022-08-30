/* DAILY DECISION - Putting together dinner
    code that helps me decide what main dish to have for dinner.
    how well stocked my fridge is determines whether or not i'll
    have the means to make certain dinners.
*/

// showOnPage method
const showOnPage = function (text) {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById('output');
  outputDiv.append(newParagraph);
};

/* |  function detFridgeStatus() - determines fridge status using daysSinceRestock,
      which is passed into main()
  */
let detFridgeStatus = function (daysSinceRestock) {
  if (daysSinceRestock < 3) {
    return 'fullyStocked';
  } else if (daysSinceRestock >= 3 && daysSinceRestock <= 5) {
    return 'partiallyStocked';
  } else {
    return null;
  }
};

/* |  function resultOutput() - Printing output based off of fridgeStatus/isFridgeEmpty
        takes in isFridgeEmpty, fridgeStatus. creates local variables for fridge output. prints variables based on
        fridgeStatus
  */
let resultOutput = function (isFridgeEmpty, fridgeStatus) {
  // local variables - outputs
  let allChickenOptions =
    'You have the ingredients to make enchiladas or baked chicken.';
  let someChickenOptions = 'You have the ingredients to make baked chicken.';
  let allBeefOptions =
    'You have the ingredients to make beef tacos or spagetthi.';
  let someBeefOptions = 'You have the ingredients to make spagetthi.';
  let allPorkOptions = 'You have the ingredients to make pork chops.';
  let noMainDishes =
    "You don't have the ingredients to make any main dishes! Time for left overs, to eat out, or to go to the grocery store!";

  // deciding which output to print
  if (isFridgeEmpty) {
    showOnPage(noMainDishes);
  } else {
    if (fridgeStatus === 'fullyStocked') {
      showOnPage(allChickenOptions);
      showOnPage(allBeefOptions);
      showOnPage(allPorkOptions);
    } else if (fridgeStatus === 'partiallyStocked') {
      showOnPage(someChickenOptions);
      showOnPage(someBeefOptions);
    }
  }

  showOnPage(
    ' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
  );
};

/* |    MAIN METHOD
        first determines fridgeStatus and isFridgeEmpty using the daysSinceRestock variable
        fridgeStatus = fullyStocked || partiallyStocked || null
        isFridgeEmpty = true || false


*/
const main = function (daysSinceRestock) {
  let fridgeStatus;
  let isFridgeEmpty;

  showOnPage(
    `- - - - - - - - - - - - DAYS SINCE RESTOCK = ${daysSinceRestock} - - - - - - - - - - - -`
  );
  showOnPage(
    'VARIABLES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
  );

  // assigns fridgeStatus the return value of detFridgeStatus
  fridgeStatus = detFridgeStatus(daysSinceRestock);
  // determiens isFridgeEmpty based off of fridgeStatsus
  if (fridgeStatus === 'fullyStocked' || fridgeStatus === 'partiallyStocked') {
    isFridgeEmpty = false;
  } else {
    isFridgeEmpty = true;
  }

  showOnPage(`(local) fridgeStatus = ${fridgeStatus}`);
  showOnPage(`(local) isFridgeEmpty = ${isFridgeEmpty}`);
  showOnPage(
    'OUTPUT - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
  );

  resultOutput(isFridgeEmpty, fridgeStatus);
};

// Executes main method, changing fridge status value each time.
main(2);
main(3);
main(4);
main(5);
main(6);
