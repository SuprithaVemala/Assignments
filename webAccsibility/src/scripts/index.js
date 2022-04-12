
const addPageContent = (type) => {
  fetch(`./views/_${type}.html`)
    .then(function (response) {
      return response.text();
    })
    .then(function (info) {
      if (type == "header") {
        document.getElementById("headerDiv").innerHTML = info;
        document.getElementById("home").addEventListener("click", () => {
          window.location.href = "./index.html";
        });

        document.getElementById("about").addEventListener("click", () => {
          window.location.replace("./about.html");
        });

        document.getElementById("contact").addEventListener("click", () => {
          window.location.replace("./contact.html");
        });
      } else document.getElementById("footerDiv").innerHTML = info;
    });
};

window.addEventListener("DOMContentLoaded", () => {
  addPageContent("header");
  addPageContent("footer");
});

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if(event.target.matches(".dropbtn") ||event.target.matches(".fa-bars")){
    document.getElementById("myDropdown").classList.toggle("show");
  }
  if (!event.target.matches(".dropbtn") && !event.target.matches(".fa-bars")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
