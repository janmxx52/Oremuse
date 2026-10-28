"use strict";

/* ==========================================================
   PRODUCT CATALOG DATA (Updated with Romantic Moodboards & Real Model Shots)
   ========================================================== */
const products = [
  {
    id: 1,
    name: "Lana Lace Silk Top",
    price: 78,
    image: "assets/images/Collection5.jpg",
    hoverImage: "assets/images/babydoll1.jpg",
    gallery: [
      "assets/images/Collection5.jpg",
      "assets/images/babydoll1.jpg",
      "assets/images/babydoll.jpg"
    ],
    category: "tops",
    tag: "Romantic Silk",
    ref: "01",
    material: "100% Silk with French Chantilly Lace",
    sizes: ["XS", "S", "M", "L"],
    rating: "5.0 ★ (34 reviews)",
    description: "Delicate silk meets romantic lace, falling softly with every movement. Features delicate adjustable spaghetti straps, front mother-of-pearl closures, and an airy asymmetrical hem. Light, feminine, effortlessly you."
  },
  {
    id: 2,
    name: "Aria Asymmetric Fluid Skirt",
    price: 89,
    image: "assets/images/Collection3.jpg",
    hoverImage: "assets/images/black1.jpg",
    gallery: [
      "assets/images/Collection3.jpg",
      "assets/images/black1.jpg",
      "assets/images/black3.jpg",
      "assets/images/black.jpg",
      "assets/images/black2.jpg"
    ],
    category: "bottoms",
    tag: "Noir Silk",
    ref: "02",
    material: "Fluid Double Silk Chiffon",
    sizes: ["XS", "S", "M", "L"],
    rating: "4.9 ★ (48 reviews)",
    description: "Softly draped with a fluid silhouette, its cascading hem follows every step. Delicate in movement and effortless in feeling. Designed with an elasticated waistband and handkerchief cut for hypnotic drape."
  },
  {
    id: 3,
    name: "Cami Brocade Structured Corset",
    price: 92,
    image: "assets/images/Collection1.jpg",
    hoverImage: "assets/images/Collection1.jpg",

    gallery: [
      "assets/images/Collection1.jpg",
    ],

    category: "tops",
    tag: "Sculpted Edit",
    ref: "03",
    material: "Textured Cotton Brocade",
    sizes: ["XS", "S", "M", "L"],
    rating: "5.0 ★ (26 reviews)",
    description: "Sculpted curves. A feminine structure. Designed to embrace the body and celebrate its natural contours. Finished with gentle architectural boning and a sculpted sweetheart neckline."
  },
  {
    id: 4,
    name: "Lumi Satin & Chiffon Set",
    price: 125,
    image: "assets/images/Collection4.jpg",
    hoverImage: "assets/images/Collection4.jpg",

    gallery: [
      "assets/images/Collection4.jpg",
      "assets/images/NudeBe.jpg",
      "assets/images/NudeBe1.jpg",
      "assets/images/NudeBe4.jpg",
      "assets/images/NudeBe5.jpg"
    ],


    category: "bottoms",
    tag: "Golden Glow",
    ref: "04",
    material: "Smooth Silk Satin & Chiffon Sash",
    sizes: ["XS", "S", "M", "L"],
    rating: "5.0 ★ (41 reviews)",
    description: "Soft against the skin, kissed by a golden glow. A quiet expression of femininity. Two-piece ensemble comprising a bias-cut champagne camisole and an asymmetric skirt with cascading chiffon drape."
  },
  {
    id: 5,
    name: "Flora Ruffle Silk Top",
    price: 82,
    image: "assets/images/Collection2.jpg",
    hoverImage: "assets/images/Collection2.jpg",

    gallery: [
      "assets/images/Collection2.jpg",
    ],

    category: "tops",
    tag: "Soft Ruffles",
    ref: "05",
    material: "Pure Mulberry Silk Crepe",
    sizes: ["XS", "S", "M", "L"],
    rating: "4.9 ★ (19 reviews)",
    description: "Soft ruffles and delicate silk. A romantic feminine silhouette made for your everyday and everything in between. Cut with a flattering scoop neckline and tiered flutter layers."
  },
  {
    id: 7,
    name: "Tailored Silk Vest & Trouser Set",
    price: 135,
    image: "assets/images/NudeBe6.jpg",
    hoverImage: "assets/images/NudeBe6.jpg",
    gallery: ["assets/images/NudeBe6.jpg"],
    category: "tailored",
    tag: "Salon Capsule",
    ref: "07",
    material: "Mulberry Silk & Viscose Crepe",
    sizes: ["XS", "S", "M", "L"],
    rating: "5.0 ★ (36 reviews)",
    description: "A two-piece ensemble embodying modern nonchalant luxury. A sharply cut sleeveless waistcoat matched with relaxed trousers designed for timeless repeat styling."
  },
  {
    id: 9,
    name: "Fluid Summer Trench Coat",
    price: 165,
    image: "assets/images/NudeBe4.jpg",
    hoverImage: "assets/images/NudeBe4.jpg",
    gallery: ["assets/images/NudeBe4.jpg"],
    category: "tailored",
    tag: "New Arrival",
    ref: "09",
    material: "Water-resistant Lyocell & Linen",
    sizes: ["S", "M", "L"],
    rating: "4.9 ★ (17 reviews)",
    description: "An unlined transitional layer with an exaggerated collar, storm flaps, and a relaxed self-tie belt that sculpts an effortless silhouette."
  },
];

