// Global database
let cart = [];

const getData = () => {
  // Get data from API
  return fetch("/data.json")
    .then((res) => res.json())
    .then((res) => res);
  // End of get data from API
};

const displayTotalAddMenu = (name, el) => {
  // Display total add menu in card
  const data = cart.find((item) => item.name === name);
  data.total += 1;
  cart = cart.filter((item) => (item.name === name ? data : item));
  el.innerText = data.total;
  // End of total add menu in card
};

const createCartItem = (item) => {
  return `
  <li class="cart-item">
              <div class="cart-description">
                <p class="item-in-cart-name">${item.name}</p>
                <div class="flex gap-2.5 items-center">
                  <span class="item-in-cart-total">${item.total}x</span>
                  <span class="item-in-cart-price">@ $${item.price}</span>
                  <span class="item-in-cart-total-price">$${item.totalPrice()}</span>
                </div>
              </div>
              <button class="btn-cancel">
                <img
                  src="/images/icon-remove-item.svg"
                  alt="remove icon"
                  class="pointer-events-none"
                />
              </button>
            </li>
  `;
};

const createOrderItem = (item) => {
  return `
    <li class="order-item-container">
              <img
                src=${item.imgThumbnail}
                class="order-total-img w-14 rounded"
              />

              <div class="order-item-description">
                <p class="order-item-name text-base">${item.name}</p>
                <span class="order-item-total text-base me-3">${
                  item.total
                }x</span>
                <span class="order-item-price">@ $${item.price}</span>
              </div>

              <strong
                class="order-item-total-price text-lg font-bold justify-self-end"
                >$${item.totalPrice()}</strong
              >
            </li>
`;
};

const createCard = (item) => {
  return `
     <div class="card">
          <div
            class="card-header"
            data-img-thumbnail = ${item.image.thumbnail}
            style="
              background-image: url(${
                window.innerWidth >= 1024
                  ? item.image.desktop
                  : item.image.mobile
              });
            "
          >
            <button class="btn-addToCart group">
              <img
                src="/images/icon-add-to-cart.svg"
                alt="add to cart icon"
                class="pointer-events-none"
              />
              <span class="addtocart">Add to Cart</span>
            </button>

            <div class="btn-addMenu-container invisible">
              <button class="btn-decrement">
                <img
                  src="/images/icon-decrement-quantity.svg"
                  alt="decrement icon"
                  class="pointer-events-none"
                />
              </button>

              <span class="total-item">0</span>

              <button class="btn-increment">
                <img
                  src="/images/icon-increment-quantity.svg"
                  alt="increment icon"
                  class="pointer-events-none"
                />
              </button>
            </div>
          </div>
          <div class="card-description">
            <p class="item-category">${item.category}</p>
            <p class="item-name">${item.name}</p>
            <p class="item-price">$${item.price}</p>
          </div>
        </div>
    `;
};

const renderCart = () => {
  // Display total item
  document.getElementById("totalItem").innerText = cart.reduce(
    (acc, item) => acc + item.total,
    0
  );
  // End of display total item

  const cartContainer = document.getElementById("cartList");
  cartContainer.innerHTML = "";

  if (cart.length > 0) {
    // Field item cart
    cart.forEach((item) => (cartContainer.innerHTML += createCartItem(item)));
    // End of field item cart

    // Display total price
    const totalPrice = document.querySelector(".total-price");
    totalPrice.innerText = `$${cart.reduce(
      (acc, item) => acc + item.totalPrice(),
      0
    )}`;
    // End of display total price
  } else {
    document.querySelector(".empty-cart-display").classList.remove("hidden");
    document.querySelector(".field-cart-display").classList.add("hidden");
  }
};

