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

      window.location.href =
        "./search-results.html?q=" +
        encodeURIComponent(searchTerm) +
        "&category=" +
        encodeURIComponent(category);
    });


    searchInput.addEventListener("keydown", function (event) {

      if (event.key === "Enter") {
        searchButton.click();
      }

    });

  }


  // ========================================
  // SEARCH RESULTS PAGE
  // ========================================

  if (
    window.location.pathname.endsWith("search-results.html")
  ) {
    runSearch();
  }

});


// ========================================
// RUN SEARCH
// ========================================

async function runSearch() {

  const params =
    new URLSearchParams(window.location.search);

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


  // ========================================
  // SHOW WHAT WAS SEARCHED
  // ========================================

  if (summary) {

    summary.textContent =
      'Searching for "' + searchTerm + '"';

    if (selectedCategory !== "All Categories") {

      summary.textContent +=
        " in " + selectedCategory;

    }

  }


  // ========================================
  // PAGES TO SEARCH
  // ========================================

  const sources = [

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

    {
      url: "./labkeep-suppliers.html",
      type: "supplier",
      category: "All Categories"
    },

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
  // SEARCH EACH PAGE
  // ========================================

  for (const source of sources) {

    // Skip product pages that don't match
    // the selected category.

    if (
      source.type === "product" &&
      selectedCategory !== "All Categories" &&
      source.category !== selectedCategory
    ) {
      continue;
    }


    try {

      const pageURL =
        new URL(source.url, window.location.href).href;


      const response =
        await fetch(pageURL, {
          cache: "no-store"
        });


      if (!response.ok) {

        console.error(
          "LabKeep search could not load:",
          pageURL,
          response.status
        );

        continue;
      }


      const html =
        await response.text();


      const parser =
        new DOMParser();


      const page =
        parser.parseFromString(
          html,
          "text/html"
        );


      const cards =
        page.querySelectorAll(".product-card");


      console.log(
        "LabKeep search:",
        source.url,
        "Cards found:",
        cards.length
      );


      cards.forEach(function (card) {

        const cardText =
          card.textContent
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();


        // If the search term isn't found,
        // ignore this card.

        if (
          searchTerm &&
          !cardText.includes(searchTerm)
        ) {
          return;
        }


        // Copy the existing LabKeep card.

        const resultCard =
          card.cloneNode(true);


        // Remove GrapesJS IDs so that
        // duplicate IDs don't appear
        // on the results page.

        resultCard.removeAttribute("id");


        resultCard
          .querySelectorAll("[id]")
          .forEach(function (element) {

            element.removeAttribute("id");

          });


        // ----------------------------------
        // PRODUCTS
        // ----------------------------------

        if (source.type === "product") {

          productResults.push(resultCard);

        }


        // ----------------------------------
        // SUPPLIERS
        // ----------------------------------

        if (source.type === "supplier") {

          supplierResults.push(resultCard);

        }


        // ----------------------------------
        // ENGINEERS
        // ----------------------------------

        if (source.type === "engineer") {

          engineerResults.push(resultCard);

        }

      });


    } catch (error) {

      console.error(
        "LabKeep search error:",
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

    productResults.forEach(function (card) {

      productsContainer.appendChild(card);

    });

  } else {

    productsSection.style.display = "none";

  }


  // ========================================
  // DISPLAY SUPPLIERS
  // ========================================

  if (supplierResults.length > 0) {

    suppliersSection.style.display = "block";

    supplierResults.forEach(function (card) {

      suppliersContainer.appendChild(card);

    });

  } else {

    suppliersSection.style.display = "none";

  }


  // ========================================
  // DISPLAY ENGINEERS
  // ========================================

  if (engineerResults.length > 0) {

    engineersSection.style.display = "block";

    engineerResults.forEach(function (card) {

      engineersContainer.appendChild(card);

    });

  } else {

    engineersSection.style.display = "none";

  }


  // ========================================
  // TOTAL RESULTS
  // ========================================

  const totalResults =
    productResults.length +
    supplierResults.length +
    engineerResults.length;


  if (totalResults === 0) {

    noResults.style.display = "block";

    if (summary) {

      summary.textContent =
        'No results found for "' +
        searchTerm +
        '"';

    }

  } else {

    noResults.style.display = "none";

    if (summary) {

      summary.textContent =
        totalResults +
        ' result' +
        (totalResults === 1 ? "" : "s") +
        ' found for "' +
        searchTerm +
        '"';

    }

  }

}
