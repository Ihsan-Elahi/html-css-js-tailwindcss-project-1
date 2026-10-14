
const loadComponent = async (targetId, path) => {
	const target = document.getElementById(targetId);
	if (!target) return false;

	try {
		const response = await fetch(path);
		if (!response.ok) throw new Error(`Unable to load ${path}: ${response.status}`);
		target.innerHTML = await response.text();
		return true;
	} catch (error) {
		console.error(`Component load failed for ${path}:`, error);
		return false;
	}
};

const getDemoSession = () => {
	try {
		return JSON.parse(localStorage.getItem("daira-demo-session"));
	} catch {
		return null;
	}
};

const updateAuthNavbar = () => {
	const session = getDemoSession();
	const isLoggedIn = session?.loggedIn === true;
	const fullName = session?.fullName || "User";

	document.querySelectorAll("[data-auth-guest]").forEach((element) => {
		element.classList.toggle("hidden", isLoggedIn);
	});

	document.querySelectorAll("[data-auth-user]").forEach((element) => {
		element.classList.toggle("hidden", !isLoggedIn);
	});

	document.querySelectorAll("[data-user-name]").forEach((element) => {
		element.textContent = `Hi, ${fullName}`;
	});
};

const initializeAuthNavbar = () => {
	updateAuthNavbar();

	const navbarRoot = document.querySelector("#navbar");
	if (!navbarRoot || navbarRoot.dataset.authBound === "true") return;

	navbarRoot.dataset.authBound = "true";
	navbarRoot.addEventListener("click", (event) => {
		const logoutButton = event.target.closest("[data-logout]");
		if (!logoutButton) return;

		localStorage.removeItem("daira-demo-session");
		updateAuthNavbar();

		const mobileMenu = document.querySelector("#mobile-menu");
		const menuToggle = document.querySelector("#menu-toggle");
		if (mobileMenu?.classList.contains("is-open")) {
			mobileMenu.classList.remove("is-open");
			mobileMenu.setAttribute("aria-hidden", "true");
			menuToggle?.setAttribute("aria-expanded", "false");
			menuToggle?.setAttribute("aria-label", "Open navigation menu");
			document.body.style.overflow = "";
		}

		window.lucide?.createIcons();
	});
};

const initializeNavbar = () => {
	const menuToggle = document.querySelector("#menu-toggle");
	const mobileMenu = document.querySelector("#mobile-menu");
	if (!menuToggle || !mobileMenu) return;

	const setMenuOpen = (open) => {
		mobileMenu.classList.toggle("is-open", open);
		mobileMenu.setAttribute("aria-hidden", String(!open));
		menuToggle.setAttribute("aria-expanded", String(open));
		menuToggle.setAttribute(
			"aria-label",
			open ? "Close navigation menu" : "Open navigation menu",
		);
		document.body.style.overflow = open ? "hidden" : "";
	};

	menuToggle.addEventListener("click", () => {
		setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
	});

	mobileMenu.querySelectorAll("[data-menu-close]").forEach((button) => {
		button.addEventListener("click", () => setMenuOpen(false));
	});

	mobileMenu.querySelectorAll("[data-menu-link]").forEach((link) => {
		link.addEventListener("click", () => setMenuOpen(false));
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
			setMenuOpen(false);
		}
	});

	window.addEventListener("resize", () => {
		if (window.matchMedia("(min-width: 1024px)").matches) {
			setMenuOpen(false);
		}
	});

	const currentPage = window.location.pathname.split("/").pop() || "index.html";
	document.querySelectorAll("[data-nav-page]").forEach((link) => {
		const targetPage = link.dataset.navPage;
		const isCurrentPage = targetPage === currentPage;
		link.classList.toggle("nav-link-active", isCurrentPage);
		if (isCurrentPage) link.setAttribute("aria-current", "page");
		else link.removeAttribute("aria-current");
	});
};

