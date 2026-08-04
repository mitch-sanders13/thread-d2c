function formatMoney(cents, currency) {
  if (typeof cents == "string") {
    cents = cents.replace(".", "");
  }
  let value = "";
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  const formatString = currency ? `${currency + "{{ amount }}"}` : "${{ amount }}";
  function defaultOption(opt, def) {
    return typeof opt == "undefined" ? def : opt;
  }
  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ",");
    decimal = defaultOption(decimal, ".");
    if (isNaN(number) || number == null) {
      return "0";
    }
    const numberString = (number / 100).toFixed(precision);
    const parts = numberString.split("."), dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + thousands), cents2 = parts[1] ? decimal + parts[1] : "";
    return String(dollars + cents2);
  }
  switch (formatString.match(placeholderRegex)[1]) {
    case "amount":
      value = formatWithDelimiters(cents, 2);
      break;
    case "amount_no_decimals":
      value = formatWithDelimiters(cents, 0);
      break;
    case "amount_with_comma_separator":
      value = formatWithDelimiters(cents, 2, ".", ",");
      break;
    case "amount_no_decimals_with_comma_separator":
      value = formatWithDelimiters(cents, 0, ".", ",");
      break;
  }
  return formatString.replace(placeholderRegex, value);
}
function initAnimationObserver() {
  const observerCallback = function(entries) {
    entries.forEach((entry) => {
      let element = document.getElementById(entry.target.dataset.id);
      if (entry.isIntersecting) {
        let replaceClasses = JSON.parse(
          entry.target.dataset.replace.replace(/'/g, '"')
        );
        let delay = entry.target.dataset.delay || "";
        let callback = entry.target.dataset.callback;
        let x = eval(callback);
        if (typeof x == "function") {
          x();
        }
        Object.keys(replaceClasses).forEach(function(key) {
          setTimeout(function() {
            if (element) {
              element.classList.remove(key);
              element.classList.add(replaceClasses[key]);
            } else {
              entry.target.classList.remove(key);
              entry.target.classList.add(replaceClasses[key]);
            }
          }, parseInt(delay, 10));
        });
      }
    });
  };
  const animationElements = document.querySelectorAll(".js\\:animation");
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animationElements.forEach(function(target) {
      let element = document.getElementById(target.dataset.id) || target;
      let replaceClasses = JSON.parse(
        (target.dataset.replace || "{}").replace(/'/g, '"')
      );
      Object.keys(replaceClasses).forEach(function(key) {
        element.classList.remove(key);
        element.classList.add(replaceClasses[key]);
      });
    });
    return;
  }
  const animationObserver = new IntersectionObserver(observerCallback);
  animationElements.forEach(function(target) {
    animationObserver.observe(target);
  });
}
const globals = {
  // Product swatches
  swatch_order_groups: window.__initialData.swatch_order_groups,
  swatch_products: window.__initialData.swatch_products,
  // Audio related properties
  click_audio: window.__initialData.click_audio,
  success_audio: window.__initialData.success_audio,
  enable_audio: window.__initialData.enable_audio,
  // Color related properties
  header_border: window.__initialData.header_border,
  header_default_border: window.__initialData.header_default_border,
  header_scrolled_border: window.__initialData.header_scrolled_border,
  header_color: window.__initialData.header_color,
  header_default_color: window.__initialData.header_default_color,
  header_scrolled_color: window.__initialData.header_scrolled_color,
  body_background_color: window.__initialData.body_background_color,
  body_text_color: window.__initialData.body_text_color,
  // Scroll related properties
  is_scrolled: window.__initialData.is_scrolled,
  // Boolean to toggle the dynamic header when scrolling up or down
  is_scrolled_down: window.__initialData.is_scrolled_down,
  // Boolean to toggle if device is scrolled outside 400 of top
  prev_scroll_pos: window.__initialData.prev_scroll_pos,
  // Calculates the scroll direction for the dynamic header
  scroll_up: window.__initialData.scroll_up,
  // Boolean to toggle the the "Back to top" button
  scroll_up_force: window.__initialData.scroll_up_force,
  // Boolean to force the "Back to top" to be hidden
  hide_header: window.__initialData.hide_header,
  // Boolean to hide header when opening other overlays
  header_height: window.__initialData.header_height,
  // Size of entire header including announcement - used to push content down when header is fixed
  internal_header_height: window.__initialData.internal_header_height,
  // Size of header bar only - used to push content down when header is fixed
  stickyadd: window.__initialData.stickyadd,
  // Mouse position properties
  mouse_x: window.__initialData.mouse_x,
  // Mouse position X to position zoomed images
  mouse_y: window.__initialData.mouse_y,
  // Mouse position Y to position zoomed images
  // Menu related properties
  menu_drawer: window.__initialData.menu_drawer,
  // Boolean to toggle the menu drawer
  menu_nested: window.__initialData.menu_nested,
  // Boolean to hide elements if nested menu is open
  // Popup related properties
  age_popup: window.__initialData.age_popup,
  // Boolean to toggle the age popup
  filter_popup: window.__initialData.filter_popup,
  // Boolean to toggle the filter popup
  localization_popup: window.__initialData.localization_popup,
  // Boolean to toggle the localization popup
  audio_popup: window.__initialData.audio_popup,
  // Boolean to toggle audio settins popup
  cookie_popup: window.__initialData.cookie_popup,
  // Boolean to toggle the cookie compliance popup
  discount_popup: window.__initialData.discount_popup,
  // Boolean to toggle the discount popup
  // Alert related properties
  show_alert: window.__initialData.show_alert,
  // Boolean to toggle the alert
  error_title: window.__initialData.error_title,
  // String for alert title
  error_message: window.__initialData.error_message,
  // String for alert message
  // Collection and pagination related properties
  pagination_loading: window.__initialData.pagination_loading,
  // Boolean to toggle the collection loading state
  pagination_total_pages: window.__initialData.pagination_total_pages,
  // Total number of pages for the current collection
  pagination_current_page: window.__initialData.pagination_current_page,
  // Current page number in pagination
  pagination_section: window.__initialData.pagination_section,
  // Points to a {{ section.id }} to paginate
  // Product related properties
  recent_products: window.__initialData.recent_products,
  // Array of recently viewed products
  incomplete_fields: window.__initialData.incomplete_fields,
  // Boolean to check if product options are incomplete
  // Discount properties
  discount_text: window.__initialData.discount_text,
  // {String} Set the discount text - 'Save 50% off today only'
  discount_code: window.__initialData.discount_code,
  // {String} Set the discount code - 'SAVE50'
  // Cart related properties
  cart_upgrade: window.__initialData.cart_upgrade,
  // Value for checkbox upgrade product
  cart_drawer: window.__initialData.cart_drawer,
  // Boolean to toggle the cart drawer
  cart_loading: window.__initialData.cart_loading,
  // Boolean to toggle the cart loading state
  cart_alert: window.__initialData.cart_alert,
  // Boolean to toggle the cart alert
  cart_delay: window.__initialData.cart_delay,
  // Set the delay for the cart alert to close
  cart_delay_width: window.__initialData.cart_delay_width,
  // Set the width for the cart alert progress bar
  cart_behavior: window.__initialData.cart_behavior,
  // Set to 'drawer' 'alert' or 'redirect'
  cart: window.__initialData.cart,
  // Object to store the cart data
  progress_bar_threshold: window.__initialData.progress_bar_threshold,
  // Set the threshold for the 'free shipping' progress bar
  // Search related properties
  search_drawer: window.__initialData.search_drawer,
  // Boolean to toggle the search drawer
  search_loading: window.__initialData.search_loading,
  // Boolean to toggle the search loading state
  search_active: window.__initialData.search_active,
  search_visible: window.__initialData.search_visible,
  search_term: window.__initialData.search_term,
  // String to set search term
  search_items: window.__initialData.search_items,
  // Array of product search results
  search_focus_index: window.__initialData.search_focus_index,
  // {Int} Set the index for the currently focused search item
  search_focus_url: window.__initialData.search_focus_url,
  search_items_pages: window.__initialData.search_items_pages,
  // Aray of page search results
  search_items_collections: window.__initialData.search_items_collections,
  // Array of collection search results
  search_items_articles: window.__initialData.search_items_articles,
  // Array of article search results
  search_items_queries: window.__initialData.search_items_queries,
  // Array of query search results
  // Filter related properties
  filter_min_price: window.__initialData.filter_min_price,
  // Value of the min price input
  filter_max_price: window.__initialData.filter_max_price,
  // Value of the max price input
  filter_min: window.__initialData.filter_min,
  // Min price for the current collection
  filter_max: window.__initialData.filter_max,
  // Max price for the current collection
  filter_min_thumb: window.__initialData.filter_min_thumb,
  // Sets position of min price thumb
  filter_max_thumb: window.__initialData.filter_max_thumb
  // Sets position of max price thumb
};
const cart = {
  // Add cart item by submitting form
  submitCartForm(form) {
    this.cart_loading = true;
    this.enable_body_scrolling = true;
    let formData = new FormData(form);
    let propertiesObj = Array.from(formData.entries()).filter(([key]) => key.includes("properties")).reduce((obj, [key, value]) => {
      let name = key.replace("properties[", "").replace("]", "");
      obj[name] = value;
      return obj;
    }, {});
    if (Object.keys(propertiesObj).length > 0) {
      for (const [key, value] of Object.entries(propertiesObj)) {
        formData.append(`properties[${key}]`, value);
      }
    }
    for (let pair of formData.entries()) {
      if (pair[0] === "selling_plan" && pair[1] === "0") {
        formData.delete(pair[0]);
      }
    }
    fetch(`${window.Shopify.routes.root}cart/add.js`, {
      method: "POST",
      body: formData
    }).then(async (response) => {
      let data2 = await response.json();
      if (response.status === 200) {
        this.checkAndAddUpgrade();
        this.updateCart(true);
      } else {
        this.error_message = data2.description;
        this.error_alert = true;
      }
    }).catch((error2) => {
      console.error("Error:", error2);
      this.cart_loading = false;
    });
  },
  // Update cart with fetched data
  updateCart(openCart) {
    this.cart_loading = true;
    fetch("/cart.js", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((data2) => {
      this.cart.items = data2.items;
      this.cart.item_count = data2.item_count;
      this.cart.total_price = data2.total_price;
      this.cart.original_total_price = data2.original_total_price;
      this.cart.total_discount = data2.total_discount;
      this.cart.cart_level_discount_applications = data2.cart_level_discount_applications;
      this.cart.shipping_gap = this.progress_bar_threshold * (+window.Shopify.currency.rate || 1) - this.cart.total_price;
      this.cart.shipping_progress = this.cart.total_price / (this.progress_bar_threshold * (+window.Shopify.currency.rate || 1)) * 100 + "%";
      try {
        window.dispatchEvent(
          new CustomEvent("cart:updated", { detail: { cart: this.cart }, bubbles: true, composed: true })
        );
      } catch (e) {
        console.error("Failed to dispatch cart:updated event", e);
      }
      const cartUpsells = document.querySelectorAll(".js\\:cartUpsell");
      cartUpsells.forEach(function(target) {
        target.style.display = "flex";
      });
      this.cart.items.forEach((item) => {
        if (item && (item.price === 0 || item.line_price === 0)) {
          const upsellElement = document.querySelector("#upsell_" + item.variant_id);
          if (upsellElement) {
            upsellElement.style.display = "none";
          }
        }
      });
      this.cart_loading = false;
      if (openCart == true) {
        this.cart_delay_width = "0%";
        if (this.cart_behavior == "alert") {
          this.cart_alert = true;
          setTimeout(() => {
            this.cart_delay_width = "100%";
          }, 10);
          setTimeout(() => {
            this.cart_alert = false;
          }, this.cart_delay);
        }
        if (this.cart_behavior == "drawer") {
          this.cart_drawer = true;
        }
        if (this.cart_behavior == "redirect") {
          window.location.href = "/cart";
        }
      }
    }).catch((error2) => {
      console.error("Error:", error2);
      this.cart_loading = false;
    });
  },
  // Call change.js and apply the returned cart payload directly. The
  // change.js response is the full cart snapshot, so the previous
  // pattern of also calling updateCart() (which fetches /cart.js a
  // second time) was a wasted round-trip on every qty change.
  changeCartItemQuantity(key, quantity, openCart, refresh) {
    this.cart_loading = true;
    let formData = {
      id: key.toString(),
      quantity: quantity.toString()
    };
    fetch("/cart/change.js", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((data2) => {
      this.cart.items = data2.items;
      this.cart.item_count = data2.item_count;
      this.cart.total_price = data2.total_price;
      this.cart.original_total_price = data2.original_total_price;
      this.cart.total_discount = data2.total_discount;
      this.cart.cart_level_discount_applications = data2.cart_level_discount_applications;
      this.cart.shipping_gap = this.progress_bar_threshold * (+window.Shopify.currency.rate || 1) - this.cart.total_price;
      this.cart.shipping_progress = this.cart.total_price / (this.progress_bar_threshold * (+window.Shopify.currency.rate || 1)) * 100 + "%";
      try {
        window.dispatchEvent(
          new CustomEvent("cart:updated", { detail: { cart: this.cart }, bubbles: true, composed: true })
        );
      } catch (e) {
        console.error("Failed to dispatch cart:updated event", e);
      }
      this.cart_loading = false;
      if (refresh) {
        window.location.reload();
      } else if (openCart === true && this.cart_behavior === "drawer") {
        this.cart_drawer = true;
      }
    }).catch((error2) => {
      console.error("Error:", error2);
      this.cart_loading = false;
    });
  },
  // Call add.js to add cart item then use updateCart()
  addWithId(variantID, sellingPlanId, quantity, openCart, giftCardRecipient, productHandle) {
    if (this.enable_audio) {
      this.playSound(this.click_audio);
    }
    this.cart_loading = true;
    let formData;
    let propertiesArr = [];
    let propertiesObj;
    let properties = document.getElementsByClassName(`custom-input_${productHandle}`);
    if (properties) {
      for (const property of properties) {
        // Inputs use name="properties[Key]"; Cart API wants { Key: value }
        let name = property.name.replace(/^properties\[/, "").replace(/\]$/, "");
        propertiesArr.push([name, property.value]);
      }
      if (propertiesArr.length > 0) {
        propertiesObj = Object.fromEntries(propertiesArr);
      }
    }
    let recipientCheckbox = document.querySelector(`#recipient-checkbox`);
    let recipientObj;
    if (giftCardRecipient && recipientCheckbox.checked) {
      let recipientName = document.querySelector(`#recipient-name`);
      let recipientEmail = document.querySelector(`#recipient-email`);
      let recipientMessage = document.querySelector(`#recipient-message`);
      if (!recipientName.value || !recipientEmail.value) {
        this.error_title = "Error", this.error_message = "Please fill out name and email of gift card recepient", this.show_alert = true;
        this.cart_loading = false;
        return;
      }
      recipientObj = {
        "Recipient email": recipientEmail.value,
        "Recipient name": recipientName.value,
        "Message": recipientMessage.value,
        "__shopify_send_gift_card_to_recipient": "on"
      };
    }
    if (sellingPlanId == 0) {
      formData = {
        items: [
          {
            id: variantID,
            quantity,
            properties: {
              ...propertiesObj,
              ...recipientObj
            }
          }
        ]
      };
    } else {
      formData = {
        items: [
          {
            id: variantID,
            quantity,
            selling_plan: sellingPlanId,
            properties: propertiesObj
          }
        ]
      };
    }
    fetch("/cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then(async (response) => {
      let data2 = await response.json();
      if (response.status === 200) {
        if (this.enable_audio) {
          this.playSound(this.success_audio);
        }
        this.checkAndAddUpgrade();
        this.updateCart(openCart);
      } else {
        this.error_title = data2.message, this.error_message = data2.description, this.show_alert = true;
      }
    }).catch((error2) => {
      console.error("Error:", error2);
      this.cart_loading = false;
    });
  },
  // Call add.js to add cart item then use updateCart()
  addCartItem(variantID, sellingPlanId, quantity, openCart, properties) {
    this.cart_loading = true;
    let formData;
    let propertiesObj = {};
    if (properties instanceof HTMLCollection) {
      let propertiesArr = [];
      for (const property of properties) {
        // Inputs use name="properties[Key]"; Cart API wants { Key: value }
        let name = property.name.replace(/^properties\[/, "").replace(/\]$/, "");
        propertiesArr.push([name, property.value]);
      }
      if (propertiesArr.length > 0) {
        propertiesObj = Object.fromEntries(propertiesArr);
      }
    } else if (properties) {
      propertiesObj = properties;
    }
    if (sellingPlanId == 0) {
      formData = {
        items: [
          {
            id: variantID,
            quantity,
            properties: propertiesObj
          }
        ]
      };
    } else {
      formData = {
        items: [
          {
            id: variantID,
            quantity,
            selling_plan: sellingPlanId,
            properties: propertiesObj
          }
        ]
      };
    }
    fetch("/cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then(async (response) => {
      let data2 = await response.json();
      if (response.status === 200) {
        this.checkAndAddUpgrade();
        this.updateCart(openCart);
      } else {
        this.error_title = data2.message, this.error_message = data2.description, this.show_alert = true;
      }
    }).catch((error2) => {
      console.error("Error:", error2);
      this.cart_loading = false;
    });
  },
  // Add multiple items to cart, used for cart sharing
  addCartItems(items, clear2 = false) {
    this.cart_loading = true;
    let formData = {
      items
    };
    if (clear2) {
      this.cart_loading = true;
      fetch("/cart/clear.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => response.json()).then((data2) => {
        this.checkAndAddUpgrade();
        this.updateCart(true);
      }).then(() => {
        fetch("/cart/add.js", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }).then(async (response) => {
          let data2 = await response.json();
          if (response.status === 200) {
            this.updateCart(true);
          } else {
            this.error_title = data2.message, this.error_message = data2.description, this.show_alert = true;
          }
        });
      }).catch((error2) => {
        console.error("Error:", error2);
        this.cart_loading = false;
      });
    } else {
      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }).then(async (response) => {
        let data2 = await response.json();
        if (response.status === 200) {
          this.cart.items = data2.items.map((item) => {
            return {
              ...item
            };
          });
          this.updateCart(true);
        } else {
          this.error_title = data2.message, this.error_message = data2.description, this.show_alert = true;
        }
      }).catch((error2) => {
        console.error("Error:", error2);
        this.cart_loading = false;
      });
    }
  },
  // Add items to cart if cartshare url available
  handleSharedCart() {
    if (location.search.indexOf("cartshare") >= 0) {
      let query = location.search.substring(1);
      let qArray = query.split("&");
      let objArr = qArray.map((item) => {
        if (item != "") {
          var properties = item.split(",");
          var obj = {};
          properties.forEach(function(property) {
            var tup = property.split(":");
            obj[tup[0]] = tup[1];
          });
          return obj;
        }
      });
      this.addCartItems(objArr, true);
    }
  },
  // Generate url with query string based on cart contents  
  generateUrl() {
    let queryString = "";
    const serialize = function(obj) {
      const str = [];
      for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push(`${encodeURIComponent(p)}:${encodeURIComponent(obj[p].toString())}`);
        }
      }
      return str.join(",") + "&";
    };
    const filteredCart = this.cart.items.map((item) => {
      return {
        cartshare: true,
        id: item.variant_id,
        quantity: item.quantity
      };
    });
    filteredCart.forEach((item) => {
      queryString = queryString.concat(serialize(item));
    });
    return window.location.origin + "?" + queryString;
  },
  checkAndAddUpgrade() {
    const initialItemCountChanges = parseInt(sessionStorage.getItem("itemCountChanges") || "0");
    sessionStorage.setItem("itemCountChanges", initialItemCountChanges.toString());
    if (initialItemCountChanges == 0 && this.cart_upgrade != 0) {
      this.addWithId(this.cart_upgrade, 0, 1, false, false);
      setTimeout(() => {
        this.changeCartItemQuantity(this.cart_upgrade, 1, false, false);
      }, 500);
    }
    sessionStorage.setItem("itemCountChanges", (initialItemCountChanges + 1).toString());
  }
};
window.cart = cart;
const search = {
  // Fetch search suggestions and update alpine variables
  fetchAndUpdateSearch(event, params) {
    const buildParams = () => {
      let paramsArr = [];
      for (const [key, value] of Object.entries(params)) {
        if (value) {
          paramsArr.push(key.toString());
        }
      }
      const paramsString = paramsArr.join();
      return paramsString;
    };
    const searchTerm = event.target.value;
    this.search_loading = true;
    if (searchTerm.length === 0 || !searchTerm.replace(/\s/g, "").length) {
      this.search_loading = false;
      this.search_items = [];
      return;
    }
    fetch(
      `/search/suggest.json?q=${searchTerm}&resources[type]=product,collection,article,page,query&resources[limit]=20&[options][fields]=${buildParams()}&section_id=predictive-search`
    ).then((response) => {
      if (!response.ok) {
        var error2 = new Error(response.status.toString());
        throw error2;
      }
      return response.json();
    }).then((data2) => {
      let collections2 = data2.resources.results.collections;
      let pages = data2.resources.results.pages;
      let products = data2.resources.results.products;
      let articles = data2.resources.results.articles;
      let queries = data2.resources.results.queries;
      this.search_items = products;
      this.search_items_collections = collections2;
      this.search_items_pages = pages;
      this.search_items_articles = articles;
      this.search_items_queries = queries;
      this.search_loading = false;
    }).catch((error2) => {
      this.error_title = error2.message, this.error_message = error2.description, this.show_alert = true;
      throw error2;
    });
  }
};
const collections = {
  // Cache for swatch data organized by product type
  normalProductsByType: {},
  collegiateProductsByType: {},
  normalTypeHandleMap: {},
  collegiateTypeHandleMap: {},
  swatchDataFetched: false,
  swatchFetchPromise: null,
  swatchCacheKey: "tw:simple-swatch-data:v3",
  swatchCacheTTL: 1e3 * 60 * 60,
  // 1 hour
  swatchCacheLoaded: false,
  dropdownSliderHtmlCache: {},
  dropdownSliderFetchPromises: {},
  normalizeTags: function(tags) {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === "string") {
      return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
    }
    return [];
  },
  upsertProductInTypeMap: function(targetMap2, typeHandleMap, product) {
    const productType = product.product_type;
    if (!productType || !product.handle) return;
    if (!targetMap2[productType]) {
      targetMap2[productType] = [];
    }
    const getImageSrc = (candidate) => {
      if (!candidate) return "";
      const imageFromImages = Array.isArray(candidate.images) && candidate.images[0] ? typeof candidate.images[0] === "string" ? candidate.images[0] : candidate.images[0].src || "" : "";
      if (imageFromImages) return imageFromImages;
      if (candidate.image) {
        if (typeof candidate.image === "string") return candidate.image;
        if (candidate.image.src) return candidate.image.src;
      }
      if (candidate.featured_image) return candidate.featured_image;
      return "";
    };
    const normalizeProductShape = (candidate) => {
      const normalized = candidate || {};
      const primaryImageSrc = getImageSrc(normalized);
      return {
        ...normalized,
        images: primaryImageSrc ? [{ src: primaryImageSrc }] : []
      };
    };
    const normalizedProduct = normalizeProductShape(product);
    const existingIndex = targetMap2[productType].findIndex((existing) => existing.handle === product.handle);
    if (existingIndex === -1) {
      targetMap2[productType].push(normalizedProduct);
    } else {
      const existing = normalizeProductShape(targetMap2[productType][existingIndex] || {});
      const incomingImages = Array.isArray(normalizedProduct.images) ? normalizedProduct.images : [];
      const existingImages = Array.isArray(existing.images) ? existing.images : [];
      const incomingHasImage = !!(incomingImages[0] && incomingImages[0].src);
      const existingHasImage = !!(existingImages[0] && existingImages[0].src);
      if (incomingHasImage || !existingHasImage) {
        targetMap2[productType][existingIndex] = {
          ...existing,
          ...normalizedProduct,
          images: incomingHasImage ? incomingImages : existingImages
        };
      }
    }
    typeHandleMap[this.handleize(productType)] = productType;
  },
  dedupeTypeMap: function(typeMap) {
    const deduped = {};
    Object.keys(typeMap || {}).forEach((productType) => {
      deduped[productType] = [];
      const typeHandleMap = {};
      (typeMap[productType] || []).forEach((product) => {
        this.upsertProductInTypeMap(deduped, typeHandleMap, product);
      });
    });
    return deduped;
  },
  // Create a Shopify-like handle from a string (used for matching Liquid `| handle`)
  handleize: function(input) {
    return (input || "").toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  },
  // Extract color name from product tags
  // Tags are pre-formatted as "color_navy-blue" (lowercase, dashes for spaces)
  extractColorFromTags: function(tags) {
    const tagArray = this.normalizeTags(tags);
    const colorTag = tagArray.find(
      (tag) => tag.toLowerCase().trim().startsWith("color_")
    );
    if (!colorTag) {
      return null;
    }
    return colorTag.replace(/^color_/i, "").trim();
  },
  // Extract school identifier from product tags
  // Tags are formatted as "school_byu", "school_alabama", etc.
  extractSchoolTag: function(tags) {
    const tagArray = this.normalizeTags(tags);
    const schoolTag = tagArray.find(
      (tag) => tag.toLowerCase().trim().startsWith("school_")
    );
    if (!schoolTag) {
      return null;
    }
    return schoolTag.replace(/^school_/i, "").trim().toLowerCase();
  },
  // New go back to top
  scrollToTop: function(element2) {
    var scrollElement = document.getElementById(element2);
    if (scrollElement) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },
  // Load quick add with section render
  fetchAndRenderQuickAdd: function(product_handle, template) {
    fetch(
      window.Shopify.routes.root + "products/" + product_handle + "?section_id=quick-add"
    ).then((response) => response.text()).then((responseText) => {
      const html = responseText;
      const container = document.getElementById("js:quickAdd-" + template + "-" + product_handle);
      if (container) {
        container.innerHTML = html;
      }
    });
  },
  // Check template and call fetch functions
  fetchAndRenderSwatchList: function() {
    this.fetchUnifiedSwatches().then(() => {
      const pdpContainer = document.querySelector(".js\\:pdp-swatches") || document.querySelector(".js\\:pdp-collegiate-swatches");
      if (pdpContainer) {
        const productType = pdpContainer.getAttribute("data-product-type");
        const productHandle = pdpContainer.getAttribute("data-product-handle");
        const isCollegiate = pdpContainer.classList.contains("js:pdp-collegiate-swatches");
        if (productType && productHandle) {
          this.renderProductPageSwatches(productType, isCollegiate, productHandle);
        }
      }
    });
  },
  // Fetch swatches for collection pages
  // - Get all products and store in cache grouped by product type and collegiate status
  fetchUnifiedSwatches: async function() {
    if (this.swatchDataFetched) return;
    if (this.swatchFetchPromise) {
      return this.swatchFetchPromise;
    }
    if (!this.swatchCacheLoaded) {
      const restored = this.restoreSwatchCache();
      this.swatchCacheLoaded = true;
      if (restored) {
        if (this.hasSufficientSwatchCoverageForCurrentView()) {
          this.swatchDataFetched = true;
          this.renderAllGridSwatches();
          return;
        }
        localStorage.removeItem(this.swatchCacheKey);
      }
    }
    const initialized = this.initializeSwatchesFromInitialData();
    if (initialized) {
      if (this.hasSufficientSwatchCoverageForCurrentView()) {
        this.swatchDataFetched = true;
        this.saveSwatchCache();
        this.renderAllGridSwatches();
        return;
      }
    }
    this.swatchFetchPromise = (async () => {
      try {
        const mapProductForSwatches = (product) => ({
          handle: product.handle,
          title: product.title,
          product_type: product.product_type,
          tags: product.tags || [],
          images: product.images && product.images[0] ? [{ src: product.images[0].src }] : []
        });
        const fetchRegularProducts = async () => {
          let allProducts = [];
          let page = 1;
          let hasMorePages = true;
          while (hasMorePages) {
            const fetchUrl = `${window.Shopify.routes.root}collections/all/products.json?limit=250&page=${page}`;
            const response = await fetch(fetchUrl);
            if (!response.ok) break;
            const data2 = await response.json();
            const products = data2.products || [];
            if (products.length === 0) {
              hasMorePages = false;
            } else {
              const nonCollegiateProducts = products.filter((p) => {
                const isCollegiateProduct = p.tags && p.tags.some(
                  (tag) => tag.toLowerCase().trim() === "collegiate"
                );
                return !isCollegiateProduct;
              });
              const normalizedProducts = nonCollegiateProducts.map(mapProductForSwatches);
              allProducts = allProducts.concat(normalizedProducts);
              page++;
              if (page > 10) break;
            }
          }
          return allProducts;
        };
        const fetchCollegiateProducts = async () => {
          let allProducts = [];
          let page = 1;
          let hasMorePages = true;
          while (hasMorePages) {
            const fetchUrl = `${window.Shopify.routes.root}collections/collegiate/products.json?limit=250&page=${page}`;
            const response = await fetch(fetchUrl);
            if (!response.ok) break;
            const data2 = await response.json();
            const products = data2.products || [];
            if (products.length === 0) {
              hasMorePages = false;
            } else {
              const normalizedProducts = products.map(mapProductForSwatches);
              allProducts = allProducts.concat(normalizedProducts);
              page++;
              if (page > 10) break;
            }
          }
          return allProducts;
        };
        const [regularProducts, collegiateProducts] = await Promise.all([
          fetchRegularProducts(),
          fetchCollegiateProducts()
        ]);
        regularProducts.forEach((product) => {
          this.upsertProductInTypeMap(this.normalProductsByType, this.normalTypeHandleMap, product);
        });
        collegiateProducts.forEach((product) => {
          this.upsertProductInTypeMap(this.collegiateProductsByType, this.collegiateTypeHandleMap, product);
        });
        this.saveSwatchCache();
        this.swatchDataFetched = true;
        this.renderAllGridSwatches();
      } catch (error2) {
        console.error(error2);
      } finally {
        this.swatchFetchPromise = null;
      }
    })();
    return this.swatchFetchPromise;
  },
  hasSufficientSwatchCoverageForCurrentView: function() {
    const requestedHandles = this.getRequestedSwatchHandles(document);
    if (requestedHandles.size === 0) return true;
    let testedHandles = 0;
    let thinHandles = 0;
    requestedHandles.forEach((containerHandle) => {
      let swatchCount = 0;
      if (containerHandle.startsWith("collegiate-")) {
        const withoutPrefix = containerHandle.replace(/^collegiate-/, "");
        const typeHandles = Object.keys(this.collegiateTypeHandleMap).sort((a, b) => b.length - a.length);
        for (let i = 0; i < typeHandles.length; i++) {
          const typeHandle = typeHandles[i];
          if (withoutPrefix === typeHandle || withoutPrefix.startsWith(typeHandle + "-")) {
            const productType = this.collegiateTypeHandleMap[typeHandle];
            const schoolFilter = withoutPrefix === typeHandle ? void 0 : withoutPrefix.replace(typeHandle + "-", "");
            const products = this.collegiateProductsByType[productType] || [];
            if (schoolFilter) {
              swatchCount = products.filter((product) => this.extractSchoolTag(product.tags) === schoolFilter).length;
            } else {
              swatchCount = products.length;
            }
            break;
          }
        }
      } else {
        const productType = this.normalTypeHandleMap[containerHandle];
        if (productType) {
          swatchCount = (this.normalProductsByType[productType] || []).length;
        }
      }
      testedHandles++;
      if (swatchCount <= 1) {
        thinHandles++;
      }
    });
    return testedHandles === 0 || thinHandles / testedHandles < 0.6;
  },
  initializeSwatchesFromInitialData: function() {
    const initialData = window.__initialData;
    const sourceProducts = initialData?.swatch_products;
    if (!Array.isArray(sourceProducts) || sourceProducts.length === 0) {
      return false;
    }
    this.normalProductsByType = {};
    this.collegiateProductsByType = {};
    this.normalTypeHandleMap = {};
    this.collegiateTypeHandleMap = {};
    sourceProducts.forEach((sourceProduct) => {
      if (!sourceProduct || !sourceProduct.handle || !sourceProduct.type) return;
      const normalizedTags = this.normalizeTags(sourceProduct.tags);
      const normalizedProduct = {
        handle: sourceProduct.handle,
        title: sourceProduct.title || sourceProduct.handle,
        product_type: sourceProduct.type,
        tags: normalizedTags,
        image: sourceProduct.image || ""
      };
      const isCollegiate = normalizedTags.some((tag) => tag.toLowerCase().trim() === "collegiate");
      const targetMap2 = isCollegiate ? this.collegiateProductsByType : this.normalProductsByType;
      const typeHandleMap = isCollegiate ? this.collegiateTypeHandleMap : this.normalTypeHandleMap;
      this.upsertProductInTypeMap(targetMap2, typeHandleMap, normalizedProduct);
    });
    return Object.keys(this.normalProductsByType).length > 0 || Object.keys(this.collegiateProductsByType).length > 0;
  },
  // Render all currently mounted swatch containers
  renderAllGridSwatches: function() {
    this.renderSwatchesInElement(document);
  },
  // Render swatches inside a specific DOM scope (e.g. a newly replaced section)
  renderSwatchesInElement: function(root) {
    const handles = this.getRequestedSwatchHandles(root);
    return this.renderSwatchesByContainerHandles(handles);
  },
  getRequestedSwatchHandles: function(root) {
    const handles = /* @__PURE__ */ new Set();
    const elements = root.querySelectorAll('[class*="js:swatchList-"]');
    elements.forEach((el) => {
      const classNames = el.className.split(/\s+/);
      classNames.forEach((className) => {
        if (className.startsWith("js:swatchList-")) {
          handles.add(className.replace("js:swatchList-", "").trim());
        }
      });
    });
    return handles;
  },
  renderSwatchesByContainerHandles: function(handles) {
    let renderedCount = 0;
    handles.forEach((containerHandle) => {
      if (this.renderGridSwatchesByContainerHandle(containerHandle)) {
        renderedCount++;
      }
    });
    return renderedCount;
  },
  // Decode "collegiate-<product-type-handle>-<school>" or "<product-type-handle>"
  renderGridSwatchesByContainerHandle: function(containerHandle) {
    if (!containerHandle) return false;
    if (containerHandle.startsWith("collegiate-")) {
      const withoutPrefix = containerHandle.replace(/^collegiate-/, "");
      const typeHandles = Object.keys(this.collegiateTypeHandleMap).sort((a, b) => b.length - a.length);
      for (let i = 0; i < typeHandles.length; i++) {
        const typeHandle = typeHandles[i];
        if (withoutPrefix === typeHandle || withoutPrefix.startsWith(typeHandle + "-")) {
          const productType2 = this.collegiateTypeHandleMap[typeHandle];
          const schoolFilter = withoutPrefix === typeHandle ? void 0 : withoutPrefix.replace(typeHandle + "-", "");
          return this.renderGridSwatches(productType2, true, schoolFilter);
        }
      }
      return false;
    }
    const productType = this.normalTypeHandleMap[containerHandle];
    if (!productType) return false;
    return this.renderGridSwatches(productType, false);
  },
  saveSwatchCache: function() {
    try {
      const payload = {
        timestamp: Date.now(),
        normalProductsByType: this.normalProductsByType,
        collegiateProductsByType: this.collegiateProductsByType
      };
      localStorage.setItem(this.swatchCacheKey, JSON.stringify(payload));
    } catch (error2) {
      console.warn("Unable to persist swatch cache", error2);
    }
  },
  restoreSwatchCache: function() {
    try {
      const cached = localStorage.getItem(this.swatchCacheKey);
      if (!cached) return false;
      const parsed = JSON.parse(cached);
      if (!parsed || !parsed.timestamp) return false;
      const isExpired = Date.now() - parsed.timestamp > this.swatchCacheTTL;
      if (isExpired) {
        localStorage.removeItem(this.swatchCacheKey);
        return false;
      }
      this.normalProductsByType = this.dedupeTypeMap(parsed.normalProductsByType || {});
      this.collegiateProductsByType = this.dedupeTypeMap(parsed.collegiateProductsByType || {});
      this.normalTypeHandleMap = {};
      this.collegiateTypeHandleMap = {};
      Object.keys(this.normalProductsByType).forEach((productType) => {
        this.normalTypeHandleMap[this.handleize(productType)] = productType;
      });
      Object.keys(this.collegiateProductsByType).forEach((productType) => {
        this.collegiateTypeHandleMap[this.handleize(productType)] = productType;
      });
      return true;
    } catch (error2) {
      console.warn("Unable to restore swatch cache", error2);
      return false;
    }
  },
  // Unified swatch renderer - works for all product types
  // - Inject swatches for a specific product type and collegiate status
  renderGridSwatches: function(productType, isCollegiate, schoolFilter) {
    let container_handle = this.handleize(productType);
    if (isCollegiate) {
      container_handle = "collegiate-" + container_handle;
      if (schoolFilter) {
        container_handle = container_handle + "-" + schoolFilter;
      }
    }
    const elements = document.getElementsByClassName("js:swatchList-" + container_handle);
    if (!elements || elements.length === 0) return false;
    let products = isCollegiate ? this.collegiateProductsByType[productType] || [] : this.normalProductsByType[productType] || [];
    if (!products || products.length === 0) return false;
    if (isCollegiate && schoolFilter) {
      products = products.filter((product) => {
        const productSchoolTag = this.extractSchoolTag(product.tags);
        return productSchoolTag === schoolFilter;
      });
      if (products.length === 0) return false;
    }
    const maxDisplay = 6;
    const totalCount = products.length;
    const buildSwatchMarkup = (renderProducts) => {
      const remainingCount = Math.max(0, renderProducts.length - maxDisplay);
      let defaultSwatchesHtml = "";
      let allSwatchesHtml = "";
      renderProducts.forEach((product, index) => {
        const colorName = this.extractColorFromTags(product.tags);
        const swatchIdentifier = colorName || product.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
        const swatchImageName = `swatch-${swatchIdentifier}.jpg`;
        const swatchImageUrl = `/cdn/shop/files/${swatchImageName}?width=64&height=64`;
        const hoverImage = product.images && product.images[0] && product.images[0].src ? `${product.images[0].src}?width=1600` : "";
        const hoverAttribute = hoverImage ? `@mouseover="second_image='${hoverImage}'"` : "";
        const swatchHtml = `
          <a
            href="/products/${product.handle}"
            title="${product.title}"
            class="btn btn--plain btn--small bg-center !w-6 !h-6 !min-h-[1.5rem] !min-w-[1.5rem] bg-contain !rounded-full !p-0"
            style="background-image: url('${swatchImageUrl}');"
            ${hoverAttribute}
          ></a>
        `;
        if (index < maxDisplay) {
          defaultSwatchesHtml += swatchHtml;
        }
        allSwatchesHtml += swatchHtml;
      });
      const remainingCountHtml = remainingCount > 0 ? `
        <span class="leading-none opacity-75 type--small">+${remainingCount}</span>
      ` : "";
      return `
        <section>
          <div class="relative flex flex-wrap gap-2 px-2">
            <div class="inline-flex items-center gap-2 overflow-hidden group-hover:invisible">
              ${defaultSwatchesHtml}
              ${remainingCountHtml}
            </div>
            <div class="absolute left-[-1px] right-[-1px] flex-wrap hidden gap-2 px-2 border-gray-300 group-hover:flex color__bg-body pb-2 border--width !border-t-0">
              ${allSwatchesHtml}
            </div>
          </div>
        </section>
      `;
    };
    for (let i = 0; i < elements.length; i++) {
      const currentHandle = elements[i].getAttribute("data-current-handle");
      let orderedProducts = products;
      if (currentHandle) {
        const activeIndex = products.findIndex((product) => product.handle === currentHandle);
        if (activeIndex > 0) {
          orderedProducts = [
            products[activeIndex],
            ...products.slice(0, activeIndex),
            ...products.slice(activeIndex + 1)
          ];
        }
      }
      elements[i].innerHTML = buildSwatchMarkup(orderedProducts);
    }
    if (isCollegiate) {
      const countEls = document.getElementsByClassName("js:swatchCount-" + container_handle);
      for (let i = 0; i < countEls.length; i++) {
        countEls[i].textContent = `${totalCount} Colors`;
      }
    }
    return true;
  },
  // Unified swatch renderer for PDP with categories - works for all product types
  // - Group products by their tags and render the swatches
  renderProductPageSwatches: function(productType, isCollegiate, current_product_handle) {
    let products = isCollegiate ? this.collegiateProductsByType[productType] || [] : this.normalProductsByType[productType] || [];
    if (!products || products.length === 0) return;
    let currentProductSchoolTag = null;
    if (isCollegiate) {
      const currentProduct = products.find((p) => p.handle === current_product_handle);
      if (currentProduct) {
        currentProductSchoolTag = this.extractSchoolTag(currentProduct.tags);
      }
      if (currentProductSchoolTag) {
        products = products.filter((product) => {
          const productSchoolTag = this.extractSchoolTag(product.tags);
          return productSchoolTag === currentProductSchoolTag;
        });
      }
      if (products.length === 0) return;
    }
    const swatchOrderGroups = window.__initialData?.swatch_order_groups || "Best sellers,Seasonal,Sale";
    const groups = swatchOrderGroups.split(",").map((group) => group.trim());
    const groupedProducts = {};
    const otherProducts = [];
    products.forEach((product) => {
      let productTags = "";
      if (product.tags) {
        if (Array.isArray(product.tags)) {
          productTags = product.tags.join(",").toLowerCase();
        } else {
          productTags = product.tags.toLowerCase();
        }
      }
      let hasGroupTag = false;
      for (const group of groups) {
        const groupLower = group.toLowerCase();
        if (productTags.includes(groupLower)) {
          if (!groupedProducts[group]) {
            groupedProducts[group] = [];
          }
          groupedProducts[group].push(product);
          hasGroupTag = true;
          break;
        }
      }
      if (!hasGroupTag) {
        otherProducts.push(product);
      }
    });
    let categoriesHtml = "";
    for (const group of groups) {
      if (groupedProducts[group] && groupedProducts[group].length > 0) {
        categoriesHtml += this.renderSwatchGroup(group, groupedProducts[group], current_product_handle);
      }
    }
    if (otherProducts.length > 0) {
      categoriesHtml += this.renderSwatchGroup("Other Colors", otherProducts, current_product_handle);
    }
    const container = document.querySelector(".js\\:pdp-swatches") || document.querySelector(".js\\:pdp-collegiate-swatches") || document.querySelector(".js\\:pdp-collegiate-swatches-backup");
    if (container) {
      if (container.innerHTML.trim() === "" || container.innerHTML.includes("animate-pulse")) {
        container.innerHTML = categoriesHtml;
      }
    }
  },
  // Helper function to render a swatch group
  renderSwatchGroup: function(groupTitle, products, current_product_handle) {
    let swatchesHtml = "";
    products.forEach((product) => {
      const colorName = this.extractColorFromTags(product.tags);
      const swatchIdentifier = colorName || product.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      const swatchImageName = `swatch-${swatchIdentifier}.jpg`;
      const swatchImageUrl = `/cdn/shop/files/${swatchImageName}?width=64&height=64`;
      const isCurrentProduct = product.handle === current_product_handle;
      const borderClass = isCurrentProduct ? "border--focus-outline" : "";
      const swatchHtml = `
        <a
          href="/products/${product.handle}"
          title="${product.title}"
          class="btn btn--plain btn--small bg-center !w-8 !h-8 !min-w-[2rem] !min-h-[2rem] bg-contain !rounded-full !p-0 aspect-1 ${borderClass}"
          style="background-image: url('${swatchImageUrl}');"
        ></a>
      `;
      swatchesHtml += swatchHtml;
    });
    return `
      <div class="w-full flex flex-col">
        <p class="mb-1 opacity-75 type--smaller">${groupTitle}</p>
        <div class="inline-flex flex-wrap gap-2 w-full">
          ${swatchesHtml}
        </div>
      </div>
    `;
  },
  getDropdownSliderHtml: function(collection_handle) {
    if (this.dropdownSliderHtmlCache[collection_handle]) {
      return Promise.resolve(this.dropdownSliderHtmlCache[collection_handle]);
    }
    if (this.dropdownSliderFetchPromises[collection_handle]) {
      return this.dropdownSliderFetchPromises[collection_handle];
    }
    const fetchPromise = fetch(
      window.Shopify.routes.root + "collections/" + collection_handle + "?section_id=dropdown-slider"
    ).then((response) => response.text()).then((html) => {
      this.dropdownSliderHtmlCache[collection_handle] = html;
      return html;
    }).finally(() => {
      delete this.dropdownSliderFetchPromises[collection_handle];
    });
    this.dropdownSliderFetchPromises[collection_handle] = fetchPromise;
    return fetchPromise;
  },
  queueDropdownSwatchRender: function(targetContainer) {
    const render = () => {
      if (targetContainer.getAttribute("data-swatches-hydrated") === "true") return;
      const renderedCount = this.renderSwatchesInElement(targetContainer);
      if (renderedCount > 0) {
        targetContainer.setAttribute("data-swatches-hydrated", "true");
      }
    };
    const runIdle = window.requestIdleCallback;
    if (typeof runIdle === "function") {
      runIdle(render, { timeout: 150 });
    } else {
      setTimeout(render, 16);
    }
  },
  isElementVisible: function(element2) {
    if (!element2) return false;
    if (element2.getAttribute("x-cloak") !== null) return false;
    const style = window.getComputedStyle(element2);
    return style.display !== "none" && style.visibility !== "hidden" && element2.getClientRects().length > 0;
  },
  ensureDropdownVisibilityObserver: function(targetContainer) {
    if (targetContainer.getAttribute("data-dropdown-observer") === "true") return;
    const tryHydratePending = () => {
      const pendingCollection = targetContainer.getAttribute("data-pending-collection");
      if (!pendingCollection) return;
      if (!targetContainer.id || !this.isElementVisible(targetContainer)) return;
      targetContainer.removeAttribute("data-pending-collection");
      this.fetchAndRenderProductSlider(pendingCollection, targetContainer.id);
    };
    const observer2 = new MutationObserver(() => {
      tryHydratePending();
    });
    observer2.observe(targetContainer, {
      attributes: true,
      attributeFilter: ["style", "class", "x-cloak"]
    });
    const dropdownRoot = targetContainer.closest(".header__dropdown");
    if (dropdownRoot) {
      observer2.observe(dropdownRoot, {
        attributes: true,
        attributeFilter: ["style", "class"]
      });
    }
    targetContainer.addEventListener("mouseenter", tryHydratePending, { passive: true });
    targetContainer.setAttribute("data-dropdown-observer", "true");
    setTimeout(tryHydratePending, 0);
  },
  // Load quick add with section render
  fetchAndRenderProductSlider: function(collection_handle, container) {
    const targetContainer = document.getElementById(container);
    if (!targetContainer) return;
    this.ensureDropdownVisibilityObserver(targetContainer);
    if (!this.isElementVisible(targetContainer)) {
      targetContainer.setAttribute("data-pending-collection", collection_handle);
      return;
    }
    if (targetContainer.getAttribute("data-slider-collection") === collection_handle) {
      if (this.swatchDataFetched) {
        this.queueDropdownSwatchRender(targetContainer);
      } else {
        this.fetchUnifiedSwatches().then(() => {
          this.queueDropdownSwatchRender(targetContainer);
        });
      }
      return;
    }
    this.getDropdownSliderHtml(collection_handle).then((html) => {
      targetContainer.innerHTML = html;
      targetContainer.setAttribute("data-slider-collection", collection_handle);
      targetContainer.setAttribute("data-swatches-hydrated", "false");
      if (this.swatchDataFetched) {
        this.queueDropdownSwatchRender(targetContainer);
      } else {
        this.fetchUnifiedSwatches().then(() => {
          this.queueDropdownSwatchRender(targetContainer);
        });
      }
    });
  },
  // Handle filter changes on max price
  handleMaxPriceFilter: function() {
    this.filter_max_price = Math.max(
      this.filter_max_price,
      this.filter_min_price
    );
    this.filter_max_thumb = 100 - (this.filter_max_price - this.filter_min) / (this.filter_max - this.filter_min) * 100;
  },
  // Handle filter changes on min price
  handleMinPriceFilter: function() {
    this.filter_min_price = Math.min(
      this.filter_min_price,
      this.filter_max_price
    );
    this.filter_min_thumb = (this.filter_min_price - this.filter_min) / (this.filter_max - this.filter_min) * 100;
  },
  // Handle filter change
  handleFilterChange(id) {
    this.pagination_loading = true;
    this.pagination_current_page = 1;
    const filter = document.getElementById(id);
    if (filter) {
      const filterData = new FormData(filter);
      this.fetchAndRenderCollection(filterData);
    } else {
      console.error("Filter element not found.");
    }
  },
  // Handle deleting filters
  handleFilterDelete(filterToReset) {
    this.pagination_loading = true;
    const filter = document.getElementById("js:desktopFilter");
    if (filter) {
      const filterData = new FormData(filter);
      filterData.delete(filterToReset);
      if (filterToReset.indexOf("price") !== -1) {
        filterData.delete("filter.v.price.gte");
        filterData.delete("filter.v.price.lte");
        this.filter_min_price = this.filter_min;
        this.filter_max_price = this.filter_max;
      }
      this.fetchAndRenderCollection(filterData);
    } else {
      console.error("Filter element 'js:desktopFilter' not found.");
    }
  },
  // Handle deleting all filters
  handleFilterDeleteAll: function() {
    this.pagination_loading = true;
    let filterData = new FormData();
    this.fetchAndRenderCollection(filterData);
  },
  // Build urlFilter
  buildUrlFilter: function(filterData) {
    let urlFilter = "";
    for (var pair of filterData.entries()) {
      if (pair[0].indexOf("price") !== -1) {
        if (pair[0] === "filter.v.price.lte") {
          if (pair[1] < this.filter_max) {
            urlFilter = urlFilter + "&" + pair[0] + "=" + pair[1];
          }
        }
        if (pair[0] === "filter.v.price.gte") {
          if (pair[1] > this.filter_min) {
            urlFilter = urlFilter + "&" + pair[0] + "=" + pair[1];
          }
        }
      } else {
        urlFilter = urlFilter + "&" + pair[0] + "=" + encodeURIComponent(String(pair[1]));
      }
    }
    return urlFilter;
  },
  // Call section render API with data from filter
  fetchAndRenderCollection: function(filterData) {
    let filterUrl = this.buildUrlFilter(filterData);
    // Only forward `q` when it's actually present in the current URL.
    // Concatenating null produces the literal string "&q=null" which
    // tells Shopify there's a search query, switching the collection
    // into search-results mode and (in some cases) returning a
    // different / duplicated product set when combined with sort_by.
    let qValue = new URL(location.href).searchParams.get("q");
    let searchUrl = qValue ? "&q=" + encodeURIComponent(qValue) : "";
    // Preserve sort_by from the current URL. Filter changes go through
    // section_id AJAX, so without re-attaching sort_by the server falls
    // back to the collection's default sort (manual/featured) and the
    // re-rendered grid silently drops the user's chosen sort — making
    // it look like sorting "doesn't stick" after a filter change.
    let sortByValue = new URL(location.href).searchParams.get("sort_by");
    let sortUrl = sortByValue ? "&sort_by=" + encodeURIComponent(sortByValue) : "";
    history.pushState(
      null,
      "",
      window.location.pathname + "?" + filterUrl + searchUrl + sortUrl
    );
    fetch(
      window.location.pathname + "?section_id=" + this.pagination_section + filterUrl + searchUrl + sortUrl
    ).then((response) => response.text()).then((responseText) => {
      const html = responseText;
      const sectionElement = document.getElementById(
        "shopify-section-" + this.pagination_section
      );
      if (sectionElement) {
        sectionElement.innerHTML = html;
        // Alpine.js (started via `Alpine.start()` at the bottom of this
        // file) installs a global MutationObserver on `document` with
        // `subtree: true, childList: true`. The browser fires that
        // observer with the addedNodes from the line above, and Alpine
        // calls initTree() on every new element automatically. Calling
        // Alpine.initTree(sectionElement) here in addition produced a
        // duplicate-init bug that broke the Sort drawer toggle (two
        // separate Alpine scopes for the same x-data — the button's
        // click set `filter_sort_drawer_open = true` on one, the
        // drawer's `x-show` watched the other).
        this.renderSwatchesInElement(sectionElement);
      }
      if (!this.swatchDataFetched) {
        this.fetchUnifiedSwatches();
      }
      setTimeout(() => {
        this.pagination_loading = false;
      }, 100);
    });
  },
  // Check if next page is avaible and inject more products
  fetchAndRenderNextPage: function() {
    if (this.pagination_current_page < this.pagination_total_pages) {
      this.pagination_loading = true;
      let filter = document.getElementById("js:desktopFilter") || document.getElementById("js:quickFilter");
      let pageUrl = "&page=" + (this.pagination_current_page + 1);
      // Only forward `q` when it's actually present. See note on the
      // same fix in fetchAndRenderCollection above — sending the
      // literal "&q=null" flips the collection into search-results
      // mode on Shopify's side and can produce duplicates.
      let qValue = new URL(location.href).searchParams.get("q");
      let searchUrl = qValue ? "&q=" + encodeURIComponent(qValue) : "";
      // Preserve sort_by from the current URL. Without it, the AJAX
      // fetch for the next page uses the collection's default sort
      // (manual/featured) — those products are then appended to a grid
      // that's in the user's chosen sort, producing visible duplicates
      // (the same product shows up once in the user-sorted page and
      // again in the default-sorted next page).
      let sortByValue = new URL(location.href).searchParams.get("sort_by");
      let sortUrl = sortByValue ? "&sort_by=" + encodeURIComponent(sortByValue) : "";
      let fetchUrl = "";
      if (filter) {
        let filterData = new FormData(filter);
        let filterUrl = this.buildUrlFilter(filterData);
        fetchUrl = window.location.pathname + "?section_id=" + this.pagination_section + filterUrl + pageUrl + searchUrl + sortUrl;
      } else {
        fetchUrl = window.location.pathname + "?section_id=" + this.pagination_section + pageUrl + searchUrl + sortUrl;
      }
      fetch(fetchUrl).then((response) => response.text()).then((responseText) => {
        const parsedResponse = new DOMParser().parseFromString(responseText, "text/html");
        const resultsNode = parsedResponse.querySelector("#js\\:results");
        if (!resultsNode) {
          this.pagination_loading = false;
          return;
        }
        let htmlCleaned = resultsNode.innerHTML;
        const tempResults = document.createElement("div");
        tempResults.innerHTML = htmlCleaned;
        const newSwatchHandles = this.getRequestedSwatchHandles(tempResults);
        const resultsElement = document.getElementById("js:results");
        if (resultsElement) {
          resultsElement.insertAdjacentHTML("beforeend", htmlCleaned);
        }
        if (this.swatchDataFetched) {
          this.renderSwatchesByContainerHandles(newSwatchHandles);
        }
        setTimeout(() => {
          this.pagination_loading = false;
        }, 100);
        this.pagination_current_page = this.pagination_current_page + 1;
      }).catch(() => {
        // A failed fetch (flaky connection) must not brick the
        // infinite scroll — clear the flag so the sentinel retries.
        this.pagination_loading = false;
      });
    } else {
      this.pagination_loading = false;
    }
  }
};
const utils = {
  // Initiate header scrolling (unless in preview mode)
  initScroll: function() {
    if (!Shopify.visualPreviewMode) {
      const body = document.querySelector("body");
      body.setAttribute("x-on:scroll.window", `() => {
        if (window.pageYOffset > 400) {
          is_scrolled = window.pageYOffset > prev_scroll_pos ? true : false; 
          prev_scroll_pos = window.pageYOffset;
        } else {
          is_scrolled = false;
          prev_scroll_pos = window.pageYOffset;
        }
      }`);
    }
  },
  // Copy value of input to clipboard and focus element
  copyToClipboard: function(id) {
    var copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
  },
  // Check line items values
  checkLineItems(handle) {
    const inputs = document.querySelectorAll(
      `.custom-input_${handle}`
    );
    const inputsArr = Array.from(inputs);
    const requiredFields = inputsArr.filter((inp) => inp.required);
    if (requiredFields.some((field) => field.value === "")) {
      this.incomplete_fields = true;
    } else {
      this.incomplete_fields = false;
    }
  }
};
let Shopify$1 = window.Shopify || {};
Shopify$1.formatMoney = formatMoney;
initAnimationObserver();
window.app = function() {
  return {
    // Spread globals
    ...globals,
    ...cart,
    ...search,
    ...collections,
    ...utils
  };
};
window.globals = globals;
window.cart = cart;
window.search = search;
window.collections = collections;
window.utils = utils;
let mouseoverTimer;
let lastTouchTimestamp;
const prefetches = /* @__PURE__ */ new Set();
const prefetchElement = document.createElement("link");
const isSupported = prefetchElement.relList && prefetchElement.relList.supports && prefetchElement.relList.supports("prefetch") && window.IntersectionObserver && "isIntersecting" in IntersectionObserverEntry.prototype;
const allowQueryString = "instantAllowQueryString" in document.body.dataset;
const allowExternalLinks = "instantAllowExternalLinks" in document.body.dataset;
const useWhitelist = "instantWhitelist" in document.body.dataset;
const mousedownShortcut = "instantMousedownShortcut" in document.body.dataset;
const DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION = 1111;
let delayOnHover = 65;
let useMousedown = false;
let useMousedownOnly = false;
let useViewport = false;
if ("instantIntensity" in document.body.dataset) {
  const intensity = document.body.dataset.instantIntensity;
  if (intensity.substr(0, "mousedown".length) == "mousedown") {
    useMousedown = true;
    if (intensity == "mousedown-only") {
      useMousedownOnly = true;
    }
  } else if (intensity.substr(0, "viewport".length) == "viewport") {
    if (!(navigator.connection && (navigator.connection.saveData || navigator.connection.effectiveType && navigator.connection.effectiveType.includes("2g")))) {
      if (intensity == "viewport") {
        if (document.documentElement.clientWidth * document.documentElement.clientHeight < 45e4) {
          useViewport = true;
        }
      } else if (intensity == "viewport-all") {
        useViewport = true;
      }
    }
  } else {
    const milliseconds = parseInt(intensity);
    if (!isNaN(milliseconds)) {
      delayOnHover = milliseconds;
    }
  }
}
if (isSupported) {
  const eventListenersOptions = {
    capture: true,
    passive: true
  };
  if (!useMousedownOnly) {
    document.addEventListener("touchstart", touchstartListener, eventListenersOptions);
  }
  if (!useMousedown) {
    document.addEventListener("mouseover", mouseoverListener, eventListenersOptions);
  } else if (!mousedownShortcut) {
    document.addEventListener("mousedown", mousedownListener, eventListenersOptions);
  }
  if (mousedownShortcut) {
    document.addEventListener("mousedown", mousedownShortcutListener, eventListenersOptions);
  }
  if (useViewport) {
    let triggeringFunction;
    if (window.requestIdleCallback) {
      triggeringFunction = (callback2) => {
        requestIdleCallback(callback2, {
          timeout: 1500
        });
      };
    } else {
      triggeringFunction = (callback2) => {
        callback2();
      };
    }
    triggeringFunction(() => {
      const intersectionObserver = new IntersectionObserver((entries2) => {
        entries2.forEach((entry2) => {
          if (entry2.isIntersecting) {
            const linkElement = entry2.target;
            intersectionObserver.unobserve(linkElement);
            preload(linkElement.href);
          }
        });
      });
      document.querySelectorAll("a").forEach((linkElement) => {
        if (isPreloadable(linkElement)) {
          intersectionObserver.observe(linkElement);
        }
      });
    });
  }
}
function touchstartListener(event) {
  lastTouchTimestamp = performance.now();
  const linkElement = event.target.closest("a");
  if (!isPreloadable(linkElement)) {
    return;
  }
  preload(linkElement.href);
}
function mouseoverListener(event) {
  if (performance.now() - lastTouchTimestamp < DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION) {
    return;
  }
  if (!("closest" in event.target)) {
    return;
  }
  const linkElement = event.target.closest("a");
  if (!isPreloadable(linkElement)) {
    return;
  }
  linkElement.addEventListener("mouseout", mouseoutListener, { passive: true });
  mouseoverTimer = setTimeout(() => {
    preload(linkElement.href);
    mouseoverTimer = void 0;
  }, delayOnHover);
}
function mousedownListener(event) {
  const linkElement = event.target.closest("a");
  if (!isPreloadable(linkElement)) {
    return;
  }
  preload(linkElement.href);
}
function mouseoutListener(event) {
  if (event.relatedTarget && event.target.closest("a") == event.relatedTarget.closest("a")) {
    return;
  }
  if (mouseoverTimer) {
    clearTimeout(mouseoverTimer);
    mouseoverTimer = void 0;
  }
}
function mousedownShortcutListener(event) {
  if (performance.now() - lastTouchTimestamp < DELAY_TO_NOT_BE_CONSIDERED_A_TOUCH_INITIATED_ACTION) {
    return;
  }
  const linkElement = event.target.closest("a");
  if (event.which > 1 || event.metaKey || event.ctrlKey) {
    return;
  }
  if (!linkElement) {
    return;
  }
  linkElement.addEventListener("click", function(event2) {
    if (event2.detail == 1337) {
      return;
    }
    event2.preventDefault();
  }, { capture: true, passive: false, once: true });
  const customEvent = new MouseEvent("click", { view: window, bubbles: true, cancelable: false, detail: 1337 });
  linkElement.dispatchEvent(customEvent);
}
function isPreloadable(linkElement) {
  if (!linkElement || !linkElement.href) {
    return;
  }
  if (useWhitelist && !("instant" in linkElement.dataset)) {
    return;
  }
  if (!allowExternalLinks && linkElement.origin != location.origin && !("instant" in linkElement.dataset)) {
    return;
  }
  if (!["http:", "https:"].includes(linkElement.protocol)) {
    return;
  }
  if (linkElement.protocol == "http:" && location.protocol == "https:") {
    return;
  }
  if (!allowQueryString && linkElement.search && !("instant" in linkElement.dataset)) {
    return;
  }
  if (linkElement.hash && linkElement.pathname + linkElement.search == location.pathname + location.search) {
    return;
  }
  if ("noInstant" in linkElement.dataset) {
    return;
  }
  return true;
}
function preload(url) {
  if (prefetches.has(url)) {
    return;
  }
  const prefetcher = document.createElement("link");
  prefetcher.rel = "prefetch";
  prefetcher.href = url;
  document.head.appendChild(prefetcher);
  prefetches.add(url);
}
var flushPending = false;
var flushing = false;
var queue = [];
var lastFlushedIndex = -1;
function scheduler(callback2) {
  queueJob(callback2);
}
function queueJob(job) {
  if (!queue.includes(job))
    queue.push(job);
  queueFlush();
}
function dequeueJob(job) {
  let index = queue.indexOf(job);
  if (index !== -1 && index > lastFlushedIndex)
    queue.splice(index, 1);
}
function queueFlush() {
  if (!flushing && !flushPending) {
    flushPending = true;
    queueMicrotask(flushJobs);
  }
}
function flushJobs() {
  flushPending = false;
  flushing = true;
  for (let i = 0; i < queue.length; i++) {
    queue[i]();
    lastFlushedIndex = i;
  }
  queue.length = 0;
  lastFlushedIndex = -1;
  flushing = false;
}
var reactive;
var effect;
var release;
var raw;
var shouldSchedule = true;
function disableEffectScheduling(callback2) {
  shouldSchedule = false;
  callback2();
  shouldSchedule = true;
}
function setReactivityEngine(engine) {
  reactive = engine.reactive;
  release = engine.release;
  effect = (callback2) => engine.effect(callback2, { scheduler: (task) => {
    if (shouldSchedule) {
      scheduler(task);
    } else {
      task();
    }
  } });
  raw = engine.raw;
}
function overrideEffect(override) {
  effect = override;
}
function elementBoundEffect(el) {
  let cleanup2 = () => {
  };
  let wrappedEffect = (callback2) => {
    let effectReference = effect(callback2);
    if (!el._x_effects) {
      el._x_effects = /* @__PURE__ */ new Set();
      el._x_runEffects = () => {
        el._x_effects.forEach((i) => i());
      };
    }
    el._x_effects.add(effectReference);
    cleanup2 = () => {
      if (effectReference === void 0)
        return;
      el._x_effects.delete(effectReference);
      release(effectReference);
    };
    return effectReference;
  };
  return [wrappedEffect, () => {
    cleanup2();
  }];
}
var onAttributeAddeds = [];
var onElRemoveds = [];
var onElAddeds = [];
function onElAdded(callback2) {
  onElAddeds.push(callback2);
}
function onElRemoved(el, callback2) {
  if (typeof callback2 === "function") {
    if (!el._x_cleanups)
      el._x_cleanups = [];
    el._x_cleanups.push(callback2);
  } else {
    callback2 = el;
    onElRemoveds.push(callback2);
  }
}
function onAttributesAdded(callback2) {
  onAttributeAddeds.push(callback2);
}
function onAttributeRemoved(el, name, callback2) {
  if (!el._x_attributeCleanups)
    el._x_attributeCleanups = {};
  if (!el._x_attributeCleanups[name])
    el._x_attributeCleanups[name] = [];
  el._x_attributeCleanups[name].push(callback2);
}
function cleanupAttributes(el, names) {
  if (!el._x_attributeCleanups)
    return;
  Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
    if (names === void 0 || names.includes(name)) {
      value.forEach((i) => i());
      delete el._x_attributeCleanups[name];
    }
  });
}
var observer = new MutationObserver(onMutate);
var currentlyObserving = false;
function startObservingMutations() {
  observer.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true });
  currentlyObserving = true;
}
function stopObservingMutations() {
  flushObserver();
  observer.disconnect();
  currentlyObserving = false;
}
var recordQueue = [];
var willProcessRecordQueue = false;
function flushObserver() {
  recordQueue = recordQueue.concat(observer.takeRecords());
  if (recordQueue.length && !willProcessRecordQueue) {
    willProcessRecordQueue = true;
    queueMicrotask(() => {
      processRecordQueue();
      willProcessRecordQueue = false;
    });
  }
}
function processRecordQueue() {
  onMutate(recordQueue);
  recordQueue.length = 0;
}
function mutateDom(callback2) {
  if (!currentlyObserving)
    return callback2();
  stopObservingMutations();
  let result = callback2();
  startObservingMutations();
  return result;
}
var isCollecting = false;
var deferredMutations = [];
function deferMutations() {
  isCollecting = true;
}
function flushAndStopDeferringMutations() {
  isCollecting = false;
  onMutate(deferredMutations);
  deferredMutations = [];
}
function onMutate(mutations) {
  if (isCollecting) {
    deferredMutations = deferredMutations.concat(mutations);
    return;
  }
  let addedNodes = [];
  let removedNodes = [];
  let addedAttributes = /* @__PURE__ */ new Map();
  let removedAttributes = /* @__PURE__ */ new Map();
  for (let i = 0; i < mutations.length; i++) {
    if (mutations[i].target._x_ignoreMutationObserver)
      continue;
    if (mutations[i].type === "childList") {
      mutations[i].addedNodes.forEach((node) => node.nodeType === 1 && addedNodes.push(node));
      mutations[i].removedNodes.forEach((node) => node.nodeType === 1 && removedNodes.push(node));
    }
    if (mutations[i].type === "attributes") {
      let el = mutations[i].target;
      let name = mutations[i].attributeName;
      let oldValue = mutations[i].oldValue;
      let add2 = () => {
        if (!addedAttributes.has(el))
          addedAttributes.set(el, []);
        addedAttributes.get(el).push({ name, value: el.getAttribute(name) });
      };
      let remove = () => {
        if (!removedAttributes.has(el))
          removedAttributes.set(el, []);
        removedAttributes.get(el).push(name);
      };
      if (el.hasAttribute(name) && oldValue === null) {
        add2();
      } else if (el.hasAttribute(name)) {
        remove();
        add2();
      } else {
        remove();
      }
    }
  }
  removedAttributes.forEach((attrs, el) => {
    cleanupAttributes(el, attrs);
  });
  addedAttributes.forEach((attrs, el) => {
    onAttributeAddeds.forEach((i) => i(el, attrs));
  });
  for (let node of removedNodes) {
    if (addedNodes.includes(node))
      continue;
    onElRemoveds.forEach((i) => i(node));
    if (node._x_cleanups) {
      while (node._x_cleanups.length)
        node._x_cleanups.pop()();
    }
  }
  addedNodes.forEach((node) => {
    node._x_ignoreSelf = true;
    node._x_ignore = true;
  });
  for (let node of addedNodes) {
    if (removedNodes.includes(node))
      continue;
    if (!node.isConnected)
      continue;
    delete node._x_ignoreSelf;
    delete node._x_ignore;
    onElAddeds.forEach((i) => i(node));
    node._x_ignore = true;
    node._x_ignoreSelf = true;
  }
  addedNodes.forEach((node) => {
    delete node._x_ignoreSelf;
    delete node._x_ignore;
  });
  addedNodes = null;
  removedNodes = null;
  addedAttributes = null;
  removedAttributes = null;
}
function scope(node) {
  return mergeProxies(closestDataStack(node));
}
function addScopeToNode(node, data2, referenceNode) {
  node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
  return () => {
    node._x_dataStack = node._x_dataStack.filter((i) => i !== data2);
  };
}
function refreshScope(element2, scope2) {
  let existingScope = element2._x_dataStack[0];
  Object.entries(scope2).forEach(([key, value]) => {
    existingScope[key] = value;
  });
}
function closestDataStack(node) {
  if (node._x_dataStack)
    return node._x_dataStack;
  if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) {
    return closestDataStack(node.host);
  }
  if (!node.parentNode) {
    return [];
  }
  return closestDataStack(node.parentNode);
}
function mergeProxies(objects) {
  let thisProxy = new Proxy({}, {
    ownKeys: () => {
      return Array.from(new Set(objects.flatMap((i) => Object.keys(i))));
    },
    has: (target, name) => {
      return objects.some((obj) => obj.hasOwnProperty(name));
    },
    get: (target, name) => {
      return (objects.find((obj) => {
        if (obj.hasOwnProperty(name)) {
          let descriptor = Object.getOwnPropertyDescriptor(obj, name);
          if (descriptor.get && descriptor.get._x_alreadyBound || descriptor.set && descriptor.set._x_alreadyBound) {
            return true;
          }
          if ((descriptor.get || descriptor.set) && descriptor.enumerable) {
            let getter = descriptor.get;
            let setter = descriptor.set;
            let property = descriptor;
            getter = getter && getter.bind(thisProxy);
            setter = setter && setter.bind(thisProxy);
            if (getter)
              getter._x_alreadyBound = true;
            if (setter)
              setter._x_alreadyBound = true;
            Object.defineProperty(obj, name, {
              ...property,
              get: getter,
              set: setter
            });
          }
          return true;
        }
        return false;
      }) || {})[name];
    },
    set: (target, name, value) => {
      let closestObjectWithKey = objects.find((obj) => obj.hasOwnProperty(name));
      if (closestObjectWithKey) {
        closestObjectWithKey[name] = value;
      } else {
        objects[objects.length - 1][name] = value;
      }
      return true;
    }
  });
  return thisProxy;
}
function initInterceptors(data2) {
  let isObject2 = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
  let recurse = (obj, basePath = "") => {
    Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value, enumerable }]) => {
      if (enumerable === false || value === void 0)
        return;
      let path = basePath === "" ? key : `${basePath}.${key}`;
      if (typeof value === "object" && value !== null && value._x_interceptor) {
        obj[key] = value.initialize(data2, path, key);
      } else {
        if (isObject2(value) && value !== obj && !(value instanceof Element)) {
          recurse(value, path);
        }
      }
    });
  };
  return recurse(data2);
}
function interceptor(callback2, mutateObj = () => {
}) {
  let obj = {
    initialValue: void 0,
    _x_interceptor: true,
    initialize(data2, path, key) {
      return callback2(this.initialValue, () => get(data2, path), (value) => set(data2, path, value), path, key);
    }
  };
  mutateObj(obj);
  return (initialValue) => {
    if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
      let initialize = obj.initialize.bind(obj);
      obj.initialize = (data2, path, key) => {
        let innerValue = initialValue.initialize(data2, path, key);
        obj.initialValue = innerValue;
        return initialize(data2, path, key);
      };
    } else {
      obj.initialValue = initialValue;
    }
    return obj;
  };
}
function get(obj, path) {
  return path.split(".").reduce((carry, segment) => carry[segment], obj);
}
function set(obj, path, value) {
  if (typeof path === "string")
    path = path.split(".");
  if (path.length === 1)
    obj[path[0]] = value;
  else if (path.length === 0)
    throw error;
  else {
    if (obj[path[0]])
      return set(obj[path[0]], path.slice(1), value);
    else {
      obj[path[0]] = {};
      return set(obj[path[0]], path.slice(1), value);
    }
  }
}
var magics = {};
function magic(name, callback2) {
  magics[name] = callback2;
}
function injectMagics(obj, el) {
  Object.entries(magics).forEach(([name, callback2]) => {
    Object.defineProperty(obj, `$${name}`, {
      get() {
        let [utilities, cleanup2] = getElementBoundUtilities(el);
        utilities = { interceptor, ...utilities };
        onElRemoved(el, cleanup2);
        return callback2(el, utilities);
      },
      enumerable: false
    });
  });
  return obj;
}
function tryCatch(el, expression, callback2, ...args) {
  try {
    return callback2(...args);
  } catch (e) {
    handleError(e, el, expression);
  }
}
function handleError(error2, el, expression = void 0) {
  Object.assign(error2, { el, expression });
  console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + '"\n\n' : ""}`, el);
  setTimeout(() => {
    throw error2;
  }, 0);
}
var shouldAutoEvaluateFunctions = true;
function dontAutoEvaluateFunctions(callback2) {
  let cache = shouldAutoEvaluateFunctions;
  shouldAutoEvaluateFunctions = false;
  callback2();
  shouldAutoEvaluateFunctions = cache;
}
function evaluate(el, expression, extras = {}) {
  let result;
  evaluateLater(el, expression)((value) => result = value, extras);
  return result;
}
function evaluateLater(...args) {
  return theEvaluatorFunction(...args);
}
var theEvaluatorFunction = normalEvaluator;
function setEvaluator(newEvaluator) {
  theEvaluatorFunction = newEvaluator;
}
function normalEvaluator(el, expression) {
  let overriddenMagics = {};
  injectMagics(overriddenMagics, el);
  let dataStack = [overriddenMagics, ...closestDataStack(el)];
  let evaluator = typeof expression === "function" ? generateEvaluatorFromFunction(dataStack, expression) : generateEvaluatorFromString(dataStack, expression, el);
  return tryCatch.bind(null, el, expression, evaluator);
}
function generateEvaluatorFromFunction(dataStack, func) {
  return (receiver = () => {
  }, { scope: scope2 = {}, params = [] } = {}) => {
    let result = func.apply(mergeProxies([scope2, ...dataStack]), params);
    runIfTypeOfFunction(receiver, result);
  };
}
var evaluatorMemo = {};
function generateFunctionFromString(expression, el) {
  if (evaluatorMemo[expression]) {
    return evaluatorMemo[expression];
  }
  let AsyncFunction = Object.getPrototypeOf(async function() {
  }).constructor;
  let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression) || /^(let|const)\s/.test(expression) ? `(async()=>{ ${expression} })()` : expression;
  const safeAsyncFunction = () => {
    try {
      return new AsyncFunction(["__self", "scope"], `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`);
    } catch (error2) {
      handleError(error2, el, expression);
      return Promise.resolve();
    }
  };
  let func = safeAsyncFunction();
  evaluatorMemo[expression] = func;
  return func;
}
function generateEvaluatorFromString(dataStack, expression, el) {
  let func = generateFunctionFromString(expression, el);
  return (receiver = () => {
  }, { scope: scope2 = {}, params = [] } = {}) => {
    func.result = void 0;
    func.finished = false;
    let completeScope = mergeProxies([scope2, ...dataStack]);
    if (typeof func === "function") {
      let promise = func(func, completeScope).catch((error2) => handleError(error2, el, expression));
      if (func.finished) {
        runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
        func.result = void 0;
      } else {
        promise.then((result) => {
          runIfTypeOfFunction(receiver, result, completeScope, params, el);
        }).catch((error2) => handleError(error2, el, expression)).finally(() => func.result = void 0);
      }
    }
  };
}
function runIfTypeOfFunction(receiver, value, scope2, params, el) {
  if (shouldAutoEvaluateFunctions && typeof value === "function") {
    let result = value.apply(scope2, params);
    if (result instanceof Promise) {
      result.then((i) => runIfTypeOfFunction(receiver, i, scope2, params)).catch((error2) => handleError(error2, el, value));
    } else {
      receiver(result);
    }
  } else if (typeof value === "object" && value instanceof Promise) {
    value.then((i) => receiver(i));
  } else {
    receiver(value);
  }
}
var prefixAsString = "x-";
function prefix(subject = "") {
  return prefixAsString + subject;
}
function setPrefix(newPrefix) {
  prefixAsString = newPrefix;
}
var directiveHandlers = {};
function directive(name, callback2) {
  directiveHandlers[name] = callback2;
  return {
    before(directive2) {
      if (!directiveHandlers[directive2]) {
        console.warn(
          "Cannot find directive `${directive}`. `${name}` will use the default order of execution"
        );
        return;
      }
      const pos = directiveOrder.indexOf(directive2);
      directiveOrder.splice(pos >= 0 ? pos : directiveOrder.indexOf("DEFAULT"), 0, name);
    }
  };
}
function directives(el, attributes, originalAttributeOverride) {
  attributes = Array.from(attributes);
  if (el._x_virtualDirectives) {
    let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value]) => ({ name, value }));
    let staticAttributes = attributesOnly(vAttributes);
    vAttributes = vAttributes.map((attribute) => {
      if (staticAttributes.find((attr) => attr.name === attribute.name)) {
        return {
          name: `x-bind:${attribute.name}`,
          value: `"${attribute.value}"`
        };
      }
      return attribute;
    });
    attributes = attributes.concat(vAttributes);
  }
  let transformedAttributeMap = {};
  let directives2 = attributes.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
  return directives2.map((directive2) => {
    return getDirectiveHandler(el, directive2);
  });
}
function attributesOnly(attributes) {
  return Array.from(attributes).map(toTransformedAttributes()).filter((attr) => !outNonAlpineAttributes(attr));
}
var isDeferringHandlers = false;
var directiveHandlerStacks = /* @__PURE__ */ new Map();
var currentHandlerStackKey = /* @__PURE__ */ Symbol();
function deferHandlingDirectives(callback2) {
  isDeferringHandlers = true;
  let key = /* @__PURE__ */ Symbol();
  currentHandlerStackKey = key;
  directiveHandlerStacks.set(key, []);
  let flushHandlers = () => {
    while (directiveHandlerStacks.get(key).length)
      directiveHandlerStacks.get(key).shift()();
    directiveHandlerStacks.delete(key);
  };
  let stopDeferring = () => {
    isDeferringHandlers = false;
    flushHandlers();
  };
  callback2(flushHandlers);
  stopDeferring();
}
function getElementBoundUtilities(el) {
  let cleanups = [];
  let cleanup2 = (callback2) => cleanups.push(callback2);
  let [effect3, cleanupEffect] = elementBoundEffect(el);
  cleanups.push(cleanupEffect);
  let utilities = {
    Alpine: alpine_default,
    effect: effect3,
    cleanup: cleanup2,
    evaluateLater: evaluateLater.bind(evaluateLater, el),
    evaluate: evaluate.bind(evaluate, el)
  };
  let doCleanup = () => cleanups.forEach((i) => i());
  return [utilities, doCleanup];
}
function getDirectiveHandler(el, directive2) {
  let noop = () => {
  };
  let handler3 = directiveHandlers[directive2.type] || noop;
  let [utilities, cleanup2] = getElementBoundUtilities(el);
  onAttributeRemoved(el, directive2.original, cleanup2);
  let fullHandler = () => {
    if (el._x_ignore || el._x_ignoreSelf)
      return;
    handler3.inline && handler3.inline(el, directive2, utilities);
    handler3 = handler3.bind(handler3, el, directive2, utilities);
    isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler3) : handler3();
  };
  fullHandler.runCleanups = cleanup2;
  return fullHandler;
}
var startingWith = (subject, replacement) => ({ name, value }) => {
  if (name.startsWith(subject))
    name = name.replace(subject, replacement);
  return { name, value };
};
var into = (i) => i;
function toTransformedAttributes(callback2 = () => {
}) {
  return ({ name, value }) => {
    let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
      return transform(carry);
    }, { name, value });
    if (newName !== name)
      callback2(newName, name);
    return { name: newName, value: newValue };
  };
}
var attributeTransformers = [];
function mapAttributes(callback2) {
  attributeTransformers.push(callback2);
}
function outNonAlpineAttributes({ name }) {
  return alpineAttributeRegex().test(name);
}
var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
  return ({ name, value }) => {
    let typeMatch = name.match(alpineAttributeRegex());
    let valueMatch = name.match(/:([a-zA-Z0-9\-:]+)/);
    let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
    let original = originalAttributeOverride || transformedAttributeMap[name] || name;
    return {
      type: typeMatch ? typeMatch[1] : null,
      value: valueMatch ? valueMatch[1] : null,
      modifiers: modifiers.map((i) => i.replace(".", "")),
      expression: value,
      original
    };
  };
}
var DEFAULT = "DEFAULT";
var directiveOrder = [
  "ignore",
  "ref",
  "data",
  "id",
  "bind",
  "init",
  "for",
  "model",
  "modelable",
  "transition",
  "show",
  "if",
  DEFAULT,
  "teleport"
];
function byPriority(a, b) {
  let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
  let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
  return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
}
function dispatch(el, name, detail = {}) {
  el.dispatchEvent(
    new CustomEvent(name, {
      detail,
      bubbles: true,
      // Allows events to pass the shadow DOM barrier.
      composed: true,
      cancelable: true
    })
  );
}
function walk(el, callback2) {
  if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
    Array.from(el.children).forEach((el2) => walk(el2, callback2));
    return;
  }
  let skip = false;
  callback2(el, () => skip = true);
  if (skip)
    return;
  let node = el.firstElementChild;
  while (node) {
    walk(node, callback2);
    node = node.nextElementSibling;
  }
}
function warn(message, ...args) {
  console.warn(`Alpine Warning: ${message}`, ...args);
}
function start() {
  if (!document.body)
    warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
  dispatch(document, "alpine:init");
  dispatch(document, "alpine:initializing");
  startObservingMutations();
  onElAdded((el) => initTree(el, walk));
  onElRemoved((el) => destroyTree(el));
  onAttributesAdded((el, attrs) => {
    directives(el, attrs).forEach((handle) => handle());
  });
  let outNestedComponents = (el) => !closestRoot(el.parentElement, true);
  Array.from(document.querySelectorAll(allSelectors())).filter(outNestedComponents).forEach((el) => {
    initTree(el);
  });
  dispatch(document, "alpine:initialized");
}
var rootSelectorCallbacks = [];
var initSelectorCallbacks = [];
function rootSelectors() {
  return rootSelectorCallbacks.map((fn) => fn());
}
function allSelectors() {
  return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn) => fn());
}
function addRootSelector(selectorCallback) {
  rootSelectorCallbacks.push(selectorCallback);
}
function addInitSelector(selectorCallback) {
  initSelectorCallbacks.push(selectorCallback);
}
function closestRoot(el, includeInitSelectors = false) {
  return findClosest(el, (element2) => {
    const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
    if (selectors.some((selector) => element2.matches(selector)))
      return true;
  });
}
function findClosest(el, callback2) {
  if (!el)
    return;
  if (callback2(el))
    return el;
  if (el._x_teleportBack)
    el = el._x_teleportBack;
  if (!el.parentElement)
    return;
  return findClosest(el.parentElement, callback2);
}
function isRoot(el) {
  return rootSelectors().some((selector) => el.matches(selector));
}
var initInterceptors2 = [];
function interceptInit(callback2) {
  initInterceptors2.push(callback2);
}
function initTree(el, walker = walk, intercept = () => {
}) {
  deferHandlingDirectives(() => {
    walker(el, (el2, skip) => {
      intercept(el2, skip);
      initInterceptors2.forEach((i) => i(el2, skip));
      directives(el2, el2.attributes).forEach((handle) => handle());
      el2._x_ignore && skip();
    });
  });
}
function destroyTree(root) {
  walk(root, (el) => cleanupAttributes(el));
}
var tickStack = [];
var isHolding = false;
function nextTick(callback2 = () => {
}) {
  queueMicrotask(() => {
    isHolding || setTimeout(() => {
      releaseNextTicks();
    });
  });
  return new Promise((res) => {
    tickStack.push(() => {
      callback2();
      res();
    });
  });
}
function releaseNextTicks() {
  isHolding = false;
  while (tickStack.length)
    tickStack.shift()();
}
function holdNextTicks() {
  isHolding = true;
}
function setClasses(el, value) {
  if (Array.isArray(value)) {
    return setClassesFromString(el, value.join(" "));
  } else if (typeof value === "object" && value !== null) {
    return setClassesFromObject(el, value);
  } else if (typeof value === "function") {
    return setClasses(el, value());
  }
  return setClassesFromString(el, value);
}
function setClassesFromString(el, classString) {
  let missingClasses = (classString2) => classString2.split(" ").filter((i) => !el.classList.contains(i)).filter(Boolean);
  let addClassesAndReturnUndo = (classes) => {
    el.classList.add(...classes);
    return () => {
      el.classList.remove(...classes);
    };
  };
  classString = classString === true ? classString = "" : classString || "";
  return addClassesAndReturnUndo(missingClasses(classString));
}
function setClassesFromObject(el, classObject) {
  let split = (classString) => classString.split(" ").filter(Boolean);
  let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? split(classString) : false).filter(Boolean);
  let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? split(classString) : false).filter(Boolean);
  let added = [];
  let removed = [];
  forRemove.forEach((i) => {
    if (el.classList.contains(i)) {
      el.classList.remove(i);
      removed.push(i);
    }
  });
  forAdd.forEach((i) => {
    if (!el.classList.contains(i)) {
      el.classList.add(i);
      added.push(i);
    }
  });
  return () => {
    removed.forEach((i) => el.classList.add(i));
    added.forEach((i) => el.classList.remove(i));
  };
}
function setStyles(el, value) {
  if (typeof value === "object" && value !== null) {
    return setStylesFromObject(el, value);
  }
  return setStylesFromString(el, value);
}
function setStylesFromObject(el, value) {
  let previousStyles = {};
  Object.entries(value).forEach(([key, value2]) => {
    previousStyles[key] = el.style[key];
    if (!key.startsWith("--")) {
      key = kebabCase(key);
    }
    el.style.setProperty(key, value2);
  });
  setTimeout(() => {
    if (el.style.length === 0) {
      el.removeAttribute("style");
    }
  });
  return () => {
    setStyles(el, previousStyles);
  };
}
function setStylesFromString(el, value) {
  let cache = el.getAttribute("style", value);
  el.setAttribute("style", value);
  return () => {
    el.setAttribute("style", cache || "");
  };
}
function kebabCase(subject) {
  return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function once(callback2, fallback = () => {
}) {
  let called = false;
  return function() {
    if (!called) {
      called = true;
      callback2.apply(this, arguments);
    } else {
      fallback.apply(this, arguments);
    }
  };
}
directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate2 }) => {
  if (typeof expression === "function")
    expression = evaluate2(expression);
  if (!expression) {
    registerTransitionsFromHelper(el, modifiers, value);
  } else {
    registerTransitionsFromClassString(el, expression, value);
  }
});
function registerTransitionsFromClassString(el, classString, stage) {
  registerTransitionObject(el, setClasses, "");
  let directiveStorageMap = {
    "enter": (classes) => {
      el._x_transition.enter.during = classes;
    },
    "enter-start": (classes) => {
      el._x_transition.enter.start = classes;
    },
    "enter-end": (classes) => {
      el._x_transition.enter.end = classes;
    },
    "leave": (classes) => {
      el._x_transition.leave.during = classes;
    },
    "leave-start": (classes) => {
      el._x_transition.leave.start = classes;
    },
    "leave-end": (classes) => {
      el._x_transition.leave.end = classes;
    }
  };
  directiveStorageMap[stage](classString);
}
function registerTransitionsFromHelper(el, modifiers, stage) {
  registerTransitionObject(el, setStyles);
  let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
  let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
  let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
  if (modifiers.includes("in") && !doesntSpecify) {
    modifiers = modifiers.filter((i, index) => index < modifiers.indexOf("out"));
  }
  if (modifiers.includes("out") && !doesntSpecify) {
    modifiers = modifiers.filter((i, index) => index > modifiers.indexOf("out"));
  }
  let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
  let wantsOpacity = wantsAll || modifiers.includes("opacity");
  let wantsScale = wantsAll || modifiers.includes("scale");
  let opacityValue = wantsOpacity ? 0 : 1;
  let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
  let delay3 = modifierValue(modifiers, "delay", 0);
  let origin = modifierValue(modifiers, "origin", "center");
  let property = "opacity, transform";
  let durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
  let durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
  let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
  if (transitioningIn) {
    el._x_transition.enter.during = {
      transformOrigin: origin,
      transitionDelay: delay3,
      transitionProperty: property,
      transitionDuration: `${durationIn}s`,
      transitionTimingFunction: easing
    };
    el._x_transition.enter.start = {
      opacity: opacityValue,
      transform: `scale(${scaleValue})`
    };
    el._x_transition.enter.end = {
      opacity: 1,
      transform: `scale(1)`
    };
  }
  if (transitioningOut) {
    el._x_transition.leave.during = {
      transformOrigin: origin,
      transitionDelay: delay3,
      transitionProperty: property,
      transitionDuration: `${durationOut}s`,
      transitionTimingFunction: easing
    };
    el._x_transition.leave.start = {
      opacity: 1,
      transform: `scale(1)`
    };
    el._x_transition.leave.end = {
      opacity: opacityValue,
      transform: `scale(${scaleValue})`
    };
  }
}
function registerTransitionObject(el, setFunction, defaultValue = {}) {
  if (!el._x_transition)
    el._x_transition = {
      enter: { during: defaultValue, start: defaultValue, end: defaultValue },
      leave: { during: defaultValue, start: defaultValue, end: defaultValue },
      in(before = () => {
      }, after = () => {
      }) {
        transition(el, setFunction, {
          during: this.enter.during,
          start: this.enter.start,
          end: this.enter.end
        }, before, after);
      },
      out(before = () => {
      }, after = () => {
      }) {
        transition(el, setFunction, {
          during: this.leave.during,
          start: this.leave.start,
          end: this.leave.end
        }, before, after);
      }
    };
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide) {
  const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
  let clickAwayCompatibleShow = () => nextTick2(show);
  if (value) {
    if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
      el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
    } else {
      el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
    }
    return;
  }
  el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
    el._x_transition.out(() => {
    }, () => resolve(hide));
    el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
  }) : Promise.resolve(hide);
  queueMicrotask(() => {
    let closest = closestHide(el);
    if (closest) {
      if (!closest._x_hideChildren)
        closest._x_hideChildren = [];
      closest._x_hideChildren.push(el);
    } else {
      nextTick2(() => {
        let hideAfterChildren = (el2) => {
          let carry = Promise.all([
            el2._x_hidePromise,
            ...(el2._x_hideChildren || []).map(hideAfterChildren)
          ]).then(([i]) => i());
          delete el2._x_hidePromise;
          delete el2._x_hideChildren;
          return carry;
        };
        hideAfterChildren(el).catch((e) => {
          if (!e.isFromCancelledTransition)
            throw e;
        });
      });
    }
  });
};
function closestHide(el) {
  let parent = el.parentNode;
  if (!parent)
    return;
  return parent._x_hidePromise ? parent : closestHide(parent);
}
function transition(el, setFunction, { during, start: start2, end } = {}, before = () => {
}, after = () => {
}) {
  if (el._x_transitioning)
    el._x_transitioning.cancel();
  if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
    before();
    after();
    return;
  }
  let undoStart, undoDuring, undoEnd;
  performTransition(el, {
    start() {
      undoStart = setFunction(el, start2);
    },
    during() {
      undoDuring = setFunction(el, during);
    },
    before,
    end() {
      undoStart();
      undoEnd = setFunction(el, end);
    },
    after,
    cleanup() {
      undoDuring();
      undoEnd();
    }
  });
}
function performTransition(el, stages) {
  let interrupted, reachedBefore, reachedEnd;
  let finish = once(() => {
    mutateDom(() => {
      interrupted = true;
      if (!reachedBefore)
        stages.before();
      if (!reachedEnd) {
        stages.end();
        releaseNextTicks();
      }
      stages.after();
      if (el.isConnected)
        stages.cleanup();
      delete el._x_transitioning;
    });
  });
  el._x_transitioning = {
    beforeCancels: [],
    beforeCancel(callback2) {
      this.beforeCancels.push(callback2);
    },
    cancel: once(function() {
      while (this.beforeCancels.length) {
        this.beforeCancels.shift()();
      }
      finish();
    }),
    finish
  };
  mutateDom(() => {
    stages.start();
    stages.during();
  });
  holdNextTicks();
  requestAnimationFrame(() => {
    if (interrupted)
      return;
    let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
    let delay3 = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
    if (duration === 0)
      duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
    mutateDom(() => {
      stages.before();
    });
    reachedBefore = true;
    requestAnimationFrame(() => {
      if (interrupted)
        return;
      mutateDom(() => {
        stages.end();
      });
      releaseNextTicks();
      setTimeout(el._x_transitioning.finish, duration + delay3);
      reachedEnd = true;
    });
  });
}
function modifierValue(modifiers, key, fallback) {
  if (modifiers.indexOf(key) === -1)
    return fallback;
  const rawValue = modifiers[modifiers.indexOf(key) + 1];
  if (!rawValue)
    return fallback;
  if (key === "scale") {
    if (isNaN(rawValue))
      return fallback;
  }
  if (key === "duration") {
    let match = rawValue.match(/([0-9]+)ms/);
    if (match)
      return match[1];
  }
  if (key === "origin") {
    if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
      return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
    }
  }
  return rawValue;
}
var isCloning = false;
function skipDuringClone(callback2, fallback = () => {
}) {
  return (...args) => isCloning ? fallback(...args) : callback2(...args);
}
function onlyDuringClone(callback2) {
  return (...args) => isCloning && callback2(...args);
}
function clone(oldEl, newEl) {
  if (!newEl._x_dataStack)
    newEl._x_dataStack = oldEl._x_dataStack;
  isCloning = true;
  dontRegisterReactiveSideEffects(() => {
    cloneTree(newEl);
  });
  isCloning = false;
}
function cloneTree(el) {
  let hasRunThroughFirstEl = false;
  let shallowWalker = (el2, callback2) => {
    walk(el2, (el3, skip) => {
      if (hasRunThroughFirstEl && isRoot(el3))
        return skip();
      hasRunThroughFirstEl = true;
      callback2(el3, skip);
    });
  };
  initTree(el, shallowWalker);
}
function dontRegisterReactiveSideEffects(callback2) {
  let cache = effect;
  overrideEffect((callback22, el) => {
    let storedEffect = cache(callback22);
    release(storedEffect);
    return () => {
    };
  });
  callback2();
  overrideEffect(cache);
}
function bind(el, name, value, modifiers = []) {
  if (!el._x_bindings)
    el._x_bindings = reactive({});
  el._x_bindings[name] = value;
  name = modifiers.includes("camel") ? camelCase(name) : name;
  switch (name) {
    case "value":
      bindInputValue(el, value);
      break;
    case "style":
      bindStyles(el, value);
      break;
    case "class":
      bindClasses(el, value);
      break;
    default:
      bindAttribute(el, name, value);
      break;
  }
}
function bindInputValue(el, value) {
  if (el.type === "radio") {
    if (el.attributes.value === void 0) {
      el.value = value;
    }
    if (window.fromModel) {
      el.checked = checkedAttrLooseCompare(el.value, value);
    }
  } else if (el.type === "checkbox") {
    if (Number.isInteger(value)) {
      el.value = value;
    } else if (!Number.isInteger(value) && !Array.isArray(value) && typeof value !== "boolean" && ![null, void 0].includes(value)) {
      el.value = String(value);
    } else {
      if (Array.isArray(value)) {
        el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
      } else {
        el.checked = !!value;
      }
    }
  } else if (el.tagName === "SELECT") {
    updateSelect(el, value);
  } else {
    if (el.value === value)
      return;
    el.value = value;
  }
}
function bindClasses(el, value) {
  if (el._x_undoAddedClasses)
    el._x_undoAddedClasses();
  el._x_undoAddedClasses = setClasses(el, value);
}
function bindStyles(el, value) {
  if (el._x_undoAddedStyles)
    el._x_undoAddedStyles();
  el._x_undoAddedStyles = setStyles(el, value);
}
function bindAttribute(el, name, value) {
  if ([null, void 0, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
    el.removeAttribute(name);
  } else {
    if (isBooleanAttr(name))
      value = name;
    setIfChanged(el, name, value);
  }
}
function setIfChanged(el, attrName, value) {
  if (el.getAttribute(attrName) != value) {
    el.setAttribute(attrName, value);
  }
}
function updateSelect(el, value) {
  const arrayWrappedValue = [].concat(value).map((value2) => {
    return value2 + "";
  });
  Array.from(el.options).forEach((option) => {
    option.selected = arrayWrappedValue.includes(option.value);
  });
}
function camelCase(subject) {
  return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
}
function checkedAttrLooseCompare(valueA, valueB) {
  return valueA == valueB;
}
function isBooleanAttr(attrName) {
  const booleanAttributes = [
    "disabled",
    "checked",
    "required",
    "readonly",
    "hidden",
    "open",
    "selected",
    "autofocus",
    "itemscope",
    "multiple",
    "novalidate",
    "allowfullscreen",
    "allowpaymentrequest",
    "formnovalidate",
    "autoplay",
    "controls",
    "loop",
    "muted",
    "playsinline",
    "default",
    "ismap",
    "reversed",
    "async",
    "defer",
    "nomodule"
  ];
  return booleanAttributes.includes(attrName);
}
function attributeShouldntBePreservedIfFalsy(name) {
  return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(name);
}
function getBinding(el, name, fallback) {
  if (el._x_bindings && el._x_bindings[name] !== void 0)
    return el._x_bindings[name];
  let attr = el.getAttribute(name);
  if (attr === null)
    return typeof fallback === "function" ? fallback() : fallback;
  if (attr === "")
    return true;
  if (isBooleanAttr(name)) {
    return !![name, "true"].includes(attr);
  }
  return attr;
}
function debounce(func, wait) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function throttle(func, limit) {
  let inThrottle;
  return function() {
    let context = this, args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
function plugin(callback2) {
  callback2(alpine_default);
}
var stores = {};
var isReactive = false;
function store(name, value) {
  if (!isReactive) {
    stores = reactive(stores);
    isReactive = true;
  }
  if (value === void 0) {
    return stores[name];
  }
  stores[name] = value;
  if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
    stores[name].init();
  }
  initInterceptors(stores[name]);
}
function getStores() {
  return stores;
}
var binds = {};
function bind2(name, bindings) {
  let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
  if (name instanceof Element) {
    applyBindingsObject(name, getBindings());
  } else {
    binds[name] = getBindings;
  }
}
function injectBindingProviders(obj) {
  Object.entries(binds).forEach(([name, callback2]) => {
    Object.defineProperty(obj, name, {
      get() {
        return (...args) => {
          return callback2(...args);
        };
      }
    });
  });
  return obj;
}
function applyBindingsObject(el, obj, original) {
  let cleanupRunners = [];
  while (cleanupRunners.length)
    cleanupRunners.pop()();
  let attributes = Object.entries(obj).map(([name, value]) => ({ name, value }));
  let staticAttributes = attributesOnly(attributes);
  attributes = attributes.map((attribute) => {
    if (staticAttributes.find((attr) => attr.name === attribute.name)) {
      return {
        name: `x-bind:${attribute.name}`,
        value: `"${attribute.value}"`
      };
    }
    return attribute;
  });
  directives(el, attributes, original).map((handle) => {
    cleanupRunners.push(handle.runCleanups);
    handle();
  });
}
var datas = {};
function data(name, callback2) {
  datas[name] = callback2;
}
function injectDataProviders(obj, context) {
  Object.entries(datas).forEach(([name, callback2]) => {
    Object.defineProperty(obj, name, {
      get() {
        return (...args) => {
          return callback2.bind(context)(...args);
        };
      },
      enumerable: false
    });
  });
  return obj;
}
var Alpine = {
  get reactive() {
    return reactive;
  },
  get release() {
    return release;
  },
  get effect() {
    return effect;
  },
  get raw() {
    return raw;
  },
  version: "3.12.0",
  flushAndStopDeferringMutations,
  dontAutoEvaluateFunctions,
  disableEffectScheduling,
  startObservingMutations,
  stopObservingMutations,
  setReactivityEngine,
  closestDataStack,
  skipDuringClone,
  onlyDuringClone,
  addRootSelector,
  addInitSelector,
  addScopeToNode,
  deferMutations,
  mapAttributes,
  evaluateLater,
  interceptInit,
  setEvaluator,
  mergeProxies,
  findClosest,
  closestRoot,
  destroyTree,
  interceptor,
  // INTERNAL: not public API and is subject to change without major release.
  transition,
  // INTERNAL
  setStyles,
  // INTERNAL
  mutateDom,
  directive,
  throttle,
  debounce,
  evaluate,
  initTree,
  nextTick,
  prefixed: prefix,
  prefix: setPrefix,
  plugin,
  magic,
  store,
  start,
  clone,
  bound: getBinding,
  $data: scope,
  walk,
  data,
  bind: bind2
};
var alpine_default = Alpine;
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return (val) => !!map[val];
}
var EMPTY_OBJ = Object.freeze({});
var extend = Object.assign;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
var targetMap = /* @__PURE__ */ new WeakMap();
var effectStack = [];
var activeEffect;
var ITERATE_KEY = /* @__PURE__ */ Symbol("iterate");
var MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol("Map key iterate");
function isEffect(fn) {
  return fn && fn._isEffect === true;
}
function effect2(fn, options = EMPTY_OBJ) {
  if (isEffect(fn)) {
    fn = fn.raw;
  }
  const effect3 = createReactiveEffect(fn, options);
  if (!options.lazy) {
    effect3();
  }
  return effect3;
}
function stop(effect3) {
  if (effect3.active) {
    cleanup(effect3);
    if (effect3.options.onStop) {
      effect3.options.onStop();
    }
    effect3.active = false;
  }
}
var uid = 0;
function createReactiveEffect(fn, options) {
  const effect3 = function reactiveEffect() {
    if (!effect3.active) {
      return fn();
    }
    if (!effectStack.includes(effect3)) {
      cleanup(effect3);
      try {
        enableTracking();
        effectStack.push(effect3);
        activeEffect = effect3;
        return fn();
      } finally {
        effectStack.pop();
        resetTracking();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };
  effect3.id = uid++;
  effect3.allowRecurse = !!options.allowRecurse;
  effect3._isEffect = true;
  effect3.active = true;
  effect3.raw = fn;
  effect3.deps = [];
  effect3.options = options;
  return effect3;
}
function cleanup(effect3) {
  const { deps } = effect3;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect3);
    }
    deps.length = 0;
  }
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (!shouldTrack || activeEffect === void 0) {
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, dep = /* @__PURE__ */ new Set());
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.options.onTrack) {
      activeEffect.options.onTrack({
        effect: activeEffect,
        target,
        type,
        key
      });
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const effects = /* @__PURE__ */ new Set();
  const add2 = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach((effect3) => {
        if (effect3 !== activeEffect || effect3.allowRecurse) {
          effects.add(effect3);
        }
      });
    }
  };
  if (type === "clear") {
    depsMap.forEach(add2);
  } else if (key === "length" && isArray(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        add2(dep);
      }
    });
  } else {
    if (key !== void 0) {
      add2(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          add2(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            add2(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          add2(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          add2(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            add2(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          add2(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const run = (effect3) => {
    if (effect3.options.onTrigger) {
      effect3.options.onTrigger({
        effect: effect3,
        target,
        key,
        type,
        newValue,
        oldValue,
        oldTarget
      });
    }
    if (effect3.options.scheduler) {
      effect3.options.scheduler(effect3);
    } else {
      effect3();
    }
  };
  effects.forEach(run);
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
var get2 = /* @__PURE__ */ createGetter();
var shallowGet = /* @__PURE__ */ createGetter(false, true);
var readonlyGet = /* @__PURE__ */ createGetter(true);
var shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
var arrayInstrumentations = {};
["includes", "indexOf", "lastIndexOf"].forEach((key) => {
  const method = Array.prototype[key];
  arrayInstrumentations[key] = function(...args) {
    const arr = toRaw(this);
    for (let i = 0, l = this.length; i < l; i++) {
      track(arr, "get", i + "");
    }
    const res = method.apply(arr, args);
    if (res === -1 || res === false) {
      return method.apply(arr, args.map(toRaw));
    } else {
      return res;
    }
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
  const method = Array.prototype[key];
  arrayInstrumentations[key] = function(...args) {
    pauseTracking();
    const res = method.apply(this, args);
    resetTracking();
    return res;
  };
});
function createGetter(isReadonly = false, shallow = false) {
  return function get3(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive2(res);
    }
    return res;
  };
}
var set2 = /* @__PURE__ */ createSetter();
var shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set3(target, key, value, receiver) {
    let oldValue = target[key];
    if (!shallow) {
      value = toRaw(value);
      oldValue = toRaw(oldValue);
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys$1(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
var mutableHandlers = {
  get: get2,
  set: set2,
  deleteProperty,
  has,
  ownKeys: ownKeys$1
};
var readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
var toReactive = (value) => isObject(value) ? reactive2(value) : value;
var toReadonly = (value) => isObject(value) ? readonly(value) : value;
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
function get$1(target, key, isReadonly = false, isShallow = false) {
  target = target[
    "__v_raw"
    /* RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly && track(rawTarget, "get", key);
  }
  !isReadonly && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1(key, isReadonly = false) {
  const target = this[
    "__v_raw"
    /* RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly && track(rawTarget, "has", key);
  }
  !isReadonly && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly = false) {
  target = target[
    "__v_raw"
    /* RAW */
  ];
  !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get3 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get3.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get3 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get3 ? get3.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly, isShallow) {
  return function forEach(callback2, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback2.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly, isShallow) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
var mutableInstrumentations = {
  get(key) {
    return get$1(this, key);
  },
  get size() {
    return size(this);
  },
  has: has$1,
  add,
  set: set$1,
  delete: deleteEntry,
  clear,
  forEach: createForEach(false, false)
};
var shallowInstrumentations = {
  get(key) {
    return get$1(this, key, false, true);
  },
  get size() {
    return size(this);
  },
  has: has$1,
  add,
  set: set$1,
  delete: deleteEntry,
  clear,
  forEach: createForEach(false, true)
};
var readonlyInstrumentations = {
  get(key) {
    return get$1(this, key, true);
  },
  get size() {
    return size(this, true);
  },
  has(key) {
    return has$1.call(this, key, true);
  },
  add: createReadonlyMethod(
    "add"
    /* ADD */
  ),
  set: createReadonlyMethod(
    "set"
    /* SET */
  ),
  delete: createReadonlyMethod(
    "delete"
    /* DELETE */
  ),
  clear: createReadonlyMethod(
    "clear"
    /* CLEAR */
  ),
  forEach: createForEach(true, false)
};
var shallowReadonlyInstrumentations = {
  get(key) {
    return get$1(this, key, true, true);
  },
  get size() {
    return size(this, true);
  },
  has(key) {
    return has$1.call(this, key, true);
  },
  add: createReadonlyMethod(
    "add"
    /* ADD */
  ),
  set: createReadonlyMethod(
    "set"
    /* SET */
  ),
  delete: createReadonlyMethod(
    "delete"
    /* DELETE */
  ),
  clear: createReadonlyMethod(
    "clear"
    /* CLEAR */
  ),
  forEach: createForEach(true, true)
};
var iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
iteratorMethods.forEach((method) => {
  mutableInstrumentations[method] = createIterableMethod(method, false, false);
  readonlyInstrumentations[method] = createIterableMethod(method, true, false);
  shallowInstrumentations[method] = createIterableMethod(method, false, true);
  shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
});
function createInstrumentationGetter(isReadonly, shallow) {
  const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
var mutableCollectionHandlers = {
  get: createInstrumentationGetter(false, false)
};
var readonlyCollectionHandlers = {
  get: createInstrumentationGetter(true, false)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
var reactiveMap = /* @__PURE__ */ new WeakMap();
var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
var readonlyMap = /* @__PURE__ */ new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive2(target) {
  if (target && target[
    "__v_isReadonly"
    /* IS_READONLY */
  ]) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target[
    "__v_raw"
    /* RAW */
  ] && !(isReadonly && target[
    "__v_isReactive"
    /* IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function toRaw(observed) {
  return observed && toRaw(observed[
    "__v_raw"
    /* RAW */
  ]) || observed;
}
function isRef(r) {
  return Boolean(r && r.__v_isRef === true);
}
magic("nextTick", () => nextTick);
magic("dispatch", (el) => dispatch.bind(dispatch, el));
magic("watch", (el, { evaluateLater: evaluateLater2, effect: effect3 }) => (key, callback2) => {
  let evaluate2 = evaluateLater2(key);
  let firstTime = true;
  let oldValue;
  let effectReference = effect3(() => evaluate2((value) => {
    JSON.stringify(value);
    if (!firstTime) {
      queueMicrotask(() => {
        callback2(value, oldValue);
        oldValue = value;
      });
    } else {
      oldValue = value;
    }
    firstTime = false;
  }));
  el._x_effects.delete(effectReference);
});
magic("store", getStores);
magic("data", (el) => scope(el));
magic("root", (el) => closestRoot(el));
magic("refs", (el) => {
  if (el._x_refs_proxy)
    return el._x_refs_proxy;
  el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
  return el._x_refs_proxy;
});
function getArrayOfRefObject(el) {
  let refObjects = [];
  let currentEl = el;
  while (currentEl) {
    if (currentEl._x_refs)
      refObjects.push(currentEl._x_refs);
    currentEl = currentEl.parentNode;
  }
  return refObjects;
}
var globalIdMemo = {};
function findAndIncrementId(name) {
  if (!globalIdMemo[name])
    globalIdMemo[name] = 0;
  return ++globalIdMemo[name];
}
function closestIdRoot(el, name) {
  return findClosest(el, (element2) => {
    if (element2._x_ids && element2._x_ids[name])
      return true;
  });
}
function setIdRoot(el, name) {
  if (!el._x_ids)
    el._x_ids = {};
  if (!el._x_ids[name])
    el._x_ids[name] = findAndIncrementId(name);
}
magic("id", (el) => (name, key = null) => {
  let root = closestIdRoot(el, name);
  let id = root ? root._x_ids[name] : findAndIncrementId(name);
  return key ? `${name}-${id}-${key}` : `${name}-${id}`;
});
magic("el", (el) => el);
warnMissingPluginMagic("Focus", "focus", "focus");
warnMissingPluginMagic("Persist", "persist", "persist");
function warnMissingPluginMagic(name, magicName, slug) {
  magic(magicName, (el) => warn(`You can't use [$${directiveName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
}
function entangle({ get: outerGet, set: outerSet }, { get: innerGet, set: innerSet }) {
  let firstRun = true;
  let outerHash, outerHashLatest;
  let reference = effect(() => {
    let outer, inner;
    if (firstRun) {
      outer = outerGet();
      innerSet(outer);
      inner = innerGet();
      firstRun = false;
    } else {
      outer = outerGet();
      inner = innerGet();
      outerHashLatest = JSON.stringify(outer);
      JSON.stringify(inner);
      if (outerHashLatest !== outerHash) {
        inner = innerGet();
        innerSet(outer);
        inner = outer;
      } else {
        outerSet(inner);
        outer = inner;
      }
    }
    outerHash = JSON.stringify(outer);
    JSON.stringify(inner);
  });
  return () => {
    release(reference);
  };
}
directive("modelable", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
  let func = evaluateLater2(expression);
  let innerGet = () => {
    let result;
    func((i) => result = i);
    return result;
  };
  let evaluateInnerSet = evaluateLater2(`${expression} = __placeholder`);
  let innerSet = (val) => evaluateInnerSet(() => {
  }, { scope: { "__placeholder": val } });
  let initialValue = innerGet();
  innerSet(initialValue);
  queueMicrotask(() => {
    if (!el._x_model)
      return;
    el._x_removeModelListeners["default"]();
    let outerGet = el._x_model.get;
    let outerSet = el._x_model.set;
    let releaseEntanglement = entangle(
      {
        get() {
          return outerGet();
        },
        set(value) {
          outerSet(value);
        }
      },
      {
        get() {
          return innerGet();
        },
        set(value) {
          innerSet(value);
        }
      }
    );
    cleanup2(releaseEntanglement);
  });
});
var teleportContainerDuringClone = document.createElement("div");
directive("teleport", (el, { modifiers, expression }, { cleanup: cleanup2 }) => {
  if (el.tagName.toLowerCase() !== "template")
    warn("x-teleport can only be used on a <template> tag", el);
  let target = skipDuringClone(() => {
    return document.querySelector(expression);
  }, () => {
    return teleportContainerDuringClone;
  })();
  if (!target)
    warn(`Cannot find x-teleport element for selector: "${expression}"`);
  let clone2 = el.content.cloneNode(true).firstElementChild;
  el._x_teleport = clone2;
  clone2._x_teleportBack = el;
  if (el._x_forwardEvents) {
    el._x_forwardEvents.forEach((eventName) => {
      clone2.addEventListener(eventName, (e) => {
        e.stopPropagation();
        el.dispatchEvent(new e.constructor(e.type, e));
      });
    });
  }
  addScopeToNode(clone2, {}, el);
  mutateDom(() => {
    if (modifiers.includes("prepend")) {
      target.parentNode.insertBefore(clone2, target);
    } else if (modifiers.includes("append")) {
      target.parentNode.insertBefore(clone2, target.nextSibling);
    } else {
      target.appendChild(clone2);
    }
    initTree(clone2);
    clone2._x_ignore = true;
  });
  cleanup2(() => clone2.remove());
});
var handler = () => {
};
handler.inline = (el, { modifiers }, { cleanup: cleanup2 }) => {
  modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
  cleanup2(() => {
    modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
  });
};
directive("ignore", handler);
directive("effect", (el, { expression }, { effect: effect3 }) => effect3(evaluateLater(el, expression)));
function on(el, event, modifiers, callback2) {
  let listenerTarget = el;
  let handler3 = (e) => callback2(e);
  let options = {};
  let wrapHandler = (callback22, wrapper) => (e) => wrapper(callback22, e);
  if (modifiers.includes("dot"))
    event = dotSyntax(event);
  if (modifiers.includes("camel"))
    event = camelCase2(event);
  if (modifiers.includes("passive"))
    options.passive = true;
  if (modifiers.includes("capture"))
    options.capture = true;
  if (modifiers.includes("window"))
    listenerTarget = window;
  if (modifiers.includes("document"))
    listenerTarget = document;
  if (modifiers.includes("prevent"))
    handler3 = wrapHandler(handler3, (next, e) => {
      e.preventDefault();
      next(e);
    });
  if (modifiers.includes("stop"))
    handler3 = wrapHandler(handler3, (next, e) => {
      e.stopPropagation();
      next(e);
    });
  if (modifiers.includes("self"))
    handler3 = wrapHandler(handler3, (next, e) => {
      e.target === el && next(e);
    });
  if (modifiers.includes("away") || modifiers.includes("outside")) {
    listenerTarget = document;
    handler3 = wrapHandler(handler3, (next, e) => {
      if (el.contains(e.target))
        return;
      if (e.target.isConnected === false)
        return;
      if (el.offsetWidth < 1 && el.offsetHeight < 1)
        return;
      if (el._x_isShown === false)
        return;
      next(e);
    });
  }
  if (modifiers.includes("once")) {
    handler3 = wrapHandler(handler3, (next, e) => {
      next(e);
      listenerTarget.removeEventListener(event, handler3, options);
    });
  }
  handler3 = wrapHandler(handler3, (next, e) => {
    if (isKeyEvent(event)) {
      if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
        return;
      }
    }
    next(e);
  });
  if (modifiers.includes("debounce")) {
    let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
    let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
    handler3 = debounce(handler3, wait);
  }
  if (modifiers.includes("throttle")) {
    let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
    let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
    handler3 = throttle(handler3, wait);
  }
  listenerTarget.addEventListener(event, handler3, options);
  return () => {
    listenerTarget.removeEventListener(event, handler3, options);
  };
}
function dotSyntax(subject) {
  return subject.replace(/-/g, ".");
}
function camelCase2(subject) {
  return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
}
function isNumeric(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}
function kebabCase2(subject) {
  if ([" ", "_"].includes(
    subject
  ))
    return subject;
  return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
}
function isKeyEvent(event) {
  return ["keydown", "keyup"].includes(event);
}
function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
  let keyModifiers = modifiers.filter((i) => {
    return !["window", "document", "prevent", "stop", "once", "capture"].includes(i);
  });
  if (keyModifiers.includes("debounce")) {
    let debounceIndex = keyModifiers.indexOf("debounce");
    keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (keyModifiers.includes("throttle")) {
    let debounceIndex = keyModifiers.indexOf("throttle");
    keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (keyModifiers.length === 0)
    return false;
  if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0]))
    return false;
  const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
  const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
  keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
  if (selectedSystemKeyModifiers.length > 0) {
    const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
      if (modifier === "cmd" || modifier === "super")
        modifier = "meta";
      return e[`${modifier}Key`];
    });
    if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
      if (keyToModifiers(e.key).includes(keyModifiers[0]))
        return false;
    }
  }
  return true;
}
function keyToModifiers(key) {
  if (!key)
    return [];
  key = kebabCase2(key);
  let modifierToKeyMap = {
    "ctrl": "control",
    "slash": "/",
    "space": " ",
    "spacebar": " ",
    "cmd": "meta",
    "esc": "escape",
    "up": "arrow-up",
    "down": "arrow-down",
    "left": "arrow-left",
    "right": "arrow-right",
    "period": ".",
    "equal": "=",
    "minus": "-",
    "underscore": "_"
  };
  modifierToKeyMap[key] = key;
  return Object.keys(modifierToKeyMap).map((modifier) => {
    if (modifierToKeyMap[modifier] === key)
      return modifier;
  }).filter((modifier) => modifier);
}
directive("model", (el, { modifiers, expression }, { effect: effect3, cleanup: cleanup2 }) => {
  let scopeTarget = el;
  if (modifiers.includes("parent")) {
    scopeTarget = el.parentNode;
  }
  let evaluateGet = evaluateLater(scopeTarget, expression);
  let evaluateSet;
  if (typeof expression === "string") {
    evaluateSet = evaluateLater(scopeTarget, `${expression} = __placeholder`);
  } else if (typeof expression === "function" && typeof expression() === "string") {
    evaluateSet = evaluateLater(scopeTarget, `${expression()} = __placeholder`);
  } else {
    evaluateSet = () => {
    };
  }
  let getValue = () => {
    let result;
    evaluateGet((value) => result = value);
    return isGetterSetter(result) ? result.get() : result;
  };
  let setValue = (value) => {
    let result;
    evaluateGet((value2) => result = value2);
    if (isGetterSetter(result)) {
      result.set(value);
    } else {
      evaluateSet(() => {
      }, {
        scope: { "__placeholder": value }
      });
    }
  };
  if (modifiers.includes("fill") && el.hasAttribute("value") && (getValue() === null || getValue() === "")) {
    setValue(el.value);
  }
  if (typeof expression === "string" && el.type === "radio") {
    mutateDom(() => {
      if (!el.hasAttribute("name"))
        el.setAttribute("name", expression);
    });
  }
  var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
  let removeListener = isCloning ? () => {
  } : on(el, event, modifiers, (e) => {
    setValue(getInputValue(el, modifiers, e, getValue()));
  });
  if (!el._x_removeModelListeners)
    el._x_removeModelListeners = {};
  el._x_removeModelListeners["default"] = removeListener;
  cleanup2(() => el._x_removeModelListeners["default"]());
  if (el.form) {
    let removeResetListener = on(el.form, "reset", [], (e) => {
      nextTick(() => el._x_model && el._x_model.set(el.value));
    });
    cleanup2(() => removeResetListener());
  }
  el._x_model = {
    get() {
      return getValue();
    },
    set(value) {
      setValue(value);
    }
  };
  el._x_forceModelUpdate = (value) => {
    value = value === void 0 ? getValue() : value;
    if (value === void 0 && typeof expression === "string" && expression.match(/\./))
      value = "";
    window.fromModel = true;
    mutateDom(() => bind(el, "value", value));
    delete window.fromModel;
  };
  effect3(() => {
    let value = getValue();
    if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el))
      return;
    el._x_forceModelUpdate(value);
  });
});
function getInputValue(el, modifiers, event, currentValue) {
  return mutateDom(() => {
    if (event instanceof CustomEvent && event.detail !== void 0) {
      return typeof event.detail != "undefined" ? event.detail : event.target.value;
    } else if (el.type === "checkbox") {
      if (Array.isArray(currentValue)) {
        let newValue = modifiers.includes("number") ? safeParseNumber(event.target.value) : event.target.value;
        return event.target.checked ? currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare2(el2, newValue));
      } else {
        return event.target.checked;
      }
    } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
      return modifiers.includes("number") ? Array.from(event.target.selectedOptions).map((option) => {
        let rawValue = option.value || option.text;
        return safeParseNumber(rawValue);
      }) : Array.from(event.target.selectedOptions).map((option) => {
        return option.value || option.text;
      });
    } else {
      let rawValue = event.target.value;
      return modifiers.includes("number") ? safeParseNumber(rawValue) : modifiers.includes("trim") ? rawValue.trim() : rawValue;
    }
  });
}
function safeParseNumber(rawValue) {
  let number = rawValue ? parseFloat(rawValue) : null;
  return isNumeric2(number) ? number : rawValue;
}
function checkedAttrLooseCompare2(valueA, valueB) {
  return valueA == valueB;
}
function isNumeric2(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}
function isGetterSetter(value) {
  return value !== null && typeof value === "object" && typeof value.get === "function" && typeof value.set === "function";
}
directive("cloak", (el) => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));
addInitSelector(() => `[${prefix("init")}]`);
directive("init", skipDuringClone((el, { expression }, { evaluate: evaluate2 }) => {
  if (typeof expression === "string") {
    return !!expression.trim() && evaluate2(expression, {}, false);
  }
  return evaluate2(expression, {}, false);
}));
directive("text", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
  let evaluate2 = evaluateLater2(expression);
  effect3(() => {
    evaluate2((value) => {
      mutateDom(() => {
        el.textContent = value;
      });
    });
  });
});
directive("html", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
  let evaluate2 = evaluateLater2(expression);
  effect3(() => {
    evaluate2((value) => {
      mutateDom(() => {
        el.innerHTML = value;
        el._x_ignoreSelf = true;
        initTree(el);
        delete el._x_ignoreSelf;
      });
    });
  });
});
mapAttributes(startingWith(":", into(prefix("bind:"))));
directive("bind", (el, { value, modifiers, expression, original }, { effect: effect3 }) => {
  if (!value) {
    let bindingProviders = {};
    injectBindingProviders(bindingProviders);
    let getBindings = evaluateLater(el, expression);
    getBindings((bindings) => {
      applyBindingsObject(el, bindings, original);
    }, { scope: bindingProviders });
    return;
  }
  if (value === "key")
    return storeKeyForXFor(el, expression);
  let evaluate2 = evaluateLater(el, expression);
  effect3(() => evaluate2((result) => {
    if (result === void 0 && typeof expression === "string" && expression.match(/\./)) {
      result = "";
    }
    mutateDom(() => bind(el, value, result, modifiers));
  }));
});
function storeKeyForXFor(el, expression) {
  el._x_keyExpression = expression;
}
addRootSelector(() => `[${prefix("data")}]`);
directive("data", skipDuringClone((el, { expression }, { cleanup: cleanup2 }) => {
  expression = expression === "" ? "{}" : expression;
  let magicContext = {};
  injectMagics(magicContext, el);
  let dataProviderContext = {};
  injectDataProviders(dataProviderContext, magicContext);
  let data2 = evaluate(el, expression, { scope: dataProviderContext });
  if (data2 === void 0 || data2 === true)
    data2 = {};
  injectMagics(data2, el);
  let reactiveData = reactive(data2);
  initInterceptors(reactiveData);
  let undo = addScopeToNode(el, reactiveData);
  reactiveData["init"] && evaluate(el, reactiveData["init"]);
  cleanup2(() => {
    reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
    undo();
  });
}));
directive("show", (el, { modifiers, expression }, { effect: effect3 }) => {
  let evaluate2 = evaluateLater(el, expression);
  if (!el._x_doHide)
    el._x_doHide = () => {
      mutateDom(() => {
        el.style.setProperty("display", "none", modifiers.includes("important") ? "important" : void 0);
      });
    };
  if (!el._x_doShow)
    el._x_doShow = () => {
      mutateDom(() => {
        if (el.style.length === 1 && el.style.display === "none") {
          el.removeAttribute("style");
        } else {
          el.style.removeProperty("display");
        }
      });
    };
  let hide = () => {
    el._x_doHide();
    el._x_isShown = false;
  };
  let show = () => {
    el._x_doShow();
    el._x_isShown = true;
  };
  let clickAwayCompatibleShow = () => setTimeout(show);
  let toggle = once(
    (value) => value ? show() : hide(),
    (value) => {
      if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
        el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
      } else {
        value ? clickAwayCompatibleShow() : hide();
      }
    }
  );
  let oldValue;
  let firstTime = true;
  effect3(() => evaluate2((value) => {
    if (!firstTime && value === oldValue)
      return;
    if (modifiers.includes("immediate"))
      value ? clickAwayCompatibleShow() : hide();
    toggle(value);
    oldValue = value;
    firstTime = false;
  }));
});
directive("for", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
  let iteratorNames = parseForExpression(expression);
  let evaluateItems = evaluateLater(el, iteratorNames.items);
  let evaluateKey = evaluateLater(
    el,
    // the x-bind:key expression is stored for our use instead of evaluated.
    el._x_keyExpression || "index"
  );
  el._x_prevKeys = [];
  el._x_lookup = {};
  effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
  cleanup2(() => {
    Object.values(el._x_lookup).forEach((el2) => el2.remove());
    delete el._x_prevKeys;
    delete el._x_lookup;
  });
});
function loop(el, iteratorNames, evaluateItems, evaluateKey) {
  let isObject2 = (i) => typeof i === "object" && !Array.isArray(i);
  let templateEl = el;
  evaluateItems((items) => {
    if (isNumeric3(items) && items >= 0) {
      items = Array.from(Array(items).keys(), (i) => i + 1);
    }
    if (items === void 0)
      items = [];
    let lookup = el._x_lookup;
    let prevKeys = el._x_prevKeys;
    let scopes = [];
    let keys = [];
    if (isObject2(items)) {
      items = Object.entries(items).map(([key, value]) => {
        let scope2 = getIterationScopeVariables(iteratorNames, value, key, items);
        evaluateKey((value2) => keys.push(value2), { scope: { index: key, ...scope2 } });
        scopes.push(scope2);
      });
    } else {
      for (let i = 0; i < items.length; i++) {
        let scope2 = getIterationScopeVariables(iteratorNames, items[i], i, items);
        evaluateKey((value) => keys.push(value), { scope: { index: i, ...scope2 } });
        scopes.push(scope2);
      }
    }
    let adds = [];
    let moves = [];
    let removes = [];
    let sames = [];
    for (let i = 0; i < prevKeys.length; i++) {
      let key = prevKeys[i];
      if (keys.indexOf(key) === -1)
        removes.push(key);
    }
    prevKeys = prevKeys.filter((key) => !removes.includes(key));
    let lastKey = "template";
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let prevIndex = prevKeys.indexOf(key);
      if (prevIndex === -1) {
        prevKeys.splice(i, 0, key);
        adds.push([lastKey, i]);
      } else if (prevIndex !== i) {
        let keyInSpot = prevKeys.splice(i, 1)[0];
        let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
        prevKeys.splice(i, 0, keyForSpot);
        prevKeys.splice(prevIndex, 0, keyInSpot);
        moves.push([keyInSpot, keyForSpot]);
      } else {
        sames.push(key);
      }
      lastKey = key;
    }
    for (let i = 0; i < removes.length; i++) {
      let key = removes[i];
      if (!!lookup[key]._x_effects) {
        lookup[key]._x_effects.forEach(dequeueJob);
      }
      lookup[key].remove();
      lookup[key] = null;
      delete lookup[key];
    }
    for (let i = 0; i < moves.length; i++) {
      let [keyInSpot, keyForSpot] = moves[i];
      let elInSpot = lookup[keyInSpot];
      let elForSpot = lookup[keyForSpot];
      let marker = document.createElement("div");
      mutateDom(() => {
        elForSpot.after(marker);
        elInSpot.after(elForSpot);
        elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
        marker.before(elInSpot);
        elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
        marker.remove();
      });
      refreshScope(elForSpot, scopes[keys.indexOf(keyForSpot)]);
    }
    for (let i = 0; i < adds.length; i++) {
      let [lastKey2, index] = adds[i];
      let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
      if (lastEl._x_currentIfEl)
        lastEl = lastEl._x_currentIfEl;
      let scope2 = scopes[index];
      let key = keys[index];
      let clone2 = document.importNode(templateEl.content, true).firstElementChild;
      addScopeToNode(clone2, reactive(scope2), templateEl);
      mutateDom(() => {
        lastEl.after(clone2);
        initTree(clone2);
      });
      if (typeof key === "object") {
        warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
      }
      lookup[key] = clone2;
    }
    for (let i = 0; i < sames.length; i++) {
      refreshScope(lookup[sames[i]], scopes[keys.indexOf(sames[i])]);
    }
    templateEl._x_prevKeys = keys;
  });
}
function parseForExpression(expression) {
  let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  let stripParensRE = /^\s*\(|\)\s*$/g;
  let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  let inMatch = expression.match(forAliasRE);
  if (!inMatch)
    return;
  let res = {};
  res.items = inMatch[2].trim();
  let item = inMatch[1].replace(stripParensRE, "").trim();
  let iteratorMatch = item.match(forIteratorRE);
  if (iteratorMatch) {
    res.item = item.replace(forIteratorRE, "").trim();
    res.index = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.collection = iteratorMatch[2].trim();
    }
  } else {
    res.item = item;
  }
  return res;
}
function getIterationScopeVariables(iteratorNames, item, index, items) {
  let scopeVariables = {};
  if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
    let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i) => i.trim());
    names.forEach((name, i) => {
      scopeVariables[name] = item[i];
    });
  } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
    let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i) => i.trim());
    names.forEach((name) => {
      scopeVariables[name] = item[name];
    });
  } else {
    scopeVariables[iteratorNames.item] = item;
  }
  if (iteratorNames.index)
    scopeVariables[iteratorNames.index] = index;
  if (iteratorNames.collection)
    scopeVariables[iteratorNames.collection] = items;
  return scopeVariables;
}
function isNumeric3(subject) {
  return !Array.isArray(subject) && !isNaN(subject);
}
function handler2() {
}
handler2.inline = (el, { expression }, { cleanup: cleanup2 }) => {
  let root = closestRoot(el);
  if (!root._x_refs)
    root._x_refs = {};
  root._x_refs[expression] = el;
  cleanup2(() => delete root._x_refs[expression]);
};
directive("ref", handler2);
directive("if", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
  let evaluate2 = evaluateLater(el, expression);
  let show = () => {
    if (el._x_currentIfEl)
      return el._x_currentIfEl;
    let clone2 = el.content.cloneNode(true).firstElementChild;
    addScopeToNode(clone2, {}, el);
    mutateDom(() => {
      el.after(clone2);
      initTree(clone2);
    });
    el._x_currentIfEl = clone2;
    el._x_undoIf = () => {
      walk(clone2, (node) => {
        if (!!node._x_effects) {
          node._x_effects.forEach(dequeueJob);
        }
      });
      clone2.remove();
      delete el._x_currentIfEl;
    };
    return clone2;
  };
  let hide = () => {
    if (!el._x_undoIf)
      return;
    el._x_undoIf();
    delete el._x_undoIf;
  };
  effect3(() => evaluate2((value) => {
    value ? show() : hide();
  }));
  cleanup2(() => el._x_undoIf && el._x_undoIf());
});
directive("id", (el, { expression }, { evaluate: evaluate2 }) => {
  let names = evaluate2(expression);
  names.forEach((name) => setIdRoot(el, name));
});
mapAttributes(startingWith("@", into(prefix("on:"))));
directive("on", skipDuringClone((el, { value, modifiers, expression }, { cleanup: cleanup2 }) => {
  let evaluate2 = expression ? evaluateLater(el, expression) : () => {
  };
  if (el.tagName.toLowerCase() === "template") {
    if (!el._x_forwardEvents)
      el._x_forwardEvents = [];
    if (!el._x_forwardEvents.includes(value))
      el._x_forwardEvents.push(value);
  }
  let removeListener = on(el, value, modifiers, (e) => {
    evaluate2(() => {
    }, { scope: { "$event": e }, params: [e] });
  });
  cleanup2(() => removeListener());
}));
warnMissingPluginDirective("Collapse", "collapse", "collapse");
warnMissingPluginDirective("Intersect", "intersect", "intersect");
warnMissingPluginDirective("Focus", "trap", "focus");
warnMissingPluginDirective("Mask", "mask", "mask");
function warnMissingPluginDirective(name, directiveName2, slug) {
  directive(directiveName2, (el) => warn(`You can't use [x-${directiveName2}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
}
alpine_default.setEvaluator(normalEvaluator);
alpine_default.setReactivityEngine({ reactive: reactive2, effect: effect2, release: stop, raw: toRaw });
var src_default$3 = alpine_default;
var module_default$3 = src_default$3;
var candidateSelectors = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])', "details>summary:first-of-type", "details"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var matches = typeof Element === "undefined" ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var isContentEditable = function isContentEditable2(node) {
  return node.contentEditable === "true";
};
var getTabindex = function getTabindex2(node) {
  var tabindexAttr = parseInt(node.getAttribute("tabindex"), 10);
  if (!isNaN(tabindexAttr)) {
    return tabindexAttr;
  }
  if (isContentEditable(node)) {
    return 0;
  }
  if ((node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) {
    return 0;
  }
  return node.tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || node.ownerDocument;
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isHidden = function isHidden2(node, displayCheck) {
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full") {
    while (node) {
      if (getComputedStyle(node).display === "none") {
        return true;
      }
      node = node.parentElement;
    }
  } else if (displayCheck === "non-zero-area") {
    var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
    return width === 0 && height === 0;
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (isInput(node) || node.tagName === "SELECT" || node.tagName === "TEXTAREA" || node.tagName === "BUTTON") {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            if (child.contains(node)) {
              return false;
            }
            return true;
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options.displayCheck) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (!isNodeMatchingSelectorFocusable(options, node) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
    return false;
  }
  return true;
};
var tabbable = function tabbable2(el, options) {
  options = options || {};
  var regularTabbables = [];
  var orderedTabbables = [];
  var candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  candidates.forEach(function(candidate, i) {
    var candidateTabindex = getTabindex(candidate);
    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate
      });
    }
  });
  var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function(a) {
    return a.node;
  }).concat(regularTabbables);
  return tabbableNodes;
};
var focusable = function focusable2(el, options) {
  options = options || {};
  var candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  return candidates;
};
var focusableCandidateSelector = /* @__PURE__ */ candidateSelectors.concat("iframe").join(",");
var isFocusable = function isFocusable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorFocusable(options, node);
};
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var activeFocusTraps = /* @__PURE__ */ (function() {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];
        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }
      var trapIndex = trapQueue.indexOf(trap);
      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);
      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }
      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
})();
var isSelectableInput = function isSelectableInput2(node) {
  return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
};
var isEscapeEvent = function isEscapeEvent2(e) {
  return e.key === "Escape" || e.key === "Esc" || e.keyCode === 27;
};
var isTabEvent = function isTabEvent2(e) {
  return e.key === "Tab" || e.keyCode === 9;
};
var delay = function delay2(fn) {
  return setTimeout(fn, 0);
};
var findIndex = function findIndex2(arr, fn) {
  var idx = -1;
  arr.every(function(value, i) {
    if (fn(value)) {
      idx = i;
      return false;
    }
    return true;
  });
  return idx;
};
var valueOrHandler = function valueOrHandler2(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }
  return typeof value === "function" ? value.apply(void 0, params) : value;
};
var createFocusTrap = function createFocusTrap2(elements, userOptions) {
  var doc = document;
  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true
  }, userOptions);
  var state = {
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying the first and last tabbable nodes in all containers/groups in
    //  the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{ container: HTMLElement, firstTabbableNode: HTMLElement|null, lastTabbableNode: HTMLElement|null }>}
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0
  };
  var trap;
  var getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };
  var containersContain = function containersContain2(element2) {
    return state.containers.some(function(container) {
      return container.contains(element2);
    });
  };
  var getNodeForOption = function getNodeForOption2(optionName) {
    var optionValue = config[optionName];
    if (!optionValue) {
      return null;
    }
    var node = optionValue;
    if (typeof optionValue === "string") {
      node = doc.querySelector(optionValue);
      if (!node) {
        throw new Error("`".concat(optionName, "` refers to no known node"));
      }
    }
    if (typeof optionValue === "function") {
      node = optionValue();
      if (!node) {
        throw new Error("`".concat(optionName, "` did not return a node"));
      }
    }
    return node;
  };
  var getInitialFocusNode = function getInitialFocusNode2() {
    var node;
    if (getOption({}, "initialFocus") === false) {
      return false;
    }
    if (getNodeForOption("initialFocus") !== null) {
      node = getNodeForOption("initialFocus");
    } else if (containersContain(doc.activeElement)) {
      node = doc.activeElement;
    } else {
      var firstTabbableGroup = state.tabbableGroups[0];
      var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
      node = firstTabbableNode || getNodeForOption("fallbackFocus");
    }
    if (!node) {
      throw new Error("Your focus-trap needs to have at least one focusable element");
    }
    return node;
  };
  var updateTabbableNodes = function updateTabbableNodes2() {
    state.tabbableGroups = state.containers.map(function(container) {
      var tabbableNodes = tabbable(container);
      if (tabbableNodes.length > 0) {
        return {
          container,
          firstTabbableNode: tabbableNodes[0],
          lastTabbableNode: tabbableNodes[tabbableNodes.length - 1]
        };
      }
      return void 0;
    }).filter(function(group) {
      return !!group;
    });
    if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) {
      throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
    }
  };
  var tryFocus = function tryFocus2(node) {
    if (node === false) {
      return;
    }
    if (node === doc.activeElement) {
      return;
    }
    if (!node || !node.focus) {
      tryFocus2(getInitialFocusNode());
      return;
    }
    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;
    if (isSelectableInput(node)) {
      node.select();
    }
  };
  var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
    var node = getNodeForOption("setReturnFocus");
    return node ? node : previousActiveElement;
  };
  var checkPointerDown = function checkPointerDown2(e) {
    if (containersContain(e.target)) {
      return;
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      trap.deactivate({
        // if, on deactivation, we should return focus to the node originally-focused
        //  when the trap was activated (or the configured `setReturnFocus` node),
        //  then assume it's also OK to return focus to the outside node that was
        //  just clicked, causing deactivation, as long as that node is focusable;
        //  if it isn't focusable, then return focus to the original node focused
        //  on activation (or the configured `setReturnFocus` node)
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked, whether it's focusable or not; by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node)
        returnFocus: config.returnFocusOnDeactivate && !isFocusable(e.target)
      });
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
  };
  var checkFocusIn = function checkFocusIn2(e) {
    var targetContained = containersContain(e.target);
    if (targetContained || e.target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = e.target;
      }
    } else {
      e.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  };
  var checkTab = function checkTab2(e) {
    updateTabbableNodes();
    var destinationNode = null;
    if (state.tabbableGroups.length > 0) {
      var containerIndex = findIndex(state.tabbableGroups, function(_ref) {
        var container = _ref.container;
        return container.contains(e.target);
      });
      if (containerIndex < 0) {
        if (e.shiftKey) {
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e.shiftKey) {
        var startOfGroupIndex = findIndex(state.tabbableGroups, function(_ref2) {
          var firstTabbableNode = _ref2.firstTabbableNode;
          return e.target === firstTabbableNode;
        });
        if (startOfGroupIndex < 0 && state.tabbableGroups[containerIndex].container === e.target) {
          startOfGroupIndex = containerIndex;
        }
        if (startOfGroupIndex >= 0) {
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function(_ref3) {
          var lastTabbableNode = _ref3.lastTabbableNode;
          return e.target === lastTabbableNode;
        });
        if (lastOfGroupIndex < 0 && state.tabbableGroups[containerIndex].container === e.target) {
          lastOfGroupIndex = containerIndex;
        }
        if (lastOfGroupIndex >= 0) {
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = _destinationGroup.firstTabbableNode;
        }
      }
    } else {
      destinationNode = getNodeForOption("fallbackFocus");
    }
    if (destinationNode) {
      e.preventDefault();
      tryFocus(destinationNode);
    }
  };
  var checkKey = function checkKey2(e) {
    if (isEscapeEvent(e) && valueOrHandler(config.escapeDeactivates) !== false) {
      e.preventDefault();
      trap.deactivate();
      return;
    }
    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  };
  var checkClick = function checkClick2(e) {
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }
    if (containersContain(e.target)) {
      return;
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }
    e.preventDefault();
    e.stopImmediatePropagation();
  };
  var addListeners = function addListeners2() {
    if (!state.active) {
      return;
    }
    activeFocusTraps.activateTrap(trap);
    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function() {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener("focusin", checkFocusIn, true);
    doc.addEventListener("mousedown", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("touchstart", checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener("click", checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener("keydown", checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };
  var removeListeners = function removeListeners2() {
    if (!state.active) {
      return;
    }
    doc.removeEventListener("focusin", checkFocusIn, true);
    doc.removeEventListener("mousedown", checkPointerDown, true);
    doc.removeEventListener("touchstart", checkPointerDown, true);
    doc.removeEventListener("click", checkClick, true);
    doc.removeEventListener("keydown", checkKey, true);
    return trap;
  };
  trap = {
    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }
      var onActivate = getOption(activateOptions, "onActivate");
      var onPostActivate = getOption(activateOptions, "onPostActivate");
      var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }
      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;
      if (onActivate) {
        onActivate();
      }
      var finishActivation = function finishActivation2() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }
        addListeners();
        if (onPostActivate) {
          onPostActivate();
        }
      };
      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }
      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }
      clearTimeout(state.delayInitialFocusTimer);
      state.delayInitialFocusTimer = void 0;
      removeListeners();
      state.active = false;
      state.paused = false;
      activeFocusTraps.deactivateTrap(trap);
      var onDeactivate = getOption(deactivateOptions, "onDeactivate");
      var onPostDeactivate = getOption(deactivateOptions, "onPostDeactivate");
      var checkCanReturnFocus = getOption(deactivateOptions, "checkCanReturnFocus");
      if (onDeactivate) {
        onDeactivate();
      }
      var returnFocus = getOption(deactivateOptions, "returnFocus", "returnFocusOnDeactivate");
      var finishDeactivation = function finishDeactivation2() {
        delay(function() {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }
          if (onPostDeactivate) {
            onPostDeactivate();
          }
        });
      };
      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }
      finishDeactivation();
      return this;
    },
    pause: function pause() {
      if (state.paused || !state.active) {
        return this;
      }
      state.paused = true;
      removeListeners();
      return this;
    },
    unpause: function unpause() {
      if (!state.paused || !state.active) {
        return this;
      }
      state.paused = false;
      updateTabbableNodes();
      addListeners();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function(element2) {
        return typeof element2 === "string" ? doc.querySelector(element2) : element2;
      });
      if (state.active) {
        updateTabbableNodes();
      }
      return this;
    }
  };
  trap.updateContainerElements(elements);
  return trap;
};
function src_default$2(Alpine2) {
  let lastFocused;
  let currentFocused;
  window.addEventListener("focusin", () => {
    lastFocused = currentFocused;
    currentFocused = document.activeElement;
  });
  Alpine2.magic("focus", (el) => {
    let within = el;
    return {
      __noscroll: false,
      __wrapAround: false,
      within(el2) {
        within = el2;
        return this;
      },
      withoutScrolling() {
        this.__noscroll = true;
        return this;
      },
      noscroll() {
        this.__noscroll = true;
        return this;
      },
      withWrapAround() {
        this.__wrapAround = true;
        return this;
      },
      wrap() {
        return this.withWrapAround();
      },
      focusable(el2) {
        return isFocusable(el2);
      },
      previouslyFocused() {
        return lastFocused;
      },
      lastFocused() {
        return lastFocused;
      },
      focused() {
        return currentFocused;
      },
      focusables() {
        if (Array.isArray(within))
          return within;
        return focusable(within, { displayCheck: "none" });
      },
      all() {
        return this.focusables();
      },
      isFirst(el2) {
        let els = this.all();
        return els[0] && els[0].isSameNode(el2);
      },
      isLast(el2) {
        let els = this.all();
        return els.length && els.slice(-1)[0].isSameNode(el2);
      },
      getFirst() {
        return this.all()[0];
      },
      getLast() {
        return this.all().slice(-1)[0];
      },
      getNext() {
        let list = this.all();
        let current = document.activeElement;
        if (list.indexOf(current) === -1)
          return;
        if (this.__wrapAround && list.indexOf(current) === list.length - 1) {
          return list[0];
        }
        return list[list.indexOf(current) + 1];
      },
      getPrevious() {
        let list = this.all();
        let current = document.activeElement;
        if (list.indexOf(current) === -1)
          return;
        if (this.__wrapAround && list.indexOf(current) === 0) {
          return list.slice(-1)[0];
        }
        return list[list.indexOf(current) - 1];
      },
      first() {
        this.focus(this.getFirst());
      },
      last() {
        this.focus(this.getLast());
      },
      next() {
        this.focus(this.getNext());
      },
      previous() {
        this.focus(this.getPrevious());
      },
      prev() {
        return this.previous();
      },
      focus(el2) {
        if (!el2)
          return;
        setTimeout(() => {
          if (!el2.hasAttribute("tabindex"))
            el2.setAttribute("tabindex", "0");
          el2.focus({ preventScroll: this._noscroll });
        });
      }
    };
  });
  Alpine2.directive("trap", Alpine2.skipDuringClone(
    (el, { expression, modifiers }, { effect: effect3, evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
      let evaluator = evaluateLater2(expression);
      let oldValue = false;
      let trap = createFocusTrap(el, {
        escapeDeactivates: false,
        allowOutsideClick: true,
        fallbackFocus: () => el,
        initialFocus: el.querySelector("[autofocus]")
      });
      let undoInert = () => {
      };
      let undoDisableScrolling = () => {
      };
      const releaseFocus = () => {
        undoInert();
        undoInert = () => {
        };
        undoDisableScrolling();
        undoDisableScrolling = () => {
        };
        trap.deactivate({
          returnFocus: !modifiers.includes("noreturn")
        });
      };
      effect3(() => evaluator((value) => {
        if (oldValue === value)
          return;
        if (value && !oldValue) {
          setTimeout(() => {
            if (modifiers.includes("inert"))
              undoInert = setInert(el);
            if (modifiers.includes("noscroll"))
              undoDisableScrolling = disableScrolling();
            trap.activate();
          });
        }
        if (!value && oldValue) {
          releaseFocus();
        }
        oldValue = !!value;
      }));
      cleanup2(releaseFocus);
    },
    // When cloning, we only want to add aria-hidden attributes to the
    // DOM and not try to actually trap, as trapping can mess with the
    // live DOM and isn't just isolated to the cloned DOM.
    (el, { expression, modifiers }, { evaluate: evaluate2 }) => {
      if (modifiers.includes("inert") && evaluate2(expression))
        setInert(el);
    }
  ));
}
function setInert(el) {
  let undos = [];
  crawlSiblingsUp(el, (sibling) => {
    let cache = sibling.hasAttribute("aria-hidden");
    sibling.setAttribute("aria-hidden", "true");
    undos.push(() => cache || sibling.removeAttribute("aria-hidden"));
  });
  return () => {
    while (undos.length)
      undos.pop()();
  };
}
function crawlSiblingsUp(el, callback2) {
  if (el.isSameNode(document.body) || !el.parentNode)
    return;
  Array.from(el.parentNode.children).forEach((sibling) => {
    if (sibling.isSameNode(el)) {
      crawlSiblingsUp(el.parentNode, callback2);
    } else {
      callback2(sibling);
    }
  });
}
function disableScrolling() {
  let overflow = document.documentElement.style.overflow;
  let paddingRight = document.documentElement.style.paddingRight;
  let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
  return () => {
    document.documentElement.style.overflow = overflow;
    document.documentElement.style.paddingRight = paddingRight;
  };
}
var module_default$2 = src_default$2;
function src_default$1(Alpine2) {
  Alpine2.directive("intersect", (el, { value, expression, modifiers }, { evaluateLater: evaluateLater2, cleanup: cleanup2 }) => {
    let evaluate2 = evaluateLater2(expression);
    let options = {
      rootMargin: getRootMargin(modifiers),
      threshold: getThreshhold(modifiers)
    };
    let observer2 = new IntersectionObserver((entries2) => {
      entries2.forEach((entry2) => {
        if (entry2.isIntersecting === (value === "leave"))
          return;
        evaluate2();
        modifiers.includes("once") && observer2.disconnect();
      });
    }, options);
    observer2.observe(el);
    cleanup2(() => {
      observer2.disconnect();
    });
  });
}
function getThreshhold(modifiers) {
  if (modifiers.includes("full"))
    return 0.99;
  if (modifiers.includes("half"))
    return 0.5;
  if (!modifiers.includes("threshold"))
    return 0;
  let threshold = modifiers[modifiers.indexOf("threshold") + 1];
  if (threshold === "100")
    return 1;
  if (threshold === "0")
    return 0;
  return Number(`.${threshold}`);
}
function getLengthValue(rawValue) {
  let match = rawValue.match(/^(-?[0-9]+)(px|%)?$/);
  return match ? match[1] + (match[2] || "px") : void 0;
}
function getRootMargin(modifiers) {
  const key = "margin";
  const fallback = "0px 0px 0px 0px";
  const index = modifiers.indexOf(key);
  if (index === -1)
    return fallback;
  let values = [];
  for (let i = 1; i < 5; i++) {
    values.push(getLengthValue(modifiers[index + i] || ""));
  }
  values = values.filter((v) => v !== void 0);
  return values.length ? values.join(" ").trim() : fallback;
}
var module_default$1 = src_default$1;
function src_default(Alpine2) {
  let persist = () => {
    let alias;
    let storage = localStorage;
    return Alpine2.interceptor((initialValue, getter, setter, path, key) => {
      let lookup = alias || `_x_${path}`;
      let initial = storageHas(lookup, storage) ? storageGet(lookup, storage) : initialValue;
      setter(initial);
      Alpine2.effect(() => {
        let value = getter();
        storageSet(lookup, value, storage);
        setter(value);
      });
      return initial;
    }, (func) => {
      func.as = (key) => {
        alias = key;
        return func;
      }, func.using = (target) => {
        storage = target;
        return func;
      };
    });
  };
  Object.defineProperty(Alpine2, "$persist", { get: () => persist() });
  Alpine2.magic("persist", persist);
  Alpine2.persist = (key, { get: get3, set: set3 }, storage = localStorage) => {
    let initial = storageHas(key, storage) ? storageGet(key, storage) : get3();
    set3(initial);
    Alpine2.effect(() => {
      let value = get3();
      storageSet(key, value, storage);
      set3(value);
    });
  };
}
function storageHas(key, storage) {
  return storage.getItem(key) !== null;
}
function storageGet(key, storage) {
  return JSON.parse(storage.getItem(key, storage));
}
function storageSet(key, value, storage) {
  storage.setItem(key, JSON.stringify(value));
}
var module_default = src_default;
module_default$3.plugin(module_default);
module_default$3.plugin(module_default$2);
module_default$3.plugin(module_default$1);
window.Alpine = module_default$3;
module_default$3.start();
