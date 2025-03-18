import React, { useState, useEffect } from "react";
import SellerSidebar from "./SellerSidebar";
import axios from "axios";

function AddProduct() {
  const baseurl = "http://127.0.0.1:8000/api";
  const vendor_id = localStorage.getItem("vendor_id");
  const [categoryData, setCategoryData] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [productData, setProductData] = useState({
    vendor: vendor_id,
    category: "",
    title: "",
    detail: "",
    price: "",
    usd_price: "",
    tags: "",
    image: "",
    demo_url: "",
    product_file: "",
  });
  const inputHandler = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandler = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.files[0],
    });
  };

  useEffect(() => {
    axios
      .get(`${baseurl}/categories/`)
      .then((response) => {
        console.log(response);

        setCategoryData(response.data.result);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const submitHandler = () => {
    console.log(productData);
    const formData = new FormData();
    formData.append("vendor", productData.vendor);
    formData.append("category", productData.category);
    formData.append("title", productData.title);
    formData.append("detail", productData.detail);
    formData.append("price", productData.price);
    formData.append("usd_price", productData.usd_price);
    formData.append("tags", productData.tags);
    formData.append("image", productData.image);
    formData.append("demo_url", productData.demo_url);
    formData.append("product_file", productData.product_file);

    axios
      .post(baseurl + "/products/", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(function (response) {
        if (response.data.bool == false) {
          setErrorMsg('invalid data, please try again');
          setSuccessMsg("");
        } else {
          setProductData({
            vendor: "",
            category: "",
            title: "",
            detail: "",
            price: "",
            usd_price: "",
            tags: "",
            image: "",
            demo_url: "",
            product_file: "",
          });
          setErrorMsg("");
          setSuccessMsg('New product added');
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

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
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
              {successMsg && <p className="text-success">{successMsg}</p>}
              <form>
                <div className="mb-3">
                  <label for="category" className="form-label">
                    Category
                  </label>
                  <select
  className="form-control"
  name="category"
  onChange={inputHandler}
  value={productData.category} // Add this line
>
  <option value="">Select a category</option> {/* Add this default option */}
  {categoryData.map((item, index) => {
    return <option value={item.id}>{item.title}</option>
  })}
</select>
                </div>
                <div className="mb-3">
                  <label for="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={productData.title}
                    onChange={inputHandler}
                    className="form-control"
                    id="title"
                  />
                </div>
                <div className="mb-3">
                  <label for="price" className="form-label">
                    INR Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={inputHandler}
                    className="form-control"
                    id="price"
                  />
                </div>
                <div className="mb-3">
                  <label for="usd_price" className="form-label">
                    USD Price
                  </label>
                  <input
                    type="number"
                    name="usd_price"
                    value={productData.usd_price}
                    onChange={inputHandler}
                    className="form-control"
                    id="usd_price"
                  />
                </div>
                <div className="mb-3">
                  <label for="detail" className="form-label">
                    Details
                  </label>
                  <textarea
                    className="form-control"
                    value={productData.detail}
                    onChange={inputHandler}
                    name="detail"
                    rows="8"
                    id="detail"
                  />
                </div>
                <div className="mb-3">
                  <label for="tags" className="form-label">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={productData.tags}
                    onChange={inputHandler}
                    className="form-control"
                    id="tags"
                  />
                </div>
                <div className="mb-3">
                  <label for="demo_url" className="form-label">
                    Demo URL
                  </label>
                  <input
                    type="text"
                    name="demo_url"
                    value={productData.demo_url}
                    onChange={inputHandler}
                    className="form-control"
                    id="demo_url"
                  />
                </div>
                <div className="mb-3">
                  <div className="mb-3">
                    <label for="productImg" className="form-label">
                      Product Images{" "}
                    </label>
                    <input
                      type="file"
                      onChange={fileHandler}
                      name="image"
                      className="form-control"
                      id="productImg"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="mb-3">
                    <label for="product_file" className="form-label">
                      Product File{" "}
                    </label>
                    <input
                      type="file"
                      onChange={fileHandler}
                      name="product_file"
                      className="form-control"
                      id="product_file"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={submitHandler}
                  className="btn btn-primary"
                >
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
