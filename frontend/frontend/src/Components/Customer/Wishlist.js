import React, { useEffect, useState, useContext } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { CurrencyContext } from "../../Context";


function Wishlist() {
  const baseurl = 'http://127.0.0.1:8000/api';
  const customerId = localStorage.getItem('customer_id');
  const [wishlistItems, setWishlistItems] = useState([]);
  const {currencyData} = useContext(CurrencyContext);

  useEffect(() =>{
  fetchData(baseurl+'/customer/'+customerId+'/wishitems/');
  },[])

  const fetchData = (baseurl) => {
    axios
    .get(baseurl)
    .then((response) => {
      console.log(response.data.result);
      setWishlistItems(response.data.result)
    })
    .catch((error) => console.error("Error fetching data:", error));
  }

  function removeFromWishlist(wishlist_id) { 
    const formData = new FormData();
    formData.append('wishlist_id', wishlist_id);
    axios.post(baseurl+'/remove-from-wishlist/', formData)
    .then(function (response){
        if(response.data.bool == true){
          alert('item removed from wishlist')
        }
    }).catch(function (error){
      console.error(error)
    })

  }


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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    wishlistItems.map((item, index) => {
                      return  <tr>
                      <td>{index+1}</td>
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
                      {
                        currencyData != 'usd' && <td>Rs.{item.product.price}</td>
                      }
                      {
                        currencyData == 'usd' && <td>${item.product.usd_price}</td>
                      }
                      <td>
                        <button className="btn btn-danger btn-sm" type="button" onClick={() => removeFromWishlist(item.id)}>Remove</button>
                      </td>
                    </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
