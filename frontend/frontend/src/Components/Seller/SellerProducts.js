import React, {useEffect, useState} from "react";
import SellerSidebar from "./SellerSidebar";
import { Link } from "react-router-dom";
import axios from 'axios';

function SellerProducts() {
  const baseurl = "http://127.0.0.1:8000/api";
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetchData(`${baseurl}/products/`)
  }, []);

  function fetchData(url) {
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.results)

      }) 
      .catch((error) => console.error("Error fetching data:", error));
  }

  function showConfirm(product_id) {
    var _confirm = window.confirm('Are you sure to delete this product?');
    if(_confirm){
      fetch(baseurl+'/product/'+product_id+'/',{
        method:'DELETE'
      })
      .then((response) => {
        if(response.status==204){
          fetchData(`${baseurl}/products/`)
        }
      })

    }    
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <SellerSidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <td colSpan="5" align="right">
                    <Link to="/seller/add-product" className="btn btn-primary mb-2">
                      <i className="fa fa-plus-circle"></i> Add Product
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>USD Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((item, index) => {
                    return                 <tr>
                    <td>{index+1}</td>
                    <td><Link to={`/seller/update-product/${item.id}`}>{item.title}</Link></td>
                    <td>Rs {item.price}</td>
                    <td>$ {item.usd_price}</td>
                    <td>
                    {
                      !item.publish_status && 'pending'
                    }
                    {
                      item.publish_status && <span className='text-success'>Published</span>
                    }
                    </td>
                    <td>
                      <Link to={`/seller/update-product/${item.id}`} className="btn btn-primary btn-sm ms-1">
                        Edit
                      </Link>
                      <Link to='' onClick={() => showConfirm(item.id)} className="btn btn-danger btn-sm ms-1">
                        Delete
                      </Link>
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
  );
}

export default SellerProducts;
