// Sanjeevani Pharmacy - Main Application Controller & Event Listeners

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Router
  router.addRoute("home", (param, q) => renderHomeView());
  router.addRoute("catalog", (param, q) => renderCatalogView(param, q));
  router.addRoute("product", (productId) => renderProductView(productId));
  router.addRoute("prescription", (param, q) => renderPrescriptionView());
  router.addRoute("cart", (param, q) => renderCartView());
  router.addRoute("checkout", (param, q) => renderCheckoutView());
  router.addRoute("tools", (param, q) => renderToolsView());
  router.addRoute("about", (param, q) => renderAboutView());
  router.addRoute("contact", (param, q) => renderContactView());
  router.addRoute("faq", (param, q) => renderFaqView());

  // Setup Initial UI state
  cartManager.updateCartUI();
  cartManager.updateWishlistUI();

  // Setup Search Input Event Listeners
  initSearchAutocomplete();

  // Close modals on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeRxModal();
      closeLoginModal();
      cartManager.closeDrawer();
      closeMobileMenu();
    }
  });
});

// -------------------------------------------------------------
// LIVE SEARCH AUTOCOMPLETE
// -------------------------------------------------------------
function initSearchAutocomplete() {
  const searchInput = document.getElementById("globalSearchInput");
  const liveDropdown = document.getElementById("searchLiveDropdown");
  if (!searchInput || !liveDropdown) return;

  let debounceTimer = null;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    clearTimeout(debounceTimer);

    if (query.length < 2) {
      liveDropdown.style.display = "none";
      return;
    }

    debounceTimer = setTimeout(() => {
      const matches = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.salt.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query) ||
        p.manufacturer.toLowerCase().includes(query)
      ).slice(0, 6);

      if (matches.length === 0) {
        liveDropdown.innerHTML = `
          <div class="search-empty-drop">
            <span>No exact medicine match found for "<strong>${escapeHtml(query)}</strong>"</span>
            <small>Press Enter to search entire catalog or upload your prescription.</small>
          </div>
        `;
      } else {
        liveDropdown.innerHTML = `
          <div class="search-results-list">
            <div class="search-drop-header">
              <span>Matching Medicines & Formulations</span>
              <a href="#catalog?search=${encodeURIComponent(query)}" onclick="liveDropdown.style.display='none'">View All &rarr;</a>
            </div>
            ${matches.map(m => `
              <a href="#product/${m.id}" class="search-item-row" onclick="document.getElementById('searchLiveDropdown').style.display='none'">
                <div class="search-thumb">
                  ${renderProductThumbnail(m.productType, m.accentColor)}
                </div>
                <div class="search-info">
                  <div class="search-name-line">
                    <strong>${m.name}</strong>
                    ${m.isRx ? `<span class="badge-rx sm">Rx</span>` : `<span class="badge-otc sm">OTC</span>`}
                  </div>
                  <span class="search-salt-sub">${m.salt}</span>
                  <div class="search-price-meta">
                    <span class="price">₹${m.price}</span>
                    <del>₹${m.mrp}</del>
                    <span class="discount">${m.discount}% OFF</span>
                  </div>
                </div>
              </a>
            `).join('')}
          </div>
        `;
      }
      liveDropdown.style.display = "block";
    }, 200);
  });

  // Close search dropdown on click outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !liveDropdown.contains(e.target)) {
      liveDropdown.style.display = "none";
    }
  });
}

function executeHeaderSearch() {
  const input = document.getElementById("globalSearchInput");
  const query = input ? input.value.trim() : "";
  const dropdown = document.getElementById("searchLiveDropdown");
  if (dropdown) dropdown.style.display = "none";

  if (query) {
    router.navigate(`catalog?search=${encodeURIComponent(query)}`);
  } else {
    router.navigate("catalog");
  }
}

// -------------------------------------------------------------
// CART DRAWER TOGGLE
// -------------------------------------------------------------
function toggleCartDrawer() {
  cartManager.toggleDrawer();
}

// -------------------------------------------------------------
// MOBILE DRAWER MENU
// -------------------------------------------------------------
function toggleMobileMenu() {
  const drawer = document.getElementById("mobileDrawerMenu");
  const overlay = document.getElementById("mobileDrawerOverlay");
  if (!drawer || !overlay) return;

  const isOpen = drawer.classList.contains("active");
  if (isOpen) {
    closeMobileMenu();
  } else {
    drawer.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("modal-open");
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById("mobileDrawerMenu");
  const overlay = document.getElementById("mobileDrawerOverlay");
  if (drawer) drawer.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
  document.body.classList.remove("modal-open");
}

// -------------------------------------------------------------
// MODALS: QUICK PRESCRIPTION UPLOAD MODAL
// -------------------------------------------------------------
function openRxModal() {
  const modal = document.getElementById("quickRxModal");
  if (modal) {
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
  }
}

function closeRxModal() {
  const modal = document.getElementById("quickRxModal");
  if (modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
}

function handleQuickModalFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  cartManager.saveUploadedRx({
    fileName: file.name,
    uploadedAt: new Date().toLocaleTimeString(),
    fileSize: `${Math.round(file.size / 1024)} KB`
  });

  const previewBox = document.getElementById("modalRxPreview");
  const fileNameEl = document.getElementById("modalRxFileName");
  if (previewBox && fileNameEl) {
    fileNameEl.textContent = file.name;
    previewBox.style.display = "flex";
  }

  cartManager.showToast(`Prescription "${file.name}" uploaded successfully!`);
}

function submitQuickRxModal() {
  const patientName = document.getElementById("modalPatientName")?.value?.trim();
  const phone = document.getElementById("modalPatientPhone")?.value?.trim();

  if (!patientName || !phone) {
    alert("Please enter patient name and contact mobile number.");
    return;
  }

  const ticketId = `RX-${Math.floor(100000 + Math.random() * 900000)}`;

  cartManager.saveUploadedRx({
    ticketId: ticketId,
    patientName: patientName,
    phone: phone,
    fileName: cartManager.uploadedRx?.fileName || "prescription_upload.jpg",
    status: "Under Review"
  });

  closeRxModal();
  cartManager.showToast(`Prescription ticket #${ticketId} submitted! Our pharmacist will call you shortly.`);
  router.navigate("prescription");
}

// -------------------------------------------------------------
// MODALS: ACCOUNT & LOGIN MODAL
// -------------------------------------------------------------
function openLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) {
    modal.style.display = "flex";
    document.body.classList.add("modal-open");
  }
}

function closeLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) {
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  }
}

function handleLoginSubmit() {
  const input = document.getElementById("loginEmailOrPhone")?.value?.trim();
  closeLoginModal();
  cartManager.showToast(`Welcome back, ${input || 'Patient'}! Signed in successfully.`);
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
