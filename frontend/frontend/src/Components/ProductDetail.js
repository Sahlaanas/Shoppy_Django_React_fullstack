import React from "react";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";

function ProductDetail() {
  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-4">
          <img
            src="/assets/demoImage.png"
            className="card-img-top"
            alt="....."
            width="100%"
            height="250px"
          />
        </div>
        <div className="col-8">
          <h3>Product Title</h3>
          <p>
            {" "}
            The standard chunk of lorem ipsum used sinde the 1500s is reproduced
            belwofor those interested. Section 1.10.32 and 1.10.33 from "de
            finibus bonorum et maloram by cicero are also reproduced in their
            exact original form, accompanied by english version from the 1914
            translation by H rackham is used in the value valid to belwofor
            accessible use a button and change it with appreciate styles. Learn
            more provide cannot a vaild href enter the data element which is
            very good and wild.
            <h5 className="card-title">Price : Rs. 500</h5>
          </p>
          <p className="mt-3">
            <Link
              title="Demo"
              target="_blank"
              className="btn btn-warning text-white "
            >
              <i className="fa-solid fa-eye"></i> Demo
            </Link>
            <button title="Add to Cart" className="btn btn-primary ms-1">
              <i className="fa-solid fa-cart-plus"></i> Add to Cart
            </button>
            <button title="Buy Now" className="btn btn-success ms-1">
              <i className="fa-solid fa-bag-shopping"></i> Buy Now
            </button>
            <button title="Add to Wishlist" className="btn btn-danger ms-1">
              <i className="fa fa-heart"></i> Wishlist
            </button>
          </p>
          <hr></hr>
          <div className="producttags">
            <h5 className="mt-3">Tags</h5>
            <p>
              <Link to="#" className="badge bg-secondary text-white me-1">
                Python{" "}
              </Link>
              <Link to="#" className="badge bg-secondary text-white me-1">
                {" "}
                Django{" "}
              </Link>
              <Link to="#" className="badge bg-secondary text-white me-1">
                {" "}
                WebScripts{" "}
              </Link>
              <Link to="#" className="badge bg-secondary text-white me-1">
                {" "}
                Flask{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Related Products */}
      <h3 className="mt-5 mb-3">Related Products</h3>
      <div
        id="relatedProductSlider"
        className="carousel slide bg-light border "
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#relatedProductSlider"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#relatedProductSlider"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#relatedProductSlider"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row">
              <SingleProduct title="django project"/>
              <SingleProduct title="django project"/>
              <SingleProduct title="django project"/>
              <SingleProduct title="django project"/>
            </div>
          </div>
          <div className="carousel-item">
          <div className="row">
              <SingleProduct title="django project"/>
              <SingleProduct title="django project"/>
              <SingleProduct title="django project"/>
              <SingleProduct title="django project"/>
            </div>
          </div>
          <div className="carousel-item">
          <div className="row">
              <SingleProduct title="django project"/>
              <SingleProduct title="django project"/>
              <SingleProduct title="django project"/>
              <SingleProduct title="django project"/>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#relatedProductSlider"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#relatedProductSlider"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* End Related Products */}
    </section>
  );
}

export default ProductDetail;
