import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './CollectionsMain.css';
import {
  FiSliders,
  FiRotateCcw,
  FiChevronDown,
  FiChevronUp,
  FiShoppingCart,
  FiEye,
  FiSearch,
  FiHeart,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiCheck,
  FiStar,
  FiShield,
  FiTruck,
  FiZoomIn
} from 'react-icons/fi';

const SAMPLE_SAREES = [
  {
    id: 1,
    name: 'Pure Kanjivaram Silk Saree',
    description: 'Traditional weave with rich gold zari pallu and intricate floral motifs',
    price: 18999,
    originalPrice: null,
    discount: null,
    tag: 'New',
    fabric: 'Pure Mulberry Silk',
    weave: 'Handwoven Kanchipuram',
    rating: 4.9,
    reviews: 142,
    color: '#9e142a',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 2,
    name: 'Chanderi Handloom Saree',
    description: 'Lightweight & elegant for every festive celebration and ritual',
    price: 7499,
    originalPrice: 9999,
    discount: '25% OFF',
    tag: 'Best Seller',
    fabric: 'Silk Cotton Blend',
    weave: 'Chanderi Zari Buti',
    rating: 4.8,
    reviews: 98,
    color: '#d4a373',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 3,
    name: 'Tussar Silk Saree',
    description: 'Natural texture with timeless handloom beauty and woven borders',
    price: 11999,
    originalPrice: null,
    discount: null,
    tag: 'Trending',
    fabric: 'Wild Tussar Silk',
    weave: 'Tribal Hand-block print',
    rating: 4.7,
    reviews: 65,
    color: '#1a3b8b',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 4,
    name: 'Banarasi Brocade Silk Saree',
    description: 'Royal golden craftsmanship straight from the ghats of Varanasi',
    price: 16499,
    originalPrice: 21999,
    discount: '25% OFF',
    tag: 'New',
    fabric: 'Katan Silk',
    weave: 'Kadwa Brocade Weave',
    rating: 5.0,
    reviews: 210,
    color: '#d84267',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 5,
    name: 'Ikat Handloom Heritage Saree',
    description: 'Heritage tie-dye weave with modern contrasting borders',
    price: 9999,
    originalPrice: null,
    discount: null,
    tag: 'Premium',
    fabric: 'Single Ikat Pure Silk',
    weave: 'Pochampally Handloom',
    rating: 4.6,
    reviews: 54,
    color: '#1b1b1b',
    image: 'https://images.unsplash.com/photo-1610030469668-9359e9a4f6cf?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 6,
    name: 'Organza Sheer Silk Saree',
    description: 'Graceful & lightweight floral elegance with delicate scalloped edges',
    price: 8499,
    originalPrice: 11499,
    discount: '25% OFF',
    tag: 'Popular',
    fabric: 'Fine Glass Organza',
    weave: 'Zari Thread Resham',
    rating: 4.8,
    reviews: 87,
    color: '#8d6bb5',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 7,
    name: 'Cotton Jamdani Saree',
    description: 'Comfort meets timeless artisanal muslin weaving tradition',
    price: 4999,
    originalPrice: null,
    discount: null,
    tag: 'New',
    fabric: 'Pure Organic Cotton',
    weave: 'Dhakai Jamdani Motif',
    rating: 4.7,
    reviews: 43,
    color: '#e69a0d',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 8,
    name: 'Patola Double Ikat Saree',
    description: 'A genuine masterpiece of intricate geometric precision',
    price: 22999,
    originalPrice: null,
    discount: null,
    tag: 'Trending',
    fabric: 'Natural Mulberry Silk',
    weave: 'Patan Double Ikat',
    rating: 4.9,
    reviews: 112,
    color: '#9e142a',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 9,
    name: 'Sambalpuri Bandha Silk Saree',
    description: 'Traditional Odisha tie-dye bandha weaving art with shankha motifs',
    price: 14999,
    originalPrice: 18999,
    discount: '20% OFF',
    tag: 'Best Seller',
    fabric: 'Tassar & Pure Mulberry',
    weave: 'Odisha Bandha Handloom',
    rating: 4.9,
    reviews: 176,
    color: '#9e142a',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 10,
    name: 'Mysore Royal Crepe Silk Saree',
    description: 'Pure zari embossed classic drape with regal borders',
    price: 13500,
    originalPrice: null,
    discount: null,
    tag: 'Premium',
    fabric: 'Mysore Pure Crepe Silk',
    weave: 'Plain Weave with Gold Zari',
    rating: 4.8,
    reviews: 80,
    color: '#0e7c5b',
    image: 'https://images.unsplash.com/photo-1610030469668-9359e9a4f6cf?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 11,
    name: 'Paithani Handwoven Silk Saree',
    description: 'Signature peacock motif pallu with vibrant oblique borders',
    price: 26999,
    originalPrice: 32999,
    discount: '18% OFF',
    tag: 'Trending',
    fabric: 'Fine Maharashtrian Silk',
    weave: 'Tapestry Technique Weave',
    rating: 5.0,
    reviews: 129,
    color: '#b31336',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 12,
    name: 'Maheshwari Tissue Silk Saree',
    description: 'Lightweight reversible golden zari border with matching blouse piece',
    price: 8999,
    originalPrice: 10999,
    discount: '15% OFF',
    tag: 'New',
    fabric: 'Cotton Silk Blend',
    weave: 'Maheshwari Floral Pallu',
    rating: 4.6,
    reviews: 38,
    color: '#e69a0d',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 13,
    name: 'Baluchari Narrative Silk Saree',
    description: 'Ancient mythological epic tales handwoven into the royal pallu',
    price: 17800,
    originalPrice: null,
    discount: null,
    tag: 'Popular',
    fabric: 'Bishnupur Pure Silk',
    weave: 'Figural Jacquard Weave',
    rating: 4.8,
    reviews: 91,
    color: '#1a3b8b',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 14,
    name: 'Kalamkari Hand Painted Organic Saree',
    description: 'Authentic temple artwork painted with organic natural dyes',
    price: 12499,
    originalPrice: 15999,
    discount: '22% OFF',
    tag: 'Trending',
    fabric: 'Hand-spun Mulberry Silk',
    weave: 'Pen Kalamkari Artwork',
    rating: 4.7,
    reviews: 64,
    color: '#8d6bb5',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85'
  }
];