const renderOrderItem = () => {
  if (cart.length > 0) {
    // Display order item
    const orderContainer = document.querySelector(".purchased-orders-list");
    orderContainer.innerHTML = "";

    cart.forEach((item) => (orderContainer.innerHTML += createOrderItem(item)));
    // End of display order item

    // Display total order price
    const totalOrderPrice = document.querySelector(".total-order-price");
    totalOrderPrice.innerText = `$${cart.reduce(
      (acc, item) => acc + item.totalPrice(),
      0
    )}`;
    // End of total order price
  }
};

const displayMenu = async () => {
  // Get data from API
  const data = await getData();
  // End of get data from API

  // Enter data to container
  const menuContainer = document.querySelector(".card-container");

  menuContainer.innerHTML = "";

  if (data.length > 0) {
    data.forEach((menu) => (menuContainer.innerHTML += createCard(menu)));
  }
  // End of enter data to container
};

document.addEventListener("DOMContentLoaded", () => {
  displayMenu();
  document.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("btn-cancel")) {
      e.target
        .querySelector("img")
        .setAttribute("src", "/images/icon-remove-item-hover.svg");
    }

    if (e.target.classList.contains("btn-decrement")) {
      e.target
        .querySelector("img")
        .setAttribute("src", "/images/icon-decrement-quantity-hover.svg");
    }

    if (e.target.classList.contains("btn-increment")) {
      e.target
        .querySelector("img")
        .setAttribute("src", "/images/icon-increment-quantity-hover.svg");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("btn-cancel")) {
      e.target
        .querySelector("img")
        .setAttribute("src", "/images/icon-remove-item.svg");
    }

    if (e.target.classList.contains("btn-decrement")) {
      e.target
        .querySelector("img")
        .setAttribute("src", "/images/icon-decrement-quantity.svg");
    }

    if (e.target.classList.contains("btn-increment")) {
      e.target
        .querySelector("img")
        .setAttribute("src", "/images/icon-increment-quantity.svg");
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-addToCart")) {
      // Add class card active to card header
      e.target
        .closest(".card")
        ?.querySelector(".card-header")
        ?.classList.toggle("card-active");
      // End of add class card active to card header

      // Hide element btn-addToChart
      e.target.classList.add("invisible");
      // End of element btn-addToChart

      // Show element btn-AddMenu
      const btnAddMenuContainer = e.target
        .closest(".card")
        ?.querySelector(".btn-addMenu-container");

      btnAddMenuContainer.classList.remove("invisible");
      // End of show element btn-AddMenu

      // Push item data to global database (cart)
      const cardDescription = e.target
        .closest(".card")
        ?.querySelector(".card-description");

      const itemImgThumbnail = e.target
        .closest(".card")
        ?.querySelector(".card-header")
        ?.getAttribute("data-img-thumbnail");
      const itemName = cardDescription.querySelector(".item-name").innerText;
      const itemPrice = cardDescription.querySelector(".item-price").innerText;

      const data = {
        name: itemName,
        imgThumbnail: itemImgThumbnail,
        price: Number(itemPrice.slice(1, itemPrice.length)),
        total: 0,
        totalPrice: function () {
          return this.price * this.total;
        },
      };

      cart.push(data);
      // End of push item data to global database (cart)

      // Display total add item in card
      const totalItemDisplay = btnAddMenuContainer.querySelector(".total-item");
      displayTotalAddMenu(itemName, totalItemDisplay);
      // End of display total add item in card

      // Show field cart display
      const emptyCartDisplay = document.querySelector(".empty-cart-display");

      if (!emptyCartDisplay.classList.contains("hidden")) {
        emptyCartDisplay.classList.add("hidden");
        document
          .querySelector(".field-cart-display")
          .classList.remove("hidden");
      }
      // End of show field cart display

      // Update cart display
      renderCart();
      // End of update cart display
    }

    if (e.target.classList.contains("btn-increment")) {
      // Change total item on global data

      const itemName = e.target
        .closest(".card")
        ?.querySelector(".item-name").innerText;

      cart.forEach((item) =>
        item.name === itemName ? (item.total += 1) : item.total === item.total
      );

      // End of change total item on global data

      // Change display total item when user click button increment

      const totalItem = e.target
        .closest(".btn-addMenu-container")
        ?.querySelector(".total-item");

      totalItem.innerText = Number(totalItem.innerText) + 1;

      // End of change display total item when user click button increment

      // update cart when user click button increment

      renderCart();

      // End of update cart when user click button increment
    }

    if (e.target.classList.contains("btn-decrement")) {
      // Change total item on global data

      const itemName = e.target
        .closest(".card")
        ?.querySelector(".item-name").innerText;

      cart.forEach((item) =>
        item.name === itemName ? (item.total -= 1) : item.total === item.total
      );

      // End of change total item on global data

      //  Change display total item when user click button decrement

      const totalItem = e.target
        .closest(".btn-addMenu-container")
        ?.querySelector(".total-item");

      totalItem.innerText = Number(totalItem.innerText) - 1;

      // End of change display total item when user click button decrement

      if (totalItem.innerText == 0) {
        // If total item zero, remove item from cart
        cart = cart.filter((item) => item.name !== itemName);
        // End of if total item zero, remove item from cart

        // If total item zero, change display button
        e.target
          .closest(".card")
          .querySelector(".btn-addToCart")
          .classList.remove("invisible");

        e.target.closest(".btn-addMenu-container")?.classList.add("invisible");
        // End of if total item zero, change display button

        // If total item zero, remove class card active from card header
        e.target.closest(".card-header").classList.remove("card-active");
        // End of total item zero, remove class card active from card header
      }

      // Update cart when user click button decrement

      renderCart();

      // End of update cart when user click button decrement
    }

    if (e.target.classList.contains("btn-cancel")) {
      // Remove item from cart
      const itemName = e.target
        .closest(".cart-item")
        ?.querySelector(".item-in-cart-name")?.innerText;

      cart = cart.filter((item) => item.name !== itemName);
      // End of remove item from cart

      // Display update cart

      renderCart();

      // End of display update cart

      // Change display button when user remove item from cart
      const allItem = document.querySelectorAll(".card");
      for (const item of allItem) {
        const name = item.querySelector(".item-name").innerText;
        if (itemName === name) {
          item.querySelector(".card-header")?.classList.remove("card-active");
          item.querySelector(".btn-addToCart").classList.remove("invisible");
          item
            .querySelector(".btn-addMenu-container")
            .classList.add("invisible");
        }
      }
      // end of Change display button when user remove item from cart
    }

    if (e.target.classList.contains("btn-confirm")) {
      // Hide element element card container and cart when innerWidth < 1024
      if (innerWidth < 1024) {
        document.querySelector(".card-container").classList.add("hidden");
        document.querySelector(".cart").classList.add("hidden");
      }
      // End of hide element element card container and cart when innerWidth < 1024

      // Show element overlay and order confirm display
      document.querySelector(".overlay").classList.remove("hidden");
      document
        .querySelector(".order-confirm-display")
        .classList.remove("hidden");
      // End of show element overlay and order confirm display

      // Update render order item display
      renderOrderItem();
      // End of render order item display
    }

    if (e.target.classList.contains("btn-new-order")) {
      // Clear global data
      cart = [];
      // End of clear global data

      // Show element card container and cart when innerWidth < 1024
      if (window.innerWidth < 1024) {
        document.querySelector(".card-container").classList.remove("hidden");
        document.querySelector(".cart").classList.remove("hidden");
      }
      // End of show element card container and cart when innerWidth < 1024

      // Hide element overlay and order confirm display
      document.querySelector(".order-confirm-display").classList.add("hidden");
      document.querySelector(".overlay").classList.add("hidden");
      // End of hide element overlay and order confirm display

      // Update display menu
      displayMenu();
      // End of display menu

      // Update display cart
      renderCart();
      // End of update display cart
    }
  });
});
