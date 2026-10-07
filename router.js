// AuraCare Pharmacy - Client-side Hash Router

class AppRouter {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.currentParams = {};

    window.addEventListener("hashchange", () => this.handleRouting());
    window.addEventListener("DOMContentLoaded", () => this.handleRouting());
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigate(hash) {
    window.location.hash = hash.startsWith("#") ? hash : `#${hash}`;
  }

  handleRouting() {
    let hash = window.location.hash.slice(1);
    if (!hash) hash = "home";

    // Split query string if any (e.g. catalog?category=diabetes&sort=price-asc)
    const [pathWithParams, queryString] = hash.split("?");
    const queryParams = new URLSearchParams(queryString || "");

    const pathParts = pathWithParams.split("/");
    const rootPath = pathParts[0] || "home";
    const subParam = pathParts[1] || null;

    this.currentRoute = rootPath;

    // Highlight desktop category and main links
    document.querySelectorAll(".cat-nav-link, .nav-action-link, .mobile-drawer-link, .bottom-nav-item").forEach(link => {
      const linkHash = link.getAttribute("href")?.replace("#", "");
      if (!linkHash) return;

      const linkRoot = linkHash.split("?")[0].split("/")[0];
      const linkCat = link.getAttribute("data-category");
      const currentCat = queryParams.get("category");

      let isActive = false;
      if (linkCat && currentCat) {
        isActive = (linkCat === currentCat);
      } else if (linkRoot === rootPath) {
        if (rootPath === "catalog" && currentCat && linkRoot === "catalog" && !linkCat) {
          isActive = false;
        } else {
          isActive = true;
        }
      }

      if (isActive) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Close any open mobile menu or search dropdown
    if (typeof closeMobileMenu === "function") closeMobileMenu();
    const liveSearch = document.getElementById("searchLiveDropdown");
    if (liveSearch) liveSearch.style.display = "none";

    // Smooth scroll to top of main view
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Execute matching view handler
    if (rootPath === "product" && subParam) {
      if (this.routes["product"]) {
        this.routes["product"](subParam, queryParams);
      }
    } else if (this.routes[rootPath]) {
      this.routes[rootPath](subParam, queryParams);
    } else if (this.routes["home"]) {
      this.routes["home"](null, queryParams);
    }
  }
}

const router = new AppRouter();
