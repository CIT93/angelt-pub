const resetForm = () => {
  topsDropDown.value = 'default';
  topsQtyInput.value = 0;
  bottomsDropDown.value = 'default';
  bottomsQtyInput.value = 0;
};

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