const SHIPPING_THRESHOLD = 100;
const money = amount => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

/* Global State */
let activeFilter = "all";
let currentSort = "featured";
let searchQuery = "";
let toastTimeout;
let revealObserver;
let cart = loadCart();
let savedProducts = loadSavedProducts();
let lastFocusedElement = null;
let activeModalProduct = null;
let activeModalSize = "S";

/* ==========================================================
   INITIALIZATION
   ========================================================== */
async function loadComponent(selector, path) {
  const container = document.querySelector(selector);
  if (!container) return false;

  const existingMarkup = container.innerHTML.trim();

  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    const html = await response.text();
    container.innerHTML = html;
    return true;
  } catch (error) {
    if (!existingMarkup) {
      console.warn("Component fetch skipped, using fallback:", error.message);
    }
    return false;
  }
}

async function startApp() {
  await Promise.all([
    loadComponent("#site-header", "components/header.html"),
    loadComponent("#site-footer", "components/footer.html")
  ]);

  initializeAnnouncementSlider();
  initializeHeader();
  initializeFooter();
  initializeRevealAnimations();
  initializeProducts();
  initializeFilters();
  initializeSort();
  initializeCart();
  initializeQuickView();
  initializeLookbook();
  initializeNewsletter();
  initializeHeaderScroll();
  initializeImageFallbacks();
  updateSavedBadges();
}

/* ==========================================================
   ANNOUNCEMENT SLIDER
   ========================================================== */
function initializeAnnouncementSlider() {
  const items = document.querySelectorAll(".announcement-item");
  if (items.length <= 1) return;

  let currentIndex = 0;
  setInterval(() => {
    items[currentIndex].classList.remove("is-active");
    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].classList.add("is-active");
  }, 4200);
}

/* ==========================================================
   HEADER & NAVIGATION
   ========================================================== */
