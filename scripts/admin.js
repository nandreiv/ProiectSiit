
// Initialize sidenav in mobile view
const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {});

// Get the product list from the database
function getProduse() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      produse = JSON.parse(this.responseText);
      drawCards();
    }
  };
  xhttp.open("GET", `https://shop-lounge.firebaseio.com/.json`, true)
  xhttp.send();
}

// Display the products from the database
function drawCards() {

  let str = "";

  for (var i in produse) {

   str+=`<tr>
        <td><img src='${produse[i].imagine}'></td>
        <td><a onclick="modifyProduct('${i}');">${produse[i].nume}<a></td>
        <td>${produse[i].pret}</td>
        <td>${produse[i].cantitate}</td>
        <td><button class="btn red lighten-2" onclick="deleteProduct('${i}');">Remove</button></td>
       </tr>`

  }
  document.querySelector("table tbody").innerHTML = str;
}

function showAddProduct(){
  document.querySelector('#adminList').style.visibility = "hidden";
  document.querySelector('#addProduct').style.visibility = "visible";
}

var indexEditare = -1;

function addProduct(t, event) {

  event.preventDefault();

  var imagine = document.querySelector('#prodImagine');
  var nume = document.querySelector('#prodNume');
  var pret = document.querySelector('#prodPret');
  var cantitate = document.querySelector('#prodCantitate');
  var descriere = document.querySelector('#prodDescriere');

  var prod = {};
  var inputs = t.querySelectorAll("input[name]");

  for (var i = 0; i < inputs.length; i++) {
    var a = inputs[i].getAttribute("name");
    var v = inputs[i].value;
    prod[a] = v;
  }

  if (indexEditare === -1) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        getProduse();
      }
    };
    xhttp.open("POST", "https://shop-lounge.firebaseio.com/.json", true);
    xhttp.send(JSON.stringify(prod));
  }
  else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        getProduse();
      }
    };
    xhttp.open("PUT", `https://shop-lounge.firebaseio.com/${indexEditare}.json`, true);
    xhttp.send(JSON.stringify(prod));
    indexEditare = -1;
  }

  drawCards();
  t.reset();
  document.querySelector('#adminList').style.visibility = "visible";
  document.querySelector('#addProduct').style.visibility = "hidden";
}

function deleteProduct(idx) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        //cand s-a finalizat cu succes requestul, apelez getPersoane pentru a prelua din nou de pe server lista de persoane
        //dupa ce se preia, se apeleaza iar deseneaza tabel ca sa imi actualizeze interfata
        getProduse();
      }
    };
    xhttp.open("DELETE", `https://shop-lounge.firebaseio.com/${idx}.json`, true);
    xhttp.send();
}

function modifyProduct(idx) {

  document.querySelector('#adminList').style.visibility = "hidden";
  document.querySelector('#addProduct').style.visibility = "visible";

  var product = produse[idx];
  var inputs = document.querySelectorAll("#productForm input[name]");

  for (var i = 0; i < inputs.length; i++) {
    var a = inputs[i].getAttribute("name");
    inputs[i].value = product[a];
  }

  indexEditare = idx;
}
