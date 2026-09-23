document.addEventListener("DOMContentLoaded", function () {

  /* ==============================
     CART ICON
  ============================== */

  const cartButton = document.getElementById("cartButton");
  let cartCount = document.getElementById("cartCount");

  if (cartButton && !cartCount) {
    cartCount = document.createElement("span");
    cartCount.id = "cartCount";
    cartCount.textContent = "0";
    cartButton.appendChild(cartCount);
  }

  function updateCartNumber() {
    const cart =
      JSON.parse(localStorage.getItem("labkeepCart")) || [];

    const totalItems = cart.reduce(function (total, item) {
      return total + item.quantity;
    }, 0);

    if (cartCount) {
      cartCount.textContent = totalItems;
    }
  }

  if (cartButton) {
    cartButton.addEventListener("click", function () {
      window.location.href = "cart.html";
    });
  }


  /* ==============================
     ADD TO CART
  ============================== */

 const requestLinks =
  document.querySelectorAll(".Request, .add-to-cart-button");

  requestLinks.forEach(function (link) {

    link.textContent = "Add to Cart";

    link.addEventListener("click", function (event) {

      event.preventDefault();

      const productCard =
        link.closest(".product-card");

      if (!productCard) return;

      const productName =
  productCard.querySelector("h3, .product-name")
    ?.textContent.replace(/\s+/g, " ").trim() || "";

const supplierElement =
  productCard.querySelector(".supplier, .supplier-name");

const supplier =
  supplierElement
    ?.textContent.replace(/\s+/g, " ").trim()
    .replace(/^Supplier:\s*/i, "")
    .split("★★★★")[0]
    .trim() || "";

const priceElement =
  productCard.querySelector(".product-price, .price");

const priceText =
  priceElement
    ?.textContent.replace(/\s+/g, " ").trim() || "";

const locationMatch =
  productCard.textContent.match(
    /Location:\s*([^]+?)(?=\s*(?:Add to Cart|Request|$))/i
  );

const location =
  locationMatch
    ? locationMatch[1].trim()
    : "";

      let cart =
        JSON.parse(
          localStorage.getItem("labkeepCart")
        ) || [];

      const existingProduct =
        cart.find(function (item) {
          return item.name === productName;
        });

      if (existingProduct) {

        existingProduct.quantity += 1;

      } else {

        cart.push({
          name: productName,
          supplier: supplier,
          price: priceNumber,
          priceDisplay: priceText,
          location: location,
          quantity: 1
        });

      }

      localStorage.setItem(
        "labkeepCart",
        JSON.stringify(cart)
      );

      updateCartNumber();

      showCartConfirmation(productName);

    });

  });


  /* ==============================
     CART POPUP
  ============================== */

  function showCartConfirmation(productName) {

    const oldModal =
      document.getElementById("labkeepCartModal");

    if (oldModal) {
      oldModal.remove();
    }

    const modal =
      document.createElement("div");

    modal.id = "labkeepCartModal";

    modal.innerHTML = `
      <div class="labkeep-cart-overlay">

        <div class="labkeep-cart-box">

          <div class="labkeep-cart-check">
            ✓
          </div>

          <h2>Added to Cart</h2>

          <p>
            <strong>${productName}</strong>
            has been added to your cart.
          </p>

          <div class="labkeep-cart-actions">

            <button
              type="button"
              class="labkeep-view-cart"
              id="labkeepViewCart">
              View Cart
            </button>

            <button
              type="button"
              class="labkeep-continue"
              id="labkeepContinue">
              Continue Shopping
            </button>

            <button
              type="button"
              class="labkeep-remove"
              id="labkeepRemove">
              Remove from Cart
            </button>

          </div>

        </div>

      </div>
    `;

    document.body.appendChild(modal);


    document
      .getElementById("labkeepViewCart")
      .addEventListener("click", function () {

        window.location.href = "cart.html";

      });


    document
      .getElementById("labkeepContinue")
      .addEventListener("click", function () {

        modal.remove();

      });


    document
      .getElementById("labkeepRemove")
      .addEventListener("click", function () {

        let cart =
          JSON.parse(
            localStorage.getItem("labkeepCart")
          ) || [];

        const productIndex =
          cart.findIndex(function (item) {

            return item.name === productName;

          });

        if (productIndex !== -1) {

          if (
            cart[productIndex].quantity > 1
          ) {

            cart[productIndex].quantity -= 1;

          } else {

            cart.splice(productIndex, 1);

          }

        }

        localStorage.setItem(
          "labkeepCart",
          JSON.stringify(cart)
        );

        updateCartNumber();

        modal.remove();

      });

  }


  /* ==============================
     REMOVE OLD POPUP WHEN
     RETURNING TO PAGE
  ============================== */

  window.addEventListener(
    "pageshow",
    function () {

      updateCartNumber();

      const oldModal =
        document.getElementById(
          "labkeepCartModal"
        );

      if (oldModal) {
        oldModal.remove();
      }

    }
  );


  /* ==============================
     POPUP STYLES
  ============================== */

  const cartStyle =
    document.createElement("style");

  cartStyle.textContent = `

    .labkeep-cart-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      z-index: 99999;
    }

    .labkeep-cart-box {
      width: 100%;
      max-width: 420px;
      background: #ffffff;
      border-radius: 14px;
      padding: 30px 24px;
      text-align: center;
      box-shadow: 0 10px 35px rgba(0, 0, 0, 0.18);
    }

    .labkeep-cart-check {
      width: 52px;
      height: 52px;
      margin: 0 auto 15px;
      border-radius: 50%;
      background: #1237d8;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: bold;
    }

    .labkeep-cart-box h2 {
      margin: 0 0 10px;
      color: #14294c;
      font-size: 23px;
    }

    .labkeep-cart-box p {
      margin: 0 0 24px;
      color: #555555;
      line-height: 1.5;
      font-size: 14px;
    }

    .labkeep-cart-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .labkeep-cart-actions button {
      width: 100%;
      border: none;
      border-radius: 8px;
      padding: 13px 15px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }

    .labkeep-view-cart {
      background: #1237d8;
      color: #ffffff;
    }

    .labkeep-continue {
      background: #eef2ff;
      color: #1237d8;
    }

    .labkeep-remove {
      background: #ffffff;
      color: #d93025;
      border: 1px solid #eeeeee !important;
    }

  `;

  document.head.appendChild(cartStyle);


  /* ==============================
     INITIAL COUNT
  ============================== */

  updateCartNumber();

});
