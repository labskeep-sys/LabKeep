// ========================================
// LABKEEP SEARCH SYSTEM
// Products + Suppliers + Engineers
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  // ========================================
  // HOMEPAGE SEARCH
  // ========================================

  if (searchInput && searchButton) {

    searchButton.addEventListener("click", function () {

      const searchTerm = searchInput.value.trim();

      const categoryDropdown =
        document.querySelector(".category-dropdown");

      const category = categoryDropdown
        ? categoryDropdown.value
        : "All Categories";

      if (!searchTerm) {
        searchInput.focus();
        return;
      }

      const url =
        "search-results.html?q=" +
        encodeURIComponent(searchTerm) +
        "&category=" +
        encodeURIComponent(category);

      window.location.href = url;
    });


    // Press Enter to search
    searchInput.addEventListener("keydown", function (event) {

      if (event.key === "Enter") {
        searchButton.click();
      }

    });

  }


  // ========================================
  // SEARCH RESULTS PAGE
  // ========================================

  if (window.location.pathname.includes("search-results.html")) {

    runSearch();

  }

});


// ========================================
// RUN SEARCH
// ========================================

async function runSearch() {

  const params = new URLSearchParams(window.location.search);

  const searchTerm =
    (params.get("q") || "").trim().toLowerCase();

  const selectedCategory =
    params.get("category") || "All Categories";


  const summary =
    document.getElementById("search-summary");

  const productsContainer =
    document.getElementById("products-results");

  const suppliersContainer =
    document.getElementById("suppliers-results");

  const engineersContainer =
    document.getElementById("engineers-results");

  const productsSection =
    document.getElementById("products-results-section");

  const suppliersSection =
    document.getElementById("suppliers-results-section");

  const engineersSection =
    document.getElementById("engineers-results-section");

  const noResults =
    document.getElementById("no-results");


  // ----------------------------------------
  // Display search information
  // ----------------------------------------

  if (summary) {

    summary.textContent =
      'Showing results for "' +
      searchTerm +
      '"';

    if (selectedCategory !== "All Categories") {

      summary.textContent +=
        " in " + selectedCategory;

    }

  }


  // ----------------------------------------
  // Pages containing searchable information
  // ----------------------------------------

  const sources = [

    // PRODUCTS
    {
      url: "./labkeep-supplies.html",
      type: "product",
      category: "All Categories"
    },

    {
      url: "./reagents-kits.html",
      type: "product",
      category: "Reagents & Test Kits"
    },

    {
      url: "./consumables.html",
      type: "product",
      category: "Consumables"
    },

    {
      url: "./equipment.html",
      type: "product",
      category: "Laboratory Equipment"
    },


    // SUPPLIERS
    {
      url: "./labkeep-suppliers.html",
      type: "supplier",
      category: "All Categories"
    },


    // ENGINEERS
    {
      url: "./labkeep-engineers.html",
      type: "engineer",
      category: "Maintenance & Support"
    }

  ];


  let productResults = [];
  let supplierResults = [];
  let engineerResults = [];


  // ========================================
  // READ EACH EXISTING LABKEEP PAGE
  // ========================================

  for (const source of sources) {

    // Category filtering
    if (
      selectedCategory !== "All Categories" &&
      source.category !== selectedCategory &&
      source.type !== "supplier" &&
      source.type !== "engineer"
    ) {
      continue;
    }


    try {

      const response =
        await fetch(source.url);

      if (!response.ok) {
        continue;
      }


      const html =
        await response.text();


      const parser =
        new DOMParser();


      const documentPage =
        parser.parseFromString(html, "text/html");


      const cards =
        documentPage.querySelectorAll(".product-card");


      cards.forEach(function (card) {

        const cardText =
          card.textContent.toLowerCase();


        // ----------------------------------
        // Check whether card matches search
        // ----------------------------------

        if (
          searchTerm &&
          !cardText.includes(searchTerm)
        ) {
          return;
        }


        // ----------------------------------
        // Remove GrapesJS IDs
        // ----------------------------------

        const clonedCard =
          card.cloneNode(true);


        clonedCard.removeAttribute("id");


        clonedCard
          .querySelectorAll("[id]")
          .forEach(function (element) {

            element.removeAttribute("id");

          });


        // ----------------------------------
        // Store result
        // ----------------------------------

        if (source.type === "product") {

          productResults.push({
            card: clonedCard,
            category: source.category
          });

        }


        if (source.type === "supplier") {

          supplierResults.push({
            card: clonedCard
          });

        }


        if (source.type === "engineer") {

          engineerResults.push({
            card: clonedCard
          });

        }

      });


    } catch (error) {

      console.error(
        "Could not search:",
        source.url,
        error
      );

    }

  }


  // ========================================
  // DISPLAY PRODUCTS
  // ========================================

  if (productResults.length > 0) {

    productsSection.style.display = "block";


    productResults.forEach(function (result) {

      productsContainer.appendChild(result.card);

    });

  } else {

    productsSection.style.display = "none";

  }


  // ========================================
  // DISPLAY SUPPLIERS
  // ========================================

  if (supplierResults.length > 0) {

    suppliersSection.style.display = "block";


    supplierResults.forEach(function (result) {

      suppliersContainer.appendChild(result.card);

    });

  } else {

    suppliersSection.style.display = "none";

  }


  // ========================================
  // DISPLAY ENGINEERS
  // ========================================

  if (engineerResults.length > 0) {

    engineersSection.style.display = "block";


    engineerResults.forEach(function (result) {

      engineersContainer.appendChild(result.card);

    });

  } else {

    engineersSection.style.display = "none";

  }


  // ========================================
  // NO RESULTS
  // ========================================

  const totalResults =
    productResults.length +
    supplierResults.length +
    engineerResults.length;


  if (totalResults === 0) {

    noResults.style.display = "block";

  } else {

    noResults.style.display = "none";

  }

}