function initializeHeader() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#main-navigation");
  const searchToggle = document.querySelector(".search-toggle");
  const searchPanel = document.querySelector("#search-panel");
  const searchInput = document.querySelector("#product-search");
  const clearSearch = document.querySelector("#clear-search");
  const closeSearchPanel = document.querySelector("#close-search-panel");
  const header = document.querySelector("#page-header");
  const openWishlist = document.querySelector("#open-wishlist");

  const closeMenu = () => {
    navigation?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open menu");
  };

  const updateSearchPosition = () => {
    if (searchPanel?.classList.contains("is-open") && header) {
      searchPanel.style.top = `${Math.max(0, header.getBoundingClientRect().bottom)}px`;
    }
  };

  const closeSearch = (restoreFocus = false) => {
    searchPanel?.classList.remove("is-open");
    searchPanel?.setAttribute("aria-hidden", "true");
    searchToggle?.setAttribute("aria-expanded", "false");
    if (restoreFocus) searchToggle?.focus();
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = navigation?.classList.toggle("is-open") ?? false;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    if (isOpen) closeSearch();
  });

  navigation?.addEventListener("click", event => {
    if (event.target.closest("a")) closeMenu();
  });

  searchToggle?.addEventListener("click", () => {
    const isOpen = !searchPanel?.classList.contains("is-open");
    searchPanel?.classList.toggle("is-open", isOpen);
    searchPanel?.setAttribute("aria-hidden", String(!isOpen));
    searchToggle.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      closeMenu();
      updateSearchPosition();
      searchInput?.focus();
      renderLiveSearchPreview("");
    }
  });

  closeSearchPanel?.addEventListener("click", () => closeSearch(true));

  searchInput?.addEventListener("input", () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    renderLiveSearchPreview(searchQuery);
    renderProducts();
  });

  searchInput?.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    closeSearch();
    document.querySelector("#new-arrivals")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  clearSearch?.addEventListener("click", () => {
    if (!searchInput) return;
    searchInput.value = "";
    searchQuery = "";
    renderLiveSearchPreview("");
    renderProducts();
    searchInput.focus();
  });

  document.querySelectorAll(".suggestion-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const keyword = chip.dataset.suggest || "";
      if (searchInput) searchInput.value = keyword;
      searchQuery = keyword.toLowerCase();
      renderLiveSearchPreview(searchQuery);
      renderProducts();
    });
  });

  openWishlist?.addEventListener("click", () => {
    setActiveFilter("favorites");
    document.querySelector("#new-arrivals")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    closeMenu();
    if (searchPanel?.classList.contains("is-open")) closeSearch(true);
    if (document.querySelector("#cart-drawer")?.classList.contains("is-open")) closeCart();
    if (document.querySelector("#quick-view-backdrop")?.classList.contains("is-open")) closeQuickView();
  });

  document.addEventListener("click", event => {
    if (
      searchPanel?.classList.contains("is-open") &&
      !searchPanel.contains(event.target) &&
      !searchToggle?.contains(event.target)
    ) {
      closeSearch();
    }
  });

  window.addEventListener("scroll", updateSearchPosition, { passive: true });
  window.addEventListener("resize", updateSearchPosition);
}

function renderLiveSearchPreview(query) {
  const container = document.querySelector("#live-search-results");
  if (!container) return;

  if (!query) {
    container.innerHTML = "";
    return;
  }

  const matches = products.filter(p =>
    `${p.name} ${p.category} ${p.material} ${p.tag}`.toLowerCase().includes(query)
  ).slice(0, 4);

  if (matches.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; font-size: 11px; color: var(--muted); margin: 6px 0;">No matching pieces found for "${query}".</p>`;
    return;
  }

  container.innerHTML = matches.map(p => `
    <div class="search-result-item" data-open-product="${p.id}">
      <img src="${p.image}" alt="${p.name}">
      <div class="result-info">
        <strong>${p.name}</strong>
        <span>${money(p.price)}</span>
      </div>
    </div>
  `).join("");
}

function initializeFooter() {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
}

/* ==========================================================
   PRODUCTS CATALOG RENDERING
   ========================================================== */
function initializeProducts() {
  const grid = document.querySelector("#product-grid");
  if (!grid) return;

  grid.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add-product]");
    const savedButton = event.target.closest("[data-wishlist]");
    const quickViewBtn = event.target.closest("[data-quick-view]");

    if (addButton) {
      event.preventDefault();
      addToCart(Number(addButton.dataset.addProduct), "S");
    }
    if (savedButton) {
      event.preventDefault();
      toggleSavedProduct(Number(savedButton.dataset.wishlist));
    }
    if (quickViewBtn) {
      event.preventDefault();
      openQuickView(Number(quickViewBtn.dataset.quickView));
    }
  });

  // Global listener for data-open-product
  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-open-product]");
    if (trigger) {
      const productId = Number(trigger.dataset.openProduct);
      openQuickView(productId);
    }
  });

  renderProducts();
}

