window.tailwind = window.tailwind || {};
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        heading: "var(--color-heading)",
        text: "var(--color-text)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        "sub-heading": "var(--color-sub-heading)",
        overlay: "var(--color-overlay)",
        "menu-text": "var(--color-menu-text)",
        circle: "var(--color-circle)",
        "footer-text": "var(--color-footer-text)",
        "bottom-bg": "var(--color-bottom-bg)",
        "bottom-text": "var(--color-bottom-text)",
        "pro-text": "var(--color-pro-text)",
      },
      fontFamily: {
        body: ["DM Sans", "sans-serif"],
        display: ["Amatic SC", "sans-serif"],
        script: ["Great Vibes", "cursive"],
        brand: ["Reey", "cursive"],
      },
    },
  },
};
