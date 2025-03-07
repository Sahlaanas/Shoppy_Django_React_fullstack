import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Link } from 'react-router-dom'


function Dashboard() {
  const baseurl = "http://127.0.0.1:8000/api";
  var customer_id = localStorage.getItem("customer_id");
  const [countList, setCountList] = useState({
      'totalAddress' : 0,
      'totalOrders' : 0,
      'totalWishlist' : 0,
      
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${baseurl}/customer/dashboard/${customer_id}`)
      .then((response) => {
            setCountList({
                  'totalAddress' : response.data.totalAddress,
                  'totalOrders': response.data.totalOrders,
                  'totalWishlist' : response.data.totalWishlist
            })
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h4>Total Orders</h4>
                  <h4>
                        <Link to='/customer/orders' >{countList.totalOrders}</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h4>Total Wishlist</h4>
                  <h4>
                  <Link to='/customer/wishlist' >{countList.totalWishlist}</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-2">
              <div className="card">
                <div className="card-body text-center">
                  <h4>Total Address</h4>
                  <h4>
                  <Link to='/customer/addresslist' >{countList.totalAddress}</Link>
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

export default Dashboard;
