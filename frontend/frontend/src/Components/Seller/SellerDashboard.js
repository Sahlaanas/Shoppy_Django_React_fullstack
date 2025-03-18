import React, { useState, useEffect } from "react";
import SellerSidebar from "./SellerSidebar";
import axios from "axios";
import { Link } from "react-router-dom";

function SellerDashboard() {
  const vendor_id = localStorage.getItem("vendor_id");
  const [vendorData, setVendorData] = useState({
      totalProducts : 0,
      totalOrders : 0,
      totalCustomers : 0
  });
  const baseurl = "http://127.0.0.1:8000/api";
  useEffect(() => {
    fetchData(`${baseurl}/vendor/${vendor_id}/dashboard/`);
  }, []);

  function fetchData(url) {
    axios
      .get(url)
      .then((response) => {
            console.log(response.data);
            
        setVendorData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <SellerSidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h4>Total Products</h4>
                  <h4>
                    <Link to="/seller/products">{vendorData.totalProducts}</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h4>Total Orders</h4>
                  <h4>
                    <Link to='/seller/orders'>{vendorData.totalOrders}</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h4>Total Customers</h4>
                  <h4>
                    <Link to='/seller/customers' >{vendorData.totalCustomers}</Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
