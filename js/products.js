const products = [
	{
		id: 1,
		name: "NPK Balanced Fertilizer 20-20-20",
		slug: "npk-balanced-fertilizer-20-20-20",
		category: "Fertilizers",
		price: 4200,
		oldPrice: 4900,
		rating: 4.8,
		description: "A balanced water-soluble fertilizer for strong roots, healthy leaves, and reliable flowering across a range of crops.",
		image: "https://images.unsplash.com/photo-1719532520316-4cc0d8886ab7?w=900&auto=format&fit=crop&q=80",
		stock: 24,
		featured: true,
	},
	{
		id: 2,
		name: "Urea Nitrogen Fertilizer 50 kg",
		slug: "urea-nitrogen-fertilizer-50kg",
		category: "Fertilizers",
		price: 4600,
		oldPrice: null,
		rating: 4.6,
		description: "Granular nitrogen fertilizer for vegetative growth in field crops. Apply according to soil test and crop guidance.",
		image: "https://images.unsplash.com/photo-1593999094742-4f5280054b23?w=900&auto=format&fit=crop&q=80",
		stock: 38,
		featured: false,
	},
	{
		id: 3,
		name: "DAP Phosphate Fertilizer 50 kg",
		slug: "dap-phosphate-fertilizer-50kg",
		category: "Fertilizers",
		price: 12800,
		oldPrice: 13500,
		rating: 4.9,
		description: "Phosphorus-rich fertilizer to support early root establishment and healthy crop development.",
		image: "https://images.unsplash.com/photo-1602867741746-6df80f40b3f6?w=900&auto=format&fit=crop&q=80",
		stock: 16,
		featured: true,
	},
	{
		id: 4,
		name: "Potash Sulphate 25 kg",
		slug: "potash-sulphate-25kg",
		category: "Fertilizers",
		price: 7900,
		oldPrice: null,
		rating: 4.5,
		description: "A potassium and sulphur source for fruit quality, plant strength, and balanced crop nutrition.",
		image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&auto=format&fit=crop&q=80",
		stock: 12,
		featured: false,
	},
	{
		id: 5,
		name: "Organic Humic Soil Conditioner 1 L",
		slug: "organic-humic-soil-conditioner",
		category: "Plant Growth",
		price: 1850,
		oldPrice: 2200,
		rating: 4.7,
		description: "Concentrated humic solution for improving soil structure and supporting nutrient availability.",
		image: "https://images.unsplash.com/photo-1590415024718-798cdaab96dd?w=900&auto=format&fit=crop&q=80",
		stock: 31,
		featured: true,
	},
	{
		id: 6,
		name: "Hybrid Maize Seeds 5 kg",
		slug: "hybrid-maize-seeds-5kg",
		category: "Seeds",
		price: 5600,
		oldPrice: null,
		rating: 4.8,
		description: "Selected hybrid maize seed for uniform establishment and dependable performance in suitable growing conditions.",
		image: "https://images.unsplash.com/photo-1563760836797-bf5d5f9d2243?w=900&auto=format&fit=crop&q=80",
		stock: 20,
		featured: true,
	},
	{
		id: 7,
		name: "Hybrid Tomato Seeds 100 g",
		slug: "hybrid-tomato-seeds-100g",
		category: "Seeds",
		price: 1250,
		oldPrice: 1450,
		rating: 4.6,
		description: "Hybrid tomato seed for home gardens and commercial growers, packed for careful storage and sowing.",
		image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=900&auto=format&fit=crop&q=80",
		stock: 42,
		featured: false,
	},
	{
		id: 8,
		name: "Hybrid Cucumber Seeds 50 g",
		slug: "hybrid-cucumber-seeds-50g",
		category: "Seeds",
		price: 890,
		oldPrice: null,
		rating: 4.4,
		description: "Hybrid cucumber seed selected for vigorous vines and consistent fruit development in suitable conditions.",
		image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=900&auto=format&fit=crop&q=80",
		stock: 27,
		featured: false,
	},
	{
		id: 9,
		name: "Neem-Based Bio Insecticide 1 L",
		slug: "neem-bio-insecticide-1l",
		category: "Crop Protection",
		price: 2150,
		oldPrice: 2450,
		rating: 4.5,
		description: "Neem-based crop protection concentrate for integrated pest management. Follow label directions before use.",
		image: "https://images.unsplash.com/photo-1627920769842-6887c6df05ca?w=900&auto=format&fit=crop&q=80",
		stock: 18,
		featured: false,
	},
	{
		id: 10,
		name: "Copper Crop Fungicide 500 g",
		slug: "copper-crop-fungicide-500g",
		category: "Crop Protection",
		price: 1750,
		oldPrice: null,
		rating: 4.3,
		description: "Copper-based fungicide for preventive crop disease programs. Use only as directed on the product label.",
		image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=900&auto=format&fit=crop&q=80",
		stock: 9,
		featured: false,
	},
	{
		id: 11,
		name: "Plant Growth Seaweed Extract 1 L",
		slug: "plant-growth-seaweed-extract-1l",
		category: "Plant Growth",
		price: 2650,
		oldPrice: 2950,
		rating: 4.8,
		description: "Seaweed extract for foliar or soil application as part of a balanced crop nutrition program.",
		image: "https://plus.unsplash.com/premium_photo-1678371210267-44e0aeee4b72?w=900&auto=format&fit=crop&q=80",
		stock: 22,
		featured: true,
	},
	{
		id: 12,
		name: "Crop Protection Spray 500 ml",
		slug: "crop-protection-spray-500ml",
		category: "Crop Protection",
		price: 1380,
		oldPrice: null,
		rating: 4.2,
		description: "Ready-to-use garden crop care spray. Read product directions and observe safety precautions before application.",
		image: "https://images.unsplash.com/photo-1719532520316-4cc0d8886ab7?w=900&auto=format&fit=crop&q=80",
		stock: 0,
		featured: false,
	},
];

