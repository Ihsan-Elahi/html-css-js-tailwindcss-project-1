(() => {
  const ORDER_KEY = "daira-demo-orders";

  const formatPrice = (value) =>
    `Rs ${Number(value || 0).toLocaleString("en-PK")}`;

  const getOrder = () => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("id");

    if (!orderId) return null;

    try {
      const orders = JSON.parse(localStorage.getItem(ORDER_KEY)) || [];
      return orders.find((order) => String(order.id) === String(orderId));
    } catch {
      return null;
    }
  };

  const renderOrderDetails = () => {
    const page = document.querySelector("#page-content");
    const order = getOrder();

    if (!page) return;

    if (!order) {
      page.innerHTML = `
        <section class="min-h-[70vh] px-4 py-16">
          <div class="mx-auto max-w-2xl text-center">
            <i data-lucide="package-x" class="mx-auto h-16 w-16 text-[#1F6306]"></i>
            <h1 class="mt-6 text-3xl font-bold text-[#203420]">
              Order Not Found
            </h1>
            <p class="mt-3 text-[#546157]">
              This order could not be found.
            </p>
            <a
              href="products.html"
              class="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1F6306] px-6 py-3 font-semibold text-white"
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

    const items = Array.isArray(order.items) ? order.items : [];

    page.innerHTML = `
      <section class="bg-[#f8f6f1] px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-6xl">

          <div class="mb-8">
            <p class="text-sm font-semibold text-[#1F6306]">
              Order Details
            </p>

            <h1 class="mt-2 text-3xl font-bold text-[#203420] sm:text-4xl">
              Order #${order.id}
            </h1>

            <p class="mt-2 text-[#546157]">
              ${new Date(order.date).toLocaleString("en-PK")}
            </p>
          </div>

          <div class="grid gap-6 lg:grid-cols-3">

            <div class="space-y-6 lg:col-span-2">

              <div class="rounded-2xl bg-white p-6 shadow-sm">
                <div class="flex flex-wrap items-center justify-between gap-4">
                  <h2 class="text-xl font-bold text-[#203420]">
                    Ordered Products
                  </h2>

                  <span class="rounded-full bg-[#1F6306]/10 px-4 py-2 text-sm font-semibold text-[#1F6306]">
                    ${order.status || "Processing"}
                  </span>
                </div>

                <div class="mt-6 space-y-4">
                  ${items.map((item) => `
                    <div class="flex gap-4 rounded-xl border border-gray-100 p-4">
                      <img
                        src="${item.image || ""}"
                        alt="${item.name || "Product"}"
                        class="h-20 w-20 rounded-lg object-cover"
                      >

                      <div class="min-w-0 flex-1">
                        <h3 class="font-semibold text-[#203420]">
                          ${item.name || "Product"}
                        </h3>

                        <p class="mt-1 text-sm text-[#546157]">
                          ${item.category || "Product"}
                        </p>

                        <p class="mt-2 text-sm text-[#546157]">
                          Quantity: ${item.quantity}
                        </p>
                      </div>

                      <div class="text-right font-semibold text-[#1F6306]">
                        ${formatPrice(Number(item.price) * Number(item.quantity))}
                      </div>
                    </div>
                  `).join("")}
                </div>
              </div>

              <div class="rounded-2xl bg-white p-6 shadow-sm">
                <h2 class="text-xl font-bold text-[#203420]">
                  Customer Information
                </h2>

                <div class="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p class="text-sm text-[#71826C]">Full Name</p>
                    <p class="mt-1 font-semibold text-[#203420]">
                      ${order.customer?.fullName || "-"}
                    </p>
                  </div>

                  <div>
                    <p class="text-sm text-[#71826C]">Email</p>
                    <p class="mt-1 font-semibold text-[#203420]">
                      ${order.customer?.email || "-"}
                    </p>
                  </div>

                  <div>
                    <p class="text-sm text-[#71826C]">Phone</p>
                    <p class="mt-1 font-semibold text-[#203420]">
                      ${order.customer?.phone || "-"}
                    </p>
                  </div>

                  <div>
                    <p class="text-sm text-[#71826C]">Payment</p>
                    <p class="mt-1 font-semibold text-[#203420]">
                      ${order.payment || "-"}
                    </p>
                  </div>

                  <div class="sm:col-span-2">
                    <p class="text-sm text-[#71826C]">Delivery Address</p>
                    <p class="mt-1 font-semibold text-[#203420]">
                      ${order.customer?.address || "-"}
                    </p>
                  </div>
                </div>
              </div>

            </div>

    <aside class="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-[calc(var(--navbar-height,5.5rem)+1rem)]">
              <h2 class="text-xl font-bold text-[#203420]">
                Order Summary
              </h2>

              <div class="mt-6 space-y-4 text-sm">
                <div class="flex justify-between gap-4">
                  <span class="text-[#546157]">Subtotal</span>
                  <span class="font-semibold text-[#203420]">
                    ${formatPrice(order.subtotal)}
                  </span>
                </div>

                <div class="flex justify-between gap-4">
                  <span class="text-[#546157]">Shipping</span>
                  <span class="font-semibold text-[#203420]">
                    ${formatPrice(order.shipping)}
                  </span>
                </div>

                <div class="flex justify-between gap-4">
                  <span class="text-[#546157]">Tax</span>
                  <span class="font-semibold text-[#203420]">
                    ${formatPrice(order.tax)}
                  </span>
                </div>

                <div class="border-t border-gray-100 pt-4">
                  <div class="flex justify-between gap-4">
                    <span class="text-lg font-bold text-[#203420]">
                      Total
                    </span>

                    <span class="text-xl font-bold text-[#1F6306]">
                      ${formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-6 space-y-3">
                <a
                  href="orders.html"
                  class="flex w-full items-center justify-center gap-2 rounded-lg border border-[#1F6306] px-5 py-3 font-semibold text-[#1F6306]"
                >
                  <i data-lucide="list-ordered" class="h-5 w-5"></i>
                  My Orders
                </a>

                <a
                  href="products.html"
                  class="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F6306] px-5 py-3 font-semibold text-white"
                >
                  <i data-lucide="shopping-bag" class="h-5 w-5"></i>
                  Continue Shopping
                </a>
              </div>
            </aside>

          </div>
        </div>
      </section>
    `;

    window.lucide?.createIcons();
  };

  renderOrderDetails();
})();