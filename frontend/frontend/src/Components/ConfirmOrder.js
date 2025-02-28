import React, { useEffect, useContext } from "react";
import { CartContext } from "../Context";
import axios from "axios";

const baseurl = "http://127.0.0.1:8000/api";

function ConfirmOrder() {
  const {cartData, setCartData} = useContext(CartContext); 
  
  const clearCart = () => {
    setCartData([]);
  };// ✅ Get clearCart function from context

  useEffect(() => {
    if (!cartData || cartData.length === 0) {
      console.warn("🛑 Cart is already empty.");
      return;
    }

    addOrderInTable();
  }, []); // ✅ Runs only once when the component mounts

  function addOrderInTable() {
    const customerId = localStorage.getItem("customer_id");
    if (!customerId) {
      console.error("❌ No customer ID found in localStorage");
      return;
    }

    axios
      .post(`${baseurl}/orders/`, { customer: customerId }) // ✅ Send JSON instead of FormData
      .then((response) => {
        console.log("✅ Order created successfully:", response.data);
        orderItems(response.data.id);
      })
      .catch((error) => {
        console.error("❌ Order creation failed:", error.response?.data || error);
      });
  }

  function orderItems(order_id) {
    try {
      let previousCart = localStorage.getItem("cartData");
      if (!previousCart) {
        console.warn("🛑 No cart data found.");
        return;
      }

      let cartJson = JSON.parse(previousCart);
      if (!Array.isArray(cartJson) || cartJson.length === 0) {
        console.warn("🛑 Invalid cart data format.");
        return;
      }

      cartJson.forEach((cart) => {
        axios
          .post(`${baseurl}/orderitems/`, {
            order: order_id,
            product: cart.product.id,
            qty: 1,
            price: cart.product.price,
          })
          .then(() => {
            console.log(`✅ Order item added for product ID ${cart.product.id}`);
          })
          .catch((error) => {
            console.error(
              `❌ Order item creation failed for product ${cart.product.id}:`,
              error.response?.data || error
            );
          });
      });

      // ✅ Remove cart data from localStorage
      localStorage.removeItem("cartData");

      // ✅ Clear cart from context
      clearCart();
      
    } catch (error) {
      console.error("❌ Error processing cart data:", error);
    }
  }

  return (
    <div className="mt-5">
      <h1 className="text-center text-primary">Your order has been confirmed!</h1>
    </div>
  );
}

export default ConfirmOrder;
