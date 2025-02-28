import React from "react";
import SellerSidebar from "./SellerSidebar";
import { Link } from "react-router-dom";

function SellerProducts() {
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
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Product Title</td>
                  <td>500</td>
                  <td>Published</td>
                  <td>
                    <a href=" " className="btn btn-info btn-sm">
                      View
                    </a>
                    <a href=" " className="btn btn-primary btn-sm ms-1">
                      Edit
                    </a>
                    <a href=" " className="btn btn-danger btn-sm ms-1">
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProducts;
