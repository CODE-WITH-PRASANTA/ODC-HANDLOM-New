import React, { useState, useMemo } from 'react';
import './Wishlist.css';
import {
  FiGrid,
  FiList,
  FiTrash2,
  FiShoppingCart,
  FiHeart,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight
} from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const ALL_WISHLIST_PRODUCTS = [
  {
    id: 1,
    name: 'Sambalpuri Ikat Saree',
    image: 'assets/collection-1.png',
    fallbackImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    price: 6999,
    originalPrice: 8999,
    discount: '22% OFF',
    rating: 4.9,
    reviews: 156,
    fabric: 'Pure Mulberry Silk'
  },
  {
    id: 2,
    name: 'Odisha Pata Saree',
    image: 'assets/collection-2.png',
    fallbackImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85',
    price: 12499,
    originalPrice: 15999,
    discount: '22% OFF',
    rating: 4.7,
    reviews: 98,
    fabric: 'Handloom Silk'
  },
  {
    id: 3,
    name: 'Traditional Pata Saree',
    image: 'assets/collection-3.png',
    fallbackImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
    price: 11999,
    originalPrice: 14999,
    discount: '20% OFF',
    rating: 4.8,
    reviews: 112,
    fabric: 'Pure Zari Silk'
  },
  {
    id: 4,
    name: 'Kanchipuram Silk Saree',
    image: 'assets/collection-4.png',
    fallbackImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=85',
    price: 8499,
    originalPrice: 10999,
    discount: '22% OFF',
    rating: 4.8,
    reviews: 120,
    fabric: 'Kanchipuram Silk'
  },
  {
    id: 5,
    name: 'Banarasi Brocade Silk Saree',
    image: 'assets/collection-1.png',
    fallbackImage: 'https://images.unsplash.com/photo-1610030469668-9359e9a4f6cf?auto=format&fit=crop&w=800&q=85',
    price: 16499,
    originalPrice: 21999,
    discount: '25% OFF',
    rating: 5.0,
    reviews: 145,
    fabric: 'Katan Silk'
  },
  {
    id: 6,
    name: 'Chanderi Zari Buti Saree',
    image: 'assets/collection-2.png',
    fallbackImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85',
    price: 7499,
    originalPrice: 9999,
    discount: '25% OFF',
    rating: 4.8,
    reviews: 84,
    fabric: 'Silk Cotton Blend'
  },
  {
    id: 7,
    name: 'Tussar Handloom Saree',
    image: 'assets/collection-3.png',
    fallbackImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
    price: 10499,
    originalPrice: 13999,
    discount: '25% OFF',
    rating: 4.7,
    reviews: 62,
    fabric: 'Wild Tussar Silk'
  },
  {
    id: 8,
    name: 'Bomkai Cotton Silk Saree',
    image: 'assets/collection-4.png',
    fallbackImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=85',
    price: 9299,
    originalPrice: 11999,
    discount: '22% OFF',
    rating: 4.9,
    reviews: 132,
    fabric: 'Bomkai Handloom'
  },
  {
    id: 9,
    name: 'Pochampally Double Ikat Saree',
    image: 'assets/collection-1.png',
    fallbackImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85',
    price: 13999,
    originalPrice: 17999,
    discount: '22% OFF',
    rating: 4.8,
    reviews: 77,
    fabric: 'Double Ikat Silk'
  },
  {
    id: 10,
    name: 'Mysore Royal Crepe Silk Saree',
    image: 'assets/collection-2.png',
    fallbackImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85',
    price: 14500,
    originalPrice: 18500,
    discount: '21% OFF',
    rating: 4.9,
    reviews: 104,
    fabric: 'Pure Mysore Crepe'
  },
  {
    id: 11,
    name: 'Paithani Peacock Motif Saree',
    image: 'assets/collection-3.png',
    fallbackImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
    price: 24999,
    originalPrice: 29999,
    discount: '16% OFF',
    rating: 5.0,
    reviews: 95,
    fabric: 'Fine Tapestry Silk'
  },
  {
    id: 12,
    name: 'Maheshwari Tissue Floral Saree',
    image: 'assets/collection-4.png',
    fallbackImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=85',
    price: 8999,
    originalPrice: 11499,
    discount: '21% OFF',
    rating: 4.6,
    reviews: 58,
    fabric: 'Cotton Silk Tissue'
  },
  {
    id: 13,
    name: 'Baluchari Narrative Pallu Saree',
    image: 'assets/collection-1.png',
    fallbackImage: 'https://images.unsplash.com/photo-1610030469668-9359e9a4f6cf?auto=format&fit=crop&w=800&q=85',
    price: 18200,
    originalPrice: 22500,
    discount: '19% OFF',
    rating: 4.9,
    reviews: 82,
    fabric: 'Bishnupur Pure Silk'
  },
  {
    id: 14,
    name: 'Kalamkari Hand-Drawn Saree',
    image: 'assets/collection-2.png',
    fallbackImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85',
    price: 11800,
    originalPrice: 14800,
    discount: '20% OFF',
    rating: 4.7,
    reviews: 73,
    fabric: 'Natural Vegetable Dyes'
  },
  {
    id: 15,
    name: 'Dhakai Jamdani Fine Muslin Saree',
    image: 'assets/collection-3.png',
    fallbackImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85',
    price: 6499,
    originalPrice: 8200,
    discount: '20% OFF',
    rating: 4.8,
    reviews: 91,
    fabric: 'Organic Soft Cotton'
  },
  {
    id: 16,
    name: 'Patan Patola Geometric Saree',
    image: 'assets/collection-4.png',
    fallbackImage: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=85',
    price: 28999,
    originalPrice: 35000,
    discount: '17% OFF',
    rating: 5.0,
    reviews: 118,
    fabric: 'Heritage Double Weave'
  }
];

