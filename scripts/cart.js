const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {});

// Display shopping Cart
function displayCart() {

  // Create an empty container to populate with items in the localStorage cart
  let str = "";
  let total = 0;
  let summary = "";
  // For every item in the localStorage...
  for (i in localStorage) {
    // If the item represents a cart item (Regex)...
    if (/^cart/.test(i)) {
      // Create an array of items containing Key-Values...
      let item = [JSON.parse(localStorage.getItem(i))];

      // For every item, get the values...
      let itemName = item[0].nume;
      let itemPrice = item[0].pret;
      let itemQty = item[0].cantitate;
      let cartItem = i;
      total += itemQty*itemPrice;
      console.log(cartItem);

      // Empty the table to update it later with the new cart
      document.querySelector('table tbody').innerHTML = "";

      // Populate container with each item values...
      str += `<tr>
                  <td>${itemName}</td>
                  <td>${itemPrice}</td>
                  <td><button class="btn-flat decrease">-</button>${itemQty}<button class="btn-flat increase">+</button></td>
                  <td>${itemQty*itemPrice}</td>
                  <td><button class="btn-flat red lighten-3" id='${cartItem}'>Remove</button></td>
                </tr>`
    }
  }
  // Display the items in the table with values from localStorage cart...
  document.querySelector('table tbody').innerHTML = str;

  let count = document.getElementById('itemsTable').rows.length-1;

  summary = ` <p>Produse: ${count}</p>
              <p>TVA: 0%</p>
              <p>Transport: 0  <i class="tiny material-icons">euro_symbol</i></p>
              <h5>TOTAL: ${total} <i class="tiny material-icons">euro_symbol</i></h5>
              <hr>
              <button class="btn">Buy</button>`

  document.querySelector('#cartSummary').innerHTML = summary;

};

// Remove selected item from localStorage cart...
function addEvents() {
  // Add all buttons with "btn-flat" in an array...
  var buttonArray = document.getElementsByClassName('btn-flat');
  var buttonDecreaseArray = document.getElementsByClassName('decrease');
  var buttonIncreaseArray = document.getElementsByClassName('increase');

  // -------------------------------------------------------------------------
  // Remove - For each button in the array...
  for (i = 0; i < buttonArray.length; i++) {

    // Listen for a click event and call the remove function...
    if (document.addEventListener) {
      buttonArray[i].addEventListener("click", removeItem);
    } else if (document.attachEvent) {
      buttonArray[i].attachEvent("onclick", removeItem);
    }

    // Remove item from localStorage cart...
    function removeItem(e) {
      // Store the id of the button (same as id in localStorage) in a variable
      let myItem = e.target.id;

      // Remove selected item (based on key name) from localStorage
      localStorage.removeItem(`${myItem}`);
      // Refresh page to properly update the shopping cart table
      location.reload();
    }
  }
  // -------------------------------------------------------------------------
  // Decrease quantityDiv
  for (i = 0; i < buttonDecreaseArray.length; i++) {

    // Listen for a click event and call the remove function...
    if (document.addEventListener) {
      buttonDecreaseArray[i].addEventListener("click", decreaseQty);
    } else if (document.attachEvent) {
      buttonDecreaseArray[i].attachEvent("onclick", decreaseQty);
    }

    // Decrease quantity for the selected item from localStorage cart...
    function decreaseQty(e) {

      let myItem = e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.id;
      let cartQty = JSON.parse(localStorage.getItem(myItem)).cantitate;
      let obj = JSON.parse(localStorage.getItem(myItem)).cantitate-1;

      let itemName = JSON.parse(localStorage.getItem(myItem)).nume;
      let itemPrice = JSON.parse(localStorage.getItem(myItem)).pret;
      let itemQty = obj;

      let decQty = {
        "nume":itemName,
        "pret":itemPrice,
        "cantitate":itemQty
      };

      localStorage.setItem(`${myItem}`, JSON.stringify(decQty));
      // Refresh page to properly update the shopping cart table
      location.reload();
    }
  }
  // -------------------------------------------------------------------------
  // Increase quantityDiv
  for (i = 0; i < buttonIncreaseArray.length; i++) {

    // Listen for a click event and call the remove function...
    if (document.addEventListener) {
      buttonIncreaseArray[i].addEventListener("click", increaseQty);
    } else if (document.attachEvent) {
      buttonIncreaseArray[i].attachEvent("onclick", increaseQty);
    }

    // Decrease quantity for the selected item from localStorage cart...
    function increaseQty(e) {
      let obj = 0;

      let myItem = e.target.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.id;
      let cartQty = Number(JSON.parse(localStorage.getItem(myItem)).cantitate);
      obj = cartQty+1;

      let itemName = JSON.parse(localStorage.getItem(myItem)).nume;
      let itemPrice = JSON.parse(localStorage.getItem(myItem)).pret;
      let itemQty = obj;

      let incQty = {
        "nume":itemName,
        "pret":itemPrice,
        "cantitate":itemQty
      };

      localStorage.setItem(`${myItem}`, JSON.stringify(incQty));
      // Refresh page to properly update the shopping cart table
      location.reload();
    }
  }
}
