var instance = M.Carousel.init({
  fullWidth: true
});

const sideNav = document.querySelector('.sidenav');
M.Sidenav.init(sideNav, {});

const slider = document.querySelector('.slider');
M.Slider.init(slider, {
  indicators: true,
  height: 500,
  transition: 500,
  interval: 5000
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.scrollspy');
  var instances = M.ScrollSpy.init(elems);
});

var produse = [];

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

function drawCards() {

  for (var i in produse) {

    document.querySelector("#productList").insertAdjacentHTML(
      'afterbegin',
      `<div class="col xs12 s6 m4 l3">
        <div class="card small">
          <div class="card-image">
            <img src="${produse[i].imagine}" class="cardImg">
          </div>
          <div class="card-content">
            <p>${produse[i].nume}</p>
          </div>
          <div class="card-action">
            <p>${produse[i].pret} <i class="fas fa-euro-sign"></i></p>
            <button class="btn btn-flat" onclick="window.location='detalii.html?id=${i}'">Detalii</button>
            <!--<a class="btn-floating halfway-fab waves-effect waves-light light-blue darken-3"><i class="material-icons">add_shopping_cart</i></a>-->
          </div>
        </div>
      </div>`
    )
  }
}
