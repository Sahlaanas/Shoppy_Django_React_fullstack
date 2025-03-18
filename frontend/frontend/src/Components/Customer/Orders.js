import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import OrderRow from "./OrderRow";

function Orders() {
  const baseurl = "http://127.0.0.1:8000/api"; 
  const customerId = localStorage.getItem("customer_id");
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseurl}/customer/${customerId}/orderitems/`)
      .then((response) => {
        console.log(response.data.result);
        setOrderItems(response.data.result);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);



  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
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
                    return <OrderRow item={item} key={index} index={index} />
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

export default Orders;