const formatPrice = (price) => `Rs ${Number(price).toLocaleString("en-PK")}`;

const refreshIcons = () => window.lucide?.createIcons();

const setWishlistButton = (button, product) => {
	const active = window.DairaCart?.isWishlisted(product.id) || false;
	button.classList.toggle("is-wishlisted", active);
	button.setAttribute("aria-pressed", String(active));
	button.setAttribute("aria-label", active ? "Remove from wishlist" : "Add to wishlist");
};

const createProductCard = (product) => {
	const template = document.querySelector("#product-card-template");
	if (!template) return null;

	const card = template.content.firstElementChild.cloneNode(true);
	const image = card.querySelector("[data-product-image]");
	const oldPrice = card.querySelector("[data-product-old-price]");
	const stock = card.querySelector("[data-product-stock]");
	const wishButton = card.querySelector("[data-wishlist-toggle]");
	const addButton = card.querySelector("[data-add-to-cart]");

	card.dataset.productId = String(product.id);
	image.src = product.image;
	image.alt = product.name;
	card.querySelector("[data-product-name]").textContent = product.name;
	card.querySelector("[data-product-category]").textContent = product.category;
	card.querySelector("[data-product-rating]").textContent = product.rating.toFixed(1);
	card.querySelector("[data-product-description]").textContent = product.description;
	card.querySelector("[data-product-price]").textContent = formatPrice(product.price);

	if (product.oldPrice) {
		oldPrice.textContent = formatPrice(product.oldPrice);
		oldPrice.hidden = false;
	}

	if (product.featured) card.querySelector("[data-featured-badge]").hidden = false;
	if (product.stock > 0) {
		stock.textContent = "In stock";
	} else {
		stock.textContent = "Out of stock";
		stock.classList.add("text-red-700");
	}

	const detailsLink = card.querySelector("[data-details-link]");
	detailsLink.href = `product-details.html?id=${product.id}`;
	wishButton.dataset.productId = String(product.id);
	setWishlistButton(wishButton, product);
	wishButton.addEventListener("click", () => {
		window.DairaCart?.toggleWishlist(product.id);
		setWishlistButton(wishButton, product);
	});

	addButton.disabled = product.stock < 1;
	addButton.addEventListener("click", () => {
		window.DairaCart?.addToCart(product);
		const status = document.querySelector("#product-status");
		if (status) status.textContent = `${product.name} added to cart.`;
	});

	return card;
};

const renderProductGrid = (items, target) => {
	if (!target) return;
	target.replaceChildren(...items.map(createProductCard).filter(Boolean));
	refreshIcons();
};

