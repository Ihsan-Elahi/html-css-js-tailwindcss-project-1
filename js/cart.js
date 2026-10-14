(() => {
	const CART_KEY = "daira-demo-cart";
	const WISHLIST_KEY = "daira-demo-wishlist";

	const readStorage = (key, fallback) => {
		try {
			const value = JSON.parse(localStorage.getItem(key));
			return Array.isArray(value) ? value : fallback;
		} catch {
			return fallback;
		}
	};

	const getCart = () => readStorage(CART_KEY, []);
	const getWishlist = () => readStorage(WISHLIST_KEY, []);

	const notifyCartUpdate = () => {
		window.dispatchEvent(new CustomEvent("daira:cart-updated"));
	};

	const saveCart = (cart) => {
		localStorage.setItem(CART_KEY, JSON.stringify(cart));
		updateNavbarCount();
		notifyCartUpdate();
	};

	const updateNavbarCount = () => {
		const count = getCart().reduce((total, item) => total + item.quantity, 0);
		document.querySelectorAll("[data-cart-count]").forEach((badge) => {
			badge.textContent = count > 99 ? "99+" : String(count);
			badge.style.display = count ? badge.dataset.cartDisplay : "none";
			badge.setAttribute("aria-hidden", String(count === 0));
		});
		document.querySelectorAll("[data-cart-link]").forEach((link) => {
			link.setAttribute("aria-label", count ? `Shopping cart, ${count} items` : "Shopping cart");
		});
	};

	const addToCart = (product, quantity = 1) => {
		const id = String(product.id);
		const amount = Math.max(1, Number(quantity) || 1);
		const cart = getCart();
		const existing = cart.find((item) => String(item.id) === id);

		if (existing) {
			existing.quantity += amount;
		} else {
			cart.push({
				id: product.id,
				name: product.name,
				quantity: amount,
				price: Number(product.price) || 0,
				image: product.image,
				category: product.category,
			});
		}

		saveCart(cart);
		return cart;
	};

	const setQuantity = (productId, quantity) => {
		const nextQuantity = Number(quantity);
		if (!Number.isFinite(nextQuantity) || nextQuantity < 1) return;

		saveCart(getCart().map((item) =>
			String(item.id) === String(productId) ? { ...item, quantity: nextQuantity } : item,
		));
	};

	const removeFromCart = (productId) => {
		saveCart(getCart().filter((item) => String(item.id) !== String(productId)));
	};

	const isWishlisted = (productId) => getWishlist().some((id) => String(id) === String(productId));

	const toggleWishlist = (productId) => {
		const id = String(productId);
		const wishlist = getWishlist();
		const next = isWishlisted(id) ? wishlist.filter((item) => String(item) !== id) : [...wishlist, id];
		localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
		window.dispatchEvent(new CustomEvent("daira:wishlist-updated", { detail: { productId, active: next.includes(id) } }));
		return next.includes(id);
	};

	const renderCartPage = () => {
		const list = document.querySelector("[data-cart-items]");
		if (!list) return;

		const template = document.querySelector("#cart-item-template");
		const empty = document.querySelector("#cart-empty");
		const content = document.querySelector("#cart-content");
		const items = getCart();

		list.replaceChildren();
		if (empty) empty.hidden = items.length > 0;
		if (content) {
			content.hidden = items.length === 0;
			content.style.display = items.length === 0 ? "none" : "";
		}

		items.forEach((item) => {
			const row = template.content.firstElementChild.cloneNode(true);
			row.dataset.cartId = String(item.id);
			const image = row.querySelector("[data-cart-image]");
			image.src = item.image;
			image.alt = item.name;
			row.querySelector("[data-cart-name]").textContent = item.name;
			row.querySelector("[data-cart-category]").textContent = item.category || "Product";
			row.querySelector("[data-cart-price]").textContent = `Rs ${Number(item.price).toLocaleString("en-PK")}`;
			const quantity = row.querySelector("[data-cart-quantity]");
			quantity.value = String(item.quantity);
			row.querySelector("[data-cart-subtotal]").textContent = `Rs ${(item.price * item.quantity).toLocaleString("en-PK")}`;

			row.querySelector("[data-cart-decrease]").addEventListener("click", () => {
				if (item.quantity > 1) setQuantity(item.id, item.quantity - 1);
			});
			row.querySelector("[data-cart-increase]").addEventListener("click", () => setQuantity(item.id, item.quantity + 1));
			quantity.addEventListener("change", () => setQuantity(item.id, quantity.value));
			row.querySelector("[data-cart-remove]").addEventListener("click", () => removeFromCart(item.id));
			list.append(row);
		});

		const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
		document.querySelectorAll("[data-cart-total]").forEach((element) => {
			element.textContent = `Rs ${subtotal.toLocaleString("en-PK")}`;
		});
		const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
		const itemCount = document.querySelector("[data-cart-item-count]");
		if (itemCount) itemCount.textContent = `${totalQuantity} item${totalQuantity === 1 ? "" : "s"}`;
		window.lucide?.createIcons();
	};

	window.DairaCart = {
		getCart,
		getWishlist,
		addToCart,
		setQuantity,
		removeFromCart,
		isWishlisted,
		toggleWishlist,
		updateNavbarCount,
		renderCartPage,
	};

	window.addEventListener("storage", (event) => {
		if (event.key === CART_KEY || event.key === WISHLIST_KEY) {
			updateNavbarCount();
			renderCartPage();
		}
	});

	window.addEventListener("daira:cart-updated", renderCartPage);
	updateNavbarCount();
	renderCartPage();
})();
