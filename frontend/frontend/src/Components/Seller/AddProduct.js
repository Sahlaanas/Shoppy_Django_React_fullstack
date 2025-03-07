import React from "react";
import SellerSidebar from "./SellerSidebar";

function AddProduct() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <SellerSidebar />
        </div>
        <div className="col-md-9 col-12">
          <div className="card">
            <h4 className="card-header">Add Product</h4>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="category" className="form-label">
                    Category
                  </label>
                  <select className="form-control">
                        <option>Python</option>
                        <option>Php</option>
                        <option>JavaScript</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    Title
                  </label>
                  <input type="text" className="form-control" id="title" />
                </div>
                <div className="mb-3">
                  <label for="price" className="form-label">
                    Price
                  </label>
                  <input type="number" className="form-control" id="price" />
                </div>
                <div className="mb-3">
                  <label for="description" className="form-label">
                    Description
                  </label>
                  <textarea className="form-control" rows='8' id="description" />
                </div>
                <div className="mb-3">
                  <div className="mb-3">
                    <label for="productImg" className="form-label">
                      Product Images{" "}
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="productImg"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
