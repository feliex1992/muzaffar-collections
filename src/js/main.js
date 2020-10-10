document.addEventListener("DOMContentLoaded", function () {
  // Initialize Home Page
  function initHomePage () {
    var slider = document.querySelectorAll(".slider");
    M.Slider.init(slider, {
      indicators: false
    });

    var paralax = document.querySelectorAll(".parallax");
    M.Parallax.init(paralax);
  }

  // Initialize about page
  function initAboutPage () {
    var paralax = document.querySelectorAll(".parallax");
    M.Parallax.init(paralax);
  }

  // Initialize product page
  function initProductPage () {
    var paralax = document.querySelectorAll(".parallax");
    M.Parallax.init(paralax);
  }

  // Initialize contact page
  function initContactPage () {
    var paralax = document.querySelectorAll(".parallax");
    M.Parallax.init(paralax);
  }

  // Activate sidebar nav
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });
        var sideNav = document.querySelector(".sidenav");
        sideNav.innerHTML = `<li><div class="user-view">
          <div class="background">
            <img src="src/images/icons/back-sidenav.jpg">
          </div>
          <a href="#user"><img class="circle" src="src/images/icons/Logo-MC21.png"></a>
          <a href="#name"><span class="black-text name">Muzaffar Creative 21</span></a>
          <a href="#email"><span class="black-text email">jafar.pahrudin@gmail.com</span></a>
        </div></li>
        ${sideNav.innerHTML}`;

        // Daftarkan event listener untuk setiap tautan menu
        document.querySelector(".brand-logo").addEventListener("click", function (event) {
          page = event.target.getAttribute("href").substr(1);
          loadPage(page);
        });

        document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
          elm.addEventListener("click", function (event) {
            // Tutup sidenav
            var sidenav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenav).close();

            // Muat konten halaman yang dipanggil
            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          });
        });
      }
    };
    xhttp.open("GET", "src/nav.html", true);
    xhttp.send();
  }

  // Load page content
  var page = window.location.hash.substr(1);
  if (page === "") page = "home";
  loadPage(page);

  function loadPage (page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        var content = document.querySelector("#body-content");
        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;

          switch (page) {
            case "home":
              initHomePage();
              break;
            case "about":
              initAboutPage();
              break;
            case "product":
              initProductPage();
              break;
            case "contact":
              initContactPage();
              break;
          }
        } else if (this.status === 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", "src/pages/" + page + ".html", true);
    xhttp.send();
  }
});
