import React from "react";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateAddress() {
  const baseurl = "http://127.0.0.1:8000/api";
  const {address_id} = useParams();
  var customer_id = parseInt(localStorage.getItem("customer_id"));
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [addressFormData, setAddressFormData] = useState({
    customer: customer_id,
    address: "",
  });

  useEffect(() => {
    fetchData(`${baseurl}/address/${address_id}/`);
  }, []);

  const fetchData = (url) => {
    axios
      .get(url)
      .then((response) => {
        console.log(response);
        setAddressFormData({
            'address':response.data.address,
            'customer' : customer_id
        })
        
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
console.log(addressFormData,"==============")
  const inputHandler = (e) => {
    setAddressFormData({
      ...addressFormData,
      [e.target.name]:e.target.value
    })
  }

// In your AddAddress component
const submitHandler = () => {
  const customer_id = parseInt(localStorage.getItem("customer_id"));
  
  if (!customer_id) {
    console.error("Customer ID is missing or invalid:", localStorage.getItem("customer_id"));
    // Show an error message to the user
    return;
  }
  
  const payload = {
    customer: addressFormData.customer,
    address: addressFormData.address,
  };
  
  
  axios.put(baseurl + "/address/"+address_id+'/', payload, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if(response.status!=200){
      setErrorMsg('Data not saved')
      setSuccessMsg('')
    }else{
      setSuccessMsg("Data saved")
      setErrorMsg('');
      

    }
  })
  .catch((error) => {
    console.error("Error saving address:", error.response ? error.response.data : error.message);
  });
};

const disableBtn = (addressFormData.address == '');
  

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12">
          <div className="card">
            <h4 className="card-header">Update Address</h4>
            <div className="card-body">
              {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
              {successMsg && <p className="alert alert-success">{successMsg}</p>}
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
              <button onClick={submitHandler} disabled={disableBtn} type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAddress;