const COLOR_PALETTE = [
  { name: 'Red', hex: '#d61b3c' },
  { name: 'Pink', hex: '#f0498b' },
  { name: 'Purple', hex: '#7718cc' },
  { name: 'Green', hex: '#0f8a5f' },
  { name: 'Teal', hex: '#0da5c9' },
  { name: 'Yellow', hex: '#f6c728' },
  { name: 'Cream', hex: '#fbf4e6' },
  { name: 'Black', hex: '#161616' }
];

const CollectionsMain = () => {
  const [maxPrice, setMaxPrice] = useState(50000);
  const [selectedSort, setSelectedSort] = useState('New Arrivals');
  const [viewMode, setViewMode] = useState('grid');
  const [wishlist, setWishlist] = useState({});
  const [, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  
  // Modals
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [activeZoomProduct, setActiveZoomProduct] = useState(null);
  const [isImageMagnified, setIsImageMagnified] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [openSections, setOpenSections] = useState({
    price: true,
    discount: true,
    category: true,
    size: false,
    fabric: false,
    colour: true,
    occasion: false,
    origin: false
  });

  // Freeze background scrolling when any modal is open
  useEffect(() => {
    if (activeModalProduct || activeZoomProduct || isMobileFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalProduct, activeZoomProduct, isMobileFilterOpen]);

  // Handle ESC key to dismiss modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModalProduct(null);
        setActiveZoomProduct(null);
        setIsMobileFilterOpen(false);
        setIsImageMagnified(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleColorToggle = (hex) => {
    setSelectedColors((prev) =>
      prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex]
    );
  };

  const handleResetFilters = () => {
    setMaxPrice(50000);
    setSelectedColors([]);
    setCurrentPage(1);
  };

  const handleAddToCart = (product, e) => {
    if (e) e.stopPropagation();
    setCartItems((prev) => [...prev, product.id]);
    setToastMessage(`"${product.name}" added to your bag!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleOpenQuickView = (product, e) => {
    if (e) e.stopPropagation();
    setActiveModalProduct(product);
  };

  const handleOpenZoom = (product, e) => {
    if (e) e.stopPropagation();
    setActiveZoomProduct(product);
    setIsImageMagnified(false);
  };

  const handleCloseAllModals = () => {
    setActiveModalProduct(null);
    setActiveZoomProduct(null);
    setIsImageMagnified(false);
  };

  const filteredProducts = useMemo(() => {
    let result = SAMPLE_SAREES.filter((item) => item.price <= maxPrice);

    if (selectedSort === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'Popularity') {
      result.sort((a, b) => b.rating - a.rating);
    }
    return result;
  }, [maxPrice, selectedSort]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const displayedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const formatPrice = (val) => '₹ ' + val.toLocaleString('en-IN');

  return (
    <div className="CollectionsMain">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="CollectionsMain-toast">
          <FiCheck className="CollectionsMain-toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="CollectionsMain-container">
        {/* Mobile Bar */}
        <div className="CollectionsMain-mobile-bar">
          <button
            className="CollectionsMain-mobile-filter-btn"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <FiSliders /> Filters
          </button>
          <span className="CollectionsMain-mobile-count">
            <strong>2375</strong> Products Found
          </span>
        </div>

        {/* SIDEBAR FILTER */}
        <aside
          className={`CollectionsMain-sidebar ${
            isMobileFilterOpen ? 'CollectionsMain-sidebar-open' : ''
          }`}
        >
          <div className="CollectionsMain-sidebar-inner">
            <div className="CollectionsMain-filter-header">
              <div className="CollectionsMain-filter-title">
                <FiSliders className="CollectionsMain-filter-icon" />
                <span>FILTER BY</span>
              </div>
              <button
                className="CollectionsMain-reset-btn"
                onClick={handleResetFilters}
              >
                Reset All <FiRotateCcw className="CollectionsMain-reset-icon" />
              </button>
              <button
                className="CollectionsMain-mobile-close"
                onClick={() => setIsMobileFilterOpen(false)}
              >
                <FiX />
              </button>
            </div>

            {/* Price Range */}
            <div className="CollectionsMain-accordion-item">
              <div
                className="CollectionsMain-accordion-head"
                onClick={() => toggleSection('price')}
              >
                <span>PRICE RANGE</span>
                {openSections.price ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {openSections.price && (
                <div className="CollectionsMain-accordion-body">
                  <div className="CollectionsMain-range-wrapper">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="500"
                      value={maxPrice}
                      onChange={(e) => {
                        setMaxPrice(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="CollectionsMain-range-slider"
                    />
                    <div className="CollectionsMain-range-labels">
                      <span>₹ 0</span>
                      <span>
                        {maxPrice >= 50000 ? '₹ 50,000+' : formatPrice(maxPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Discount */}
            <div className="CollectionsMain-accordion-item">
              <div
                className="CollectionsMain-accordion-head"
                onClick={() => toggleSection('discount')}
              >
                <span>DISCOUNT</span>
                {openSections.discount ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {openSections.discount && (
                <div className="CollectionsMain-accordion-body">
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>10% and above (120)</span>
                  </label>
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>20% and above (86)</span>
                  </label>
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>30% and above (42)</span>
                  </label>
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>50% and above (18)</span>
                  </label>
                </div>
              )}
            </div>

            {/* Category */}
            <div className="CollectionsMain-accordion-item">
              <div
                className="CollectionsMain-accordion-head"
                onClick={() => toggleSection('category')}
              >
                <span>CATEGORY</span>
                {openSections.category ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {openSections.category && (
                <div className="CollectionsMain-accordion-body">
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" defaultChecked />
                    <span>Sarees (1820)</span>
                  </label>
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>Kurtas (320)</span>
                  </label>
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>Dress Materials (210)</span>
                  </label>
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>Blouses (140)</span>
                  </label>
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>Dupattas (95)</span>
                  </label>
                </div>
              )}
            </div>

            {/* Size */}
            <div className="CollectionsMain-accordion-item">
              <div
                className="CollectionsMain-accordion-head"
                onClick={() => toggleSection('size')}
              >
                <span>SIZE</span>
                {openSections.size ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {openSections.size && (
                <div className="CollectionsMain-accordion-body">
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>Free Size</span>
                  </label>
                </div>
              )}
            </div>

            {/* Fabric */}
            <div className="CollectionsMain-accordion-item">
              <div
                className="CollectionsMain-accordion-head"
                onClick={() => toggleSection('fabric')}
              >
                <span>FABRIC</span>
                {openSections.fabric ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {openSections.fabric && (
                <div className="CollectionsMain-accordion-body">
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>Pure Silk (840)</span>
                  </label>
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>Tussar Silk (310)</span>
                  </label>
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>Chanderi (190)</span>
                  </label>
                </div>
              )}
            </div>

            {/* Colour */}
            <div className="CollectionsMain-accordion-item">
              <div
                className="CollectionsMain-accordion-head"
                onClick={() => toggleSection('colour')}
              >
                <span>COLOUR</span>
                {openSections.colour ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {openSections.colour && (
                <div className="CollectionsMain-accordion-body">
                  <div className="CollectionsMain-color-palette">
                    {COLOR_PALETTE.map((c) => (
                      <span
                        key={c.name}
                        className={`CollectionsMain-color-dot ${
                          selectedColors.includes(c.hex)
                            ? 'CollectionsMain-color-selected'
                            : ''
                        }`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => handleColorToggle(c.hex)}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Occasion */}
            <div className="CollectionsMain-accordion-item">
              <div
                className="CollectionsMain-accordion-head"
                onClick={() => toggleSection('occasion')}
              >
                <span>OCCASION</span>
                {openSections.occasion ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {openSections.occasion && (
                <div className="CollectionsMain-accordion-body">
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>Bridal & Wedding</span>
                  </label>
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>Festive Wear</span>
                  </label>
                </div>
              )}
            </div>

            {/* Origin */}
            <div className="CollectionsMain-accordion-item">
              <div
                className="CollectionsMain-accordion-head"
                onClick={() => toggleSection('origin')}
              >
                <span>ORIGIN</span>
                {openSections.origin ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {openSections.origin && (
                <div className="CollectionsMain-accordion-body">
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>Kanchipuram</span>
                  </label>
                  <label className="CollectionsMain-checkbox-row">
                    <input type="checkbox" />
                    <span>Varanasi</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {isMobileFilterOpen && (
          <div
            className="CollectionsMain-mobile-backdrop"
            onClick={() => setIsMobileFilterOpen(false)}
          />
        )}

        {/* MAIN PRODUCT AREA */}
        <main className="CollectionsMain-content">
          <div className="CollectionsMain-top-controls">
            <div className="CollectionsMain-results-count">
              <span className="CollectionsMain-count-number">2375</span> Products Found
            </div>

            <div className="CollectionsMain-sort-view-actions">
              <div className="CollectionsMain-sort-container">
                <span className="CollectionsMain-sort-label">Sort By :</span>
                <div className="CollectionsMain-select-wrapper">
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="CollectionsMain-sort-select"
                  >
                    <option value="New Arrivals">New Arrivals</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Popularity">Popularity</option>
                  </select>
                </div>
              </div>

              {/* View Layout Switcher */}
              <div className="CollectionsMain-layout-toggles">
                <button
                  className={`CollectionsMain-toggle-btn ${
                    viewMode === 'grid' ? 'CollectionsMain-toggle-active' : ''
                  }`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid View"
                >
                  <FiGrid />
                </button>
                <button
                  className={`CollectionsMain-toggle-btn ${
                    viewMode === 'list' ? 'CollectionsMain-toggle-active' : ''
                  }`}
                  onClick={() => setViewMode('list')}
                  aria-label="List View"
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>

          {/* PRODUCTS LIST / GRID */}
          <div
            className={`CollectionsMain-product-grid ${
              viewMode === 'list' ? 'CollectionsMain-product-grid-as-list' : ''
            }`}
          >
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                className={`CollectionsMain-card ${
                  viewMode === 'list' ? 'CollectionsMain-card-list-mode' : ''
                }`}
              >
                {/* Image Box */}
                <div className="CollectionsMain-image-box">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="CollectionsMain-product-img"
                    loading="lazy"
                  />

                  {/* Badges */}
                  {product.tag && (
                    <span
                      className={`CollectionsMain-badge CollectionsMain-badge-${product.tag
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                    >
                      {product.tag}
                    </span>
                  )}

                  {/* Wishlist Heart */}
                  <button
                    className={`CollectionsMain-wishlist-btn ${
                      wishlist[product.id] ? 'CollectionsMain-wishlist-active' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    aria-label="Wishlist"
                  >
                    <FiHeart />
                  </button>

                  {/* Floating Action Pill */}
                  <div className="CollectionsMain-quick-actions">
                    <button
                      className="CollectionsMain-action-btn"
                      title="Add to Cart"
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      <FiShoppingCart />
                    </button>
                    <button
                      className="CollectionsMain-action-btn"
                      title="Quick View Details"
                      onClick={(e) => handleOpenQuickView(product, e)}
                    >
                      <FiEye />
                    </button>
                    <button
                      className="CollectionsMain-action-btn"
                      title="Full Screen Zoom"
                      onClick={(e) => handleOpenZoom(product, e)}
                    >
                      <FiSearch />
                    </button>
                  </div>
                </div>

                {/* Details Area */}
                <div className="CollectionsMain-card-info">
                  <div className="CollectionsMain-card-meta-top">
                    <span className="CollectionsMain-card-rating">
                      <FiStar className="CollectionsMain-star-icon" /> {product.rating}{' '}
                      <small>({product.reviews})</small>
                    </span>
                    <span className="CollectionsMain-card-fabric-tag">
                      {product.fabric}
                    </span>
                  </div>

                  <h3
                    className="CollectionsMain-card-title"
                    onClick={() => handleOpenQuickView(product)}
                  >
                    {product.name}
                  </h3>
                  <p className="CollectionsMain-card-desc">{product.description}</p>

                  {/* List View Specs */}
                  {viewMode === 'list' && (
                    <div className="CollectionsMain-list-specs">
                      <div className="CollectionsMain-spec-item">
                        <strong>Weave:</strong> {product.weave}
                      </div>
                      <div className="CollectionsMain-spec-item">
                        <strong>Blouse:</strong> Unstitched Matching Piece
                      </div>
                      <div className="CollectionsMain-spec-item">
                        <strong>Dispatch:</strong> Within 24-48 Hours
                      </div>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="CollectionsMain-card-pricing">
                    <span className="CollectionsMain-current-price">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="CollectionsMain-old-price">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    {product.discount && (
                      <span className="CollectionsMain-discount-tag">
                        {product.discount}
                      </span>
                    )}
                  </div>

                  {/* List View Actions */}
                  {viewMode === 'list' && (
                    <div className="CollectionsMain-list-actions">
                      <button
                        className="CollectionsMain-list-btn CollectionsMain-list-cart-btn"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        <FiShoppingCart /> Add to Cart
                      </button>
                      <button
                        className="CollectionsMain-list-btn CollectionsMain-list-view-btn"
                        onClick={(e) => handleOpenQuickView(product, e)}
                      >
                        <FiEye /> Quick View
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="CollectionsMain-pagination">
            <button
              className="CollectionsMain-page-nav-btn"
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <FiChevronLeft /> Prev
            </button>

            <div className="CollectionsMain-page-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  className={`CollectionsMain-page-num ${
                    currentPage === pageNum ? 'CollectionsMain-page-active' : ''
                  }`}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              className="CollectionsMain-page-nav-btn"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Next <FiChevronRight />
            </button>
          </div>
        </main>
      </div>

      {/* ---------------- PORTAL 1: QUICK VIEW PRODUCT DETAILS MODAL ---------------- */}
      {activeModalProduct &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="CollectionsMain-modal-backdrop"
            onClick={handleCloseAllModals}
          >
            <div
              className="CollectionsMain-modal-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="CollectionsMain-modal-close"
                onClick={handleCloseAllModals}
                aria-label="Close"
              >
                <FiX />
              </button>

              <div className="CollectionsMain-modal-content">
                <div className="CollectionsMain-modal-gallery">
                  <div className="CollectionsMain-modal-img-container">
                    <img
                      src={activeModalProduct.image}
                      alt={activeModalProduct.name}
                      className="CollectionsMain-modal-img"
                    />
                    {activeModalProduct.tag && (
                      <span
                        className={`CollectionsMain-badge CollectionsMain-badge-${activeModalProduct.tag
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`}
                      >
                        {activeModalProduct.tag}
                      </span>
                    )}
                  </div>
                </div>

                <div className="CollectionsMain-modal-info">
                  <div className="CollectionsMain-modal-header">
                    <span className="CollectionsMain-modal-tagline">
                      Authentic Handcrafted Masterpiece
                    </span>
                    <h2 className="CollectionsMain-modal-title">
                      {activeModalProduct.name}
                    </h2>
                    <div className="CollectionsMain-modal-ratings-row">
                      <div className="CollectionsMain-modal-stars">
                        <FiStar className="CollectionsMain-star-icon" />
                        <strong>{activeModalProduct.rating}</strong>
                      </div>
                      <span className="CollectionsMain-modal-rating-count">
                        ({activeModalProduct.reviews} customer reviews)
                      </span>
                    </div>
                  </div>

                  <div className="CollectionsMain-modal-pricing-box">
                    <span className="CollectionsMain-modal-price">
                      {formatPrice(activeModalProduct.price)}
                    </span>
                    {activeModalProduct.originalPrice && (
                      <span className="CollectionsMain-modal-old-price">
                        {formatPrice(activeModalProduct.originalPrice)}
                      </span>
                    )}
                    {activeModalProduct.discount && (
                      <span className="CollectionsMain-discount-tag">
                        {activeModalProduct.discount}
                      </span>
                    )}
                    <span className="CollectionsMain-tax-note">
                      Inclusive of all taxes & free shipping across India
                    </span>
                  </div>

                  <p className="CollectionsMain-modal-desc">
                    {activeModalProduct.description}. Skillfully woven by heritage
                    artisans using pure certified yarns, featuring traditional handloom
                    motifs and heavy zari pallu designed for grand occasions.
                  </p>

                  <div className="CollectionsMain-modal-attributes">
                    <div className="CollectionsMain-attr-item">
                      <span className="CollectionsMain-attr-label">Fabric:</span>
                      <span className="CollectionsMain-attr-val">
                        {activeModalProduct.fabric}
                      </span>
                    </div>
                    <div className="CollectionsMain-attr-item">
                      <span className="CollectionsMain-attr-label">Craft / Weave:</span>
                      <span className="CollectionsMain-attr-val">
                        {activeModalProduct.weave}
                      </span>
                    </div>
                    <div className="CollectionsMain-attr-item">
                      <span className="CollectionsMain-attr-label">Blouse Piece:</span>
                      <span className="CollectionsMain-attr-val">
                        Included (80 cm unstitched)
                      </span>
                    </div>
                    <div className="CollectionsMain-attr-item">
                      <span className="CollectionsMain-attr-label">Saree Length:</span>
                      <span className="CollectionsMain-attr-val">
                        5.5 Meters + 0.8 M Blouse
                      </span>
                    </div>
                  </div>

                  <div className="CollectionsMain-modal-perks">
                    <div className="CollectionsMain-perk">
                      <FiShield className="CollectionsMain-perk-icon" />
                      <span>Silk Mark Certified</span>
                    </div>
                    <div className="CollectionsMain-perk">
                      <FiTruck className="CollectionsMain-perk-icon" />
                      <span>Free Express Delivery</span>
                    </div>
                  </div>

                  <div className="CollectionsMain-modal-actions">
                    <button
                      className="CollectionsMain-modal-cart-btn"
                      onClick={(e) => {
                        handleAddToCart(activeModalProduct, e);
                        handleCloseAllModals();
                      }}
                    >
                      <FiShoppingCart /> Add to Cart
                    </button>
                    <button
                      className={`CollectionsMain-modal-wish-btn ${
                        wishlist[activeModalProduct.id]
                          ? 'CollectionsMain-wishlist-active'
                          : ''
                      }`}
                      onClick={() => toggleWishlist(activeModalProduct.id)}
                      title="Add to Wishlist"
                    >
                      <FiHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ---------------- PORTAL 2: FULLSCREEN HIGH-RES IMAGE ZOOM VIEWER ---------------- */}
      {activeZoomProduct &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="CollectionsMain-zoom-backdrop"
            onClick={handleCloseAllModals}
          >
            <button
              className="CollectionsMain-zoom-close"
              onClick={handleCloseAllModals}
              aria-label="Close Zoom"
            >
              <FiX />
            </button>

            <div
              className="CollectionsMain-zoom-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`CollectionsMain-zoom-canvas ${
                  isImageMagnified ? 'CollectionsMain-zoom-magnified' : ''
                }`}
                onClick={() => setIsImageMagnified((prev) => !prev)}
                title="Click anywhere to toggle 2x magnification"
              >
                <img
                  src={activeZoomProduct.image}
                  alt={activeZoomProduct.name}
                  className="CollectionsMain-zoom-img"
                />
              </div>

              {/* Bottom Floating Bar */}
              <div className="CollectionsMain-zoom-toolbar">
                <div className="CollectionsMain-zoom-title-box">
                  <span className="CollectionsMain-zoom-tag">Full Resolution Preview</span>
                  <h4>{activeZoomProduct.name}</h4>
                  <p>{formatPrice(activeZoomProduct.price)}</p>
                </div>
                <div className="CollectionsMain-zoom-btns">
                  <button
                    className="CollectionsMain-zoom-btn-tool"
                    onClick={() => setIsImageMagnified((prev) => !prev)}
                  >
                    <FiZoomIn /> {isImageMagnified ? 'Reset 1x' : 'Zoom 2x'}
                  </button>
                  <button
                    className="CollectionsMain-zoom-btn-cart"
                    onClick={(e) => {
                      handleAddToCart(activeZoomProduct, e);
                      handleCloseAllModals();
                    }}
                  >
                    <FiShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default CollectionsMain;