// Sanjeevani Pharmacy - High Performance Dynamic View Renderers

const viewContainer = () => document.getElementById("mainAppView");

// -------------------------------------------------------------
// HELPER: Product Card HTML Component
// -------------------------------------------------------------
function createProductCard(product) {
  const inWishlist = cartManager.isInWishlist(product.id);
  const cartItem = cartManager.cart.find(item => item.productId === product.id);
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  return `
    <div class="med-product-card ${product.isRx ? 'has-rx' : ''}" data-product-id="${product.id}">
      <div class="card-badge-row">
        ${product.isRx 
          ? `<span class="badge-rx" title="Valid Doctor Prescription Required">Rx Required</span>` 
          : `<span class="badge-otc" title="Over The Counter - No Prescription Needed">OTC</span>`}
        ${product.badge ? `<span class="badge-special">${product.badge}</span>` : ''}
        <button 
          class="card-wishlist-btn ${inWishlist ? 'active' : ''}" 
          data-wishlist-id="${product.id}"
          onclick="cartManager.toggleWishlist('${product.id}')"
          title="Save to Wishlist"
          aria-label="Save to Wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${inWishlist ? '#E11D48' : 'none'}" stroke="${inWishlist ? '#E11D48' : 'currentColor'}" stroke-width="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </button>
      </div>

      <a href="#product/${product.id}" class="card-image-wrap">
        ${renderProductThumbnail(product.productType, product.accentColor)}
      </a>

      <div class="card-content">
        <div class="card-manufacturer">${product.manufacturer}</div>
        <h3 class="card-title">
          <a href="#product/${product.id}">${product.name}</a>
        </h3>
        <p class="card-salt-text" title="${product.salt}">${product.salt}</p>

        <div class="card-meta-row">
          <span class="card-pack-info">${product.packSize}</span>
          <div class="card-rating">
            <span class="star-icon">★</span>
            <span class="rating-num">${product.rating}</span>
            <span class="rating-count">(${product.reviewCount})</span>
          </div>
        </div>

        <div class="card-pricing-row">
          <div class="price-stack">
            <span class="current-price">₹${product.price}</span>
            <span class="original-mrp">₹${product.mrp}</span>
            <span class="discount-pill">${product.discount}% OFF</span>
          </div>
        </div>

        <div class="card-action-wrap">
          ${qtyInCart > 0 ? `
            <div class="card-qty-control">
              <button onclick="cartManager.updateQuantity('${cartItem.key}', ${qtyInCart - 1})" class="card-qty-btn">&minus;</button>
              <span class="card-qty-num">${qtyInCart} in Cart</span>
              <button onclick="cartManager.updateQuantity('${cartItem.key}', ${qtyInCart + 1})" class="card-qty-btn">&#43;</button>
            </div>
          ` : `
            <button class="btn btn-add-cart" onclick="cartManager.addItem('${product.id}', 1, 0)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Add to Cart</span>
            </button>
          `}
        </div>

        <div class="card-delivery-tag">
          <span class="bolt-icon">⚡</span>
          <span>${product.deliveryTime}</span>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 1. HOME VIEW
// -------------------------------------------------------------
function renderHomeView() {
  const featuredRx = PRODUCTS.filter(p => p.isRx).slice(0, 4);
  const popularOtc = PRODUCTS.filter(p => !p.isRx).slice(0, 4);
  const chronicCare = PRODUCTS.filter(p => p.category === "diabetes" || p.category === "cardiac").slice(0, 4);

  const html = `
    <!-- Top Emergency & Express Alert -->
    <div class="emergency-strip">
      <div class="container emergency-flex">
        <div class="emergency-left">
          <span class="pulse-dot"></span>
          <strong>24/7 Licensed Pharmacy Operations:</strong>
          <span>Express 2-Hour Delivery Active Across All Major Pin Codes.</span>
        </div>
        <div class="emergency-right">
          <span>Need Emergency Help? Call Pharmacist: <a href="tel:18002669922"><strong>1800-266-9922</strong></a> (Toll-Free)</span>
        </div>
      </div>
    </div>

    <!-- Hero Promotional Showcase -->
    <section class="pharmacy-hero">
      <div class="container hero-layout-grid">
        <div class="hero-main-banner">
          <div class="hero-content-glass">
            <span class="hero-mini-pill">🛡️ Licensed Central E-Pharmacy • DL-2026-MED9928</span>
            <h1 class="hero-headline">
              100% Genuine Medicines, <br />
              <span class="hero-highlight">Delivered in 2 Hours.</span>
            </h1>
            <p class="hero-subtext">
              Directly sourced from WHO-GMP certified manufacturers. Safe temperature-controlled packaging, licensed pharmacist verification, and flat 20% off on all prescription refills.
            </p>
            <div class="hero-cta-buttons">
              <a href="#prescription" class="btn btn-primary btn-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="12" y1="18" x2="12" y2="12"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
                <span>Upload Prescription</span>
              </a>
              <a href="#catalog" class="btn btn-secondary btn-lg">
                <span>Browse Medicines</span>
                <span class="arrow-right">&rarr;</span>
              </a>
            </div>
            <div class="hero-trust-metrics">
              <div class="metric-item">
                <strong>10M+</strong>
                <span>Prescriptions Filled</span>
              </div>
              <div class="metric-divider"></div>
              <div class="metric-item">
                <strong>100%</strong>
                <span>Direct Manufacturer Sourcing</span>
              </div>
              <div class="metric-divider"></div>
              <div class="metric-item">
                <strong>2 Hours</strong>
                <span>Express Cold Chain Delivery</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Action Sidebar Card -->
        <div class="hero-side-card">
          <div class="quick-rx-upload-box">
            <div class="quick-rx-badge">
              <span class="rx-symbol">℞</span>
              <span>QUICK ORDER</span>
            </div>
            <h3>Have a Doctor's Prescription?</h3>
            <p>Upload a clear photo. Our registered pharmacists will cross-check dosages, assemble your cart, and call for confirmation.</p>
            <div class="rx-upload-dropzone-mini" onclick="openRxModal()">
              <div class="upload-icon-circle">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00897B" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <span class="upload-main-text">Tap to Upload Prescription</span>
              <span class="upload-sub-text">Supports JPG, PNG, PDF up to 10MB</span>
            </div>
            <div class="rx-guarantees">
              <span>✓ Verified by B.Pharm Pharmacist</span>
              <span>✓ 20% Discount Auto-Applied</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dynamic Offers, Health Coins & Health Days Showcase -->
    <section class="section offers-showcase-section" style="background: linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%); padding: 32px 0; border-top: 1px solid #A7F3D0; border-bottom: 1px solid #A7F3D0;">
      <div class="container">
        <div class="section-header-row" style="margin-bottom: 20px;">
          <div>
            <span class="section-tag" style="background: #059669; color: #FFF; padding: 4px 10px; border-radius: 4px; font-weight: 700;">🎁 SANJEEVANI SPECIAL OFFERS &amp; REWARDS</span>
            <h2 class="section-heading" style="margin-top: 6px;">Active Promotional Savings &amp; Health Days</h2>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
          <!-- Card 1: First Order 25% OFF -->
          <div style="background: #FFFFFF; border: 2px dashed #059669; padding: 18px; border-radius: 12px; position: relative;">
            <div style="font-size: 1.5rem; margin-bottom: 6px;">🎉</div>
            <h3 style="font-size: 1.1rem; color: #065F46; font-weight: 700;">First Order: 25% OFF</h3>
            <p style="font-size: 0.85rem; color: #374151; margin: 6px 0 12px 0;">First-time users get <strong>25% OFF</strong> on medicine orders above ₹100!</p>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 0.8rem; font-weight: 700; background: #D1FAE5; color: #065F46; padding: 4px 8px; border-radius: 6px;">CODE: WELCOME25</span>
              <button class="btn btn-sm btn-primary" onclick="cartManager.applyCoupon('WELCOME25');">Apply 25% OFF</button>
            </div>
          </div>

          <!-- Card 2: Navi-Style Random Cashback Coins -->
          <div style="background: #FFFFFF; border: 2px solid #F59E0B; padding: 18px; border-radius: 12px;">
            <div style="font-size: 1.5rem; margin-bottom: 6px;">🪙</div>
            <h3 style="font-size: 1.1rem; color: #92400E; font-weight: 700;">Navi-Style Cashback Coins</h3>
            <p style="font-size: 0.85rem; color: #374151; margin: 6px 0 12px 0;">Earn random coins on every order! <strong>50 Coins = ₹0.50 Discount</strong>. Redeem coins at checkout.</p>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 0.85rem; font-weight: 700; color: #B45309;">50 Coins = ₹0.50 Saved</span>
              <a href="#catalog" class="btn btn-sm btn-outline" style="border-color: #F59E0B; color: #B45309;">Shop &amp; Earn</a>
            </div>
          </div>

          <!-- Card 3: Free Delivery Rules & 5% OFF -->
          <div style="background: #FFFFFF; border: 2px solid #0284C7; padding: 18px; border-radius: 12px;">
            <div style="font-size: 1.5rem; margin-bottom: 6px;">🚚</div>
            <h3 style="font-size: 1.1rem; color: #075985; font-weight: 700;">Free Delivery &amp; 5% OFF</h3>
            <p style="font-size: 0.85rem; color: #374151; margin: 6px 0 12px 0;">• <strong>FREE Delivery</strong> on 1st 3 orders &amp; distance &le; 5 km!<br />• <strong>5% OFF</strong> on orders above ₹499.<br />• <strong>⏰ 15% OFF Happy Hour</strong> (9:30 - 11:30 AM)!</p>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 0.8rem; font-weight: 700; background: #E0F2FE; color: #0369A1; padding: 4px 8px; border-radius: 6px;">AUTO-APPLIED</span>
              <a href="#catalog" class="btn btn-sm btn-primary">Start Order</a>
            </div>
          </div>
        </div>

        <!-- Health Days Calendar Interactive Strip -->
        <div style="margin-top: 24px; background: #FFFFFF; border: 1px solid #D1D5DB; border-radius: 12px; padding: 18px;">
          <h3 style="font-size: 1.05rem; font-weight: 700; color: #111827; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <span>🗓️ Special Health Days &amp; Calendar Offers (35% OFF)</span>
          </h3>
          <p style="font-size: 0.85rem; color: #4B5563; margin-bottom: 12px;">Enjoy 35% OFF on New Year's Day (Jan 1st), World Health Day (Apr 7th), May 30th (25% OFF), and all Official Health Days!</p>
          <div style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 8px;">
            ${HEALTH_DAYS.map(hd => `
              <div style="min-width: 170px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 10px; font-size: 0.8rem;">
                <div style="display: flex; align-items: center; gap: 6px; font-weight: 700; color: #059669;">
                  <span>${hd.icon}</span>
                  <span>${hd.month}/${hd.day}</span>
                </div>
                <div style="font-weight: 700; color: #111827; margin: 4px 0 2px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${hd.name}">${hd.name}</div>
                <div style="color: #DC2626; font-weight: 800;">${hd.offer}</div>
                <button class="btn btn-sm btn-outline" style="width: 100%; margin-top: 6px; padding: 2px 6px; font-size: 0.75rem;" onclick="cartManager.applyCoupon('${hd.code}');">Apply Code</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Essential Categories Strip -->
    <section class="section category-strip-section">
      <div class="container">
        <div class="section-header-row">
          <div>
            <span class="section-tag">EXPLORE BY HEALTH NEED</span>
            <h2 class="section-heading">Popular Healthcare Categories</h2>
          </div>
          <a href="#catalog" class="section-view-all">View All Categories &rarr;</a>
        </div>
        <div class="category-grid">
          ${PHARMACY_CATEGORIES.filter(c => c.id !== "all").map(cat => `
            <a href="#catalog?category=${cat.id}" class="category-card" data-category="${cat.id}">
              <div class="cat-icon-bubble">${cat.icon}</div>
              <span class="cat-name">${cat.name}</span>
              <span class="cat-badge-text">${cat.badge}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Chronic Care & Prescription Refills -->
    <section class="section products-showcase-section">
      <div class="container">
        <div class="section-header-row">
          <div>
            <span class="section-tag">CHRONIC CARE ESSENTIALS</span>
            <h2 class="section-heading">Diabetes, Cardiac & Blood Pressure Medicines</h2>
            <p class="section-subheading">Save up to 25% on regular monthly refills with temperature-regulated cold delivery.</p>
          </div>
          <a href="#catalog?category=diabetes" class="section-view-all">View Chronic Care &rarr;</a>
        </div>
        <div class="products-grid">
          ${chronicCare.map(p => createProductCard(p)).join('')}
        </div>
      </div>
    </section>

    <!-- Promotion Health Offer Banner -->
    <section class="section promo-banner-section">
      <div class="container">
        <div class="promo-banner-card">
          <div class="promo-banner-content">
            <span class="promo-pill">SPECIAL PATIENT SAVINGS</span>
            <h2>Flat 20% OFF on Your First Prescription Order</h2>
            <p>Use code <strong>FIRSTMED20</strong> during checkout. Minimum order ₹300. Includes complimentary cold-chain packaging and pharmacist consultation.</p>
            <div class="promo-coupon-badge">
              <span class="coupon-code">FIRSTMED20</span>
              <button class="btn btn-sm btn-white" onclick="cartManager.applyCoupon('FIRSTMED20'); cartManager.showToast('Coupon FIRSTMED20 applied!');">
                Apply Code
              </button>
            </div>
          </div>
          <div class="promo-banner-features">
            <div class="feature-box">
              <div class="feature-icon">❄️</div>
              <strong>Cold Chain Protection</strong>
              <span>Insulated gel-packs for temperature-sensitive drugs</span>
            </div>
            <div class="feature-box">
              <div class="feature-icon">📜</div>
              <strong>100% Genuine Guarantee</strong>
              <span>Direct batch traceability from drug manufacturers</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Top OTC & Pain Relief Bestsellers -->
    <section class="section products-showcase-section">
      <div class="container">
        <div class="section-header-row">
          <div>
            <span class="section-tag">OVER THE COUNTER</span>
            <h2 class="section-heading">Everyday Pain Relief & First Aid</h2>
            <p class="section-subheading">No prescription required. Instant dispatch within 2 hours.</p>
          </div>
          <a href="#catalog?category=otc" class="section-view-all">View OTC Catalog &rarr;</a>
        </div>
        <div class="products-grid">
          ${popularOtc.map(p => createProductCard(p)).join('')}
        </div>
      </div>
    </section>

    <!-- Interactive Health Tools Teaser -->
    <section class="section health-tools-section">
      <div class="container">
        <div class="health-tools-banner">
          <div class="tools-text">
            <span class="section-tag text-white">INTERACTIVE CLINICAL TOOLS</span>
            <h2>Check Your Body Mass Index (BMI) & Set Daily Pill Reminders</h2>
            <p>Take charge of your wellness with our verified digital clinical tools developed by pharmacists.</p>
            <a href="#tools" class="btn btn-gold">
              <span>Launch Free Health Tools</span>
              <span class="arrow-right">&rarr;</span>
            </a>
          </div>
          <div class="tools-visual">
            <div class="tools-mini-card">
              <span class="icon">⚖️</span>
              <strong>BMI Calculator</strong>
              <span>Check healthy weight & nutrition tips</span>
            </div>
            <div class="tools-mini-card">
              <span class="icon">⏰</span>
              <strong>Pill Reminder</strong>
              <span>Never miss your daily dose</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quality Standards & Cold Chain Logistics -->
    <section class="section trust-pillars-section">
      <div class="container">
        <div class="section-title-center">
          <span class="section-tag">THE SANJEEVANI STANDARD</span>
          <h2 class="section-heading">Setting New Benchmarks in E-Pharmacy Safety</h2>
          <p class="section-subheading">Every strip and bottle undergoes strict multi-tier quality compliance before leaving our licensed hubs.</p>
        </div>
        <div class="pillars-grid">
          <div class="pillar-card">
            <div class="pillar-icon">🏭</div>
            <h3>Direct Manufacturer Sourcing</h3>
            <p>We do not purchase from unverified local traders. Sourced straight from Cipla, Sun Pharma, Abbott, GSK, and Dr. Reddy's.</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-icon">👨‍⚕️</div>
            <h3>Registered Pharmacist Review</h3>
            <p>Every prescription order is verified by a qualified B.Pharm/Pharm.D practitioner to detect adverse drug-drug interactions.</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-icon">❄️</div>
            <h3>WHO Cold-Chain Storage</h3>
            <p>Continuous IoT temperature monitoring ensures insulin, biologics, and syrups are maintained precisely between 2°C to 8°C.</p>
          </div>
          <div class="pillar-card">
            <div class="pillar-icon">⚡</div>
            <h3>2-Hour Express Delivery</h3>
            <p>Dedicated medical fleet delivers urgent fever, pain, and chronic meds within 120 minutes of verification.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Health Articles & Advice Snippets -->
    <section class="section articles-section">
      <div class="container">
        <div class="section-header-row">
          <div>
            <span class="section-tag">CLINICAL INSIGHTS</span>
            <h2 class="section-heading">Verified Health & Wellness Guides</h2>
          </div>
          <a href="#faq" class="section-view-all">Browse Health FAQs &rarr;</a>
        </div>
        <div class="articles-grid">
          ${HEALTH_ARTICLES.map(art => `
            <div class="article-card">
              <div class="article-banner" style="background: ${art.imageColor}">
                <span class="art-category">${art.category}</span>
                <span class="art-readtime">⏱️ ${art.readTime}</span>
              </div>
              <div class="article-body">
                <h3>${art.title}</h3>
                <p>${art.summary}</p>
                <div class="article-author">
                  <span class="author-avatar">👨‍⚕️</span>
                  <span>${art.author}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Verified Patient Testimonials -->
    <section class="section testimonials-section">
      <div class="container">
        <div class="section-title-center">
          <span class="section-tag">VERIFIED PATIENTS</span>
          <h2 class="section-heading">Trusted by Over 500,000 Families</h2>
        </div>
        <div class="testimonials-grid">
          <div class="testi-card">
            <div class="testi-stars">★★★★★</div>
            <p>"My 78-year-old father needs regular diabetic medicines. Sanjeevani delivers his Glycomet and BP tablets on the exact 1st of every month without fail. Genuine medicines with long expiry dates."</p>
            <div class="testi-user">
              <strong>Venkatesh Raman</strong>
              <span>Bengaluru • Chronic Care Patient</span>
            </div>
          </div>
          <div class="testi-card">
            <div class="testi-stars">★★★★★</div>
            <p>"Uploaded my prescription at 9:00 AM, the registered pharmacist called within 10 minutes to verify my penicillin allergy history, and the medicine arrived at my door before 11:00 AM!"</p>
            <div class="testi-user">
              <strong>Ananya Mukherjee</strong>
              <span>Kolkata • Verified Prescription Buyer</span>
            </div>
          </div>
          <div class="testi-card">
            <div class="testi-stars">★★★★★</div>
            <p>"Saved over ₹1,200 on my monthly medication bill compared to retail stores. The packaging was immaculate with cold gel packs for the liquid suspensions."</p>
            <div class="testi-user">
              <strong>Dr. Sunil Parekh</strong>
              <span>Mumbai • Healthcare Professional</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  viewContainer().innerHTML = html;
}

// -------------------------------------------------------------
// 2. CATALOG VIEW
// -------------------------------------------------------------
function renderCatalogView(subParam, queryParams) {
  const selectedCategory = queryParams.get("category") || "all";
  const searchQuery = (queryParams.get("search") || "").trim().toLowerCase();
  const rxFilter = queryParams.get("rx") || "all"; // 'all', 'rx-only', 'otc-only'
  const sortBy = queryParams.get("sort") || "popular";

  // Filter products
  let filtered = PRODUCTS.filter(p => {
    // Category match
    if (selectedCategory !== "all" && p.category !== selectedCategory) {
      return false;
    }
    // Rx match
    if (rxFilter === "rx-only" && !p.isRx) return false;
    if (rxFilter === "otc-only" && p.isRx) return false;

    // Search query match
    if (searchQuery) {
      const matchName = p.name.toLowerCase().includes(searchQuery);
      const matchSalt = p.salt.toLowerCase().includes(searchQuery);
      const matchManu = p.manufacturer.toLowerCase().includes(searchQuery);
      const matchDesc = p.description.toLowerCase().includes(searchQuery);
      if (!matchName && !matchSalt && !matchManu && !matchDesc) return false;
    }
    return true;
  });

  // Sort products
  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "discount") {
    filtered.sort((a, b) => b.discount - a.discount);
  }

  const categoryObj = PHARMACY_CATEGORIES.find(c => c.id === selectedCategory) || PHARMACY_CATEGORIES[0];

  const html = `
    <div class="catalog-page-container">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb-trail" aria-label="Breadcrumb">
          <a href="#home">Home</a>
          <span class="bc-sep">/</span>
          <a href="#catalog">Pharmacy Catalog</a>
          ${selectedCategory !== "all" ? `
            <span class="bc-sep">/</span>
            <span class="bc-current">${categoryObj.name}</span>
          ` : ''}
        </nav>

        <div class="catalog-header-bar">
          <div>
            <h1 class="catalog-main-title">${categoryObj.name}</h1>
            <p class="catalog-counter-text">Showing <strong>${filtered.length}</strong> certified pharmaceutical products</p>
          </div>
          
          <!-- Prescription Fast Upload Link -->
          <button class="btn btn-outline" onclick="openRxModal()">
            <span>📄 Upload Rx for Quick Cart</span>
          </button>
        </div>

        <!-- Filter Bar & Sort Controls -->
        <div class="catalog-toolbar">
          <div class="catalog-controls-row">
            <!-- Rx Filter Toggle -->
            <div class="filter-toggle-group">
              <span class="filter-group-label">Prescription Type:</span>
              <a 
                href="#catalog?category=${selectedCategory}&rx=all${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}"
                class="filter-pill-btn ${rxFilter === 'all' ? 'active' : ''}">
                All Items
              </a>
              <a 
                href="#catalog?category=${selectedCategory}&rx=rx-only${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}"
                class="filter-pill-btn ${rxFilter === 'rx-only' ? 'active' : ''}">
                ℞ Prescription Only
              </a>
              <a 
                href="#catalog?category=${selectedCategory}&rx=otc-only${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}"
                class="filter-pill-btn ${rxFilter === 'otc-only' ? 'active' : ''}">
                OTC Non-Rx
              </a>
            </div>

            <!-- Sort Selector -->
            <div class="sort-selector-wrap">
              <label for="catalogSort">Sort By:</label>
              <select id="catalogSort" class="catalog-select" onchange="handleSortChange(this.value)">
                <option value="popular" ${sortBy === 'popular' ? 'selected' : ''}>Most Popular</option>
                <option value="price-low" ${sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                <option value="price-high" ${sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                <option value="discount" ${sortBy === 'discount' ? 'selected' : ''}>Highest Discount</option>
                <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Product Grid -->
        ${filtered.length > 0 ? `
          <div class="products-grid catalog-grid-main">
            ${filtered.map(p => createProductCard(p)).join('')}
          </div>
        ` : `
          <div class="catalog-empty-state">
            <div class="empty-icon">🔍</div>
            <h3>No Medicines Found</h3>
            <p>We could not find any medicines matching your active filter criteria.</p>
            <div class="empty-actions">
              <a href="#catalog?category=all" class="btn btn-primary">Reset Filters</a>
              <button class="btn btn-outline" onclick="openRxModal()">Upload Doctor's Prescription Instead</button>
            </div>
          </div>
        `}
      </div>
    </div>
  `;

  viewContainer().innerHTML = html;
}

function handleSortChange(sortVal) {
  const hash = window.location.hash.slice(1);
  const [path, queryString] = hash.split("?");
  const params = new URLSearchParams(queryString || "");
  params.set("sort", sortVal);
  router.navigate(`${path}?${params.toString()}`);
}

// -------------------------------------------------------------
// 3. PRODUCT DETAIL VIEW
// -------------------------------------------------------------
function renderProductView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) {
    viewContainer().innerHTML = `
      <div class="container section">
        <h2>Product Not Found</h2>
        <p>The requested medicine could not be located in our catalog.</p>
        <a href="#catalog" class="btn btn-primary">Return to Catalog</a>
      </div>
    `;
    return;
  }

  const inWishlist = cartManager.isInWishlist(product.id);
  const cartItem = cartManager.cart.find(item => item.productId === product.id);
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  const html = `
    <div class="pdp-container">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb-trail" aria-label="Breadcrumb">
          <a href="#home">Home</a>
          <span class="bc-sep">/</span>
          <a href="#catalog">Pharmacy</a>
          <span class="bc-sep">/</span>
          <a href="#catalog?category=${product.category}">${product.categoryName}</a>
          <span class="bc-sep">/</span>
          <span class="bc-current">${product.name}</span>
        </nav>

        <div class="pdp-main-grid">
          <!-- Visual & Pack Display -->
          <div class="pdp-visual-col">
            <div class="pdp-main-image-card">
              <div class="pdp-badge-overlay">
                ${product.isRx ? `<span class="badge-rx lg">Rx Required</span>` : `<span class="badge-otc lg">OTC Product</span>`}
                <span class="badge-discount lg">${product.discount}% OFF</span>
              </div>
              <div class="pdp-svg-render">
                ${renderProductThumbnail(product.productType, product.accentColor)}
              </div>
              <div class="pdp-seal-tag">
                <span>🛡️ 100% Genuine • Direct from ${product.manufacturer.split(' ')[0]}</span>
              </div>
            </div>

            <!-- Cold Chain & Delivery Guarantee -->
            <div class="pdp-safety-features">
              <div class="safety-item">
                <span class="s-icon">⚡</span>
                <div>
                  <strong>2-Hour Express Delivery</strong>
                  <span>Dispatched in sealed tamper-proof packaging</span>
                </div>
              </div>
              <div class="safety-item">
                <span class="s-icon">❄️</span>
                <div>
                  <strong>Cold-Chain Assured</strong>
                  <span>Stored & transported under controlled temperature</span>
                </div>
              </div>
              <div class="safety-item">
                <span class="s-icon">🔄</span>
                <div>
                  <strong>7-Day Easy Returns</strong>
                  <span>Hassle-free returns on unsealed medicines</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Product Details & Buy Box -->
          <div class="pdp-details-col">
            <div class="pdp-manufacturer">${product.manufacturer}</div>
            <h1 class="pdp-title">${product.name}</h1>
            
            <div class="pdp-salt-pill">
              <strong>Active Salt:</strong> ${product.salt}
            </div>
            <div class="pdp-class-tag">
              <span>Therapeutic Class:</span> <strong>${product.therapeuticClass}</strong>
            </div>

            <div class="pdp-rating-strip">
              <div class="pdp-stars">
                <span class="star-rating">★ ${product.rating}</span>
                <span class="star-count">${product.reviewCount} Verified Patient Reviews</span>
              </div>
              <span class="stock-indicator in-stock">● In Stock & Ready to Dispatch</span>
            </div>

            <hr class="pdp-divider" />

            <!-- Price and Savings -->
            <div class="pdp-pricing-box">
              <div class="pdp-price-row">
                <span class="pdp-current-price" id="pdpSelectedPrice">₹${product.price}</span>
                <span class="pdp-orig-mrp" id="pdpSelectedMrp">₹${product.mrp}</span>
                <span class="pdp-save-badge">You Save ₹${product.mrp - product.price} (${product.discount}%)</span>
              </div>
              <div class="pdp-tax-note">Inclusive of all pharmaceutical taxes & GST</div>
            </div>

            <!-- Pack Size Selector -->
            <div class="pdp-pack-selector">
              <label class="pdp-section-label">Select Pack Size:</label>
              <div class="pdp-pack-chips" id="pdpPackChips">
                ${(product.packOptions || [{ name: product.packSize, price: product.price, mrp: product.mrp }]).map((pack, idx) => `
                  <button 
                    class="pack-chip-btn ${idx === 0 ? 'active' : ''}" 
                    data-pack-index="${idx}"
                    data-price="${pack.price}"
                    data-mrp="${pack.mrp}"
                    onclick="selectPdpPack(${idx}, ${pack.price}, ${pack.mrp})">
                    <span class="pack-chip-name">${pack.name}</span>
                    <span class="pack-chip-price">₹${pack.price}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Prescription Warning Banner if Rx -->
            ${product.isRx ? `
              <div class="pdp-rx-banner">
                <div class="rx-symbol-box">℞</div>
                <div>
                  <strong>Doctor's Prescription Required</strong>
                  <p>A valid physical or digital prescription from a registered medical practitioner is mandatory for this medicine. You can upload it during checkout or upload now.</p>
                </div>
              </div>
            ` : ''}

            <!-- Add to Cart & Wishlist Controls -->
            <div class="pdp-actions-row">
              <div class="pdp-qty-stepper">
                <button class="pdp-stepper-btn" onclick="modifyPdpQty(-1)">&minus;</button>
                <input type="number" id="pdpQtyInput" value="1" min="1" max="10" readonly />
                <button class="pdp-stepper-btn" onclick="modifyPdpQty(1)">&#43;</button>
              </div>

              <button class="btn btn-primary btn-lg pdp-add-cart-btn" onclick="addCurrentPdpToCart('${product.id}')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Add to Shopping Cart</span>
              </button>

              <button 
                class="pdp-wishlist-toggle ${inWishlist ? 'active' : ''}" 
                onclick="cartManager.toggleWishlist('${product.id}')"
                title="Save for Later">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="${inWishlist ? '#E11D48' : 'none'}" stroke="${inWishlist ? '#E11D48' : 'currentColor'}" stroke-width="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                </svg>
              </button>
            </div>

            <!-- Delivery Check Form -->
            <div class="pdp-pincode-checker">
              <span class="pincode-label">📍 Deliver To:</span>
              <div class="pincode-input-group">
                <input type="text" id="deliveryPincode" placeholder="Enter 6-digit Pincode" maxlength="6" value="560001" />
                <button type="button" class="btn-check" onclick="checkPincodeDelivery()">Check</button>
              </div>
              <div id="pincodeDeliveryStatus" class="pincode-result text-green">
                ⚡ <strong>Express 2-Hour Delivery</strong> available for this pincode!
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Information Tabs -->
        <div class="pdp-tabs-container">
          <div class="pdp-tab-headers" role="tablist">
            <button class="pdp-tab-btn active" onclick="switchPdpTab('overview', this)">Medical Overview</button>
            <button class="pdp-tab-btn" onclick="switchPdpTab('usage', this)">Dosage & Directions</button>
            <button class="pdp-tab-btn" onclick="switchPdpTab('side-effects', this)">Side Effects & Safety</button>
            <button class="pdp-tab-btn" onclick="switchPdpTab('generics', this)">Generic Alternatives</button>
            <button class="pdp-tab-btn" onclick="switchPdpTab('reviews', this)">Patient Reviews (${product.reviews ? product.reviews.length : 0})</button>
          </div>

          <div class="pdp-tab-content-panel" id="pdpTabOverview">
            <h3>Description & Primary Clinical Uses</h3>
            <p>${product.description}</p>
            
            <h4 style="margin-top: 18px;">Key Therapeutic Benefits:</h4>
            <ul class="pdp-bullet-list">
              ${(product.benefits || []).map(b => `<li>${b}</li>`).join('')}
            </ul>

            <h4 style="margin-top: 18px;">Storage Instructions:</h4>
            <p>${product.storage}</p>
          </div>

          <div class="pdp-tab-content-panel" id="pdpTabUsage" style="display: none;">
            <h3>How to Administer</h3>
            <p>${product.usage}</p>
            <div class="notice-info-box" style="margin-top: 16px;">
              <strong>Missed Dose Guidance:</strong> If you miss a dose, take it as soon as you remember. If it is almost time for your next scheduled dose, skip the missed dose. Never take a double dose to compensate.
            </div>
          </div>

          <div class="pdp-tab-content-panel" id="pdpTabSideEffects" style="display: none;">
            <h3>Possible Side Effects</h3>
            <p>Most side effects are mild and resolve as your body adapts to the medication:</p>
            <ul class="pdp-bullet-list">
              ${(product.sideEffects || []).map(se => `<li>${se}</li>`).join('')}
            </ul>

            <h3 style="margin-top: 20px;">Safety Precautions & Warnings:</h3>
            <p>${product.precautions}</p>
          </div>

          <div class="pdp-tab-content-panel" id="pdpTabGenerics" style="display: none;">
            <h3>Bioequivalent Generic Alternatives</h3>
            <p>These formulations contain the exact same active salt <em>(${product.salt})</em> with identical efficacy, certified by drug authorities, often at a substantially lower price.</p>
            
            <div class="generics-table-wrap">
              <table class="generics-table">
                <thead>
                  <tr>
                    <th>Alternative Brand</th>
                    <th>Manufacturer</th>
                    <th>Price</th>
                    <th>Savings</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${(product.genericAlternatives || []).map(gen => `
                    <tr>
                      <td><strong>${gen.brand}</strong></td>
                      <td>${gen.company}</td>
                      <td><span class="gen-price">₹${gen.price}</span> <del class="gen-mrp">₹${gen.mrp}</del></td>
                      <td><span class="badge-discount">${gen.saving}</span></td>
                      <td>
                        <button class="btn btn-sm btn-outline" onclick="cartManager.showToast('Substituted with ${gen.brand}');">
                          Select Alternative
                        </button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <div class="pdp-tab-content-panel" id="pdpTabReviews" style="display: none;">
            <h3>Verified Patient Feedback</h3>
            <div class="reviews-list">
              ${(product.reviews || []).map(r => `
                <div class="review-item">
                  <div class="review-header">
                    <strong>${r.author}</strong>
                    <span class="rev-loc">${r.location}</span>
                    <span class="rev-date">${r.date}</span>
                    <span class="rev-rating">${'★'.repeat(Math.floor(r.rating))}</span>
                  </div>
                  <p class="review-comment">"${r.comment}"</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Related Products Section -->
        <div class="section related-products-section">
          <div class="section-header-row">
            <div>
              <span class="section-tag">FREQUENTLY ORDERED TOGETHER</span>
              <h2 class="section-heading">Related Healthcare Essentials</h2>
            </div>
          </div>
          <div class="products-grid">
            ${PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4).map(p => createProductCard(p)).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  viewContainer().innerHTML = html;
  window.currentPdpPackIndex = 0;
}

function selectPdpPack(index, price, mrp) {
  window.currentPdpPackIndex = index;
  document.querySelectorAll("#pdpPackChips .pack-chip-btn").forEach((btn, idx) => {
    btn.classList.toggle("active", idx === index);
  });
  const priceEl = document.getElementById("pdpSelectedPrice");
  const mrpEl = document.getElementById("pdpSelectedMrp");
  if (priceEl) priceEl.textContent = `₹${price}`;
  if (mrpEl) mrpEl.textContent = `₹${mrp}`;
}

function modifyPdpQty(delta) {
  const input = document.getElementById("pdpQtyInput");
  if (!input) return;
  let val = parseInt(input.value, 10) || 1;
  val = Math.max(1, Math.min(10, val + delta));
  input.value = val;
}

function addCurrentPdpToCart(productId) {
  const input = document.getElementById("pdpQtyInput");
  const qty = input ? parseInt(input.value, 10) || 1 : 1;
  const packIdx = window.currentPdpPackIndex || 0;
  cartManager.addItem(productId, qty, packIdx);
}

function checkPincodeDelivery() {
  const pin = document.getElementById("deliveryPincode")?.value?.trim();
  const statusEl = document.getElementById("pincodeDeliveryStatus");
  if (!pin || pin.length !== 6 || isNaN(pin)) {
    if (statusEl) {
      statusEl.className = "pincode-result text-red";
      statusEl.innerHTML = "❌ Please enter a valid 6-digit Indian PIN code.";
    }
    return;
  }
  if (statusEl) {
    statusEl.className = "pincode-result text-green";
    statusEl.innerHTML = `⚡ <strong>Express 2-Hour Delivery</strong> active for pincode <strong>${pin}</strong>! Delivery rider ready.`;
  }
}

function switchPdpTab(tabName, btn) {
  document.querySelectorAll(".pdp-tab-headers .pdp-tab-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const tabMap = {
    "overview": "pdpTabOverview",
    "usage": "pdpTabUsage",
    "side-effects": "pdpTabSideEffects",
    "generics": "pdpTabGenerics",
    "reviews": "pdpTabReviews"
  };

  Object.values(tabMap).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  const activePanel = document.getElementById(tabMap[tabName]);
  if (activePanel) activePanel.style.display = "block";
}

// -------------------------------------------------------------
// 4. PRESCRIPTION UPLOAD VIEW
// -------------------------------------------------------------
function renderPrescriptionView() {
  const uploaded = cartManager.uploadedRx;

  const html = `
    <div class="prescription-page-container">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb-trail" aria-label="Breadcrumb">
          <a href="#home">Home</a>
          <span class="bc-sep">/</span>
          <span class="bc-current">Upload Doctor's Prescription</span>
        </nav>

        <div class="rx-page-hero">
          <div class="rx-hero-badge">⚡ EXPRESS PRESCRIPTION DESK</div>
          <h1>Upload Your Doctor's Prescription</h1>
          <p>Don't waste time searching for complicated medicine names. Just upload a photo or PDF of your doctor's slip. Our registered clinical pharmacists will prepare your order and apply maximum discounts.</p>
        </div>

        <div class="rx-flow-grid">
          <!-- Left: Prescription Upload Form -->
          <div class="rx-form-card">
            <h3 class="rx-card-title">
              <span class="rx-step-num">1</span>
              <span>Upload Prescription Document</span>
            </h3>

            <div class="rx-dropzone" id="rxMainDropzone" onclick="document.getElementById('rxFileInput').click()">
              <input type="file" id="rxFileInput" accept="image/*,.pdf" style="display: none;" onchange="handleRxFileSelect(event)" />
              <div class="dropzone-inner" id="dropzoneContent">
                <div class="drop-icon">📄</div>
                <h4>Drag & Drop your Prescription here</h4>
                <p>or <span class="browse-link">Browse from Device / Camera</span></p>
                <div class="drop-specs">Supported formats: JPG, PNG, PDF (Max 15MB)</div>
              </div>
            </div>

            <!-- Uploaded File Preview State -->
            <div id="rxPreviewBox" class="rx-preview-box" style="display: ${uploaded ? 'flex' : 'none'};">
              <div class="preview-thumb">
                <span class="thumb-icon">📄</span>
              </div>
              <div class="preview-meta">
                <strong id="previewFileName">${uploaded ? uploaded.fileName : 'prescription_scan.jpg'}</strong>
                <span class="preview-status">✓ Uploaded & Ready for Pharmacist Review</span>
              </div>
              <button class="preview-remove-btn" onclick="removeUploadedRx()" title="Remove file">&times;</button>
            </div>

            <h3 class="rx-card-title" style="margin-top: 28px;">
              <span class="rx-step-num">2</span>
              <span>Patient & Delivery Details</span>
            </h3>

            <form id="rxOrderForm" onsubmit="event.preventDefault(); submitPrescriptionOrder();">
              <div class="form-row-2">
                <div class="form-group">
                  <label>Patient Full Name *</label>
                  <input type="text" id="rxPatientName" class="form-control" placeholder="e.g. Ramesh Chandra" required value="${uploaded?.patientName || ''}" />
                </div>
                <div class="form-group">
                  <label>Contact Mobile Number *</label>
                  <input type="tel" id="rxPatientPhone" class="form-control" placeholder="e.g. 9876543210" maxlength="10" required value="${uploaded?.phone || ''}" />
                </div>
              </div>

              <div class="form-group">
                <label>Delivery Address & PIN Code *</label>
                <textarea id="rxDeliveryAddress" class="form-control" rows="2" placeholder="House/Flat No, Street, Landmark, City & PIN code" required>${uploaded?.address || ''}</textarea>
              </div>

              <div class="form-group">
                <label>Order Preference</label>
                <div class="rx-pref-options">
                  <label class="pref-radio">
                    <input type="radio" name="rxPref" value="everything" checked />
                    <span>Order everything written on prescription</span>
                  </label>
                  <label class="pref-radio">
                    <input type="radio" name="rxPref" value="call-me" />
                    <span>Call me before confirming (I want to discuss generic alternatives)</span>
                  </label>
                  <label class="pref-radio">
                    <input type="radio" name="rxPref" value="partial" />
                    <span>Order only 1-month supply of chronic medications</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label>Special Instructions / Ailment Notes (Optional)</label>
                <input type="text" id="rxNotes" class="form-control" placeholder="e.g. Please check if there are cheaper generic substitutes" />
              </div>

              <button type="submit" class="btn btn-primary btn-block btn-lg" id="rxSubmitBtn">
                <span>Submit Prescription for Pharmacist Verification</span>
                <span class="arrow-right">&rarr;</span>
              </button>
            </form>
          </div>

          <!-- Right: How it Works & Trust Guidelines -->
          <div class="rx-info-col">
            <div class="rx-guide-card">
              <h3>How Prescription Ordering Works</h3>
              <div class="rx-timeline">
                <div class="timeline-step">
                  <div class="step-circle">1</div>
                  <div class="step-text">
                    <strong>Upload Prescription</strong>
                    <span>Take a clear snapshot of your doctor's slip showing clinic letterhead, date, and medicines.</span>
                  </div>
                </div>
                <div class="timeline-step">
                  <div class="step-circle">2</div>
                  <div class="step-text">
                    <strong>Pharmacist Verification</strong>
                    <span>Our registered B.Pharm pharmacist inspects dosage, verifies doctor credentials, and checks allergies.</span>
                  </div>
                </div>
                <div class="timeline-step">
                  <div class="step-circle">3</div>
                  <div class="step-text">
                    <strong>Order Confirmation & Delivery</strong>
                    <span>You receive an SMS/WhatsApp cart link with flat 20% discount. Order delivered in 2 hours.</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="valid-rx-checklist">
              <h4>Valid Prescription Requirements:</h4>
              <ul>
                <li>✓ Doctor's name, qualification & registration number</li>
                <li>✓ Patient name, age & date of consultation</li>
                <li>✓ Clear medicine dosage & duration</li>
                <li>✗ Avoid cropped photos or blurry text</li>
              </ul>
            </div>

            <div class="rx-help-box">
              <span class="help-icon">📞</span>
              <div>
                <strong>Need help uploading?</strong>
                <p>Call our prescription hotline: <a href="tel:18002669922">1800-266-9922</a> or WhatsApp your prescription to <strong>+91 98450 99220</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  viewContainer().innerHTML = html;
}

function handleRxFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const previewBox = document.getElementById("rxPreviewBox");
  const fileNameEl = document.getElementById("previewFileName");
  if (previewBox && fileNameEl) {
    fileNameEl.textContent = file.name;
    previewBox.style.display = "flex";
  }

  cartManager.saveUploadedRx({
    fileName: file.name,
    uploadedAt: new Date().toLocaleTimeString(),
    fileSize: `${Math.round(file.size / 1024)} KB`
  });

  cartManager.showToast(`Prescription "${file.name}" attached successfully!`);
}

function removeUploadedRx() {
  cartManager.saveUploadedRx(null);
  const previewBox = document.getElementById("rxPreviewBox");
  if (previewBox) previewBox.style.display = "none";
  const fileInput = document.getElementById("rxFileInput");
  if (fileInput) fileInput.value = "";
  cartManager.showToast("Prescription file removed.");
}

function submitPrescriptionOrder() {
  const patientName = document.getElementById("rxPatientName")?.value?.trim();
  const phone = document.getElementById("rxPatientPhone")?.value?.trim();
  const address = document.getElementById("rxDeliveryAddress")?.value?.trim();

  if (!patientName || !phone || !address) {
    alert("Please fill in all mandatory patient and delivery details.");
    return;
  }

  if (phone.length < 10) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  const ticketId = `RX-${Math.floor(100000 + Math.random() * 900000)}`;

  cartManager.saveUploadedRx({
    ticketId: ticketId,
    patientName: patientName,
    phone: phone,
    address: address,
    fileName: cartManager.uploadedRx?.fileName || "Uploaded_Prescription.jpg",
    status: "Under Pharmacist Review"
  });

  viewContainer().innerHTML = `
    <div class="prescription-success-container">
      <div class="container">
        <div class="rx-success-card">
          <div class="success-icon-big">✅</div>
          <span class="ticket-badge">Ticket #${ticketId}</span>
          <h2>Prescription Submitted Successfully!</h2>
          <p class="success-desc">
            Thank you, <strong>${patientName}</strong>. Our registered clinical pharmacist is reviewing your prescription right now.
          </p>

          <div class="rx-status-tracker">
            <div class="track-step completed">
              <div class="step-node">✓</div>
              <span>Uploaded</span>
            </div>
            <div class="track-line active"></div>
            <div class="track-step active">
              <div class="step-node pulse">⏳</div>
              <span>Pharmacist Review (In Progress)</span>
            </div>
            <div class="track-line"></div>
            <div class="track-step">
              <div class="step-node">📦</div>
              <span>Cart & Dispatch</span>
            </div>
          </div>

          <div class="ticket-details-box">
            <div class="detail-row">
              <span>Patient Name:</span>
              <strong>${patientName}</strong>
            </div>
            <div class="detail-row">
              <span>Contact Number:</span>
              <strong>${phone}</strong>
            </div>
            <div class="detail-row">
              <span>Delivery Destination:</span>
              <strong>${address}</strong>
            </div>
            <div class="detail-row">
              <span>Verification ETA:</span>
              <strong class="text-green">Within 15 minutes</strong>
            </div>
          </div>

          <p class="sms-note">
            📲 You will receive an SMS and WhatsApp alert with your generated medicine cart and discounted price quote.
          </p>

          <div class="success-actions">
            <a href="#home" class="btn btn-primary">Return to Home</a>
            <a href="#catalog" class="btn btn-outline">Browse Healthcare Products</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 5. FULL CART VIEW
// -------------------------------------------------------------
function renderCartView() {
  const items = cartManager.cart;
  const subtotal = cartManager.getSubtotal();
  const mrpTotal = cartManager.getMrpTotal();
  const savings = cartManager.getSavings();
  const couponDiscount = cartManager.getCouponDiscount();
  const delivery = cartManager.getDeliveryFee();
  const packaging = cartManager.getPackagingFee();
  const grandTotal = cartManager.getGrandTotal();
  const hasRx = cartManager.hasRxItems();
  const remainingForFreeShip = cartManager.getAmountNeededForFreeShipping();

  const html = `
    <div class="cart-page-container">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb-trail" aria-label="Breadcrumb">
          <a href="#home">Home</a>
          <span class="bc-sep">/</span>
          <span class="bc-current">Shopping Cart</span>
        </nav>

        <h1 class="cart-page-title">Your Healthcare Cart (${cartManager.getItemCount()} items)</h1>

        ${items.length === 0 ? `
          <div class="empty-cart-page-card">
            <div class="empty-cart-icon">🛒</div>
            <h2>Your cart is currently empty</h2>
            <p>You haven't added any prescription or wellness products to your cart yet.</p>
            <div class="empty-cart-btns">
              <a href="#catalog" class="btn btn-primary btn-lg">Browse Medicine Catalog</a>
              <button class="btn btn-outline btn-lg" onclick="openRxModal()">Upload Doctor's Prescription</button>
            </div>
          </div>
        ` : `
          <!-- Free delivery progress ribbon -->
          <div class="cart-free-shipping-card">
            ${remainingForFreeShip > 0 ? `
              <div class="free-ship-header">
                <span>🚚 Add <strong>₹${remainingForFreeShip}</strong> more items to unlock <strong>FREE Express Delivery</strong></span>
                <span class="pct-badge">${cartManager.getFreeShippingProgress()}%</span>
              </div>
              <div class="free-ship-track">
                <div class="free-ship-fill" style="width: ${cartManager.getFreeShippingProgress()}%"></div>
              </div>
            ` : `
              <div class="free-ship-qualified">
                <span>🎉 <strong>Congratulations!</strong> You have unlocked FREE 2-Hour Express Delivery!</span>
              </div>
            `}
          </div>

          <div class="cart-layout-grid">
            <!-- Left: Cart Items -->
            <div class="cart-items-column">
              ${hasRx ? `
                <div class="cart-rx-alert-banner">
                  <div class="rx-pill-alert">Rx Required</div>
                  <div>
                    <strong>This order contains prescription medications</strong>
                    <p>Our licensed pharmacist will verify your doctor's prescription during checkout.</p>
                  </div>
                </div>
              ` : ''}

              <div class="cart-table-card">
                <div class="cart-table-header">
                  <span>Product</span>
                  <span>Pack & Price</span>
                  <span>Quantity</span>
                  <span>Total</span>
                </div>
                <div class="cart-table-rows">
                  ${items.map(item => `
                    <div class="cart-row-item">
                      <div class="cart-prod-cell">
                        <div class="cart-thumb">
                          ${renderProductThumbnail(item.productType, item.accentColor)}
                        </div>
                        <div class="cart-name-meta">
                          <a href="#product/${item.productId}" class="cart-prod-name">${item.name}</a>
                          <span class="cart-prod-salt">${item.salt}</span>
                          ${item.isRx ? `<span class="badge-rx sm">Rx Required</span>` : `<span class="badge-otc sm">OTC</span>`}
                        </div>
                      </div>

                      <div class="cart-price-cell">
                        <span class="cell-pack">${item.packName}</span>
                        <div class="cell-pricing">
                          <span class="cell-curr">₹${item.price}</span>
                          <del class="cell-mrp">₹${item.mrp}</del>
                        </div>
                      </div>

                      <div class="cart-qty-cell">
                        <div class="qty-pill-control">
                          <button onclick="cartManager.updateQuantity('${item.key}', ${item.quantity - 1})" class="qty-btn">&minus;</button>
                          <span class="qty-val">${item.quantity}</span>
                          <button onclick="cartManager.updateQuantity('${item.key}', ${item.quantity + 1})" class="qty-btn">&#43;</button>
                        </div>
                        <button class="cart-del-btn" onclick="cartManager.removeItem('${item.key}')">Remove</button>
                      </div>

                      <div class="cart-total-cell">
                        <strong>₹${(item.price * item.quantity).toLocaleString("en-IN")}</strong>
                        <span class="saved-cell">Saved ₹${(item.mrp - item.price) * item.quantity}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Available Coupons Section -->
              <div class="cart-coupons-card">
                <h3>Available Promotional Coupons</h3>
                <div class="coupons-grid">
                  ${Object.entries(PROMO_COUPONS).map(([code, c]) => `
                    <div class="coupon-chip ${cartManager.appliedCoupon === code ? 'applied' : ''}">
                      <div class="coupon-left">
                        <strong>${code}</strong>
                        <p>${c.desc}</p>
                      </div>
                      <button 
                        class="btn btn-sm ${cartManager.appliedCoupon === code ? 'btn-secondary' : 'btn-outline'}" 
                        onclick="handleCouponClick('${code}')">
                        ${cartManager.appliedCoupon === code ? 'Applied ✓' : 'Apply'}
                      </button>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Right: Order Summary -->
            <div class="cart-summary-column">
              <div class="order-summary-card">
                <h3>Order Summary</h3>
                
                <!-- Coupon Input Form -->
                <form class="coupon-input-box" onsubmit="event.preventDefault(); applyCustomCoupon();">
                  <input type="text" id="cartCouponInput" placeholder="Enter Promo Code" value="${cartManager.appliedCoupon || ''}" />
                  <button type="submit" class="btn btn-sm btn-primary">Apply</button>
                </form>

                <div class="summary-breakdown">
                  <div class="summary-row">
                    <span>Total MRP</span>
                    <span>₹${mrpTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div class="summary-row text-green">
                    <span>Product Savings</span>
                    <span>- ₹${savings.toLocaleString("en-IN")}</span>
                  </div>
                  ${firstOrderDisc > 0 ? `
                    <div class="summary-row text-green">
                      <span>🎉 First Order 25% OFF (&gt; ₹100)</span>
                      <span>- ₹${firstOrderDisc.toLocaleString("en-IN")}</span>
                    </div>
                  ` : ''}
                  ${above499Disc > 0 ? `
                    <div class="summary-row text-green">
                      <span>⚡ 5% OFF (&gt; ₹499 Order)</span>
                      <span>- ₹${above499Disc.toLocaleString("en-IN")}</span>
                    </div>
                  ` : ''}
                  ${monthEndDisc > 0 ? `
                    <div class="summary-row text-green">
                      <span>🌙 Month End ₹100 OFF (&gt; ₹2000 Order)</span>
                      <span>- ₹100</span>
                    </div>
                  ` : ''}
                  ${happyHourDisc > 0 ? `
                    <div class="summary-row text-green">
                      <span>⏰ Happy Hour 15% OFF (9:30-11:30 AM)</span>
                      <span>- ₹${happyHourDisc.toLocaleString("en-IN")}</span>
                    </div>
                  ` : ''}
                  ${couponDiscount > 0 ? `
                    <div class="summary-row text-green">
                      <span>Promo Discount (${cartManager.appliedCoupon})</span>
                      <span>- ₹${couponDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  ` : ''}
                  ${coinsDiscAmount > 0 ? `
                    <div class="summary-row text-green">
                      <span>🪙 ${cartManager.coinsRedeemed} Coins Redeemed</span>
                      <span>- ₹${coinsDiscAmount}</span>
                    </div>
                  ` : ''}
                  <div class="summary-row">
                    <span>Delivery Fee ${cartManager.orderCount < 3 ? '(First 3 Orders)' : (cartManager.deliveryDistance <= 5 ? '(&le; 5 km)' : '(> 5 km)')}</span>
                    <span>${delivery === 0 ? '<strong class="text-green">FREE</strong>' : `₹${delivery}`}</span>
                  </div>
                  <div class="summary-row">
                    <span>Sterilized Medical Packaging</span>
                    <span>₹${packaging}</span>
                  </div>
                  <hr class="summary-divider" />
                  <div class="summary-row total-row">
                    <div>
                      <strong>Total Amount</strong>
                      <small class="green-save-note">Total Savings: ₹${totalSaved.toLocaleString("en-IN")}</small>
                    </div>
                    <span class="total-price-large">₹${grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <a href="#checkout" class="btn btn-primary btn-block btn-lg checkout-cta-btn">
                  <span>Proceed to Checkout</span>
                  <span class="arrow-right">&rarr;</span>
                </a>

                <div class="cart-security-badges">
                  <span>🔒 256-Bit SSL Encrypted Checkout</span>
                  <span>🛡️ 100% Genuine Pharmacy Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        `}
      </div>
    </div>
  `;

  viewContainer().innerHTML = html;
}

function handleCouponClick(code) {
  if (cartManager.appliedCoupon === code) {
    cartManager.removeCoupon();
    cartManager.showToast(`Coupon ${code} removed.`);
  } else {
    const res = cartManager.applyCoupon(code);
    cartManager.showToast(res.message);
  }
  renderCartView();
}

function applyCustomCoupon() {
  const code = document.getElementById("cartCouponInput")?.value?.trim();
  if (!code) return;
  const res = cartManager.applyCoupon(code);
  cartManager.showToast(res.message);
  renderCartView();
}

// -------------------------------------------------------------
// 6. CHECKOUT VIEW
// -------------------------------------------------------------
function renderCheckoutView() {
  if (cartManager.cart.length === 0) {
    viewContainer().innerHTML = `
      <div class="container section">
        <h2>Your cart is empty</h2>
        <p>Please add products to your cart before proceeding to checkout.</p>
        <a href="#catalog" class="btn btn-primary">Browse Catalog</a>
      </div>
    `;
    return;
  }

  const hasRx = cartManager.hasRxItems();
  const grandTotal = cartManager.getGrandTotal();
  const uploaded = cartManager.uploadedRx;

  const html = `
    <div class="checkout-page-container">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb-trail" aria-label="Breadcrumb">
          <a href="#cart">&larr; Back to Cart</a>
          <span class="bc-sep">/</span>
          <span class="bc-current">Secure Patient Checkout</span>
        </nav>

        <h1 class="checkout-page-title">Secure Medical Checkout</h1>

        <div class="checkout-layout-grid">
          <!-- Checkout Steps Form -->
          <div class="checkout-form-column">
            <!-- Step 1: Patient & Delivery Address -->
            <div class="checkout-card active">
              <div class="step-header">
                <span class="step-badge">1</span>
                <h3>Delivery Address & Patient Information</h3>
              </div>
              <div class="step-body">
                <form id="checkoutAddressForm">
                  <div class="form-row-2">
                    <div class="form-group">
                      <label>Full Patient Name *</label>
                      <input type="text" id="chkName" class="form-control" placeholder="e.g. Anand Murthy" required value="${uploaded?.patientName || ''}" />
                    </div>
                    <div class="form-group">
                      <label>10-Digit Mobile Number *</label>
                      <input type="tel" id="chkPhone" class="form-control" placeholder="e.g. 9845012345" maxlength="10" required value="${uploaded?.phone || ''}" />
                    </div>
                  </div>

                  <div class="form-row-2">
                    <div class="form-group">
                      <label>Email Address (For Invoices)</label>
                      <input type="email" id="chkEmail" class="form-control" placeholder="patient@example.com" />
                    </div>
                    <div class="form-group">
                      <label>Pincode *</label>
                      <input type="text" id="chkPin" class="form-control" placeholder="e.g. 560001" maxlength="6" required value="560001" />
                    </div>
                  </div>

                  <div class="form-group">
                    <label>Complete House / Flat / Street Address *</label>
                    <textarea id="chkAddress" class="form-control" rows="2" placeholder="e.g. #42, 3rd Cross, Indiranagar, Bengaluru" required>${uploaded?.address || ''}</textarea>
                  </div>
                </form>
              </div>
            </div>

            <!-- Step 2: Prescription Verification (if needed) -->
            ${hasRx ? `
              <div class="checkout-card active" style="margin-top: 20px;">
                <div class="step-header">
                  <span class="step-badge rx">2</span>
                  <h3>Doctor's Prescription Verification</h3>
                </div>
                <div class="step-body">
                  <p class="rx-chk-note">Your cart contains prescription drugs. Please attach your doctor's slip for pharmacist verification.</p>
                  
                  ${uploaded ? `
                    <div class="chk-rx-attached">
                      <div class="chk-rx-icon">📄</div>
                      <div class="chk-rx-meta">
                        <strong>Prescription Attached: ${uploaded.fileName || 'Doctor_Slip.jpg'}</strong>
                        <span>✓ Verified for Patient: ${uploaded.patientName || 'Patient'}</span>
                      </div>
                      <button class="btn btn-sm btn-outline" onclick="openRxModal()">Change File</button>
                    </div>
                  ` : `
                    <div class="chk-rx-upload-prompt" onclick="openRxModal()">
                      <span class="icon">📤</span>
                      <div>
                        <strong>Upload Prescription Now</strong>
                        <p>Upload a photo or PDF to proceed with dispatch.</p>
                      </div>
                    </div>
                  `}
                </div>
              </div>
            ` : ''}

            <!-- Step 3: Delivery Speed -->
            <div class="checkout-card active" style="margin-top: 20px;">
              <div class="step-header">
                <span class="step-badge">${hasRx ? '3' : '2'}</span>
                <h3>Delivery Speed</h3>
              </div>
              <div class="step-body">
                <div class="delivery-options-grid">
                  <label class="delivery-radio-card active">
                    <input type="radio" name="deliverySpeed" value="express" checked />
                    <div class="radio-content">
                      <span class="speed-title">⚡ 2-Hour Express Delivery</span>
                      <span class="speed-sub">Guaranteed delivery within 120 minutes with cold chain protection.</span>
                    </div>
                  </label>
                  <label class="delivery-radio-card">
                    <input type="radio" name="deliverySpeed" value="standard" />
                    <div class="radio-content">
                      <span class="speed-title">📦 Standard Next-Day Delivery</span>
                      <span class="speed-sub">Delivered tomorrow morning between 9 AM and 1 PM.</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Step 4: Payment Method -->
            <div class="checkout-card active" style="margin-top: 20px;">
              <div class="step-header">
                <span class="step-badge">${hasRx ? '4' : '3'}</span>
                <h3>Select Payment Method</h3>
              </div>
              <div class="step-body">
                <div class="payment-tabs">
                  <label class="payment-option-card">
                    <input type="radio" name="paymentMethod" value="upi" checked />
                    <div class="pay-content">
                      <strong>⚡ Instant UPI / QR Code (Google Pay, PhonePe, Paytm)</strong>
                      <span>Zero transaction fees. Instant verification.</span>
                    </div>
                  </label>
                  <label class="payment-option-card">
                    <input type="radio" name="paymentMethod" value="card" />
                    <div class="pay-content">
                      <strong>💳 Credit / Debit Card (Visa, MasterCard, RuPay)</strong>
                      <span>Secured with OTP verification.</span>
                    </div>
                  </label>
                  <label class="payment-option-card">
                    <input type="radio" name="paymentMethod" value="cod" />
                    <div class="pay-content">
                      <strong>💵 Cash on Delivery (COD)</strong>
                      <span>Pay by Cash or UPI to delivery executive at doorstep.</span>
                    </div>
                  </label>
                </div>

                <button class="btn btn-primary btn-block btn-lg place-order-btn" onclick="executePlaceOrder()">
                  <span>Authorize & Place Order (₹${grandTotal.toLocaleString("en-IN")})</span>
                  <span class="arrow-right">&rarr;</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Checkout Order Summary -->
          <div class="checkout-summary-column">
            <div class="checkout-mini-summary-card">
              <h3>Items in Order (${cartManager.getItemCount()})</h3>
              <div class="chk-items-scroll">
                ${cartManager.cart.map(item => `
                  <div class="chk-mini-item">
                    <div class="chk-item-name">
                      <strong>${item.name}</strong>
                      <small>${item.packName} &times; ${item.quantity}</small>
                    </div>
                    <span class="chk-item-price">₹${item.price * item.quantity}</span>
                  </div>
                `).join('')}
              </div>

              <hr class="summary-divider" />

              <div class="summary-breakdown">
                <div class="summary-row">
                  <span>Subtotal</span>
                  <span>₹${cartManager.getSubtotal().toLocaleString("en-IN")}</span>
                </div>
                ${cartManager.getCouponDiscount() > 0 ? `
                  <div class="summary-row text-green">
                    <span>Coupon Discount</span>
                    <span>- ₹${cartManager.getCouponDiscount().toLocaleString("en-IN")}</span>
                  </div>
                ` : ''}
                <div class="summary-row">
                  <span>Delivery Fee</span>
                  <span>${cartManager.getDeliveryFee() === 0 ? '<strong class="text-green">FREE</strong>' : `₹${cartManager.getDeliveryFee()}`}</span>
                </div>
                <div class="summary-row">
                  <span>Sterilization Packaging</span>
                  <span>₹${cartManager.getPackagingFee()}</span>
                </div>
                <div class="summary-row total-row">
                  <strong>Total Payable</strong>
                  <strong class="total-price-large">₹${grandTotal.toLocaleString("en-IN")}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  viewContainer().innerHTML = html;
}

function executePlaceOrder() {
  const name = document.getElementById("chkName")?.value?.trim();
  const phone = document.getElementById("chkPhone")?.value?.trim();
  const address = document.getElementById("chkAddress")?.value?.trim();

  if (!name || !phone || !address) {
    alert("Please complete all patient name, phone, and delivery address details.");
    return;
  }

  const orderId = `AC-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderTotal = cartManager.getGrandTotal();
  const itemCount = cartManager.getItemCount();

  // Complete order to earn Navi-style random cashback coins & increment order count!
  const earnedCoins = cartManager.completeOrder();

  viewContainer().innerHTML = `
    <div class="order-confirmed-container">
      <div class="container">
        <div class="order-confirmed-card">
          <div class="confirm-celebration">🎉</div>
          <span class="confirm-badge">ORDER CONFIRMED</span>
          <h2>Thank You, ${name}!</h2>
          <p class="order-id-line">Order Reference ID: <strong>#${orderId}</strong></p>

          <!-- Navi-Style Random Cashback Coins Card -->
          <div class="confirm-cashback-badge" style="background: #FEF3C7; border: 2px solid #F59E0B; border-radius: 10px; padding: 14px; margin: 16px 0; text-align: center;">
            <span style="font-size: 1.8rem;">🪙</span>
            <h3 style="color: #92400E; margin: 4px 0;">Navi-Style Cashback Reward!</h3>
            <p style="color: #B45309; font-weight: 700; font-size: 1.1rem; margin: 0;">🎉 You won +${earnedCoins} Health Coins on this order!</p>
            <small style="color: #78350F;">Total Wallet Balance: ${cartManager.coins} Coins (50 Coins = ₹0.50 OFF on future orders)</small>
          </div>

          <p class="confirm-sub">Your pharmaceutical order has been verified and registered at our central licensed hub.</p>

          <div class="order-status-timeline">
            <div class="order-step-node completed">
              <span class="node-icon">✓</span>
              <strong>Order Placed</strong>
              <small>Just now</small>
            </div>
            <div class="node-connector active"></div>
            <div class="order-step-node active">
              <span class="node-icon pulse">⚡</span>
              <strong>Packing & Cold Storage</strong>
              <small>In Progress</small>
            </div>
            <div class="node-connector"></div>
            <div class="order-step-node">
              <span class="node-icon">🛵</span>
              <strong>Out for Delivery</strong>
              <small>Within 2 Hours</small>
            </div>
          </div>

          <div class="confirm-details-box">
            <div class="cd-row">
              <span>Patient Name:</span>
              <strong>${name}</strong>
            </div>
            <div class="cd-row">
              <span>Contact Number:</span>
              <strong>${phone}</strong>
            </div>
            <div class="cd-row">
              <span>Delivery Address:</span>
              <strong>${address}</strong>
            </div>
            <div class="cd-row">
              <span>Total Paid:</span>
              <strong class="text-green">₹${orderTotal.toLocaleString("en-IN")}</strong>
            </div>
            <div class="cd-row">
              <span>Items:</span>
              <strong>${itemCount} Products</strong>
            </div>
          </div>

          <div class="confirm-actions">
            <button class="btn btn-primary" onclick="window.print()">
              🖨️ Print Medical Receipt
            </button>
            <a href="#home" class="btn btn-outline">
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 7. HEALTH TOOLS VIEW
// -------------------------------------------------------------
function renderToolsView() {
  const html = `
    <div class="tools-page-container">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb-trail" aria-label="Breadcrumb">
          <a href="#home">Home</a>
          <span class="bc-sep">/</span>
          <span class="bc-current">Interactive Clinical Health Tools</span>
        </nav>

        <div class="tools-hero">
          <h1>Digital Health & Wellness Tools</h1>
          <p>Validated clinical calculators and daily adherence tools developed by registered pharmacists to help you track your body metrics and daily medication schedule.</p>
        </div>

        <div class="tools-dual-grid">
          <!-- Tool 1: BMI Calculator -->
          <div class="tool-widget-card">
            <div class="widget-header">
              <span class="widget-icon">⚖️</span>
              <div>
                <h3>Body Mass Index (BMI) Calculator</h3>
                <p>Calculate your BMI according to WHO health categories.</p>
              </div>
            </div>

            <form class="widget-form" onsubmit="event.preventDefault(); calculateBMI();">
              <div class="form-row-2">
                <div class="form-group">
                  <label>Height (cm)</label>
                  <input type="number" id="bmiHeight" class="form-control" placeholder="e.g. 172" required />
                </div>
                <div class="form-group">
                  <label>Weight (kg)</label>
                  <input type="number" id="bmiWeight" class="form-control" placeholder="e.g. 68" required />
                </div>
              </div>
              <div class="form-group">
                <label>Age & Gender</label>
                <div class="form-row-2">
                  <input type="number" id="bmiAge" class="form-control" placeholder="Age (e.g. 35)" />
                  <select class="form-control">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Calculate My BMI</button>
            </form>

            <div id="bmiResultBox" class="tool-result-box" style="display: none;">
              <div class="result-number" id="bmiValue">22.4</div>
              <div class="result-status" id="bmiCategory">Normal / Healthy Weight</div>
              <p class="result-advice" id="bmiAdvice">
                Your BMI is in the healthy range. Maintain balanced nutrition, adequate hydration, and regular exercise.
              </p>
              <div class="result-suggested-meds">
                <strong>Recommended Wellness Supports:</strong>
                <div class="rec-chips">
                  <a href="#product/becosules-z-capsule" class="rec-chip">Becosules Z Multivitamin</a>
                  <a href="#product/shelcal-500" class="rec-chip">Shelcal 500 Calcium</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Tool 2: Daily Pill & Medicine Reminder -->
          <div class="tool-widget-card">
            <div class="widget-header">
              <span class="widget-icon">⏰</span>
              <div>
                <h3>Daily Pill & Dose Reminder</h3>
                <p>Set timing alerts for your chronic daily prescriptions.</p>
              </div>
            </div>

            <form class="widget-form" onsubmit="event.preventDefault(); addPillReminder();">
              <div class="form-group">
                <label>Medicine Name</label>
                <input type="text" id="remMedName" class="form-control" placeholder="e.g. Glycomet-GP 1 or Telma-H" required />
              </div>
              <div class="form-row-2">
                <div class="form-group">
                  <label>Reminder Time</label>
                  <input type="time" id="remTime" class="form-control" value="08:30" required />
                </div>
                <div class="form-group">
                  <label>Timing with Meals</label>
                  <select id="remMeal" class="form-control">
                    <option>Before Breakfast</option>
                    <option>After Breakfast</option>
                    <option>After Lunch</option>
                    <option>Before Bedtime</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="btn btn-secondary btn-block">Add Dose Reminder</button>
            </form>

            <div class="reminders-list-wrap">
              <h4>Your Active Dose Reminders:</h4>
              <div id="remindersContainer" class="reminders-list">
                <!-- Dynamically loaded -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  viewContainer().innerHTML = html;
  loadPillRemindersUI();
}

function calculateBMI() {
  const h = parseFloat(document.getElementById("bmiHeight")?.value) / 100;
  const w = parseFloat(document.getElementById("bmiWeight")?.value);
  if (!h || !w || h <= 0 || w <= 0) return;

  const bmi = (w / (h * h)).toFixed(1);
  const resultBox = document.getElementById("bmiResultBox");
  const valueEl = document.getElementById("bmiValue");
  const categoryEl = document.getElementById("bmiCategory");
  const adviceEl = document.getElementById("bmiAdvice");

  let category = "Normal / Healthy Weight";
  let color = "#059669";
  let advice = "Your BMI is in the healthy range. Continue balanced nutrition and active hydration.";

  if (bmi < 18.5) {
    category = "Underweight";
    color = "#F59E0B";
    advice = "Your BMI suggests you may be underweight. Consider nutrient-rich protein powders like Ensure.";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
    color = "#EA580C";
    advice = "Slightly elevated BMI. Regular 30-min walking and monitoring glucose and BP advised.";
  } else if (bmi >= 30) {
    category = "Obesity Range";
    color = "#DC2626";
    advice = "Consult a physician for a personalized metabolic and cardiac risk assessment.";
  }

  if (resultBox && valueEl && categoryEl && adviceEl) {
    valueEl.textContent = bmi;
    valueEl.style.color = color;
    categoryEl.textContent = category;
    adviceEl.textContent = advice;
    resultBox.style.display = "block";
  }
}

function getStoredReminders() {
  try {
    const data = localStorage.getItem("auracare_reminders");
    return data ? JSON.parse(data) : [
      { id: 1, name: "Glycomet-GP 1", time: "08:30 AM", meal: "After Breakfast" },
      { id: 2, name: "Telma-H Tablet", time: "09:00 AM", meal: "After Breakfast" }
    ];
  } catch (e) {
    return [];
  }
}

function saveStoredReminders(rems) {
  try {
    localStorage.setItem("auracare_reminders", JSON.stringify(rems));
  } catch (e) {}
}

function loadPillRemindersUI() {
  const listEl = document.getElementById("remindersContainer");
  if (!listEl) return;

  const rems = getStoredReminders();
  if (rems.length === 0) {
    listEl.innerHTML = `<p style="font-size: 0.85rem; color: #64748B;">No dose reminders set yet.</p>`;
    return;
  }

  listEl.innerHTML = rems.map(r => `
    <div class="reminder-item-card">
      <div class="rem-info">
        <strong>${r.name}</strong>
        <span>⏰ ${r.time} • ${r.meal}</span>
      </div>
      <button class="rem-del-btn" onclick="deletePillReminder(${r.id})">&times;</button>
    </div>
  `).join('');
}

function addPillReminder() {
  const name = document.getElementById("remMedName")?.value?.trim();
  const time = document.getElementById("remTime")?.value;
  const meal = document.getElementById("remMeal")?.value;

  if (!name || !time) return;

  const rems = getStoredReminders();
  rems.push({
    id: Date.now(),
    name: name,
    time: time,
    meal: meal
  });
  saveStoredReminders(rems);
  loadPillRemindersUI();
  cartManager.showToast(`Reminder set for ${name} at ${time}`);
  document.getElementById("remMedName").value = "";
}

function deletePillReminder(id) {
  let rems = getStoredReminders();
  rems = rems.filter(r => r.id !== id);
  saveStoredReminders(rems);
  loadPillRemindersUI();
}

// -------------------------------------------------------------
// 8. ABOUT VIEW
// -------------------------------------------------------------
function renderAboutView() {
  const html = `
    <div class="about-page-container">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb-trail" aria-label="Breadcrumb">
          <a href="#home">Home</a>
          <span class="bc-sep">/</span>
          <span class="bc-current">About Sanjeevani Pharmacy</span>
        </nav>

        <div class="about-hero-section">
          <span class="section-tag">ESTABLISHED 2012</span>
          <h1>India's Most Trusted Digital Healthcare & Pharmacy Network</h1>
          <p>Licensed under Drugs & Cosmetics Rules (Forms 20B & 21B). Delivering genuine medicines with clinical pharmacist oversight across 1,200+ cities.</p>
        </div>

        <div class="about-stats-grid">
          <div class="about-stat-box">
            <strong>10 Million+</strong>
            <span>Prescriptions Safely Dispensed</span>
          </div>
          <div class="about-stat-box">
            <strong>100%</strong>
            <span>Direct Manufacturer Sourced</span>
          </div>
          <div class="about-stat-box">
            <strong>24/7</strong>
            <span>Emergency Pharmacist Support</span>
          </div>
          <div class="about-stat-box">
            <strong>120 Mins</strong>
            <span>Average Express Delivery Time</span>
          </div>
        </div>

        <div class="about-content-section">
          <h2>Our Core Medical Principles</h2>
          <div class="principles-grid">
            <div class="principle-card">
              <h3>Zero Counterfeits Guarantee</h3>
              <p>Every single blister pack and bottle is sourced directly from pharmaceutical company warehouses (GSK, Cipla, Abbott, Sun Pharma). Every batch number and barcode is recorded on your tax invoice.</p>
            </div>
            <div class="principle-card">
              <h3>Strict Cold-Chain Discipline</h3>
              <p>Insulin, biologics, vaccines, and liquid suspensions lose potency when exposed to heat. Our pharmacies utilize IoT-monitored refrigeration and insulated thermal gel bags during the last-mile delivery.</p>
            </div>
            <div class="principle-card">
              <h3>Qualified Human Pharmacists</h3>
              <p>Algorithms cannot replace clinical intuition. Our team of 150+ registered pharmacists (B.Pharm & Pharm.D) personally review every prescription for contraindications, dosage timing, and potential allergies.</p>
            </div>
          </div>
        </div>

        <div class="licenses-badge-card">
          <h3>Regulatory Drug Licenses & Certifications</h3>
          <div class="licenses-list">
            <div class="lic-item">
              <strong>Drug License No:</strong> Form 20B: DL-2026-MED9928 / Form 21B: DL-2026-MED9929
            </div>
            <div class="lic-item">
              <strong>FSSAI Food Safety License:</strong> 11224334000128
            </div>
            <div class="lic-item">
              <strong>Central GST Registration:</strong> 29AABCU9603R1ZM
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  viewContainer().innerHTML = html;
}

// -------------------------------------------------------------
// 9. CONTACT VIEW
// -------------------------------------------------------------
function renderContactView() {
  const html = `
    <div class="contact-page-container">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb-trail" aria-label="Breadcrumb">
          <a href="#home">Home</a>
          <span class="bc-sep">/</span>
          <span class="bc-current">Contact & Help Center</span>
        </nav>

        <div class="contact-hero">
          <h1>We are Here to Help 24/7</h1>
          <p>Reach out to our clinical pharmacy team, emergency dispatch center, or store locations.</p>
        </div>

        <div class="contact-grid">
          <!-- Left: Contact Details -->
          <div class="contact-info-col">
            <div class="contact-info-card">
              <div class="c-item">
                <span class="c-icon">📞</span>
                <div>
                  <strong>Toll-Free Pharmacist Helpline</strong>
                  <p><a href="tel:18002669922">1800-266-9922</a> (Available 24 hours / 7 days)</p>
                </div>
              </div>

              <div class="c-item">
                <span class="c-icon">💬</span>
                <div>
                  <strong>WhatsApp Prescription Desk</strong>
                  <p><a href="https://wa.me/919845099220" target="_blank">+91 98450 99220</a> (Instant Cart Creation)</p>
                </div>
              </div>

              <div class="c-item">
                <span class="c-icon">✉️</span>
                <div>
                  <strong>Patient Care Email</strong>
                  <p><a href="mailto:support@sanjeevani.in">support@sanjeevani.in</a></p>
                </div>
              </div>

              <div class="c-item">
                <span class="c-icon">🏥</span>
                <div>
                  <strong>Central Hub Pharmacy</strong>
                  <p>Sanjeevani Healthcare Logistics Center, #88 Healthcare Boulevard, Bengaluru, Karnataka - 560001</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Direct Message Form -->
          <div class="contact-form-col">
            <div class="contact-form-card">
              <h3>Request Pharmacist Callback</h3>
              <p>Have questions about your dosage or drug interactions? Submit your query and our pharmacist will phone you in 15 minutes.</p>

              <form onsubmit="event.preventDefault(); handleContactSubmit();">
                <div class="form-group">
                  <label>Your Name *</label>
                  <input type="text" id="contactName" class="form-control" required placeholder="e.g. Meenakshi Sundaram" />
                </div>
                <div class="form-group">
                  <label>Mobile Number *</label>
                  <input type="tel" id="contactPhone" class="form-control" required placeholder="e.g. 9845112233" />
                </div>
                <div class="form-group">
                  <label>Query Type</label>
                  <select class="form-control" id="contactSubject">
                    <option>Medicine Dosage & Timing Consultation</option>
                    <option>Prescription Order Inquiries</option>
                    <option>Generic Substitutes Advice</option>
                    <option>Delivery Tracking & Refills</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Message / Details</label>
                  <textarea class="form-control" id="contactMsg" rows="3" placeholder="Briefly describe your query or prescribe medicine names..."></textarea>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Submit Callback Request</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  viewContainer().innerHTML = html;
}

function handleContactSubmit() {
  const name = document.getElementById("contactName")?.value;
  alert(`Thank you, ${name}! Your callback request has been assigned to our on-duty clinical pharmacist. We will call you within 15 minutes.`);
  router.navigate("#home");
}

// -------------------------------------------------------------
// 10. FAQ VIEW
// -------------------------------------------------------------
function renderFaqView() {
  const html = `
    <div class="faq-page-container">
      <div class="container">
        <!-- Breadcrumb -->
        <nav class="breadcrumb-trail" aria-label="Breadcrumb">
          <a href="#home">Home</a>
          <span class="bc-sep">/</span>
          <span class="bc-current">Frequently Asked Questions</span>
        </nav>

        <div class="faq-hero">
          <h1>Frequently Asked Questions</h1>
          <p>Everything you need to know about prescription verification, cold-chain delivery, genuine medicine sourcing, and returns.</p>
        </div>

        <div class="faq-accordion-wrap">
          ${PHARMACY_FAQS.map((faq, idx) => `
            <div class="faq-accordion-item ${idx === 0 ? 'active' : ''}">
              <button class="faq-question-btn" onclick="toggleFaq(${idx})">
                <span>${faq.question}</span>
                <span class="faq-toggle-icon">${idx === 0 ? '−' : '+'}</span>
              </button>
              <div class="faq-answer-panel" style="display: ${idx === 0 ? 'block' : 'none'};">
                <p>${faq.answer}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  viewContainer().innerHTML = html;
}

function toggleFaq(index) {
  const items = document.querySelectorAll(".faq-accordion-item");
  items.forEach((item, idx) => {
    const answer = item.querySelector(".faq-answer-panel");
    const icon = item.querySelector(".faq-toggle-icon");
    if (idx === index) {
      const isExpanded = item.classList.contains("active");
      if (isExpanded) {
        item.classList.remove("active");
        if (answer) answer.style.display = "none";
        if (icon) icon.textContent = "+";
      } else {
        item.classList.add("active");
        if (answer) answer.style.display = "block";
        if (icon) icon.textContent = "−";
      }
    }
  });
}
