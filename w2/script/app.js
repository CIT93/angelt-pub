/* DAILY DECISION - Putting together dinner
    code that helps me decide what main dish to have for dinner.
    how well stocked my fridge is determines whether or not i'll
    have the means to make certain dinners.
*/

// global variables
let fridgeStatus;
let isFridgeEmpty;
let daysSinceRestock = 0;

// showOnPage method
const showOnPage = function (text) {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById('output');
  outputDiv.append(newParagraph);
};

/* |    MAIN METHOD
        first determines fridgeStatus and isFridgeEmpty using the daysSinceRestock variable
        fridgeStatus = fullyStocked || partiallyStocked || null
        isFridgeEmpty = true || false


*/
const main = function (daysSinceRestock) {
  showOnPage(
    `- - - - - - - - - - - - DAYS SINCE RESTOCK = ${daysSinceRestock} - - - - - - - - - - - -`
  );
  showOnPage(
    'VARIABLES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
  );

  /* |  PART ONE - determining fridgeStatus & isFridgeEmpty
        based off of how many days have gone by since fridge was last restocked,
        fridgeStatus will be changed to reflect that. if more than 5 days have
        gone by since the fridge has been restocked, it'll be considered empty.
 */
  if (daysSinceRestock < 3) {
    fridgeStatus = 'fullyStocked';
    isFridgeEmpty = false;
  } else if (daysSinceRestock >= 3 && daysSinceRestock <= 5) {
    fridgeStatus = 'partiallyStocked';
    isFridgeEmpty = false;
  } else {
    fridgeStatus = null;
    isFridgeEmpty = true;
  }
  showOnPage(`fridgeStatus = ${fridgeStatus}`);
  showOnPage(`isFridgeEmpty = ${isFridgeEmpty}`);
  showOnPage(
    'OUTPUT - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
  );

  /* |  PART TWO - Printing output based off of fridgeStatus/isFridgeEmpty
        starting by checking if isFridgeEmpty is true. if it is, prints a message saying to
        get more food
        otherwise,
        fullyStocked means that I have all the ingredients I need
        partiallyStocked means that I have some ingredients, enough to do a simpler main dish
  */
  // options text
  let allChickenOptions =
    'You have the ingredients to make enchiladas or baked chicken.';
  let someChickenOptions = 'You have the ingredients to make baked chicken.';
  let allBeefOptions =
    'You have the ingredients to make beef tacos or spagetthi.';
  let someBeefOptions = 'You have the ingredients to make spagetthi.';
  let allPorkOptions = 'You have the ingredients to make pork chops.';
  let noMainDishes =
    "You don't have the ingredients to make any main dishes! Time for left overs, to eat out, or to go to the grocery store!";

  // actually deciding it
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

/* Executes main method, changing fridge status value each time.

*/

main(2);
main(3);
main(4);
main(5);
main(6);
