import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SingleRelatedProduct from "./SingleRelatedProduct";
import { CartContext, UserContext } from "../Context";


function ProductDetail() {
  const baseurl = "http://127.0.0.1:8000/api"; 
  const [productData, setProductData] = useState([]);
  const { product_id } = useParams();
  const [productTags, setProductTags] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cartButtonClickStatus, setcartButtonClickStatus] = useState(false);
  const { cartData, setCartData } = useContext(CartContext);
  const _currency = localStorage.getItem("currency");
  const usercontext = useContext(UserContext);
  const [productInWishlist, setProductInWishlist] = useState(false);

  useEffect(() => {
    fetchData(baseurl + "/product/" + product_id);
    fetchRelatedData(baseurl + "/related-products/" + product_id);
    checkProductInCart(product_id);
    checkProductInWishlist(baseurl + "/check-in-wishlist/", product_id);
  }, [product_id]);

  function checkProductInCart(product_id) {
    try {
      var previousCart = localStorage.getItem("cartData");

      // Handle null or invalid JSON
      if (!previousCart) {
        console.warn("🛑 No cart data found in localStorage.");
        return;
      }

      var cartJson = JSON.parse(previousCart);

      if (Array.isArray(cartJson)) {
        // ✅ Ensure it's an array before using map
        cartJson.forEach((cart) => {
          if (cart?.product?.id === product_id) {
            setcartButtonClickStatus(true);
          }
        });
      } else {
        console.error("❌ cartData is not a valid array:", cartJson);
      }
    } catch (error) {
      console.error("❌ Error parsing cartData from localStorage:", error);
    }
  }

  const fetchData = (baseurl) => {
    axios
      .get(baseurl)
      .then((response) => {
        setProductData(response.data);
        setProductTags(response.data.tag_list);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchRelatedData = (url) => {
    axios
      .get(url)
      .then((response) => {
        setRelatedProducts(response.data.result);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const tagLinks = [];
  for (let i = 0; i < productTags.length; i++) {
    let tag = productTags[i].trim();
    tagLinks.push(
      <Link
        className="badge bg-secondary text-white me-1"
        to={`/products/${tag}`}
      >
        {tag}
      </Link>
    );
  }

  const cartAddButtonHandler = () => {
    // let previousCart = localStorage.getItem("cartData");
    // let cartJson = previousCart ? JSON.parse(previousCart) : [];
    // if (!Array.isArray(cartJson)) {
    //   cartJson = [];
    // }
    // const newCartItem = {
    //   product: {
    //     id: productData.id,
    //     title: productData.title,
    //   },
    //   user: {
    //     id: 1,
    //   },
    // };
    // let updatedCart = [...cartJson, newCartItem];
    // localStorage.setItem("cartData", JSON.stringify(updatedCart));

    //Another method
    var previousCart = localStorage.getItem("cartData");
    var cartJson = JSON.parse(previousCart);
    var cartData = {
      product: {
        id: productData.id,
        title: productData.title,
        price: productData.price,
        usd_price: productData.usd_price,
        image: productData.image,
      },
      user: {
        id: 1,
      },
    };
    if (cartJson != null) {
      cartJson.push(cartData);
      var cartString = JSON.stringify(cartJson);
      localStorage.setItem("cartData", cartString);
      setCartData(cartJson);
    } else {
      var newCartList = [];
      newCartList.push(cartData);
      var cartString = JSON.stringify(newCartList);
      localStorage.setItem("cartData", cartString);
    }
    setcartButtonClickStatus(true);
  };

  const cartRemoveButtonHandler = () => {
    var previousCart = localStorage.getItem("cartData");
    var cartJson = JSON.parse(previousCart);
    cartJson.map((cart, index) => {
      if (cart != null && cart.product.id == productData.id) {
        // delete cartJson[index];
        cartJson.splice(index, 1);
      }
    });
    var cartString = JSON.stringify(cartJson);
    localStorage.setItem("cartData", cartString);
    setcartButtonClickStatus(false);
    setCartData(cartJson);
  };

  const saveWishlistHandler = () => {
    const customerId = localStorage.getItem("customer_id");
    axios
      .post(baseurl + "/wishlist/", {
        customer: customerId,
        product: productData.id,
      })
      .then((response) => {
        if(response.data.id){
          setProductInWishlist(true)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkProductInWishlist = (baseurl, product_id) => {
    const customerId = localStorage.getItem("customer_id");
    const formData = new FormData();
    formData.append("customer", customerId);
    formData.append("product", product_id);

    axios
      .post(baseurl, formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Ensure it's sent as form data
      })
      .then((response) => {
        console.log(response);

        if (response.data.bool == true) {
          setProductInWishlist(true);
        } else {
          setProductInWishlist(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="container mt-4">
      <div className="row">
        <div className="col-4">
          <img
            src={productData.image}
            className="card-img-top"
            alt="....."
            width="100%"
            height="250px"
          />
        </div>
        <div className="col-8">
          <h3>{productData.title}</h3>
          <p>{productData.details}</p>
          {_currency != "usd" && (
            <h5 className="card-title">Price : Rs. {productData.price}</h5>
          )}
          {_currency == "usd" && (
            <h5 className="card-title">Price : $ {productData.usd_price}</h5>
          )}

          <p className="mt-3">
            <a
              title="Demo"
              href={productData.demo_url}
              target=" "
              className="btn btn-warning text-white "
            >
              <i className="fa-solid fa-eye"></i> Demo
            </a>
            {!cartButtonClickStatus && (
              <button
                title="Add to Cart"
                onClick={cartAddButtonHandler}
                type="button"
                className="btn btn-primary ms-1"
              >
                <i className="fa-solid fa-cart-plus"></i> Add to Cart
              </button>
            )}
            {cartButtonClickStatus && (
              <button
                title="Add to Cart"
                onClick={cartRemoveButtonHandler}
                type="button"
                className="btn btn-warning ms-1"
              >
                Remove from Cart
              </button>
            )}
            <button title="Buy Now" className="btn btn-success ms-1">
              <i className="fa-solid fa-bag-shopping"></i> Buy Now
            </button>
            {usercontext && !productInWishlist && (
              <button
                title="Add to Wishlist"
                type="button"
                onClick={saveWishlistHandler}
                className="btn btn-danger ms-1"
              >
                <i className="fa fa-heart"></i> Wishlist
              </button>
            )}
            {!usercontext && (
              <button
                title="Add to Wishlist"
                className="btn btn-danger ms-1 disabled"
              >
                <i className="fa fa-heart"></i> Wishlist
              </button>
            )}
            {usercontext && productInWishlist && (
              <button
                title="Add to Wishlist"
                className="btn btn-danger ms-1 disabled"
              >
                <i className="fa fa-heart"></i> Wishlist
              </button>
            )}
          </p>
          <hr></hr>
          <div className="producttags">
            <h5 className="mt-3">Tags</h5>
            <p>{tagLinks}</p>
          </div>
        </div>
      </div>
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <>

        
          <h3 className="mt-5 mb-3 text-center">Related Products</h3>
          <div id="relatedProductSlider" className="carousel slide ">
            <div className="carousel-indicators">
              {relatedProducts.map((product, index) => {
                if (index === 0) {
                  return (
                    <button
                      type="button"
                      data-bs-target="#relatedProductSlider"
                      data-bs-slide-to={index}
                      className="active"
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                  );
                } else {
                  return (
                    <button
                      type="button"
                      data-bs-target="#relatedProductSlider"
                      data-bs-slide-to={index}
                      aria-current="true"
                      aria-label="Slide 1"
                    ></button>
                  );
                }
              })}
            </div>
            <div className="carousel-inner">
              {relatedProducts.map((product, index) => {
                if (index === 0) {
                  return (
                    <div className="carousel-item active">
                      <SingleRelatedProduct product={product} />
                    </div>
                  );
                } else {
                  return (
                    <div className="carousel-item">
                      <SingleRelatedProduct product={product} />
                    </div>
                  );
                }
              })}
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
        </>
      )}
      {/* End Related Products */}
    </section>
  );
}

export default ProductDetail;
