import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context";

function Checkout() {
  const { cartData, setCartData } = useContext(CartContext);
  const [cartButtonClickStatus, setcartButtonClickStatus] = useState(false);
  const [productData, setProductData] = useState([]);

  if (cartData == null || cartData.length == 0) {
    var cartItems = 0;
    var sum=0;
  } else {
    cartItems = cartData.length;
    sum=0; 
    cartData.map((item,index) => {
      sum += parseFloat(item.product.price)
    })
  }

 

  const cartRemoveButtonHandler = (product_id) => {
    var previousCart = localStorage.getItem("cartData");
    var cartJson = JSON.parse(previousCart);
    cartJson.map((cart, index) => {
      if (cart != null && cart.product.id == product_id) {
        // delete cartJson[index];
        cartJson.splice(index, 1);
      }
    });
    var cartString = JSON.stringify(cartJson);      
    localStorage.setItem("cartData", cartString);
    setcartButtonClickStatus(false);
    setCartData(cartJson);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">All Items({cartItems})</h3>
      {cartItems != 0 && (
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((item, index) => {
                    return (
                      <tr>
                        <td>{index}</td>
                        <td>
                          <Link>
                            <img
                              src={item.product.image}
                              className="img-thumbnail"
                              alt="....."
                              width="80"
                            />
                            {item.product.title}
                          </Link>
                        </td>
                        <td>Rs.{item.product.price}</td>
                        <td>
                          {" "}
                          <button
                            title="Add to Cart"
                            onClick={() =>
                              cartRemoveButtonHandler(item.product.id)
                            }
                            type="button"
                            className="btn btn-warning ms-1"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Total</th>
                    <th>Rs. {sum}</th>
                  </tr>
                  <tr>
                    <td colSpan="3" align="right">
                      <Link to="/categories" className="btn btn-secondary">
                        Continue Shopping
                      </Link>
                      <Link
                        to="/confirm-order"
                        className="btn btn-success ms-1"
                      >
                        Proceed to Payment
                      </Link>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
      {cartItems == 0 && (
        <h4>
          Your Cart is empty. Back to <Link to="/">Home</Link>
        </h4>
      )}
    </div>
  );
}

export default Checkout;
