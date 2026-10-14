(() => {
  const CART_KEY = "daira-demo-cart";
  const ORDER_KEY = "daira-demo-orders";

  const readCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(cart) ? cart : [];
    } catch {
      return [];
    }
  };

  const formatPrice = (value) =>
    `Rs ${Number(value || 0).toLocaleString("en-PK")}`;

  const getTotals = (cart) => {
    const subtotal = cart.reduce(
      (total, item) => total + Number(item.price) * Number(item.quantity),
      0
    );

    const shipping = subtotal >= 5000 ? 0 : 250;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  };

  const renderCheckout = () => {
    const page = document.querySelector("#page-content");
    if (!page) return;

    const cart = readCart();

    if (!cart.length) {
      page.innerHTML = `
        <section class="min-h-[60vh] flex items-center justify-center px-4 py-16">
          <div class="text-center max-w-md">
            <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-[#1F6306]">
              <i data-lucide="shopping-cart" class="h-8 w-8"></i>
            </div>

            <h1 class="text-2xl sm:text-3xl font-bold text-[#203420]">
              Your cart is empty
            </h1>

            <p class="mt-3 text-[#546157]">
              Add some products to your cart before continuing to checkout.
            </p>

            <a
              href="products.html"
              class="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1F6306] px-5 py-3 font-semibold text-white transition hover:bg-[#174d05]"
            >
              <i data-lucide="shopping-bag" class="h-5 w-5"></i>
              Continue Shopping
            </a>
          </div>
        </section>
      `;

      window.lucide?.createIcons();
      return;
    }

    const { subtotal, shipping, tax, total } = getTotals(cart);

    page.innerHTML = `
      <section class="bg-[#f8f6f1] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div class="mx-auto max-w-7xl">

          <div class="mb-8">
            <p class="text-sm font-semibold uppercase tracking-wider text-[#1F6306]">
              Checkout
            </p>

            <h1 class="mt-2 text-3xl font-bold text-[#203420] sm:text-4xl">
              Complete Your Order
            </h1>

            <p class="mt-2 text-[#546157]">
              Enter your details and choose your payment method.
            </p>
          </div>

          <form id="checkout-form" novalidate>
            <div class="grid gap-8 lg:grid-cols-[1fr_380px]">

              <div class="space-y-6">

                <div class="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
                  <div class="mb-6 flex items-center gap-3">
                    <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F6306]/10 text-[#1F6306]">
                      <i data-lucide="user" class="h-5 w-5"></i>
                    </span>

                    <div>
                      <h2 class="text-xl font-bold text-[#203420]">
                        Customer Information
                      </h2>
                      <p class="text-sm text-[#71826C]">
                        Enter your delivery details
                      </p>
                    </div>
                  </div>

                  <div class="grid gap-5 sm:grid-cols-2">

                    <div class="sm:col-span-2">
                      <label for="full-name" class="mb-2 block text-sm font-semibold text-[#203420]">
                        Full Name
                      </label>

                      <input
                        id="full-name"
                        name="fullName"
                        type="text"
                        required
                        placeholder="Enter your full name"
                        class="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1F6306] focus:ring-2 focus:ring-[#1F6306]/10"
                      >

                      <p data-error="fullName" class="mt-1 hidden text-sm text-red-600"></p>
                    </div>

                    <div>
                      <label for="email" class="mb-2 block text-sm font-semibold text-[#203420]">
                        Email
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        class="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1F6306] focus:ring-2 focus:ring-[#1F6306]/10"
                      >

                      <p data-error="email" class="mt-1 hidden text-sm text-red-600"></p>
                    </div>

                    <div>
                      <label for="phone" class="mb-2 block text-sm font-semibold text-[#203420]">
                        Phone
                      </label>

                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="03XX XXXXXXX"
                        class="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1F6306] focus:ring-2 focus:ring-[#1F6306]/10"
                      >

                      <p data-error="phone" class="mt-1 hidden text-sm text-red-600"></p>
                    </div>

                    <div class="sm:col-span-2">
                      <label for="address" class="mb-2 block text-sm font-semibold text-[#203420]">
                        Delivery Address
                      </label>

                      <textarea
                        id="address"
                        name="address"
                        rows="4"
                        required
                        placeholder="Enter your complete delivery address"
                        class="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1F6306] focus:ring-2 focus:ring-[#1F6306]/10"
                      ></textarea>

                      <p data-error="address" class="mt-1 hidden text-sm text-red-600"></p>
                    </div>

                  </div>
                </div>

                <div class="rounded-2xl bg-white p-5 shadow-sm sm:p-7">
                  <div class="mb-6 flex items-center gap-3">
                    <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#1F6306]/10 text-[#1F6306]">
                      <i data-lucide="credit-card" class="h-5 w-5"></i>
                    </span>

                    <div>
                      <h2 class="text-xl font-bold text-[#203420]">
                        Payment Method
                      </h2>
                      <p class="text-sm text-[#71826C]">
                        Select your preferred payment option
                      </p>
                    </div>
                  </div>

                  <div class="space-y-3">

                    <label class="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-[#1F6306]">
                      <input
                        type="radio"
                        name="payment"
                        value="Cash on Delivery"
                        checked
                        class="h-4 w-4 accent-[#1F6306]"
                      >

                      <span class="flex flex-1 items-center gap-3">
                        <i data-lucide="banknote" class="h-5 w-5 text-[#1F6306]"></i>

                        <span>
                          <span class="block font-semibold text-[#203420]">
                            Cash on Delivery
                          </span>

                          <span class="text-sm text-[#71826C]">
                            Pay when your order arrives
                          </span>
                        </span>
                      </span>
                    </label>

                    <label class="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-[#1F6306]">
                      <input
                        type="radio"
                        name="payment"
                        value="Card"
                        class="h-4 w-4 accent-[#1F6306]"
                      >

                      <span class="flex flex-1 items-center gap-3">
                        <i data-lucide="credit-card" class="h-5 w-5 text-[#1F6306]"></i>

                        <span>
                          <span class="block font-semibold text-[#203420]">
                            Card Payment
                          </span>

                          <span class="text-sm text-[#71826C]">
                            Demo payment option
                          </span>
                        </span>
                      </span>
                    </label>

                  </div>
                </div>

              </div>

              <aside class="h-fit rounded-2xl bg-white p-5 shadow-sm sm:p-7 lg:sticky lg:top-[calc(var(--navbar-height,5.5rem)+1rem)]">

                <h2 class="text-xl font-bold text-[#203420]">
                  Order Summary
                </h2>

                <div class="mt-5 max-h-80 space-y-4 overflow-y-auto pr-1">

                  ${cart
                    .map(
                      (item) => `
                        <div class="flex gap-3">
                          <img
                            src="${item.image}"
                            alt="${item.name}"
                            class="h-16 w-16 shrink-0 rounded-lg object-cover"
                          >

                          <div class="min-w-0 flex-1">
                            <h3 class="truncate text-sm font-semibold text-[#203420]">
                              ${item.name}
                            </h3>

                            <p class="mt-1 text-sm text-[#71826C]">
                              Qty: ${item.quantity}
                            </p>
                          </div>

                          <span class="shrink-0 text-sm font-semibold text-[#203420]">
                            ${formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      `
                    )
                    .join("")}

                </div>

                <div class="my-5 border-t border-gray-100"></div>

                <div class="space-y-3 text-sm">
                  <div class="flex justify-between gap-4">
                    <span class="text-[#546157]">Subtotal</span>
                    <span class="font-semibold text-[#203420]">
                      ${formatPrice(subtotal)}
                    </span>
                  </div>

                  <div class="flex justify-between gap-4">
                    <span class="text-[#546157]">Shipping</span>
                    <span class="font-semibold text-[#203420]">
                      ${shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>

                  <div class="flex justify-between gap-4">
                    <span class="text-[#546157]">Tax (5%)</span>
                    <span class="font-semibold text-[#203420]">
                      ${formatPrice(tax)}
                    </span>
                  </div>
                </div>

                <div class="my-5 border-t border-gray-100"></div>

                <div class="flex items-center justify-between gap-4">
                  <span class="text-lg font-bold text-[#203420]">
                    Total
                  </span>

                  <span class="text-xl font-bold text-[#1F6306]">
                    ${formatPrice(total)}
                  </span>
                </div>

                <button
                  type="submit"
                  class="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F6306] px-5 py-3.5 font-semibold text-white transition hover:bg-[#174d05]"
                >
                  <i data-lucide="check-circle" class="h-5 w-5"></i>
                  Place Order
                </button>

                <a
                  href="cart.html"
                  class="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#1F6306] px-5 py-3 font-semibold text-[#1F6306] transition hover:bg-[#1F6306]/5"
                >
                  <i data-lucide="arrow-left" class="h-5 w-5"></i>
                  Back to Cart
                </a>

                <p class="mt-4 text-center text-xs leading-5 text-[#71826C]">
                  This is a frontend-only demo checkout. No real payment will be processed.
                </p>

              </aside>

            </div>
          </form>
        </div>
      </section>
    `;

    window.lucide?.createIcons();

    setupCheckoutForm();
  };

  const showError = (name, message) => {
    const element = document.querySelector(`[data-error="${name}"]`);

    if (!element) return;

    element.textContent = message;
    element.classList.remove("hidden");
  };

  const clearErrors = () => {
    document.querySelectorAll("[data-error]").forEach((element) => {
      element.textContent = "";
      element.classList.add("hidden");
    });
  };

  const setupCheckoutForm = () => {
    const form = document.querySelector("#checkout-form");

    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      clearErrors();

      const fullName = document.querySelector("#full-name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const phone = document.querySelector("#phone").value.trim();
      const address = document.querySelector("#address").value.trim();
      const payment = document.querySelector('input[name="payment"]:checked')?.value;

      let valid = true;

      if (fullName.length < 3) {
        showError("fullName", "Please enter your full name.");
        valid = false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("email", "Please enter a valid email address.");
        valid = false;
      }

      if (!/^[0-9+\-\s]{10,15}$/.test(phone)) {
        showError("phone", "Please enter a valid phone number.");
        valid = false;
      }

      if (address.length < 10) {
        showError("address", "Please enter your complete delivery address.");
        valid = false;
      }

      if (!valid) return;

      const cart = readCart();

      if (!cart.length) {
        alert("Your cart is empty.");
        window.location.href = "products.html";
        return;
      }

      const { subtotal, shipping, tax, total } = getTotals(cart);

      const orders = (() => {
        try {
          const value = JSON.parse(localStorage.getItem(ORDER_KEY));
          return Array.isArray(value) ? value : [];
        } catch {
          return [];
        }
      })();

      const order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        status: "Processing",
        customer: {
          fullName,
          email,
          phone,
          address,
        },
        payment,
        items: cart,
        subtotal,
        shipping,
        tax,
        total,
      };

      orders.unshift(order);

      localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
      localStorage.removeItem(CART_KEY);
      window.DairaCart?.updateNavbarCount?.();
      window.dispatchEvent(new CustomEvent("daira:cart-updated"));

      window.location.href = `order-details.html?id=${encodeURIComponent(order.id)}`;
    });
  };

  renderCheckout();
})();