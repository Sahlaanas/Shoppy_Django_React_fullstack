import React, { useState, useEffect } from "react";
import SellerSidebar from "./SellerSidebar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function CustomerOrders() {
  const [orderItems, setOrderItems] = useState([]);
  const vendor_id = localStorage.getItem("vendor_id");
  const baseurl = "http://127.0.0.1:8000/api";
  const {customer_id} = useParams()

  useEffect(() => {
    fetchData(`${baseurl}/vendor/${vendor_id}/customer/${customer_id}/orderitems/`);
  }, []);

  function fetchData(url) {
    axios
      .get(url)
      .then((response) => {
        setOrderItems(response.data.result);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
  
  function changeOrderStatus(orderId, status) {
    fetch(`${baseurl}/order-modify/${orderId}/`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ order_status: status }),
    })
      .then(function (response){
        if(response.status==200){
            fetchData(`${baseurl}/vendor/${vendor_id}/customer/${customer_id}/orderitems/`);
        }
      })
      
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <SellerSidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item, index) => {
                    return (
                      <tr>
                        <td>1</td>
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
                          {item.order.order_status && (
                            <span className="text-success">
                              <i className="fa fa-check-circle"></i> Completed
                            </span>
                          )}
                          {!item.order.order_status && (
                            <span className="text-warning">
                              <i className="fa fa-spinner"></i> Pending
                            </span>
                          )}
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-primary btn-sm dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Change Status
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                {!item.order.order_status && (
                                  <a
                                    onClick={() =>
                                      changeOrderStatus(item.order.id, true)
                                    }
                                    className="dropdown-item"
                                  >
                                    Complete
                                  </a>
                                )}
                                {item.order.order_status && (
                                  <a
                                    onClick={() =>
                                      changeOrderStatus(item.order.id, false)
                                    }
                                    className="dropdown-item"
                                  >
                                    Pending
                                  </a>
                                )}
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrders;
