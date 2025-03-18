import React, { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

function ChangePassword() {
  const baseurl = "http://127.0.0.1:8000/api";
  const customer_id = localStorage.getItem("customer_id");
  const [passwordData, setPasswordData] = useState({
    password: "",
    c_password: "",
  });

  const [confirmError, setConfirmError] = useState(false);

  const inputHandler = (e) => {
    const newPasswordData = {
      ...passwordData,
      [e.target.name]: e.target.value,
    };
    setPasswordData(newPasswordData);

    // Compare the new values, not the old state
    if (e.target.name === "c_password") {
      setConfirmError(newPasswordData.password !== e.target.value);
    } else if (e.target.name === "password") {
      setConfirmError(e.target.value !== newPasswordData.c_password);
    }
  };

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("password", passwordData.password);

    axios
      .post(`${baseurl}/customer-change-password/${customer_id}/`, formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar /> 
        </div>
        <div className="col-md-9 col-12 ">
          <div className="card">
            <h4 className="card-header">Change Password</h4>
            <div className="card-body">
            {confirmError && (
                <p className="text-danger">Password does not match</p>
              )}

                <div className="mb-3">
                  <label for="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                       onChange={inputHandler}
                  name="password"
                    type="password"
                    className="form-control"
                    id="newPassword"
                  />
                </div>
                <div className="mb-3">
                  <label for="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                       onChange={inputHandler}
                  name="c_password"
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                  />
                </div>
                <button onClick={submitHandler} type="button" className="btn btn-primary">
                  Submit
                </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
