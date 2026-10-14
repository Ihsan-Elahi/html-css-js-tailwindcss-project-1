(() => {
  const USER_KEY = "daira-demo-user";

  const page = document.querySelector("#page-content");
  if (!page) return;

  page.innerHTML = `
    <section class="min-h-[75vh] bg-[#f8f6f1] px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl">

        <div class="mb-8 text-center">
          <p class="text-sm font-semibold text-[#1F6306]">
            Create Account
          </p>

          <h1 class="mt-2 text-3xl font-bold text-[#203420] sm:text-4xl">
            Sign Up
          </h1>

          <p class="mt-2 text-[#546157]">
            Create your account and start shopping with Daira.
          </p>
        </div>

        <form
          id="signup-form"
          class="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
        >

          <div
            id="signup-message"
            class="mb-5 hidden rounded-lg px-4 py-3 text-sm"
          ></div>

          <div class="grid gap-5 sm:grid-cols-2">

            <div class="sm:col-span-2">
              <label class="mb-2 block text-sm font-semibold text-[#203420]">
                Full Name
              </label>

              <input
                type="text"
                id="fullName"
                required
                class="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1F6306]"
                placeholder="Enter your full name"
              >
            </div>

            <div>
              <label class="mb-2 block text-sm font-semibold text-[#203420]">
                Email
              </label>

              <input
                type="email"
                id="email"
                required
                class="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1F6306]"
                placeholder="you@example.com"
              >
            </div>

            <div>
              <label class="mb-2 block text-sm font-semibold text-[#203420]">
                Phone
              </label>

              <input
                type="tel"
                id="phone"
                required
                class="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1F6306]"
                placeholder="03XX-XXXXXXX"
              >
            </div>

            <div>
              <label class="mb-2 block text-sm font-semibold text-[#203420]">
                Password
              </label>

              <input
                type="password"
                id="password"
                required
                minlength="6"
                class="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1F6306]"
                placeholder="Minimum 6 characters"
              >
            </div>

            <div>
              <label class="mb-2 block text-sm font-semibold text-[#203420]">
                Confirm Password
              </label>

              <input
                type="password"
                id="confirmPassword"
                required
                minlength="6"
                class="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1F6306]"
                placeholder="Confirm password"
              >
            </div>

            <div>
              <label class="mb-2 block text-sm font-semibold text-[#203420]">
                Gender
              </label>

              <select
                id="gender"
                required
                class="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#1F6306]"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-sm font-semibold text-[#203420]">
                Date of Birth
              </label>

              <input
                type="date"
                id="dob"
                required
                class="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#1F6306]"
              >
            </div>

            <div class="sm:col-span-2">
              <label class="mb-2 block text-sm font-semibold text-[#203420]">
                Address
              </label>

              <textarea
                id="address"
                rows="3"
                required
                class="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#1F6306]"
                placeholder="Enter your address"
              ></textarea>
            </div>

          </div>

          <button
            type="submit"
            class="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F6306] px-5 py-3.5 font-semibold text-white transition hover:bg-[#174d05]"
          >
            <i data-lucide="user-plus" class="h-5 w-5"></i>
            Create Account
          </button>

          <p class="mt-5 text-center text-sm text-[#546157]">
            Already have an account?
            <a
              href="login.html"
              class="font-semibold text-[#1F6306] hover:underline"
            >
              Login
            </a>
          </p>

        </form>
      </div>
    </section>
  `;

  const form = document.querySelector("#signup-form");
  const message = document.querySelector("#signup-message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.querySelector("#fullName").value.trim();
    const email = document.querySelector("#email").value.trim().toLowerCase();
    const phone = document.querySelector("#phone").value.trim();
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;
    const gender = document.querySelector("#gender").value;
    const dob = document.querySelector("#dob").value;
    const address = document.querySelector("#address").value.trim();

    if (fullName.length < 3) {
      showMessage("Please enter your full name.", false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage("Please enter a valid email address.", false);
      return;
    }

    if (!/^[0-9+\-\s]{10,15}$/.test(phone)) {
      showMessage("Please enter a valid phone number.", false);
      return;
    }

    if (!gender) {
      showMessage("Please select a gender.", false);
      return;
    }

    if (!dob) {
      showMessage("Please enter your date of birth.", false);
      return;
    }

    if (address.length < 8) {
      showMessage("Please enter your complete address.", false);
      return;
    }

    if (password.length < 6) {
      showMessage("Password must be at least 6 characters.", false);
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match.", false);
      return;
    }

    const user = {
      fullName,
      email,
      phone,
      password,
      gender,
      dob,
      address,
    };

    localStorage.setItem(USER_KEY, JSON.stringify(user));

    showMessage("Account created successfully. Redirecting to login...", true);

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });

  function showMessage(text, success) {
    message.textContent = text;
    message.className = `mb-5 rounded-lg px-4 py-3 text-sm ${
      success
        ? "bg-green-50 text-green-700"
        : "bg-red-50 text-red-700"
    }`;
  }

  window.lucide?.createIcons();
})();