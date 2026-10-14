(() => {
  const USER_KEY = "daira-demo-user";
  const SESSION_KEY = "daira-demo-session";

  const page = document.querySelector("#page-content");
  if (!page) return;

  page.innerHTML = `
    <section class="min-h-[75vh] bg-[#f8f6f1] px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-md">

        <div class="mb-8 text-center">
          <p class="text-sm font-semibold text-[#1F6306]">
            Welcome Back
          </p>

          <h1 class="mt-2 text-3xl font-bold text-[#203420] sm:text-4xl">
            Login
          </h1>

          <p class="mt-2 text-[#546157]">
            Login to continue shopping with Daira.
          </p>
        </div>

        <form
          id="login-form"
          class="rounded-2xl bg-white p-6 shadow-sm sm:p-8"
        >

          <div
            id="login-message"
            class="mb-5 hidden rounded-lg px-4 py-3 text-sm"
          ></div>

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

          <div class="mt-5">
            <label class="mb-2 block text-sm font-semibold text-[#203420]">
              Password
            </label>

            <input
              type="password"
              id="password"
              required
              class="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-[#1F6306]"
              placeholder="Enter your password"
            >
          </div>

          <div class="mt-4 flex items-center justify-between gap-3">
            <label class="flex items-center gap-2 text-sm text-[#546157]">
              <input
                type="checkbox"
                id="rememberMe"
                class="h-4 w-4 accent-[#1F6306]"
              >
              Remember Me
            </label>

            <button
              type="button"
              id="forgotPassword"
              class="text-sm font-semibold text-[#1F6306] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            class="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F6306] px-5 py-3.5 font-semibold text-white transition hover:bg-[#174d05]"
          >
            <i data-lucide="log-in" class="h-5 w-5"></i>
            Login
          </button>

          <p class="mt-5 text-center text-sm text-[#546157]">
            Don't have an account?
            <a
              href="signup.html"
              class="font-semibold text-[#1F6306] hover:underline"
            >
              Sign Up
            </a>
          </p>

        </form>
      </div>
    </section>
  `;

  const form = document.querySelector("#login-form");
  const message = document.querySelector("#login-message");

  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
      return null;
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value.trim().toLowerCase();
    const password = document.querySelector("#password").value;
    const rememberMe = document.querySelector("#rememberMe").checked;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage("Please enter a valid email address.", false);
      return;
    }

    if (!password) {
      showMessage("Please enter your password.", false);
      return;
    }

    const user = getUser();

    if (!user) {
      showMessage("No account found. Please sign up first.", false);
      return;
    }

    if (email !== user.email || password !== user.password) {
      showMessage("Incorrect email or password.", false);
      return;
    }

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        loggedIn: true,
        email: user.email,
        fullName: user.fullName,
        rememberMe,
      }),
    );

    showMessage("Login successful. Redirecting...", true);

    setTimeout(() => {
      window.location.href = "index.html";
    }, 800);
  });

  document.querySelector("#forgotPassword").addEventListener("click", () => {
    showMessage(
      "Password reset is frontend-only in this demo. Please create a new account if needed.",
      false,
    );
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