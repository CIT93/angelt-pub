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

// purchase class
class Purchases {
  constructor(purchaseItems = [], purchaseTotal) {
    this.purchaseItems = purchaseItems;
    this.purchaseTotal = purchaseTotal;
  }
  updatePurchaseTotal() {
    let newTotal = 0;
    this.purchaseItems.forEach((item) => {
      newTotal += item.itemCost * item.quantity;
    });
    this.purchaseTotal = newTotal.toFixed(2);
  }

  validatePurchase() {
    const selectedTop = topsDropDown.value;
    const selectedTopQty = topsQtyInput.value;
    let top = {};

    const selectedBottom = bottomsDropDown.value;
    const selectedBottomQty = bottomsQtyInput.value;
    let bottom = {};

    // if all information is entered correctly, adds orders to array
    if (
      selectedBottom !== 'default' &&
      selectedBottomQty > 0 &&
      selectedTop !== 'default' &&
      selectedTopQty > 0
    ) {
      // using object.assign since otherwise, it will override the tops & bottoms array when assigning a qty
      bottom = Object.assign(
        {},
        bottoms.find((item) => {
          return item.itemName === selectedBottom;
        })
      );

      top = Object.assign(
        {},
        tops.find((item) => {
          return item.itemName === selectedTop;
        })
      );

      top.quantity = selectedTopQty;
      this.purchaseItems.push(top);
      topsError.style.display = 'none';

      bottom.quantity = selectedBottomQty;
      this.purchaseItems.push(bottom);
      bottomsError.style.display = 'none';
    } else {
      // if order form is not filled out correctly, checks which one is incorrect and displays a mssg.
      if (selectedBottom === 'default' || selectedBottomQty < 1) {
        bottomsError.style.display = 'block';
      } else {
        bottomsError.style.display = 'none';
      }

      if (selectedTop === 'default' || selectedTopQty < 1) {
        topsError.style.display = 'block';
      } else {
        topsError.style.display = 'none';
      }
    }
  }

  getPurchasedItems() {
    if (this.purchaseItems.length > 0) {
      return `You have bought ${
        this.purchaseItems.slice(-1)[0].itemStatement
      } and ${this.purchaseItems.slice(-2)[0].itemStatement}`;
    } else {
      return 'nothing has been purchased';
    }
  }
}

const updatePurchaseStatementContainer = (purchases) => {
  let pTotal = 0;
  purchases.purchaseItems.forEach((item) => {
    pTotal += parseInt(item.quantity);
  });
  purchaseStatementContainer.innerHTML = `You have purchased ${pTotal} items for a total cost of $${purchases.purchaseTotal}`;
};

const renderOutput = (purchases) => {
  output.innerHTML = '';
  purchases.purchaseItems.forEach((item) => {
    let p = document.createElement('li');
    p.textContent = `You purchased ${item.quantity} ${
      item.itemStatement
    } for $${(item.quantity * item.itemCost).toFixed(2)}`;
    output.appendChild(p);
  });
};

const toggleHistoryBttn = (e) => {
  const classList = e.target.classList;
  if (classList.contains('view')) {
    classList.replace('view', 'hide');
    e.target.innerHTML = 'View Purchase History';
    output.style.display = 'none';
  } else if (classList.contains('hide')) {
    classList.replace('hide', 'view');
    e.target.innerHTML = 'Hide Purchase History';
    output.style.display = 'block';
    renderOutput(purchases);
  }
};

let purchases = new Purchases([], 0);

document.querySelector('.purchase').addEventListener('click', (e) => {
  purchases.validatePurchase();
  purchases.updatePurchaseTotal();
  updatePurchaseStatementContainer(purchases);
  renderOutput(purchases);
});

document
  .querySelector('#view-purchase-history')
  .addEventListener('click', (e) => {
    toggleHistoryBttn(e);
  });
