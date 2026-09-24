document.addEventListener("DOMContentLoaded", function () {

  let selectedService = "";
  let selectedPriority = "";

  const serviceOptions = document.querySelectorAll(".request-option");
  const priorityOptions = document.querySelectorAll(".priority-card");
  const requestButton = document.getElementById("requestServiceButton");

  // SERVICE SELECTION
  serviceOptions.forEach(function (option) {

    option.addEventListener("click", function () {

      // Remove previous selection
      serviceOptions.forEach(function (item) {
        item.classList.remove("selected");
      });

      // Select clicked service
      option.classList.add("selected");

      selectedService = option.querySelector("strong").textContent.trim();

    });

  });


  // PRIORITY SELECTION
  priorityOptions.forEach(function (option) {

    option.addEventListener("click", function () {

      // Remove previous selection
      priorityOptions.forEach(function (item) {
        item.classList.remove("selected");
      });

      // Select clicked priority
      option.classList.add("selected");

      selectedPriority = option.querySelector("strong").textContent.trim();

    });

  });


  // WHATSAPP REQUEST
  requestButton.addEventListener("click", function (event) {

    if (!selectedService || !selectedPriority) {

      event.preventDefault();

      alert("Please choose a service and service priority first.");

      return;
    }

    const message =
      "Hello LabKeep, I would like to request equipment care service.%0A%0A" +
      "Service: " + encodeURIComponent(selectedService) + "%0A" +
      "Priority: " + encodeURIComponent(selectedPriority);

    requestButton.href =
      "https://wa.me/2347078986387?text=" + message;

  });

});