const initializeProductsPage = () => {
	const grid = document.querySelector("#product-grid");
	if (!grid) return;

	const searchInput = document.querySelector("#product-search");
	const categoryList = document.querySelector("#category-filters");
	const sortSelect = document.querySelector("#product-sort");
	const resultCount = document.querySelector("#product-result-count");
	const emptyState = document.querySelector("#no-products");
	const status = document.querySelector("#product-status");
	let activeCategory = "All";

	const categories = ["All", ...new Set(products.map((product) => product.category))];
	categoryList.replaceChildren(...categories.map((category) => {
		const button = document.createElement("button");
		button.type = "button";
		button.className = "category-filter";
		button.textContent = category;
		button.dataset.category = category;
		button.setAttribute("aria-pressed", String(category === activeCategory));
		button.addEventListener("click", () => {
			activeCategory = category;
			categoryList.querySelectorAll("[data-category]").forEach((filter) => {
				filter.setAttribute("aria-pressed", String(filter.dataset.category === activeCategory));
			});
			updateGrid();
		});
		return button;
	}));

	const updateGrid = () => {
		const query = searchInput.value.trim().toLocaleLowerCase();
		let filtered = products.filter((product) => {
			const matchesCategory = activeCategory === "All" || product.category === activeCategory;
			const searchText = `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase();
			return matchesCategory && (!query || searchText.includes(query));
		});

		switch (sortSelect.value) {
			case "price-low":
				filtered = [...filtered].sort((a, b) => a.price - b.price);
				break;
			case "price-high":
				filtered = [...filtered].sort((a, b) => b.price - a.price);
				break;
			case "rating":
				filtered = [...filtered].sort((a, b) => b.rating - a.rating);
				break;
			case "name":
				filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
				break;
		}

		renderProductGrid(filtered, grid);
		resultCount.textContent = `${filtered.length} products`;
		emptyState.hidden = filtered.length > 0;
		if (status) status.textContent = "";
	};

	searchInput.addEventListener("input", updateGrid);
	sortSelect.addEventListener("change", updateGrid);
	document.querySelector("#clear-product-filters").addEventListener("click", () => {
		searchInput.value = "";
		sortSelect.value = "default";
		activeCategory = "All";
		categoryList.querySelectorAll("[data-category]").forEach((filter) => {
			filter.setAttribute("aria-pressed", String(filter.dataset.category === activeCategory));
		});
		updateGrid();
	});

	window.addEventListener("daira:wishlist-updated", () => {
		grid.querySelectorAll("[data-wishlist-toggle]").forEach((button) => {
			const product = products.find((item) => String(item.id) === button.dataset.productId);
			if (product) setWishlistButton(button, product);
		});
	});

	updateGrid();
};

const initializeProductDetailsPage = () => {
	const details = document.querySelector("#product-detail");
	if (!details) return;

	const params = new URLSearchParams(window.location.search);
	const productId = params.get("id");
	const slug = params.get("slug");
	const product = products.find((item) =>
		productId ? String(item.id) === productId : item.slug === slug,
	);
	const notFound = document.querySelector("#product-not-found");

	if (!product) {
		details.hidden = true;
		notFound.hidden = false;
		return;
	}

	details.hidden = false;
	notFound.hidden = true;
	document.querySelector("#detail-image").src = product.image;
	document.querySelector("#detail-image").alt = product.name;
	document.querySelector("#detail-name").textContent = product.name;
	document.querySelector("#detail-category").textContent = product.category;
	document.querySelector("#detail-rating").textContent = `${product.rating.toFixed(1)} / 5`;
	document.querySelector("#detail-product-id").textContent = String(product.id);
	document.querySelector("#detail-price").textContent = formatPrice(product.price);
	document.querySelector("#detail-description").textContent = product.description;
	document.querySelector("#detail-stock").textContent = product.stock > 0 ? `${product.stock} available` : "Out of stock";

	const oldPrice = document.querySelector("#detail-old-price");
	if (product.oldPrice) {
		oldPrice.textContent = formatPrice(product.oldPrice);
		oldPrice.hidden = false;
	}

	const quantityInput = document.querySelector("#detail-quantity");
	document.querySelector("#quantity-decrease").addEventListener("click", () => {
		quantityInput.value = String(Math.max(1, Number(quantityInput.value) - 1));
	});
	document.querySelector("#quantity-increase").addEventListener("click", () => {
		quantityInput.value = String(Math.min(Math.max(1, product.stock), Number(quantityInput.value) + 1));
	});

	const addButton = document.querySelector("#detail-add-to-cart");
	addButton.disabled = product.stock < 1;
	addButton.addEventListener("click", () => {
		window.DairaCart?.addToCart(product, Number(quantityInput.value));
		document.querySelector("#detail-status").textContent = `${product.name} added to cart.`;
	});

	const wishlistButton = document.querySelector("#detail-wishlist");
	const updateWishlistButton = () => setWishlistButton(wishlistButton, product);
	updateWishlistButton();
	wishlistButton.addEventListener("click", () => {
		window.DairaCart?.toggleWishlist(product.id);
		updateWishlistButton();
	});
	window.addEventListener("daira:wishlist-updated", updateWishlistButton);

	const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3);
	renderProductGrid(related, document.querySelector("#related-products-grid"));
};

initializeProductsPage();
initializeProductDetailsPage();
