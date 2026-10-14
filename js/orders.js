(() => {
  const ORDER_KEY = "daira-demo-orders";

  const formatPrice = (value) =>
    `Rs ${Number(value || 0).toLocaleString("en-PK")}`;

  const getOrders = () => {
    try {
      const orders = JSON.parse(localStorage.getItem(ORDER_KEY));
      return Array.isArray(orders) ? orders : [];
    } catch {
      return [];
    }
  };

  const renderOrders = () => {
    const page = document.querySelector("#page-content");
    if (!page) return;

    const orders = getOrders();

    if (!orders.length) {
      page.innerHTML = `
        <section class="min-h-[70vh] bg-[#f8f6f1] px-4 py-16 sm:px-6">
          <div class="mx-auto max-w-2xl text-center">
            <i data-lucide="package-open"
              class="mx-auto h-16 w-16 text-[#1F6306]"></i>

            <h1 class="mt-6 text-3xl font-bold text-[#203420]">
              No Orders Yet
            </h1>

            <p class="mt-3 text-[#546157]">
              You haven't placed any orders yet.
            </p>

            <a
              href="products.html"
              class="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1F6306] px-6 py-3 font-semibold text-white"
            >
              <i data-lucide="shopping-bag" class="h-5 w-5"></i>
              Start Shopping
            </a>
          </div>
        </section>
      `;

      window.lucide?.createIcons();
      return;
    }

    page.innerHTML = `
      <section class="bg-[#f8f6f1] px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-6xl">

          <div class="mb-8">
            <p class="text-sm font-semibold text-[#1F6306]">
              Account
            </p>

            <h1 class="mt-2 text-3xl font-bold text-[#203420] sm:text-4xl">
              My Orders
            </h1>

            <p class="mt-2 text-[#546157]">
              View your recent orders and order details.
            </p>
          </div>

          <div class="space-y-5">
            ${orders.map((order) => `
              <div class="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

                <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                  <div>
                    <p class="text-sm text-[#71826C]">
                      Order ID
                    </p>

                    <h2 class="mt-1 font-bold text-[#203420]">
                      ${order.id}
                    </h2>

                    <p class="mt-1 text-sm text-[#546157]">
                      ${new Date(order.date).toLocaleString("en-PK")}
                    </p>
                  </div>

                  <span class="w-fit rounded-full bg-[#1F6306]/10 px-4 py-2 text-sm font-semibold text-[#1F6306]">
                    ${order.status || "Processing"}
                  </span>

                </div>

                <div class="mt-5 border-t border-gray-100 pt-5">

                  <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div class="flex items-center gap-3">
                      <i data-lucide="package"
                        class="h-5 w-5 text-[#1F6306]"></i>

                      <div>
                        <p class="font-semibold text-[#203420]">
                          ${order.items?.length || 0} Product${(order.items?.length || 0) === 1 ? "" : "s"}
                        </p>

                        <p class="text-sm text-[#546157]">
                          ${order.customer?.fullName || "Customer"}
                        </p>
                      </div>
                    </div>

                    <div class="flex items-center justify-between gap-5 sm:justify-end">

                      <div>
                        <p class="text-sm text-[#71826C]">
                          Total
                        </p>

                        <p class="font-bold text-[#1F6306]">
                          ${formatPrice(order.total)}
                        </p>
                      </div>

                      <a
                        href="order-details.html?id=${encodeURIComponent(order.id)}"
                        class="inline-flex items-center gap-2 rounded-lg bg-[#1F6306] px-4 py-2.5 text-sm font-semibold text-white"
                      >
                        View Details
                        <i data-lucide="arrow-right" class="h-4 w-4"></i>
                      </a>

                    </div>

                  </div>

                </div>

              </div>
            `).join("")}
          </div>

        </div>
      </section>
    `;

    window.lucide?.createIcons();
  };

  renderOrders();
})();