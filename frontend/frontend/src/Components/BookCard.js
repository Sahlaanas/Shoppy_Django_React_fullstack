import { useState } from "react";
import { FaHeart, FaShoppingCart, FaStar, FaRegStar } from "react-icons/fa";

const BookCard = () => {
  const [activeFormat, setActiveFormat] = useState("Hardcover");
  const formats = ["Hardcover", "Paperback", "E-Book", "Audiobook"];

  return (
    <div class="book-card">
    <div class="image-container">
      <img src="/api/placeholder/150/200" alt="Book Cover" class="book-image" />
      <div class="ribbon">Bestseller</div>
      <button class="wishlist-button">
        <svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    </div>
    <div class="book-info">
      <div class="book-category">Fiction</div>
      <h3 class="book-title">The Midnight Library</h3>
      <div class="book-author">by Matt Haig</div>
      <div class="book-rating">
        <div class="stars">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
        <span class="rating-count">(2,843)</span>
      </div>
      <div class="book-meta">
        <span>288 pages</span>
        <span>Published 2020</span>
      </div>
      <div class="price-container">
        <span class="current-price">$16.99</span>
        <span class="original-price">$24.99</span>
        <span class="discount-percentage">-32%</span>
      </div>
      <div class="book-formats">
        <div class="format-option active">Hardcover</div>
        <div class="format-option">Paperback</div>
        <div class="format-option">E-Book</div>
        <div class="format-option">Audiobook</div>
      </div>
      <button class="add-to-cart">
        <svg class="cart-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        Add to Cart
      </button>
    </div>
  </div>
  );
};

export default BookCard;
