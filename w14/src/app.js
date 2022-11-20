'use strict';

// grabbing & defining objects on the DOM
const output = document.querySelector('.output');
const purchaseStatementContainer = document.querySelector(
  '.purchase-statement-container'
);
const topsDropDown = document.querySelector('#tops-drop-down');
const topsQtyInput = document.querySelector('#tops-quantity');
const topsError = document.querySelector('#tops-error');
const bottomsDropDown = document.querySelector('#bottoms-drop-down');
const bottomsQtyInput = document.querySelector('#bottoms-quantity');
const bottomsError = document.querySelector('#bottoms-error');

// items that the user can purchase
const tops = [
  {
    itemName: 'shirt',
    itemStatement: 'T-Shirt(s)',
    itemCost: 12.99,
    quantity: 1,
  },
  {
    itemName: 'blouse',
    itemStatement: 'Blouse(s)',
    itemCost: 24.49,
    quantity: 1,
  },
  {
    itemName: 'hoodie',
    itemStatement: 'Hoodie(s)',
    itemCost: 49.99,
    quantity: 1,
  },
  {
    itemName: 'tank',
    itemStatement: 'Tank Top(s)',
    itemCost: 8.69,
    quantity: 1,
  },
];

const bottoms = [
  {
    itemName: 'leggings',
    itemStatement: 'pair(s) of Leggings',
    itemCost: 9.99,
    quantity: 1,
  },
  {
    itemName: 'skirt',
    itemStatement: 'Skirt(s)',
    itemCost: 14.29,
    quantity: 1,
  },
  {
    itemName: 'jeans',
    itemStatement: 'pair(s) of Jeans',
    itemCost: 29.95,
    quantity: 1,
  },
  {
    itemName: 'shorts',
    itemStatement: 'pair(s) of Shorts',
    itemCost: 19.99,
    quantity: 1,
  },
];

let purchases = new Purchases([], 0);

document.querySelector('.purchase').addEventListener('click', (e) => {
  purchases.validatePurchase();
  purchases.updatePurchaseTotal();
  updatePurchaseStatementContainer(purchases);
  resetForm();
  renderOutput(purchases);
});

document
  .querySelector('#view-purchase-history')
  .addEventListener('click', (e) => {
    toggleHistoryBttn(e);
  });
