// Sanjeevani Pharmacy - Shopping Cart & Order State Management

class CartManager {
  constructor() {
    this.storageKey = "auracare_cart";
    this.wishlistKey = "auracare_wishlist";
    this.couponKey = "auracare_applied_coupon";
    this.rxUploadKey = "auracare_uploaded_rx";
    this.orderCountKey = "sanjeevani_order_count";
    this.coinsKey = "sanjeevani_coins";
    
    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.appliedCoupon = this.loadCoupon();
    this.uploadedRx = this.loadUploadedRx();
    this.orderCount = this.loadOrderCount();
    this.coins = this.loadCoins();
    this.coinsRedeemed = 0;

    this.freeShippingThreshold = 499;
    this.standardShippingFee = 49;
    this.packagingFee = 9;
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load cart", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    } catch (e) {
      console.error("Failed to save cart", e);
    }
    this.updateCartUI();
    if (typeof router !== "undefined" && router.currentRoute) {
      if (router.currentRoute === "cart" && typeof renderCartView === "function") {
        renderCartView();
      } else if (router.currentRoute === "checkout" && typeof renderCheckoutView === "function") {
        renderCheckoutView();
      }
    }
  }

  loadWishlist() {
    try {
      const data = localStorage.getItem(this.wishlistKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem(this.wishlistKey, JSON.stringify(this.wishlist));
    } catch (e) {}
    this.updateWishlistUI();
  }

  loadCoupon() {
    try {
      return localStorage.getItem(this.couponKey) || null;
    } catch (e) {
      return null;
    }
  }

  saveCoupon(code) {
    if (code) {
      localStorage.setItem(this.couponKey, code);
      this.appliedCoupon = code;
    } else {
      localStorage.removeItem(this.couponKey);
      this.appliedCoupon = null;
    }
    this.updateCartUI();
  }

  loadUploadedRx() {
    try {
      const data = localStorage.getItem(this.rxUploadKey);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  saveUploadedRx(rxData) {
    if (rxData) {
      localStorage.setItem(this.rxUploadKey, JSON.stringify(rxData));
      this.uploadedRx = rxData;
    } else {
      localStorage.removeItem(this.rxUploadKey);
      this.uploadedRx = null;
    }
  }

  // --- CART OPERATIONS ---
  addItem(productId, quantity = 1, packIndex = 0) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return false;

    const pack = product.packOptions && product.packOptions[packIndex] 
      ? product.packOptions[packIndex] 
      : { name: product.packSize, price: product.price, mrp: product.mrp };

    const itemKey = `${productId}_${packIndex}`;
    const existingIndex = this.cart.findIndex(item => item.key === itemKey);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        key: itemKey,
        productId: product.id,
        name: product.name,
        salt: product.salt,
        category: product.category,
        isRx: product.isRx,
        packName: pack.name,
        packIndex: packIndex,
        price: pack.price,
        mrp: pack.mrp,
        quantity: quantity,
        productType: product.productType || "tablet-strip",
        accentColor: product.accentColor || "#00897B"
      });
    }

    this.saveCart();
    this.showToast(`Added ${product.name} to cart!`);
    return true;
  }

  updateQuantity(itemKey, newQuantity) {
    const index = this.cart.findIndex(item => item.key === itemKey);
    if (index === -1) return;

    if (newQuantity <= 0) {
      const itemName = this.cart[index].name;
      this.cart.splice(index, 1);
      this.showToast(`Removed ${itemName} from cart`);
    } else {
      this.cart[index].quantity = newQuantity;
    }

    this.saveCart();
  }

  removeItem(itemKey) {
    const index = this.cart.findIndex(item => item.key === itemKey);
    if (index > -1) {
      const itemName = this.cart[index].name;
      this.cart.splice(index, 1);
      this.saveCart();
      this.showToast(`Removed ${itemName} from cart`);
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  getItemCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  hasRxItems() {
    return this.cart.some(item => item.isRx);
  }

  loadOrderCount() {
    try {
      const val = localStorage.getItem(this.orderCountKey);
      return val !== null ? parseInt(val, 10) : 0;
    } catch(e) { return 0; }
  }

  saveOrderCount(count) {
    this.orderCount = count;
    localStorage.setItem(this.orderCountKey, count.toString());
  }

  loadCoins() {
    try {
      const val = localStorage.getItem(this.coinsKey);
      return val !== null ? parseInt(val, 10) : 100;
    } catch(e) { return 100; }
  }

  saveCoins(coins) {
    this.coins = coins;
    localStorage.setItem(this.coinsKey, coins.toString());
  }

  setDeliveryDistance(km) {
    this.deliveryDistance = Math.max(1, parseFloat(km) || 3);
    this.saveCart();
  }

  toggleRedeemCoins(shouldRedeem) {
    if (shouldRedeem) {
      const subtotal = this.getSubtotal();
      const maxDiscountableCoins = Math.min(this.coins, Math.floor(subtotal * 100));
      this.coinsRedeemed = maxDiscountableCoins;
    } else {
      this.coinsRedeemed = 0;
    }
    this.saveCart();
  }

  getCoinsDiscountAmount() {
    if (!this.coinsRedeemed) return 0;
    // Rule: 50 coins = 0.50 rupee discount (i.e. 1 coin = 0.01 rupee)
    return Math.round((this.coinsRedeemed * 0.01) * 100) / 100;
  }

  isFirstOrder() {
    return this.orderCount === 0;
  }

  getFirstOrderDiscount() {
    const subtotal = this.getSubtotal();
    // Rule: First Order 25% OFF for first time users on orders above 100 rupees
    if (this.isFirstOrder() && subtotal > 100) {
      return Math.round(subtotal * 0.25);
    }
    return 0;
  }

  getAbove499Discount() {
    const subtotal = this.getSubtotal();
    // Rule: 5% OFF on orders above 499 rupees
    if (subtotal >= 499) {
      return Math.round(subtotal * 0.05);
    }
    return 0;
  }

  isMonthEnd() {
    const today = new Date();
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    return tomorrow.getDate() === 1;
  }

  getMonthEndDiscount() {
    const subtotal = this.getSubtotal();
    // Rule: Every month end 100 rupees OFF on above 2000 rupees orders
    if (this.isMonthEnd() && subtotal >= 2000) {
      return 100;
    }
    return 0;
  }

  isHappyHour() {
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();
    // 9:30 AM (570 min) to 11:30 AM (690 min)
    return currentMins >= 570 && currentMins <= 690;
  }

  getHappyHourDiscount() {
    // Rule: 15% OFF on every order from 9:30 to 11:30 (2hrs)
    if (!this.isHappyHour()) return 0;
    const subtotal = this.getSubtotal();
    return Math.round(subtotal * 0.15);
  }

  getSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getMrpTotal() {
    return this.cart.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
  }

  getSavings() {
    return this.getMrpTotal() - this.getSubtotal();
  }

  getCouponDiscount() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;

    let discount = 0;
    if (this.appliedCoupon) {
      const coupon = PROMO_COUPONS[this.appliedCoupon];
      if (coupon) {
        if (!coupon.minOrder || subtotal >= coupon.minOrder) {
          if (coupon.discountAmount) {
            discount = coupon.discountAmount;
          } else if (coupon.discountPercent) {
            const calc = Math.round((subtotal * coupon.discountPercent) / 100);
            discount = coupon.maxDiscount ? Math.min(calc, coupon.maxDiscount) : calc;
          }
        }
      }
    } else if (this.isFirstOrder() && subtotal > 100) {
      discount = this.getFirstOrderDiscount();
    }

    return discount;
  }

  getDeliveryFee() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    
    // Rule: No delivery charges for first 3 orders!
    if (this.orderCount < 3) {
      return 0;
    }

    // Rule: After first 3 orders, free delivery for distance <= 5 kms
    const distance = this.deliveryDistance || 3;
    if (distance <= 5) {
      return 0;
    }

    if (this.appliedCoupon && PROMO_COUPONS[this.appliedCoupon]?.freeShipping) {
      return 0;
    }

    return this.standardShippingFee;
  }

  getPackagingFee() {
    return this.getSubtotal() > 0 ? this.packagingFee : 0;
  }

  getGrandTotal() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;

    const couponDiscount = this.getCouponDiscount();
    const above499Disc = this.getAbove499Discount();
    const monthEndDisc = this.getMonthEndDiscount();
    const happyHourDisc = this.getHappyHourDiscount();
    const coinsDiscAmount = this.getCoinsDiscountAmount();
    const delivery = this.getDeliveryFee();
    const packaging = this.getPackagingFee();

    const totalDiscounts = couponDiscount + above499Disc + monthEndDisc + happyHourDisc + coinsDiscAmount;
    return Math.max(0, subtotal - totalDiscounts + delivery + packaging);
  }

  completeOrder() {
    // Navi UPI style random cashback coins (15 to 85 coins per order)
    const earnedCoins = Math.floor(Math.random() * (85 - 15 + 1)) + 15;
    const newCoins = Math.max(0, (this.coins - this.coinsRedeemed) + earnedCoins);
    this.saveCoins(newCoins);
    this.saveOrderCount(this.orderCount + 1);
    this.coinsRedeemed = 0;
    this.clearCart();
    return earnedCoins;
  }

  getFreeShippingProgress() {
    const subtotal = this.getSubtotal();
    const distance = this.deliveryDistance || 3;
    if (this.orderCount < 3 || distance <= 5) return 100;
    return Math.min(100, Math.round((subtotal / 499) * 100));
  }

  getAmountNeededForFreeShipping() {
    const subtotal = this.getSubtotal();
    return Math.max(0, this.freeShippingThreshold - subtotal);
  }

  // --- COUPON VALIDATION ---
  applyCoupon(code) {
    const cleanCode = (code || "").trim().toUpperCase();
    const coupon = PROMO_COUPONS[cleanCode];

    if (!coupon) {
      return { success: false, message: "Invalid coupon code. Try FIRSTMED20 or HEALTH15" };
    }

    const subtotal = this.getSubtotal();
    if (coupon.minOrder && subtotal < coupon.minOrder) {
      return { 
        success: false, 
        message: `Add ₹${coupon.minOrder - subtotal} more items to apply ${cleanCode}` 
      };
    }

    this.saveCoupon(cleanCode);
    return { success: true, message: `Coupon ${cleanCode} applied successfully!` };
  }

  removeCoupon() {
    this.saveCoupon(null);
    return { success: true, message: "Coupon removed" };
  }

  // --- WISHLIST OPERATIONS ---
  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    const product = PRODUCTS.find(p => p.id === productId);
    const prodName = product ? product.name : "Product";

    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.saveWishlist();
      this.showToast(`Removed ${prodName} from saved items`);
      return false;
    } else {
      this.wishlist.push(productId);
      this.saveWishlist();
      this.showToast(`Saved ${prodName} to wishlist ❤️`);
      return true;
    }
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  // --- UI UPDATE SYNC ---
  updateCartUI() {
    const totalCount = this.getItemCount();
    const grandTotal = this.getGrandTotal();

    // Badges in header and mobile
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(b => {
      b.textContent = totalCount;
      b.style.display = totalCount > 0 ? "inline-flex" : "none";
    });

    const totalDisplays = document.querySelectorAll(".header-cart-total");
    totalDisplays.forEach(el => {
      el.textContent = `₹${grandTotal.toLocaleString("en-IN")}`;
    });

    const coinsDisplays = document.querySelectorAll(".header-coins-total");
    coinsDisplays.forEach(el => {
      el.textContent = this.coins;
    });

    // Render Drawer Content if drawer elements exist
    this.renderCartDrawerContent();

    // Update card action buttons for products on current view
    document.querySelectorAll(".med-product-card").forEach(card => {
      const prodId = card.getAttribute("data-product-id");
      if (!prodId) return;
      const cartItem = this.cart.find(item => item.productId === prodId);
      const qtyInCart = cartItem ? cartItem.quantity : 0;
      const actionWrap = card.querySelector(".card-action-wrap");
      if (actionWrap) {
        if (qtyInCart > 0) {
          actionWrap.innerHTML = `
            <div class="card-qty-control">
              <button onclick="cartManager.updateQuantity('${cartItem.key}', ${qtyInCart - 1})" class="card-qty-btn">&minus;</button>
              <span class="card-qty-num">${qtyInCart} in Cart</span>
              <button onclick="cartManager.updateQuantity('${cartItem.key}', ${qtyInCart + 1})" class="card-qty-btn">&#43;</button>
            </div>
          `;
        } else {
          actionWrap.innerHTML = `
            <button class="btn btn-add-cart" onclick="cartManager.addItem('${prodId}', 1, 0)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Add to Cart</span>
            </button>
          `;
        }
      }
    });
  }

  updateWishlistUI() {
    const count = this.wishlist.length;
    const badges = document.querySelectorAll(".wishlist-count-badge");
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? "inline-flex" : "none";
    });

    // Update heart icons across the page
    document.querySelectorAll("[data-wishlist-id]").forEach(btn => {
      const id = btn.getAttribute("data-wishlist-id");
      if (this.isInWishlist(id)) {
        btn.classList.add("active");
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#E11D48" stroke="#E11D48" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
      } else {
        btn.classList.remove("active");
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
      }
    });
  }

  renderCartDrawerContent() {
    const itemsContainer = document.getElementById("cartDrawerItems");
    const ribbonContainer = document.getElementById("cartDrawerRibbon");
    const footerContainer = document.getElementById("cartDrawerFooter");
    const countHeader = document.getElementById("cartDrawerCount");

    if (!itemsContainer || !footerContainer) return;

    const totalCount = this.getItemCount();
    if (countHeader) countHeader.textContent = `(${totalCount} item${totalCount === 1 ? '' : 's'})`;

    // Free delivery ribbon
    if (ribbonContainer) {
      if (this.cart.length === 0) {
        ribbonContainer.innerHTML = "";
      } else {
        const remaining = this.getAmountNeededForFreeShipping();
        const pct = this.getFreeShippingProgress();
        if (remaining > 0) {
          ribbonContainer.innerHTML = `
            <div class="delivery-progress-wrap">
              <div class="progress-info">
                <span>🚚 Add <strong>₹${remaining}</strong> more for <strong>FREE Express Delivery</strong></span>
                <span class="pct-text">${pct}%</span>
              </div>
              <div class="progress-bar-track">
                <div class="progress-bar-fill" style="width: ${pct}%"></div>
              </div>
            </div>
          `;
        } else {
          ribbonContainer.innerHTML = `
            <div class="delivery-progress-wrap qualified">
              <div class="progress-info">
                <span>🎉 <strong>Congratulations!</strong> You unlocked FREE Express Delivery</span>
                <span class="sparkle-icon">✨</span>
              </div>
              <div class="progress-bar-track">
                <div class="progress-bar-fill complete" style="width: 100%"></div>
              </div>
            </div>
          `;
        }
      }
    }

    // Prescription alert if items need Rx
    const hasRx = this.hasRxItems();

    // Render items list
    if (this.cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-cart-icon">🛒</div>
          <h4>Your Cart is Empty</h4>
          <p>Add genuine medicines, vitamins, or upload your doctor's prescription.</p>
          <a href="#catalog" class="btn btn-primary" onclick="cartManager.closeDrawer()">
            Browse Catalog
          </a>
          <button class="btn btn-outline" onclick="openRxModal(); cartManager.closeDrawer();" style="margin-top: 8px;">
            📄 Upload Prescription
          </button>
        </div>
      `;
      footerContainer.innerHTML = "";
      return;
    }

    let itemsHtml = "";
    if (hasRx) {
      itemsHtml += `
        <div class="cart-rx-notice">
          <div class="rx-badge-pill">Rx Required</div>
          <p>Contains prescription items. A pharmacist will verify your prescription during checkout.</p>
        </div>
      `;
    }

    itemsHtml += '<div class="drawer-items-scroll">';
    this.cart.forEach(item => {
      itemsHtml += `
        <div class="drawer-item-card">
          <div class="item-visual-thumb">
            ${renderProductThumbnail(item.productType, item.accentColor)}
          </div>
          <div class="item-info-col">
            <div class="item-title-row">
              <a href="#product/${item.productId}" onclick="cartManager.closeDrawer()" class="item-title">${item.name}</a>
              <button class="item-remove-btn" onclick="cartManager.removeItem('${item.key}')" title="Remove">&times;</button>
            </div>
            <div class="item-salt-sub">${item.packName}</div>
            <div class="item-price-actions-row">
              <div class="item-price-tag">
                <span class="item-curr-price">₹${item.price}</span>
                <span class="item-orig-mrp">₹${item.mrp}</span>
              </div>
              <div class="qty-pill-control">
                <button onclick="cartManager.updateQuantity('${item.key}', ${item.quantity - 1})" class="qty-btn" aria-label="Decrease">&minus;</button>
                <span class="qty-val">${item.quantity}</span>
                <button onclick="cartManager.updateQuantity('${item.key}', ${item.quantity + 1})" class="qty-btn" aria-label="Increase">&#43;</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    itemsHtml += '</div>';
    itemsContainer.innerHTML = itemsHtml;

    // Render footer
    const subtotal = this.getSubtotal();
    const savings = this.getSavings();
    const couponDiscount = this.getCouponDiscount();
    const firstOrderDisc = (!this.appliedCoupon) ? this.getFirstOrderDiscount() : 0;
    const above499Disc = this.getAbove499Discount();
    const monthEndDisc = this.getMonthEndDiscount();
    const happyHourDisc = this.getHappyHourDiscount();
    const coinsDiscAmount = this.getCoinsDiscountAmount();
    const delivery = this.getDeliveryFee();
    const packaging = this.getPackagingFee();
    const grandTotal = this.getGrandTotal();
    const totalSaved = Math.round((savings + couponDiscount + firstOrderDisc + above499Disc + monthEndDisc + happyHourDisc + coinsDiscAmount) * 100) / 100;

    footerContainer.innerHTML = `
      <!-- Coins Redemption Card (50 Coins = ₹0.50) -->
      <div class="coins-redemption-card" style="background: #FEF3C7; border: 1px solid #F59E0B; padding: 10px 12px; border-radius: 8px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 0.85rem; font-weight: 700; color: #92400E;">🪙 ${this.coins} Cashback Coins (50 Coins = ₹0.50)</span>
          <label style="font-size: 0.82rem; font-weight: 700; color: #B45309; cursor: pointer; display: flex; align-items: center; gap: 4px;">
            <input type="checkbox" ${this.coinsRedeemed > 0 ? 'checked' : ''} onchange="cartManager.toggleRedeemCoins(this.checked)" />
            Use Coins
          </label>
        </div>
        ${this.coinsRedeemed > 0 ? `
          <div style="font-size: 0.78rem; font-weight: 700; color: #047857; margin-top: 4px;">
            🎉 Redeeming ${this.coinsRedeemed} Coins for ₹${coinsDiscAmount} OFF!
          </div>
        ` : ''}
      </div>

      <!-- Distance Selector for Delivery Fee -->
      <div style="font-size: 0.78rem; background: #F3F4F6; padding: 6px 10px; border-radius: 6px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
        <span style="color: #4B5563; font-weight: 600;">📍 Delivery Distance:</span>
        <select onchange="cartManager.setDeliveryDistance(this.value)" style="font-size: 0.78rem; padding: 2px 6px; border-radius: 4px; border: 1px solid #D1D5DB;">
          <option value="3" ${this.deliveryDistance <= 5 ? 'selected' : ''}>Within 5 km (FREE Delivery)</option>
          <option value="8" ${this.deliveryDistance > 5 ? 'selected' : ''}>Above 5 km (₹49 Fee)</option>
        </select>
      </div>

      <div class="drawer-cost-breakdown">
        <div class="cost-row">
          <span>Item Total (MRP)</span>
          <span>₹${this.getMrpTotal()}</span>
        </div>
        <div class="cost-row discount">
          <span>Product Savings</span>
          <span>- ₹${savings}</span>
        </div>
        ${firstOrderDisc > 0 ? `
          <div class="cost-row coupon">
            <span>🎉 First Order 25% OFF (&gt; ₹100)</span>
            <span>- ₹${firstOrderDisc}</span>
          </div>
        ` : ''}
        ${above499Disc > 0 ? `
          <div class="cost-row coupon">
            <span>⚡ 5% OFF (&gt; ₹499 Order)</span>
            <span>- ₹${above499Disc}</span>
          </div>
        ` : ''}
        ${monthEndDisc > 0 ? `
          <div class="cost-row coupon">
            <span>🌙 Month End ₹100 OFF (&gt; ₹2000 Order)</span>
            <span>- ₹100</span>
          </div>
        ` : ''}
        ${happyHourDisc > 0 ? `
          <div class="cost-row coupon">
            <span>⏰ Happy Hour 15% OFF (9:30-11:30)</span>
            <span>- ₹${happyHourDisc}</span>
          </div>
        ` : ''}
        ${couponDiscount > 0 ? `
          <div class="cost-row coupon">
            <span>Coupon (${this.appliedCoupon})</span>
            <span>- ₹${couponDiscount}</span>
          </div>
        ` : ''}
        ${coinsDiscAmount > 0 ? `
          <div class="cost-row coupon">
            <span>🪙 ${this.coinsRedeemed} Coins Redeemed</span>
            <span>- ₹${coinsDiscAmount}</span>
          </div>
        ` : ''}
        <div class="cost-row">
          <span>Delivery Fee ${this.orderCount < 3 ? '(First 3 Orders)' : (this.deliveryDistance <= 5 ? '(&le; 5 km)' : '(> 5 km)')}</span>
          <span>${delivery === 0 ? '<strong class="text-green">FREE</strong>' : `₹${delivery}`}</span>
        </div>
        <div class="cost-row">
          <span>Packaging & Sterilization</span>
          <span>₹${packaging}</span>
        </div>
        <div class="cost-row grand-total">
          <div>
            <strong>To Pay</strong>
            <small class="total-saved-note">You save ₹${totalSaved}</small>
          </div>
          <span class="grand-price">₹${grandTotal.toLocaleString("en-IN")}</span>
        </div>
      </div>
      <div class="drawer-action-buttons">
        <a href="#checkout" class="btn btn-primary btn-block checkout-btn" onclick="cartManager.closeDrawer()">
          <span>Proceed to Checkout</span>
          <span class="checkout-arrow">&rarr;</span>
        </a>
        <a href="#cart" class="btn btn-link btn-block" onclick="cartManager.closeDrawer()">
          View Full Cart & Apply Coupons
        </a>
      </div>
    `;
  }

  toggleDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartDrawerOverlay");
    if (!drawer || !overlay) return;

    if (drawer.classList.contains("active")) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  openDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartDrawerOverlay");
    if (!drawer || !overlay) return;

    this.renderCartDrawerContent();
    drawer.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("modal-open");
  }

  closeDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("cartDrawerOverlay");
    if (drawer) drawer.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  showToast(message) {
    const toast = document.getElementById("globalToast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }
}

// Global visual generator for medical thumbnails
function renderProductThumbnail(type, color = "#00897B") {
  switch (type) {
    case "tablet-strip":
      return `
        <svg viewBox="0 0 80 80" class="prod-thumb-svg">
          <rect x="14" y="8" width="52" height="64" rx="8" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2"/>
          <circle cx="28" cy="24" r="8" fill="${color}" opacity="0.85"/>
          <circle cx="52" cy="24" r="8" fill="${color}" opacity="0.85"/>
          <circle cx="28" cy="40" r="8" fill="${color}" opacity="0.85"/>
          <circle cx="52" cy="40" r="8" fill="${color}" opacity="0.85"/>
          <circle cx="28" cy="56" r="8" fill="${color}" opacity="0.85"/>
          <circle cx="52" cy="56" r="8" fill="${color}" opacity="0.85"/>
          <line x1="22" y1="24" x2="34" y2="24" stroke="#FFFFFF" stroke-width="1.5"/>
          <line x1="46" y1="24" x2="58" y2="24" stroke="#FFFFFF" stroke-width="1.5"/>
          <line x1="22" y1="40" x2="34" y2="40" stroke="#FFFFFF" stroke-width="1.5"/>
          <line x1="46" y1="40" x2="58" y2="40" stroke="#FFFFFF" stroke-width="1.5"/>
        </svg>
      `;
    case "capsule-strip":
      return `
        <svg viewBox="0 0 80 80" class="prod-thumb-svg">
          <rect x="14" y="8" width="52" height="64" rx="8" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
          <rect x="22" y="18" width="14" height="20" rx="7" fill="${color}"/>
          <rect x="44" y="18" width="14" height="20" rx="7" fill="#F59E0B"/>
          <rect x="22" y="44" width="14" height="20" rx="7" fill="#F59E0B"/>
          <rect x="44" y="44" width="14" height="20" rx="7" fill="${color}"/>
          <line x1="22" y1="28" x2="36" y2="28" stroke="#FFFFFF" stroke-width="1.5"/>
          <line x1="44" y1="28" x2="58" y2="28" stroke="#FFFFFF" stroke-width="1.5"/>
          <line x1="22" y1="54" x2="36" y2="54" stroke="#FFFFFF" stroke-width="1.5"/>
          <line x1="44" y1="54" x2="58" y2="54" stroke="#FFFFFF" stroke-width="1.5"/>
        </svg>
      `;
    case "dropper-bottle":
    case "baby-bottle":
    case "pump-bottle":
    case "liquid-bottle":
      return `
        <svg viewBox="0 0 80 80" class="prod-thumb-svg">
          <rect x="24" y="26" width="32" height="46" rx="6" fill="#F8FAFC" stroke="${color}" stroke-width="2.5"/>
          <rect x="32" y="12" width="16" height="14" rx="2" fill="${color}"/>
          <rect x="36" y="6" width="8" height="6" fill="#64748B"/>
          <rect x="28" y="38" width="24" height="22" rx="3" fill="${color}" opacity="0.2"/>
          <line x1="32" y1="44" x2="48" y2="44" stroke="${color}" stroke-width="2"/>
          <line x1="32" y1="50" x2="44" y2="50" stroke="${color}" stroke-width="1.5"/>
        </svg>
      `;
    case "spray-can":
      return `
        <svg viewBox="0 0 80 80" class="prod-thumb-svg">
          <rect x="26" y="22" width="28" height="50" rx="5" fill="#F1F5F9" stroke="${color}" stroke-width="2.5"/>
          <rect x="32" y="10" width="16" height="12" rx="2" fill="${color}"/>
          <rect x="42" y="13" width="5" height="4" fill="#E2E8F0"/>
          <path d="M49 14 L58 11 M49 15 L60 15 M49 16 L58 19" stroke="#38BDF8" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      `;
    case "device-box":
      return `
        <svg viewBox="0 0 80 80" class="prod-thumb-svg">
          <rect x="16" y="14" width="48" height="54" rx="10" fill="#0F172A" stroke="#38BDF8" stroke-width="2"/>
          <rect x="24" y="22" width="32" height="22" rx="4" fill="#0284C7" opacity="0.3"/>
          <text x="32" y="38" fill="#38BDF8" font-size="12" font-family="monospace" font-weight="bold">120</text>
          <circle cx="40" cy="56" r="6" fill="#38BDF8" opacity="0.8"/>
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 80 80" class="prod-thumb-svg">
          <rect x="20" y="16" width="40" height="52" rx="6" fill="#F8FAFC" stroke="${color}" stroke-width="2"/>
          <circle cx="40" cy="42" r="14" fill="${color}" opacity="0.15"/>
          <path d="M40 34 V50 M32 42 H48" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
        </svg>
      `;
  }
}

const cartManager = new CartManager();
