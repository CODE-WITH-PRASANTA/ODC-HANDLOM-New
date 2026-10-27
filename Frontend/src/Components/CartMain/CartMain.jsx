import React, { useEffect, useMemo, useRef, useState } from "react";
import "./CartMain.css";

/* ------------------------------------------------------------------
   Saree images  (assets/collection-2.png  →  assets/collection-10.png)
   Adjust the relative path if your folder structure is different.
------------------------------------------------------------------- */
import img2 from "../../assets/collection-2.png";
import img3 from "../../assets/collection-3.png";
import img4 from "../../assets/collection-4.png";
import img5 from "../../assets/collection-1.png";
import img6 from "../../assets/collection-6.png";
import img7 from "../../assets/collection-7.png";
import img8 from "../../assets/collection-8.png";
import img9 from "../../assets/collection-9.png";
import img10 from "../../assets/collection-10.png";

/* ------------------------------------------------------------------
   Config
------------------------------------------------------------------- */
const MAX_QTY = 10;
const FESTIVE_DISCOUNT = 6499; // flat discount applied on the order
const FESTIVE_MIN_SUBTOTAL = 25000; // order value needed for the discount
const RECOMMENDED_VISIBLE = 4;

/* ------------------------------------------------------------------
   Data
------------------------------------------------------------------- */
const INITIAL_CART = [
  {
    id: "c1",
    name: "Sambalpuri Ikat Saree",
    specs: ["Handloom", "Pure Cotton", "Odisha"],
    color: "Black & Red",
    price: 6999,
    mrp: 8999,
    off: 22,
    qty: 1,
    inStock: true,
    image: img2,
    selected: true,
  },
  {
    id: "c2",
    name: "Odisha Pata Saree",
    specs: ["Handloom", "Pure Silk", "Odisha"],
    color: "Cream & Purple",
    price: 12499,
    mrp: 15999,
    off: 22,
    qty: 1,
    inStock: true,
    image: img3,
    selected: true,
  },
  {
    id: "c3",
    name: "Traditional Pata Saree",
    specs: ["Handloom", "Pure Silk", "Odisha"],
    color: "Green & Red",
    price: 11999,
    mrp: 14999,
    off: 20,
    qty: 1,
    inStock: true,
    image: img4,
    selected: true,
  },
];

const RECOMMENDED = [
  {
    id: "r1",
    name: "Kanchipuram Silk Saree",
    specs: ["Handloom", "Pure Silk", "Tamil Nadu"],
    color: "Red & Gold",
    rating: 4.8,
    reviews: 120,
    price: 8499,
    mrp: 10999,
    off: 22,
    image: img5,
  },
  {
    id: "r2",
    name: "Bomkai Saree",
    specs: ["Handloom", "Pure Cotton", "Odisha"],
    color: "Blue & Gold",
    rating: 4.7,
    reviews: 98,
    price: 7999,
    mrp: 9999,
    off: 20,
    image: img6,
  },
  {
    id: "r3",
    name: "Ikat Pata Saree",
    specs: ["Handloom", "Pure Silk", "Odisha"],
    color: "Pink & Gold",
    rating: 4.9,
    reviews: 156,
    price: 13499,
    mrp: 16999,
    off: 21,
    image: img7,
  },
  {
    id: "r4",
    name: "Sambalpuri Cotton Saree",
    specs: ["Handloom", "Pure Cotton", "Odisha"],
    color: "Black & Red",
    rating: 4.8,
    reviews: 112,
    price: 6499,
    mrp: 8499,
    off: 24,
    image: img8,
  },
  {
    id: "r5",
    name: "Berhampuri Silk Saree",
    specs: ["Handloom", "Pure Silk", "Odisha"],
    color: "Maroon & Gold",
    rating: 4.8,
    reviews: 87,
    price: 9499,
    mrp: 11999,
    off: 21,
    image: img9,
  },
  {
    id: "r6",
    name: "Khandua Silk Saree",
    specs: ["Handloom", "Pure Silk", "Odisha"],
    color: "Orange & Green",
    rating: 4.9,
    reviews: 64,
    price: 14499,
    mrp: 17999,
    off: 19,
    image: img10,
  },
];

/* ------------------------------------------------------------------
   Helpers
------------------------------------------------------------------- */
const formatINR = (value) => `₹ ${value.toLocaleString("en-IN")}`;

