import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { FaHeart, FaStar } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { CurrencyContext, CartContext, UserContext } from "../Context";
import { useContext } from "react";
import axios from "axios";

function SingleProduct(props) {
  const { currencyData } = useContext(CurrencyContext);
  const baseurl = "http://127.0.0.1:8000/api";
  const [cartButtonClickStatus, setcartButtonClickStatus] = useState(false);
  const [productInWishlist, setProductInWishlist] = useState(false);
  const product_id = props.product.id;
  const { cartData, setCartData } = useContext(CartContext);
  const productData = props.product;
  const usercontext = useContext(UserContext);

  useEffect(() => {
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

  const cartAddButtonHandler = () => {
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

  const saveWishlistHandler = () => {
    const customerId = localStorage.getItem("customer_id");
    axios
      .post(baseurl + "/wishlist/", {
        customer: customerId,
        product: productData.id,
      })
      .then((response) => {
        if (response.data.id) {
          setProductInWishlist(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Col md={3} sm={6} xs={12} className="mb-4">
      <Card style={{ width: "100%" }}>
        <Link to={`/product/${props.product.title}/${props.product.id}`}>
          <Card.Img
            variant="top"
            src={props.product.image}
            width="100%"
            height="250px"
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${props.product.title}/${props.product.id}`}>
            <Card.Title>{props.product.title}</Card.Title>
          </Link>
          {currencyData != "usd" && (
            <Card.Subtitle className="mb-2 text-muted">
              Rs. {props.product.price}
            </Card.Subtitle>
          )}
          {currencyData == "usd" && (
            <Card.Subtitle className="mb-2 text-muted">
              $ {props.product.usd_price}
            </Card.Subtitle>
          )}

          {/* Rating & Add to Cart Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            {/* Rating (Left) */}
            <div
              style={{
                color: "gold",
                fontSize: "1rem",
                display: "flex",
                flexGrow: 1, // Ensures it takes up available space
              }}
            >
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Buttons (Right) */}
            <div style={{ display: "flex", gap: "10px" }}>
              {!cartButtonClickStatus && (
                <Button
                  variant=""
                  type="button"
                  size="sm"
                  onClick={cartAddButtonHandler}
                  style={{
                    borderRadius: "15px",
                    border: "1px solid #000",
                  }}
                >
                  Add to Cart
                </Button>
              )}
              {cartButtonClickStatus && (
                <Button
                  variant=""
                  type="button"
                  size="sm"
                  onClick={cartRemoveButtonHandler}
                  style={{
                    borderRadius: "15px",
                    border: "1px solid #000",
                  }}
                >
                  Remove
                </Button>
              )}
              {usercontext && !productInWishlist && (
                <Button
                  variant="outline-danger"
                  type="button"
                  onClick={saveWishlistHandler}
                  size="sm"
                  style={{ borderRadius: "15px" }}
                >
                  <FaHeart style={{ color: "red" }} />
                </Button>
              )}

              {!usercontext && (
                <Button
                  variant="outline-danger"
                  type="button"
                  size="sm"
                  className="disabled"
                  style={{ borderRadius: "15px" }}
                >
                  <FaHeart style={{ color: "red" }} />
                </Button>
              )}

              {usercontext && productInWishlist && (
                <Button
                  variant="outline-danger"
                  type="button"
                  size="sm"
                  className="disabled"
                  style={{ borderRadius: "15px" }}
                >
                  <FaHeart style={{ color: "red" }} />
                </Button>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default SingleProduct;
