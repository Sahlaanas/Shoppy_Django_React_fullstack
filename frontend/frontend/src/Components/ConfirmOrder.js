import React, { useEffect, useContext, useRef, useState } from "react";
import { CartContext, UserContext, CurrencyContext } from "../Context";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const baseurl = "http://127.0.0.1:8000/api";

function ConfirmOrder() {
  const { cartData, setCartData } = useContext(CartContext);
  const usercontext = useContext(UserContext);
  const [orderId, setorderId] = useState("");
  const [payMethod, setpayMethod] = useState("");
  const [orderAmount, setOrderAmount] = useState(0);
  const {currencyData} = useContext(CurrencyContext)

  const clearCart = () => {
    setCartData([]);
  }; // ✅ Get clearCart function from context

  const orderPlacedRef = useRef(false);

  useEffect(() => {

    if (!cartData || cartData.length === 0) {
      console.warn("🛑 Cart is already empty.");
      return;
    }
    if (!usercontext) {
      window.location.href = "customer/login";
    } else {
      if (!orderPlacedRef.current) {
        orderPlacedRef.current = true; // ✅ Ensures it runs only once
        addOrderInTable();
      }
    }
  }, []);

  function addOrderInTable() {
    const customerId = localStorage.getItem("customer_id");
    if (!customerId) {
      console.error("❌ No customer ID found in localStorage");
      return;
    }
    var total_amount = 0;
    var total_usd_amount = 0;
    var previousCart=localStorage.getItem('cartData');
    var cartJson=JSON.parse(previousCart);
    cartJson.forEach((cart) => {
      total_amount+=parseFloat(cart.product.price)
      total_usd_amount+=parseFloat(cart.product.usd_price)
    })

    axios
      .post(`${baseurl}/orders/`, { customer: customerId, total_amount: total_amount, total_usd_amount: total_usd_amount }) // ✅ Send JSON instead of FormData
      .then((response) => {
        console.log("✅ Order created successfully:", response.data);
        orderItems(response.data.id);
        var orderId = response.data.id;
        setorderId(orderId);
        if(currencyData=='usd'){
          setOrderAmount(response.data.total_usd_amount)
        }else{
          setOrderAmount(response.data.total_amount)
        }
      })
      .catch((error) => {
        console.error(
          "❌ Order creation failed:",
          error.response?.data || error
        );
      });
  }

  function updateOrderStatus(order_status){
    axios.post(`${baseurl}/update-order-status/${orderId}/`)
    .then(function (response){
        window.location.href='/order/success';      
    })
    .catch(function (error){
      window.location.href='/order/failure';      
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
            usd_price:cart.product.usd_price
          })
          .then(() => {
            console.log(
              `✅ Order item added for product ID ${cart.product.id}`
            );
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

  function changePaymentMethod(payMethod) {
    setpayMethod(payMethod);
  }

  function PayNowButton() {
    if (payMethod != "") {
      changePaymentMethod(payMethod);
    } else {
      alert("Select payment method!!");
    }
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-6 offset-3">
          <div className="card py-3 text-center">
            <h3>
              <i className="fa fa-check-circle text-success"></i> Your Order has
              been confirmed!
            </h3>
            <h5> ORDER ID : {orderId}</h5>
          </div>
          <div className="card mt-4 p-3">
            <form>
              {
                currencyData=='usd' && <>
                <div className="form-group">
                <label>
                  <input
                    type="radio"
                    onChange={() => changePaymentMethod("paypal")}
                    name="payMethod"
                  />{" "}
                  PayPal
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="radio"
                    onChange={() => changePaymentMethod("stripe")}
                    name="payMethod"
                  />{" "}
                  Stripe
                </label>
              </div>
                </>
              }
              {
                currencyData != 'usd' && 
                <div className="form-group">
                <label>
                  <input
                    type="radio"
                    onChange={() => changePaymentMethod("razorpay")}
                    name="payMethod"
                  />{" "}
                  Razorpay(for India)
                </label>
              </div>
              }
              

              <button
                type="button"
                onClick={PayNowButton}
                className="btn btn-sm btn-success mt-3"
              >
                Next
              </button>
            </form>
            {payMethod == "paypal" && (
              <PayPalScriptProvider options={{ "client-id": "AdWtf3F4diiu7dDiJiDiHX0d4k3hr7ObjRsbAm2vVdX67xDjyMqC94-q7ZOrmbtKJ8rEpz1Fnxm7NTBE" }}>
                <PayPalButtons
                  className="mt-3"
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: "1", //value:{orderAmount}
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      const name = details.payer.name.given_name;
                      alert(`Transaction completed by ${name}`);
                      updateOrderStatus(true);
                    });
                  }}
                />
              </PayPalScriptProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmOrder;