/* ------------------------------------------------------------------
   Inline icons (no external dependency)
------------------------------------------------------------------- */
const ICON_PATHS = {
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M9 7V4.5h6V7" />
      <path d="M6.5 7l.8 12.2a1.5 1.5 0 0 0 1.5 1.3h6.4a1.5 1.5 0 0 0 1.5-1.3L17.5 7" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  heart: (
    <path d="M12 20.5s-7.5-4.6-9.6-9.7A5.3 5.3 0 0 1 12 6.3a5.3 5.3 0 0 1 9.6 4.5c-2.1 5.1-9.6 9.7-9.6 9.7z" />
  ),
  minus: <path d="M5.5 12h13" />,
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  bag: (
    <>
      <path d="M5.5 8.5h13l1 11.5h-15l1-11.5z" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7.5 2.8v5.6c0 4.8-3.2 8.2-7.5 9.6-4.3-1.4-7.5-4.8-7.5-9.6V5.8L12 3z" />
      <path d="M8.8 12l2.2 2.2 4.2-4.4" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11v9.5h-11z" />
      <path d="M13.5 9.5h4.2l3.3 3.2V16h-7.5" />
      <circle cx="7" cy="17.5" r="1.7" />
      <circle cx="17" cy="17.5" r="1.7" />
    </>
  ),
  box: (
    <>
      <path d="M12 3l8 4.4v9.2L12 21l-8-4.4V7.4L12 3z" />
      <path d="M4 7.4l8 4.4 8-4.4M12 11.8V21" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.2" />
      <path d="M9.2 13.4L8 21l4-2.2 4 2.2-1.2-7.6" />
      <path d="M10 9l1.5 1.5L14.2 8" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 8v.01" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.3l2.4 10.5h10.2L20 7.5H6.2" />
      <circle cx="9.5" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
};

const Icon = ({ name, size = 18, filled = false, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {ICON_PATHS[name]}
  </svg>
);

const Star = () => (
  <svg
    className="CartMain__star"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M12 2.8l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.7l-5.9 3.1 1.2-6.5L2.5 9.7l6.6-.9L12 2.8z"
    />
  </svg>
);

/* ------------------------------------------------------------------
   Component
------------------------------------------------------------------- */
const CartMain = ({ onCheckout, onContinueShopping }) => {
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [wishlist, setWishlist] = useState([]);
  const [showAllRecommended, setShowAllRecommended] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const notify = (message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  };

  /* ---------- cart actions ---------- */
  const toggleSelect = (id) =>
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );

  const changeQty = (id, delta) =>
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, qty: Math.min(MAX_QTY, Math.max(1, item.qty + delta)) }
          : item
      )
    );

  const removeItem = (id) => {
    const target = cartItems.find((item) => item.id === id);
    setCartItems((items) => items.filter((item) => item.id !== id));
    if (target) notify(`${target.name} removed from cart`);
  };

  const clearCart = () => {
    setCartItems([]);
    notify("Cart cleared");
  };

  const toggleWishlist = (id) => {
    const isSaved = wishlist.includes(id);
    setWishlist((list) =>
      isSaved ? list.filter((x) => x !== id) : [...list, id]
    );
    notify(isSaved ? "Removed from wishlist" : "Saved to wishlist");
  };

  const addRecommended = (product) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, qty: Math.min(MAX_QTY, item.qty + 1) }
            : item
        );
      }
      return [
        ...items,
        {
          id: product.id,
          name: product.name,
          specs: product.specs,
          color: product.color,
          price: product.price,
          mrp: product.mrp,
          off: product.off,
          qty: 1,
          inStock: true,
          image: product.image,
          selected: true,
        },
      ];
    });
    notify(`${product.name} added to cart`);
  };

  /* ---------- totals ---------- */
  const { selectedCount, subtotal, discount, total } = useMemo(() => {
    const selected = cartItems.filter((item) => item.selected);
    const sub = selected.reduce((sum, item) => sum + item.price * item.qty, 0);
    const disc = sub >= FESTIVE_MIN_SUBTOTAL ? FESTIVE_DISCOUNT : 0;
    return {
      selectedCount: selected.reduce((sum, item) => sum + item.qty, 0),
      subtotal: sub,
      discount: disc,
      total: sub - disc,
    };
  }, [cartItems]);

  const visibleRecommended = showAllRecommended
    ? RECOMMENDED
    : RECOMMENDED.slice(0, RECOMMENDED_VISIBLE);

  const handleCheckout = () => {
    if (onCheckout) onCheckout(cartItems.filter((item) => item.selected), total);
    else notify("Proceeding to checkout…");
  };

  const handleContinue = () => {
    if (onContinueShopping) onContinueShopping();
    else window.history.back();
  };

  /* ---------- render ---------- */
  return (
    <section className="CartMain" aria-labelledby="CartMain-title">
      <div className="CartMain__container">
        <div className="CartMain__layout">
          {/* ================= Cart list ================= */}
          <div className="CartMain__cart">
            <header className="CartMain__cartHeader">
              <h1 className="CartMain__title" id="CartMain-title">
                Shopping Cart ({cartItems.length}{" "}
                {cartItems.length === 1 ? "Item" : "Items"})
              </h1>
              {cartItems.length > 0 && (
                <button
                  type="button"
                  className="CartMain__clearBtn"
                  onClick={clearCart}
                >
                  <Icon name="trash" size={17} />
                  <span>Clear Cart</span>
                </button>
              )}
            </header>

            {cartItems.length === 0 ? (
              <div className="CartMain__empty">
                <span className="CartMain__emptyIcon">
                  <Icon name="bag" size={34} />
                </span>
                <h2 className="CartMain__emptyTitle">Your cart is empty</h2>
                <p className="CartMain__emptyText">
                  Add a handloom saree from the picks below to get started.
                </p>
                <button
                  type="button"
                  className="CartMain__emptyBtn"
                  onClick={handleContinue}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="CartMain__list">
                {cartItems.map((item) => {
                  const saved = wishlist.includes(item.id);
                  return (
                    <li className="CartMain__item" key={item.id}>
                      <label className="CartMain__check">
                        <input
                          type="checkbox"
                          className="CartMain__checkInput"
                          checked={item.selected}
                          onChange={() => toggleSelect(item.id)}
                          aria-label={`Select ${item.name}`}
                        />
                        <span className="CartMain__checkBox">
                          <Icon name="check" size={14} />
                        </span>
                      </label>

                      <div className="CartMain__itemImage">
                        <img src={item.image} alt={item.name} loading="lazy" />
                      </div>

                      <div className="CartMain__itemInfo">
                        <h2 className="CartMain__itemName">{item.name}</h2>
                        <p className="CartMain__itemSpecs">
                          {item.specs.map((spec, i) => (
                            <React.Fragment key={spec}>
                              {i > 0 && (
                                <span className="CartMain__sep" aria-hidden="true">
                                  |
                                </span>
                              )}
                              <span>{spec}</span>
                            </React.Fragment>
                          ))}
                        </p>
                        <span className="CartMain__itemColor">{item.color}</span>
                        <p
                          className={`CartMain__stock ${
                            item.inStock ? "" : "CartMain__stock--out"
                          }`}
                        >
                          <span className="CartMain__stockDot" />
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </p>
                      </div>

                      <div className="CartMain__itemPrice">
                        <span className="CartMain__price">
                          {formatINR(item.price * item.qty)}
                        </span>
                        <span className="CartMain__priceRow">
                          <del className="CartMain__mrp">
                            {formatINR(item.mrp * item.qty)}
                          </del>
                          <span className="CartMain__off">{item.off}% OFF</span>
                        </span>
                      </div>

                      <div
                        className="CartMain__qty"
                        role="group"
                        aria-label={`Quantity for ${item.name}`}
                      >
                        <button
                          type="button"
                          className="CartMain__qtyBtn"
                          onClick={() => changeQty(item.id, -1)}
                          disabled={item.qty <= 1}
                          aria-label="Decrease quantity"
                        >
                          <Icon name="minus" size={16} />
                        </button>
                        <span className="CartMain__qtyValue" aria-live="polite">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          className="CartMain__qtyBtn"
                          onClick={() => changeQty(item.id, 1)}
                          disabled={item.qty >= MAX_QTY}
                          aria-label="Increase quantity"
                        >
                          <Icon name="plus" size={16} />
                        </button>
                      </div>

                      <div className="CartMain__actions">
                        <button
                          type="button"
                          className={`CartMain__iconBtn CartMain__iconBtn--wish ${
                            saved ? "is-active" : ""
                          }`}
                          onClick={() => toggleWishlist(item.id)}
                          aria-pressed={saved}
                          aria-label={
                            saved ? "Remove from wishlist" : "Save to wishlist"
                          }
                        >
                          <Icon name="heart" size={19} filled={saved} />
                        </button>
                        <button
                          type="button"
                          className="CartMain__iconBtn"
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                        >
                          <Icon name="trash" size={19} />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* ================= Order summary ================= */}
          <aside className="CartMain__summary" aria-label="Order summary">
            <h2 className="CartMain__summaryTitle">Order Summary</h2>

            <dl className="CartMain__summaryList">
              <div className="CartMain__summaryRow">
                <dt>Subtotal ({selectedCount} items)</dt>
                <dd>{formatINR(subtotal)}</dd>
              </div>
              <div className="CartMain__summaryRow">
                <dt>Discount</dt>
                <dd className="CartMain__discount">
                  {discount > 0 ? `- ${formatINR(discount)}` : formatINR(0)}
                </dd>
              </div>
              <div className="CartMain__summaryRow">
                <dt className="CartMain__shippingLabel">
                  Shipping
                  <span
                    className="CartMain__tip"
                    tabIndex={0}
                    aria-label="Free shipping on all orders"
                    data-tip="Free shipping on all orders"
                  >
                    <Icon name="info" size={15} />
                  </span>
                </dt>
                <dd className="CartMain__free">Free</dd>
              </div>
            </dl>

            <div className="CartMain__totalRow">
              <span className="CartMain__totalLabel">Total Amount</span>
              <span className="CartMain__totalValue">
                <strong>{formatINR(total)}</strong>
                <small>(Inclusive of all taxes)</small>
              </span>
            </div>

            <button
              type="button"
              className="CartMain__checkoutBtn"
              onClick={handleCheckout}
              disabled={selectedCount === 0}
            >
              <Icon name="bag" size={19} />
              <span>Proceed to Checkout</span>
              <Icon name="arrowRight" size={18} />
            </button>

            <div className="CartMain__or">
              <span>OR</span>
            </div>

            <button
              type="button"
              className="CartMain__continueBtn"
              onClick={handleContinue}
            >
              <Icon name="arrowLeft" size={18} />
              <span>Continue Shopping</span>
            </button>

            <ul className="CartMain__trust">
              <li className="CartMain__trustItem">
                <Icon name="shield" size={24} />
                <span>Secure Checkout</span>
              </li>
              <li className="CartMain__trustItem">
                <Icon name="truck" size={24} />
                <span>Fast Delivery</span>
              </li>
              <li className="CartMain__trustItem">
                <Icon name="box" size={24} />
                <span>Easy Returns</span>
              </li>
              <li className="CartMain__trustItem">
                <Icon name="award" size={24} />
                <span>Authentic Handloom</span>
              </li>
            </ul>
          </aside>
        </div>

        {/* ================= You may also like ================= */}
        <section className="CartMain__recommend" aria-labelledby="CartMain-reco">
          <header className="CartMain__recommendHeader">
            <h2 className="CartMain__recommendTitle" id="CartMain-reco">
              You May Also Like
            </h2>
            <button
              type="button"
              className="CartMain__viewAll"
              onClick={() => setShowAllRecommended((v) => !v)}
            >
              <span>{showAllRecommended ? "Show Less" : "View All"}</span>
              <Icon name="arrowRight" size={15} />
            </button>
          </header>

          <ul className="CartMain__recommendGrid">
            {visibleRecommended.map((product) => {
              const saved = wishlist.includes(product.id);
              return (
                <li className="CartMain__card" key={product.id}>
                  <div className="CartMain__cardTop">
                    <div className="CartMain__cardImage">
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <button
                        type="button"
                        className={`CartMain__cardHeart ${saved ? "is-active" : ""}`}
                        onClick={() => toggleWishlist(product.id)}
                        aria-pressed={saved}
                        aria-label={
                          saved ? "Remove from wishlist" : "Save to wishlist"
                        }
                      >
                        <Icon name="heart" size={13} filled={saved} />
                      </button>
                    </div>

                    <div className="CartMain__cardInfo">
                      <h3 className="CartMain__cardName">{product.name}</h3>
                      <p className="CartMain__rating">
                        <Star />
                        <b>{product.rating}</b>
                        <span>({product.reviews})</span>
                      </p>
                      <p className="CartMain__cardPrice">
                        <strong>{formatINR(product.price)}</strong>
                        <del>{formatINR(product.mrp)}</del>
                        <span className="CartMain__off">{product.off}% OFF</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="CartMain__addBtn"
                    onClick={() => addRecommended(product)}
                  >
                    <Icon name="cart" size={16} />
                    <span>Add to Cart</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* toast */}
      <div className="CartMain__toast" role="status" aria-live="polite">
        {toast && <span className="CartMain__toastText">{toast}</span>}
      </div>
    </section>
  );
};

export default CartMain;