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
  methods     // detFridgeStatus(), detFridgeEmpty(), resultOutput()

*/
const fridge = {
  /* default values

  */
  daysSinceRestock: 0,
  fridgeStatus: 'fullyStocked',
  isFridgeEmpty: false,
  /* |  function detFridgeStatus() - returns a value to be assigned to fridgeStatus based 
        on the value of daysSinceRestock

  */
  detFridgeStatus: function () {
    if (this.daysSinceRestock < 3) {
      return 'fullyStocked';
    } else if (this.daysSinceRestock >= 3 && this.daysSinceRestock <= 5) {
      return 'partiallyStocked';
    } else {
      return 'empty';
    }
  },
  /* |  function detFridgeEmpty() - returns a value to be assigned to isFridgeEmpty based 
        on the value of fridgeStatus

    */
  detFridgeEmpty: function () {
    if (
      this.fridgeStatus === 'fullyStocked' ||
      this.fridgeStatus === 'partiallyStocked'
    ) {
      return false;
    } else {
      return true;
    }
  },
  /* |  function resultOutput() - Printing output based off of fridgeStatus/isFridgeEmpty

    */
  resultOutput: function () {
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
    if (this.isFridgeEmpty) {
      showOnPage(noMainDishes);
    } else {
      if (this.fridgeStatus === 'fullyStocked') {
        showOnPage(allChickenOptions);
        showOnPage(allBeefOptions);
        showOnPage(allPorkOptions);
      } else if (this.fridgeStatus === 'partiallyStocked') {
        showOnPage(someChickenOptions);
        showOnPage(someBeefOptions);
      }
    }

    showOnPage(
      ' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
    );
  },
};

/* |    MAIN METHOD
        first determines fridgeStatus and isFridgeEmpty using the daysSinceRestock variable
        fridgeStatus = fullyStocked || partiallyStocked || null
        isFridgeEmpty = true || false


*/
const main = function (obj, daysSinceRestock) {
  while (daysSinceRestock <= 6) {
    obj.daysSinceRestock = daysSinceRestock;
    showOnPage(
      `- - - - - - - - - - - - DAYS SINCE RESTOCK = ${obj.daysSinceRestock} - - - - - - - - - - - -`
    );
    showOnPage(
      'VARIABLES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
    );

    obj.fridgeStatus = obj.detFridgeStatus();
    obj.isFridgeEmpty = obj.detFridgeEmpty();

    showOnPage(`(local) fridgeStatus = ${obj.fridgeStatus}`);
    showOnPage(`(local) isFridgeEmpty = ${obj.isFridgeEmpty}`);
    showOnPage(
      'OUTPUT - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
    );

    obj.resultOutput();
    daysSinceRestock++;
  }
  showOnPage(
    "We've hit day 6, after that it's all the same! No more ingredients :("
  );
};

// Executes main method, changing fridge status value each time.
main(fridge, 1);
