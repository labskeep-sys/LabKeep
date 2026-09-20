// ========================================
// LABKEEP SEARCH
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  // ----------------------------------------
  // HOMEPAGE SEARCH
  // ----------------------------------------

  if (searchInput && searchButton) {

    searchButton.addEventListener("click", function () {

      const searchTerm = searchInput.value.trim();

      const categoryDropdown =
        document.querySelector(".category-dropdown");

      const category = categoryDropdown
        ? categoryDropdown.value
        : "All Categories";

      // Don't search an empty box
      if (!searchTerm) {
        searchInput.focus();
        return;
      }

      // Send the search to the results page
      const url =
        "search-results.html?q=" +
        encodeURIComponent(searchTerm) +
        "&category=" +
        encodeURIComponent(category);

      window.location.href = url;
    });


    // Allow pressing Enter to search
    searchInput.addEventListener("keydown", function (event) {

      if (event.key === "Enter") {
        searchButton.click();
      }

    });

  }

});
