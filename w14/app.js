'use strict';

// grabbing & defining objects on the DOM
const output = document.querySelector('.output');
const purchaseStatementContainer = document.querySelector(
  '.purchase-statement-container'
);

// items that the user can purchase
const tops = [
  {
    itemStatement: 'a T-Shirt',
    itemCost: 12.99,
  },
  {
    itemStatement: 'a Blouse',
    itemCost: 24.49,
  },
  {
    itemStatement: 'a Hoodie',
    itemCost: 49.99,
  },
  {
    itemStatement: 'a Tank Top',
    itemCost: 8.69,
  },
];

const bottoms = [
  {
    itemStatement: 'a pair of Leggings',
    itemCost: 9.99,
  },
  {
    itemStatement: 'a Skirt',
    itemCost: 14.29,
  },
  {
    itemStatement: 'a pair of Jeans',
    itemCost: 29.95,
  },
  {
    itemStatement: 'a pair of Shorts',
    itemCost: 19.99,
  },
];

// purchases object
const Purchases = function (purchaseItems = [], purchaseTotal) {
  this.purchaseItems = purchaseItems;
  this.purchaseTotal = purchaseTotal;
};

let purchases = new Purchases([], 0);

Purchases.prototype.updatePurchaseTotal = function (item) {
  this.purchaseTotal += item.itemCost;
};
// generates an random number that will be used as the index
const randomItem = () => {
  let total = Math.floor(Math.random() * 4);
  console.log(total);
  return total;
};
// prints statement telling the user what they just purchased
const newPurchaseStatement = (item) => {
  purchases.purchaseItems.push(item);

  const p = document.createElement('p');
  p.textContent = `You have purchased ${
    item.itemStatement
  } for $${item.itemCost.toFixed(2)}`;
  output.appendChild(p);

  purchases.updatePurchaseTotal(item);
};
// prints statement telling the user how many items they've purchased and the total cost
const totalPurchaseStatement = () => {
  purchaseStatementContainer.innerHTML = '';

  const p = document.createElement('p');
  p.textContent = `You have purchased ${
    purchases.purchaseItems.length
  } item(s) for a total cost of $${purchases.purchaseTotal.toFixed(2)}`;
  purchaseStatementContainer.appendChild(p);
};

document.querySelector('.purchase').addEventListener('click', (e) => {
  let item = items[randomItem()];
  newPurchaseStatement(item);
  totalPurchaseStatement();
});
