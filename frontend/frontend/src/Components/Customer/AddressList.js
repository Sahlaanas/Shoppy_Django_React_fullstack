import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

function AddressList() {
  const baseurl = "http://127.0.0.1:8000/api";
  var customer_id = localStorage.getItem("customer_id");
  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${baseurl}/customer/${customer_id}/address-list`)
      .then((response) => {
        // Keep the addresses in their original order from the API
        setAddressList(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  function defaultAddressHandler(address_id) {
    setLoading(true);
    const formData = new FormData();
    formData.append("address_id", address_id);
  
    axios.post(baseurl + "/mark-default-address/" + address_id + "/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Response:", response.data);
      
      // Update the local state to reflect the change immediately
      // This preserves the original order while updating the default status
      setAddressList(prevList => 
        prevList.map(address => ({
          ...address,
          default_address: address.id === address_id ? true : false
        }))
      );
      
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error:", error.response ? error.response.data : error.message);
      setLoading(false);
    });
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <div className="row">
            <div className="col-12">
              <Link
                to="/customer/add-address"
                className="btn btn-outline-success mb-4 float-end"
              >
                <i className="fa fa-plus-circle"></i> Add Address
              </Link>
            </div>
          </div>

         

          <div className="row">
            {addressList.map((item, index) => (
              <div className="col-4 mb-4" key={item.id}>
                <div className="card">
                  <div className="card-body text-muted">
                    <h6>
                      {item.default_address ? (
                        <span>
                          <i className="fa fa-check-circle text-success mb-2"></i>
                          <br />
                        </span>
                      ) : (
                        <span 
                          role="button" 
                          onClick={() => defaultAddressHandler(item.id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <i className="far fa-check-circle text-secondary mb-2"></i>
                          <br />
                        </span>
                      )}
                      
                      <Link to={`/customer/update-address/${item.id}`} style={{ textDecoration: 'none' }}>
                        {item.address}
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressList;