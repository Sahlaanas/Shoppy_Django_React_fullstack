import React, { use } from "react";
import Sidebar from "./Sidebar";
import { useState } from "react";

function AddAddress() {
  var customer_id = localStorage.getItem("customer_id");
  const [addressFormData, setAddressFormData] = useState({
    customer: customer_id,
    address: "",
  });

  const inputHandler = (e) => {
    setAddressFormData({
      ...addressFormData,
      [e.target.name]:e.target.value
    })
  }
  console.log(addressFormData);
  
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12">
          <div className="card">
            <h4 className="card-header">Add Address</h4>
            <div className="card-body">
              <div className="mb-3">
                <label for="address" className="form-label">
                  Address
                </label>
                <textarea
                  className="form-control"
                  name="address"
                  value={addressFormData.address}
                  id="address"
                  onChange={inputHandler}
                />
              </div>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
