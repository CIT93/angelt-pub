'use strict';

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
