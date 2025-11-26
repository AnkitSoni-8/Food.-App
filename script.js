var swiper = new Swiper(".mySwiper", {
  loop: true,
      navigation: {
        nextEl: "#next",
        prevEl: "#prev",
      },
    });


 // =============== CART DATA ===============
let cart = [];

// SELECT ELEMENTS
const cartIcon = document.querySelector(".cart-icon");
const cartValue = document.querySelector(".cart-value");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");


// ============ OPEN / CLOSE CART TAB ============
cartIcon.addEventListener("click", (e) => {
  e.preventDefault(); // page scroll to top stop
  cartTab.classList.add("cart-tab-active");
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault(); // stop scroll
  cartTab.classList.remove("cart-tab-active");
});


// ============ ADD TO CART FUNCTION ============
function addToCart(name, price, image) {

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      name,
      price,
      image,
      qty: 1
    });
  }

  updateCartUI();
}


// ============ UPDATE CART UI ============
function updateCartUI() {

  let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartValue.textContent = totalItems;

  cartList.innerHTML = "";

  cart.forEach((item, index) => {

    let div = document.createElement("div");
    div.classList.add("item");

    div.innerHTML = `
      <div class="item-image">
        <img src="${item.image}">
      </div>

      <div>
        <h4>${item.name}</h4>
        <h4 class="item-total">$${(item.price * item.qty).toFixed(2)}</h4>
      </div>

      <div class="flex">
        <a href="#" class="quantity-btn minus" data-index="${index}">
          <i class="fa-solid fa-minus"></i>
        </a>

        <h4 class="quantity-value">${item.qty}</h4>

        <a href="#" class="quantity-btn plus" data-index="${index}">
          <i class="fa-solid fa-plus"></i>
        </a>
      </div>
    `;

    cartList.appendChild(div);
  });

  let total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = "$" + total.toFixed(2);

  attachQuantityButtons();
}


// ============ QUANTITY CHANGE ===============
function attachQuantityButtons() {
  const minusBtns = document.querySelectorAll(".minus");
  const plusBtns = document.querySelectorAll(".plus");

  minusBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // stop auto scroll
      let index = btn.dataset.index;

      if (cart[index].qty > 1) {
        cart[index].qty--;
      } else {
        cart.splice(index, 1);
      }

      updateCartUI();
    });
  });

  plusBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // stop auto scroll
      let index = btn.dataset.index;
      cart[index].qty++;
      updateCartUI();
    });
  });
}



// ============ SELECT MENU ITEMS =============
const orderCards = document.querySelectorAll(".order-card");

orderCards.forEach(card => {

  const name = card.querySelector("h4").textContent;
  const price = parseFloat(
    card.querySelector(".price").textContent.replace("$", "")
  );
  const image = card.querySelector("img").src;
  const btn = card.querySelector(".btn");

  btn.addEventListener("click", (e) => {
    e.preventDefault(); // STOP PAGE JUMP / SCROLL
    addToCart(name, price, image);
  });
});


