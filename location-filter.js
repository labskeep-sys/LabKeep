document.addEventListener("DOMContentLoaded", function () {

  const locationLinks = document.querySelectorAll(".navbar-menu-nav a");
  const productCards = document.querySelectorAll(".product-card");

  locationLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {
      event.preventDefault();

      const selectedLocation = link.textContent.trim();

      productCards.forEach(function (card) {

        const locationElement = card.querySelector(".location");

        if (!locationElement) return;

        const productLocation = locationElement.textContent
          .trim()
          .toLowerCase();

        if (
          selectedLocation.toLowerCase() ===
          productLocation.replace("⌖", "").replace("🇳🇬", "").trim().split(",")[0]
        ) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }

      });

    });

  });

});
