document.addEventListener("DOMContentLoaded", function () {

  const locationLinks = document.querySelectorAll(".navbar-menu-nav a");
  const productCards = document.querySelectorAll(".product-card");

  locationLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {
      event.preventDefault();

      const selectedLocation = link.textContent.trim().toLowerCase();

      productCards.forEach(function (card) {

        const locationElement = card.querySelector(".location");

        if (!locationElement) {
          card.style.display = "none";
          return;
        }

        const productLocation = locationElement.textContent
          .replace("⌖", "")
          .trim()
          .toLowerCase();

        const productCity = productLocation.split(",")[0].trim();

        if (productCity === selectedLocation) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }

      });

    });

  });

});