const Wishlist = () => {
  const [items, setItems] = useState(ALL_WISHLIST_PRODUCTS);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  // Pagination (8 Products per page)
  const itemsPerPage = 8;
  const totalPages = Math.ceil(items.length / itemsPerPage) || 1;

  const displayedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleRemoveItem = (id, name) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    
    // Adjust page if deletion empties current page
    const newTotalPages = Math.ceil(updated.length / itemsPerPage) || 1;
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
    showToast(`Removed "${name}" from Wishlist`);
  };

  const handleClearAll = () => {
    if (items.length === 0) return;
    setItems([]);
    setCurrentPage(1);
    showToast('Wishlist cleared');
  };

  const handleAddToCart = (product) => {
    showToast(`"${product.name}" added to Cart!`);
  };

  const formatPrice = (val) => '₹ ' + val.toLocaleString('en-IN');

  return (
    <div className="Wishlist">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="Wishlist-toast">
          <FiCheck className="Wishlist-toast-icon" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="Wishlist-container">
        {/* Header Bar */}
        <div className="Wishlist-header">
          <h1 className="Wishlist-title">
            My Wishlist <span className="Wishlist-count">({items.length})</span>
          </h1>

          <div className="Wishlist-header-controls">
            {/* View Mode Toggle */}
            <div className="Wishlist-view-switcher">
              <button
                className={`Wishlist-view-btn ${
                  viewMode === 'grid' ? 'Wishlist-view-active' : ''
                }`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
                aria-label="Grid View"
              >
                <FiGrid className="Wishlist-btn-icon" /> Grid
              </button>
              <button
                className={`Wishlist-view-btn ${
                  viewMode === 'list' ? 'Wishlist-view-active' : ''
                }`}
                onClick={() => setViewMode('list')}
                title="List View"
                aria-label="List View"
              >
                <FiList className="Wishlist-btn-icon" /> List
              </button>
            </div>

            {/* Clear Button */}
            <button
              className="Wishlist-clear-btn"
              onClick={handleClearAll}
              disabled={items.length === 0}
            >
              <FiTrash2 className="Wishlist-clear-icon" /> Clear Wishlist
            </button>
          </div>
        </div>

        {/* Content Section */}
        {items.length > 0 ? (
          <>
            <div
              className={`Wishlist-grid ${
                viewMode === 'list' ? 'Wishlist-grid-list-view' : ''
              }`}
            >
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className={`Wishlist-card ${
                    viewMode === 'list' ? 'Wishlist-card-list-mode' : ''
                  }`}
                >
                  {/* Image Container */}
                  <div className="Wishlist-image-container">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="Wishlist-card-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = item.fallbackImage;
                      }}
                    />

                    {/* Red Heart Badge */}
                    <button
                      className="Wishlist-heart-badge"
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      title="Remove from Wishlist"
                    >
                      <FiHeart className="Wishlist-heart-icon" />
                    </button>
                  </div>

                  {/* Card Details */}
                  <div className="Wishlist-details">
                    <h3 className="Wishlist-item-title">{item.name}</h3>

                    {/* Price Row */}
                    <div className="Wishlist-price-row">
                      <span className="Wishlist-current-price">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="Wishlist-old-price">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                      {item.discount && (
                        <span className="Wishlist-discount-badge">
                          {item.discount}
                        </span>
                      )}
                    </div>

                    {/* Rating Row */}
                    <div className="Wishlist-rating-row">
                      <div className="Wishlist-stars">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="Wishlist-star" />
                        ))}
                      </div>
                      <span className="Wishlist-rating-number">
                        {item.rating}{' '}
                        <span className="Wishlist-review-count">
                          ({item.reviews})
                        </span>
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="Wishlist-actions-row">
                      <button
                        className="Wishlist-add-cart-btn"
                        onClick={() => handleAddToCart(item)}
                      >
                        <FiShoppingCart className="Wishlist-btn-icon" /> Add to Cart
                      </button>
                      <button
                        className="Wishlist-remove-btn"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                      >
                        <FiTrash2 className="Wishlist-btn-icon" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls (After 8 Products) */}
            {totalPages > 1 && (
              <div className="Wishlist-pagination">
                <button
                  className="Wishlist-page-nav-btn"
                  disabled={currentPage === 1}
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                >
                  <FiChevronLeft /> Prev
                </button>

                <div className="Wishlist-page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      className={`Wishlist-page-num ${
                        currentPage === pageNum ? 'Wishlist-page-active' : ''
                      }`}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  className="Wishlist-page-nav-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                >
                  Next <FiChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="Wishlist-empty-state">
            <div className="Wishlist-empty-icon-circle">
              <FiHeart className="Wishlist-empty-heart" />
            </div>
            <h2 className="Wishlist-empty-heading">Your Wishlist is Empty</h2>
            <p className="Wishlist-empty-text">
              Discover our collection of handcrafted heritage sarees and add your favorites to save them for later.
            </p>
            <button
              className="Wishlist-explore-btn"
              onClick={() => {
                setItems(ALL_WISHLIST_PRODUCTS);
                setCurrentPage(1);
              }}
            >
              Explore Sarees <FiArrowRight className="Wishlist-btn-icon" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;