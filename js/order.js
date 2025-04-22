document.addEventListener("DOMContentLoaded", () => {
  const menuItems = [
    { id: 1, name: "Chin-Chin", price: 1500, image: "images/food/chin.jpg" },
    { id: 2, name: "Puff-puff", price: 1800, image: "images/food/puff-puff.jpg"},
    { id: 3, name: "Chocolate birthday cake", price: 40000, image: "images/food/Chocolate-Birthday-Cake-Recipe8.jpg"},
    { id: 4, name: "Fruit cake", price: 25000, image: "images/food/friut-cake.webp"},
    { id: 5, name: "Rose Vanilla Cake", price: 30000, image: "images/food/wedding cake.jpg"},
    { id: 6, name: "Classic Vanilla cup-cake", price: 390000, image: "images/food/20240723_SEA_Classic-Vanilla-Cupcake.jpg"},
    { id: 7, name: "Tier Cake", price: 15000000, image: "images/food/tier cakes.webp"},
    { id: 7, name: "Flaky meat-pie", price: 4500, image: "images/food/meat-pie.jpg"},
    { id: 8, name: "Birthday cake", price: 55000, image: "images/food/birthday_cake.jpg"},
    { id: 9, name: "Wedding Cake", price: 15050000, image: "images/food/wedding cake.jpg"},
    { id: 6, name: "Chin-Chin", price: 1500, image: "images/food/chin.jpg" },
    { id: 7, name: "Puff-puff", price: 1800, image: "images/food/puff-puff.jpg"},
    { id: 8, name: "Chocolate birthday cake", price: 40000, image: "images/food/Chocolate-Birthday-Cake-Recipe8.jpg"},
    { id: 9, name: "Fruit cake", price: 25000, image: "images/food/friut-cake.webp"},
    { id: 10, name: "Rose Vanilla Cake", price: 30000, image: "images/food/wedding cake.jpg"},
    { id: 11, name: "Classic Vanilla cup-cake", price: 390000, image: "images/food/20240723_SEA_Classic-Vanilla-Cupcake.jpg"},
    { id: 12, name: "Tier Cake", price: 15000000, image: "images/food/tier cakes.webp"},
    { id: 13, name: "Flaky meat-pie", price: 4500, image: "images/food/meat-pie.jpg"},
    { id: 14, name: "Birthday cake", price: 55000, image: "images/food/birthday_cake.jpg"},
    { id: 15, name: "Wedding Cake", price: 15050000, image: "images/food/wedding cake.jpg"},
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const orderDetails = {
    name: "",
    phone: "",
    address: "",
    specialInstructions: "",
  };

  const menuItemsContainer = document.getElementById("menuItems");
  const cartContainer = document.getElementById("cart");
  const orderForm = document.getElementById("orderForm");

  function addToCart(item) {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      cart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      cart = [...cart, { ...item, quantity: 1 }];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function removeFromCart(itemId) {
    const existingItem = cart.find((cartItem) => cartItem.id === itemId);
    if (existingItem.quantity === 1) {
      cart = cart.filter((cartItem) => cartItem.id !== itemId);
    } else {
      cart = cart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    orderDetails[name] = value;
  }

  function submitOrder(event) {
    event.preventDefault();
    
    // Validate required fields
    if (!orderDetails.name || !orderDetails.phone || !orderDetails.address) {
      alert('Please fill in all required fields');
      return;
    }
  
    // Save order details to localStorage
    localStorage.setItem('customerDetails', JSON.stringify(orderDetails));
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
  }

  function renderMenuItems() {
    if (!menuItemsContainer) return;
    menuItems.forEach((item) => {
      const menuItem = document.createElement("div");
      menuItem.className = "menu-item";

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;

      const name = document.createElement("h4");
      name.textContent = item.name;

      const price = document.createElement("p");
      price.textContent = `₦${item.price.toLocaleString()}`;

      const button = document.createElement("button");
      button.className = "btn";
      button.innerHTML = "Add to Cart";
      button.addEventListener("click", () => addToCart(item));

      menuItem.appendChild(img);
      menuItem.appendChild(name);
      menuItem.appendChild(price);
      menuItem.appendChild(button);

      menuItemsContainer.appendChild(menuItem);
    });
  }

  function renderCart() {
    if (!cartContainer) return;
    cartContainer.innerHTML = "";
    if (cart.length === 0) {
      cartContainer.textContent = "Your cart is empty";
    } else {
      cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;

        const details = document.createElement("div");
        details.className = "cart-item-details";

        const name = document.createElement("h4");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = `₦${item.price.toLocaleString()}`;

        const quantityControl = document.createElement("div");
        quantityControl.className = "quantity-control";

        const minusButton = document.createElement("button");
        minusButton.innerHTML = "-";
        minusButton.addEventListener("click", () => removeFromCart(item.id));

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const plusButton = document.createElement("button");
        plusButton.innerHTML = "+";
        plusButton.addEventListener("click", () => addToCart(item));

        quantityControl.appendChild(minusButton);
        quantityControl.appendChild(quantity);
        quantityControl.appendChild(plusButton);

        details.appendChild(name);
        details.appendChild(price);
        details.appendChild(quantityControl);

        cartItem.appendChild(img);
        cartItem.appendChild(details);

        cartContainer.appendChild(cartItem);
      });

      const cartSummary = document.createElement("div");
      cartSummary.className = "cart-summary";
      cartSummary.textContent = `Total: ₦${calculateTotal().toLocaleString()}`;
      cartContainer.appendChild(cartSummary);
    }
  }

  // Add to Cart button handling on index.html
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const itemId = parseInt(button.getAttribute("data-item-id"));
      const item = menuItems.find((menuItem) => menuItem.id === itemId);
      if (item) {
        addToCart(item);
        window.location.href = "order.html";
      }
    });
  });

  const orderNowButtons = document.querySelectorAll(".order-now");
  orderNowButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const itemId = parseInt(button.getAttribute("data-item-id"));
      const item = menuItems.find((menuItem) => menuItem.id === itemId);
      if (item) {
        addToCart(item);
        window.location.href = "order.html";
      }
    });
  });

  if (orderForm) {
    orderForm.addEventListener("submit", submitOrder);
    orderForm.addEventListener("input", handleInputChange);
  }
  renderMenuItems();
  renderCart();
});