const initializeHeroSlider = () => {
	const heroSlides = [...document.querySelectorAll("[data-hero-slide]")];
	if (!heroSlides.length) return;

	let activeHeroIndex = 0;
	let heroTimer;

	const showHeroSlide = (index) => {
		activeHeroIndex = (index + heroSlides.length) % heroSlides.length;

		heroSlides.forEach((slide, slideIndex) => {
			const isActive = slideIndex === activeHeroIndex;
			slide.classList.toggle("is-active", isActive);
			slide.setAttribute("aria-hidden", String(!isActive));
		});

	};

	const restartHeroTimer = () => {
		window.clearInterval(heroTimer);
		if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			heroTimer = window.setInterval(() => showHeroSlide(activeHeroIndex + 1), 6500);
		}
	};

	document.querySelector(".hero-arrow-prev")?.addEventListener("click", () => {
		showHeroSlide(activeHeroIndex - 1);
		restartHeroTimer();
	});

	document.querySelector(".hero-arrow-next")?.addEventListener("click", () => {
		showHeroSlide(activeHeroIndex + 1);
		restartHeroTimer();
	});

	document.querySelector(".hero-slider")?.addEventListener("mouseenter", () => {
		window.clearInterval(heroTimer);
	});

	document.querySelector(".hero-slider")?.addEventListener("mouseleave", restartHeroTimer);
	restartHeroTimer();
};

const initializeStatistics = () => {
	const statisticItems = [...document.querySelectorAll("[data-count]")];
	if (!statisticItems.length) return;

	const animateStatistics = () => {
		const duration = 1100;
		const startTime = performance.now();

		const update = (now) => {
			const progress = Math.min((now - startTime) / duration, 1);
			const eased = 1 - (1 - progress) ** 3;

			statisticItems.forEach((item) => {
				const target = Number(item.dataset.count);
				item.textContent = `${Math.floor(target * eased)}+`;
			});

			if (progress < 1) requestAnimationFrame(update);
		};

		requestAnimationFrame(update);
	};

	if ("IntersectionObserver" in window) {
		const statsObserver = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) {
				animateStatistics();
				statsObserver.disconnect();
			}
		}, { threshold: 0.35 });

		const statsSection = document.querySelector("#statistics");
		if (statsSection) statsObserver.observe(statsSection);
	} else {
		statisticItems.forEach((item) => {
			item.textContent = `${item.dataset.count}+`;
		});
	}
};

const initializeContactForm = () => {
	const contactForm = document.querySelector("#contact-form");
	const contactStatus = document.querySelector("#contact-status");
	if (!contactForm || !contactStatus) return;

	contactForm.addEventListener("submit", (event) => {
		event.preventDefault();
		contactStatus.textContent = "";

		if (!contactForm.reportValidity()) return;

		contactStatus.textContent = "Thanks for reaching out. This demo form does not send data.";
		contactStatus.classList.add("text-primary");
		contactForm.reset();
	});
};

const loadSharedComponents = async () => {
	const [navbarLoaded, footerLoaded] = await Promise.all([
		loadComponent("navbar", "components/navbar.html"),
		loadComponent("footer", "components/footer.html"),
	]);

	if (navbarLoaded) {
		initializeNavbar();
		initializeAuthNavbar();

		const navbar = document.querySelector("#navbar > header");

		if (navbar) {
			const updateNavbarHeight = () => {
				document.documentElement.style.setProperty(
					"--navbar-height",
					`${navbar.offsetHeight}px`,
				);
			};

			updateNavbarHeight();
			window.addEventListener("resize", updateNavbarHeight);
		}
	}

	window.DairaCart?.updateNavbarCount();
	window.lucide?.createIcons();

	if (footerLoaded) {
		const copyrightYear = document.querySelector("#copyright-year");
		if (copyrightYear) {
			copyrightYear.textContent = String(new Date().getFullYear());
		}
	}

	initializeHeroSlider();
	initializeStatistics();
	initializeContactForm();
};

loadSharedComponents();