function renderProducts() {
  const grid = document.querySelector("#product-grid");
  const count = document.querySelector("#visible-count");
  if (!grid) return;

  let filtered = products.filter(product => {
    const matchesCategory = activeFilter === "all" || activeFilter === "favorites" || product.category === activeFilter;
    const matchesSaved = activeFilter !== "favorites" || savedProducts.includes(product.id);
    const searchableText = `${product.name} ${product.category} ${product.tag} ${product.material}`.toLowerCase();
    return matchesCategory && matchesSaved && searchableText.includes(searchQuery);
  });

  // Sorting
  if (currentSort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === "name-asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (count) count.textContent = filtered.length;

  if (filtered.length === 0) {
    const emptyCopy = activeFilter === "favorites" && !searchQuery
      ? "Save pieces with the heart icon to curate your personal wardrobe edit."
      : "No pieces match your selection. Try clearing filters or exploring another search.";

    grid.innerHTML = `
      <div class="empty-products">
        <span class="empty-products-mark" aria-hidden="true">✳</span>
        <h3>Nothing here just yet.</h3>
        <p>${emptyCopy}</p>
        <button class="button button-outline" type="button" data-reset-filters>View All Pieces ↗</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((product, index) => {
    const isSaved = savedProducts.includes(product.id);
    const hasHover = product.hoverImage && product.hoverImage !== product.image;

    return `
      <article class="product-card reveal" style="--card-delay: ${Math.min(index * 55, 330)}ms">
        <div class="product-visual">
          <div class="product-visual-image-wrapper">
            <img class="product-img-primary" src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
            ${hasHover ? `<img class="product-img-hover" src="${product.hoverImage}" alt="${product.name} worn on model" loading="lazy" decoding="async">` : ""}
          </div>
          
          <span class="product-tag">${product.tag}</span>
          
          <button class="wishlist-toggle" type="button" data-wishlist="${product.id}" aria-label="${isSaved ? "Remove from" : "Save to"} wishlist" aria-pressed="${isSaved}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.7c0 5.1-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.7A4.5 4.5 0 0 1 12 6.5a4.5 4.5 0 0 1 8.8 2.2Z"></path></svg>
          </button>

          <div class="product-card-actions">
            <button class="quick-add-btn" type="button" data-add-product="${product.id}">
              <span>Add to Bag</span>
              <span aria-hidden="true">+</span>
            </button>
            <button class="quick-view-btn" type="button" data-quick-view="${product.id}" aria-label="Quick view details for ${product.name}">
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>

        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${money(product.price)}</p>
        </div>

        <div class="product-meta">
          <p class="product-category">${capitalize(product.category)} <span>·</span> No. ${product.ref}</p>
          <span class="product-material-pill">${product.material.split(" ")[0]}</span>
        </div>
      </article>
    `;
  }).join("");

  observeNewReveals(grid);
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/* ==========================================================
   FILTERS & SORTING
   ========================================================== */
function initializeFilters() {
  document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", () => setActiveFilter(button.dataset.filter));
  });

  document.querySelector("#product-grid")?.addEventListener("click", event => {
    if (event.target.closest("[data-reset-filters]")) {
      searchQuery = "";
      const searchInput = document.querySelector("#product-search");
      if (searchInput) searchInput.value = "";
      setActiveFilter("all");
    }
  });
}

function setActiveFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll(".filter-button").forEach(button => {
    const isActive = button.dataset.filter === activeFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderProducts();
}

function initializeSort() {
  const sortSelect = document.querySelector("#product-sort");
  sortSelect?.addEventListener("change", () => {
    currentSort = sortSelect.value;
    renderProducts();
  });
}

/* ==========================================================
   WISHLIST / SAVED ITEMS
   ========================================================== */
function loadSavedProducts() {
  try {
    const saved = JSON.parse(localStorage.getItem("oremuse-saved") || "[]");
    return Array.isArray(saved) ? saved.filter(id => products.some(p => p.id === id)) : [];
  } catch {
    return [];
  }
}

function saveSavedProducts() {
  try {
    localStorage.setItem("oremuse-saved", JSON.stringify(savedProducts));
  } catch (error) {
    console.warn("Could not save wishlist:", error);
  }
}

function toggleSavedProduct(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const isSaved = savedProducts.includes(productId);
  savedProducts = isSaved ? savedProducts.filter(id => id !== productId) : [...savedProducts, productId];
  saveSavedProducts();
  updateSavedBadges();
  renderProducts();
  updateModalWishlistState();
  showToast(isSaved ? `${product.name} removed from your saved pieces.` : `${product.name} added to your saved pieces.`);
}

function updateSavedBadges() {
  const count = savedProducts.length;
  const navBadge = document.querySelector("#saved-count");
  const filterBadge = document.querySelector("#saved-filter-count");

  if (navBadge) navBadge.textContent = count;
  if (filterBadge) filterBadge.textContent = count;
}

/* ==========================================================
   QUICK VIEW MODAL WITH IMAGE GALLERY
   ========================================================== */
function initializeQuickView() {
  const backdrop = document.querySelector("#quick-view-backdrop");
  const closeBtn = document.querySelector("#close-quick-view");

  closeBtn?.addEventListener("click", closeQuickView);
  backdrop?.addEventListener("click", event => {
    if (event.target === backdrop) closeQuickView();
  });
}

function openQuickView(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  activeModalProduct = product;
  activeModalSize = product.sizes[0] || "S";

  const backdrop = document.querySelector("#quick-view-backdrop");
  const content = document.querySelector("#modal-content");
  if (!backdrop || !content) return;

  const isSaved = savedProducts.includes(product.id);
  const gallery = product.gallery || [product.image];

  content.innerHTML = `
    <div class="modal-gallery">
      <div class="modal-main-image-wrap">
        <img id="modal-main-image" src="${gallery[0]}" alt="${product.name}">
      </div>
      ${gallery.length > 1 ? `
        <div class="modal-thumbnails">
          ${gallery.map((img, i) => `
            <button class="modal-thumb ${i === 0 ? "is-active" : ""}" type="button" data-gallery-img="${img}">
              <img src="${img}" alt="Thumbnail ${i + 1}">
            </button>
          `).join("")}
        </div>
      ` : ""}
    </div>

    <div class="modal-info">
      <p class="eyebrow">${capitalize(product.category)} · No. ${product.ref}</p>
      <h2 id="modal-product-title">${product.name}</h2>
      
      <div class="modal-price-row">
        <span class="modal-price">${money(product.price)}</span>
        <span class="modal-rating">${product.rating}</span>
      </div>

      <p class="modal-description">${product.description}</p>

      <div class="modal-option-group">
        <div class="modal-option-label">
          <span>Select Size</span>
          <span style="font-size: 10px; color: var(--accent); text-transform: none;">True to size · Relaxed silhouette</span>
        </div>
        <div class="size-selector" id="modal-size-selector">
          ${product.sizes.map(size => `
            <button class="size-pill ${size === activeModalSize ? "is-selected" : ""}" type="button" data-size="${size}">${size}</button>
          `).join("")}
        </div>
      </div>

      <div class="modal-actions-row">
        <button class="button button-dark modal-add-button" id="modal-add-to-bag" type="button">
          Add to Bag · ${money(product.price)}
        </button>
        <button class="modal-wishlist-button" id="modal-toggle-wishlist" type="button" aria-pressed="${isSaved}" aria-label="Save piece">
          ${isSaved ? "♥" : "♡"}
        </button>
      </div>

      <div class="modal-fabric-notes">
        <strong>Material & Care:</strong> ${product.material}. Dry clean or gentle hand wash in cold water with delicate silk wash. Lay flat in shade to dry.
      </div>
    </div>
  `;

  // Gallery thumbnail switching
  content.querySelectorAll(".modal-thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      content.querySelectorAll(".modal-thumb").forEach(t => t.classList.remove("is-active"));
      thumb.classList.add("is-active");
      const mainImg = content.querySelector("#modal-main-image");
      if (mainImg) mainImg.src = thumb.dataset.galleryImg;
    });
  });

  // Size selector
  content.querySelectorAll(".size-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      content.querySelectorAll(".size-pill").forEach(p => p.classList.remove("is-selected"));
      pill.classList.add("is-selected");
      activeModalSize = pill.dataset.size;
    });
  });

  // Add to Bag
  content.querySelector("#modal-add-to-bag")?.addEventListener("click", () => {
    addToCart(product.id, activeModalSize);
    closeQuickView();
  });

  // Wishlist
  content.querySelector("#modal-toggle-wishlist")?.addEventListener("click", () => {
    toggleSavedProduct(product.id);
  });

  lastFocusedElement = document.activeElement;
  backdrop.classList.add("is-open");
  backdrop.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  closeBtn?.focus();
}

function closeQuickView() {
  const backdrop = document.querySelector("#quick-view-backdrop");
  if (!backdrop) return;

  backdrop.classList.remove("is-open");
  backdrop.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");

  if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
}

function updateModalWishlistState() {
  if (!activeModalProduct) return;
  const isSaved = savedProducts.includes(activeModalProduct.id);
  const btn = document.querySelector("#modal-toggle-wishlist");
  if (btn) {
    btn.setAttribute("aria-pressed", String(isSaved));
    btn.textContent = isSaved ? "♥" : "♡";
  }
}

/* ==========================================================
   LOOKBOOK HOTSPOTS & ENSEMBLE
   ========================================================== */
function initializeLookbook() {
  document.querySelectorAll(".hotspot").forEach(hotspot => {
    hotspot.addEventListener("click", () => {
      const productId = Number(hotspot.dataset.productId);
      if (productId) openQuickView(productId);
    });
  });

  // Add entire look (Lana Top + Aria Skirt)
  document.querySelector("[data-add-ensemble]")?.addEventListener("click", () => {
    addToCart(1, "S");
    addToCart(2, "S");
    showToast("The complete Romantic Ensemble (Lana Top + Aria Skirt) added to your bag.");
  });
}

/* ==========================================================
   SHOPPING CART LOGIC
   ========================================================== */
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("oremuse-cart") || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter(item =>
      products.some(p => p.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0
    );
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem("oremuse-cart", JSON.stringify(cart));
  } catch (error) {
    console.warn("Cart could not be saved:", error);
  }
}

function initializeCart() {
  document.querySelector("#open-cart")?.addEventListener("click", openCart);
  document.querySelector("#close-cart")?.addEventListener("click", closeCart);
  document.querySelector("#cart-backdrop")?.addEventListener("click", closeCart);

  document.querySelector("#cart-items")?.addEventListener("click", event => {
    const button = event.target.closest("[data-cart-action]");
    if (!button) return;
    const productId = Number(button.dataset.productId);
    const size = button.dataset.productSize || "S";
    updateCartItem(productId, size, button.dataset.cartAction);
  });

  document.querySelector("#checkout-button")?.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Your shopping bag is empty. Explore our collection to find your piece.");
      return;
    }
    const hasGift = document.querySelector("#gift-checkbox")?.checked;
    showToast(hasGift ? "Proceeding to checkout with signature gift packaging..." : "Proceeding to secure checkout...");
  });

  renderCart();
}

function addToCart(productId, size = "S") {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId && item.size === size);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: productId, size, quantity: 1 });
  }

  saveCart();
  renderCart();
  openCart();
  showToast(`${product.name} (${size}) added to your bag.`);
}

function updateCartItem(productId, size, action) {
  const item = cart.find(entry => entry.id === productId && entry.size === size);
  if (!item) return;

  if (action === "increase") item.quantity += 1;
  if (action === "decrease") item.quantity -= 1;
  if (action === "remove" || item.quantity < 1) {
    cart = cart.filter(entry => !(entry.id === productId && entry.size === size));
  }

  saveCart();
  renderCart();
}

function renderCart() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find(entry => entry.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const count = document.querySelector("#cart-count");
  const openCartButton = document.querySelector("#open-cart");
  const drawerCount = document.querySelector("#drawer-cart-count");
  const subtotalElement = document.querySelector("#cart-subtotal");
  const itemsContainer = document.querySelector("#cart-items");
  const progressCopy = document.querySelector("#shipping-progress-copy");
  const progressFill = document.querySelector("#shipping-progress-fill");

  if (count) count.textContent = totalQuantity;
  openCartButton?.setAttribute("aria-label", `Open shopping bag, ${totalQuantity} items`);
  if (drawerCount) drawerCount.textContent = `(${totalQuantity})`;
  if (subtotalElement) subtotalElement.textContent = money(subtotal);

  if (progressCopy) {
    if (subtotal >= SHIPPING_THRESHOLD) {
      progressCopy.textContent = "You have unlocked complimentary worldwide shipping.";
    } else {
      progressCopy.textContent = `Add ${money(SHIPPING_THRESHOLD - subtotal)} more for complimentary shipping.`;
    }
  }

  if (progressFill) {
    progressFill.style.width = `${Math.min(100, (subtotal / SHIPPING_THRESHOLD) * 100)}%`;
  }

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-mark" aria-hidden="true">✳</span>
        <h3>Your shopping bag is quiet.</h3>
        <p>Discover pieces designed to move with you through every season.</p>
        <button class="button button-outline" type="button" data-close-cart>Explore The Collection ↗</button>
      </div>
    `;
    itemsContainer.querySelector("[data-close-cart]")?.addEventListener("click", closeCart);
    return;
  }

  itemsContainer.innerHTML = cart.map(item => {
    const product = products.find(entry => entry.id === item.id);
    if (!product) return "";
    return `
      <article class="cart-item">
        <img src="${product.image}" alt="${product.name}">
        <div class="cart-item-details">
          <div class="cart-item-heading">
            <h3>${product.name}</h3>
            <span>${money(product.price * item.quantity)}</span>
          </div>
          <div class="cart-item-meta">
            ${capitalize(product.category)} · ${money(product.price)} each
            <span class="cart-item-size-badge">Size ${item.size}</span>
          </div>
          <div class="cart-item-controls">
            <div class="quantity-control" aria-label="Quantity for ${product.name}">
              <button type="button" data-cart-action="decrease" data-product-id="${product.id}" data-product-size="${item.size}" aria-label="Decrease quantity">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-cart-action="increase" data-product-id="${product.id}" data-product-size="${item.size}" aria-label="Increase quantity">+</button>
            </div>
            <button class="remove-item" type="button" data-cart-action="remove" data-product-id="${product.id}" data-product-size="${item.size}">Remove</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function openCart() {
  const drawer = document.querySelector("#cart-drawer");
  const backdrop = document.querySelector("#cart-backdrop");
  if (!drawer || !backdrop) return;

  lastFocusedElement = document.activeElement;
  drawer.classList.add("is-open");
  backdrop.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  drawer.inert = false;
  document.body.classList.add("no-scroll");
  document.querySelector("#close-cart")?.focus();
}

function closeCart() {
  const drawer = document.querySelector("#cart-drawer");
  const backdrop = document.querySelector("#cart-backdrop");
  const wasOpen = drawer?.classList.contains("is-open");

  drawer?.classList.remove("is-open");
  backdrop?.classList.remove("is-open");
  drawer?.setAttribute("aria-hidden", "true");
  if (drawer) drawer.inert = true;
  document.body.classList.remove("no-scroll");

  if (wasOpen && lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus();
}

/* ==========================================================
   NEWSLETTER
   ========================================================== */
function initializeNewsletter() {
  const form = document.querySelector("#newsletter-form");
  const message = document.querySelector("#newsletter-message");

  form?.addEventListener("submit", event => {
    event.preventDefault();
    const emailInput = form.querySelector("input[type='email']");
    if (!emailInput || !emailInput.value.includes("@")) {
      if (message) message.textContent = "Please enter a valid email address.";
      return;
    }
    if (message) {
      message.textContent = "Thank you for joining. Our private seasonal invitation has been sent to your inbox.";
      message.style.color = "var(--accent-dark)";
    }
    form.reset();
  });
}

/* ==========================================================
   REVEAL ON SCROLL ANIMATIONS
   ========================================================== */
function initializeRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("is-visible"));
    return;
  }

  revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach(element => revealObserver.observe(element));
}

function observeNewReveals(container) {
  if (!revealObserver) {
    container.querySelectorAll(".reveal").forEach(element => element.classList.add("is-visible"));
    return;
  }
  container.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));
}

/* ==========================================================
   HEADER SCROLL DYNAMICS
   ========================================================== */
function initializeHeaderScroll() {
  const header = document.querySelector("#page-header");
  if (!header) return;

  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

/* ==========================================================
   IMAGE FALLBACKS & TOAST
   ========================================================== */
function initializeImageFallbacks() {
  document.addEventListener(
    "error",
    event => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied === "true") return;
      image.dataset.fallbackApplied = "true";
      image.alt = "Image gracefully unavailable";
      image.classList.add("image-unavailable");
    },
    true
  );
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

/* Start Application */
startApp();
