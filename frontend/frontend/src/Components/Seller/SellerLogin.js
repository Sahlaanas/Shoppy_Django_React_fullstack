import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SellerLogin() {
  const baseUrl = "http://127.0.0.1:8000/api";
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    'username': '',
    'password': ''
  })
  const [errorMsg, setErrorsMsg] = useState('')

  const inputHandler = (e) =>{
    setLoginFormData({
      ...loginFormData,
      [e.target.name]:e.target.value
    })
  }

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.append("username", loginFormData.username);
    formData.append("password", loginFormData.password);

    axios
    .post(baseUrl + "/vendor/login/", formData)
    .then(function (response) {

      if (response.data.bool === false) {
        setErrorsMsg(response.data.msg);
        
      } else {
        localStorage.setItem("vendor_id", response.data.vendor_id)
        localStorage.setItem("vendor_login", true);
        localStorage.setItem("vendor_username", response.data.user);
        setErrorsMsg("");
        window.location.href = "/seller/dashboard";

      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  // const checkVendor = localStorage.getItem('vendor_login');
  // if (checkVendor){
  //   navigate('/seller/dashboard')
  // }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <h4 className="card-header">Login</h4>
            <div className="card-body">
              {errorMsg && <p className="text-danger">{errorMsg}</p>}
              <form>
                <div className="mb-3">
                  <label for="username" className="form-label">
                    Username
                  </label>
                  <input onChange={inputHandler} value={loginFormData.username} type="text" className="form-control" name="username" id="username" />
                </div>
                <div className="mb-3">
                  <label for="password" className="form-label">
                    Password
                  </label>
                  <input
                  onChange={inputHandler}
                  value={loginFormData.password}
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                  />
                </div>
                <button onClick={submitHandler} type="button" className="btn btn-primary">
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

export default SellerLogin;
