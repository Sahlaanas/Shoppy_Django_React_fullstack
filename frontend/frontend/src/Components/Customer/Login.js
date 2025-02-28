import React, { useState } from "react";
import axios from "axios";

function Login() {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [loginFormData, setLoginFormData] = useState({
    "username": '',
    "password": '',
  });
  const [formError, setFormError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const inputHandler = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.append("username", loginFormData.username);
    formData.append("password", loginFormData.password);
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // };

    axios
      .post(baseUrl + "/customer/login/", formData)
      .then(function (response) {
        console.log(response,"===========response");

        if (response.data.bool === false) {
          setFormError(true);
          setErrorMsg(response.data.msg);
        } else {
          localStorage.setItem("customer_id", response.data.customer_id)
          localStorage.setItem("customer_login", true);
          localStorage.setItem("customer_username", response.data.user);
          setFormError(false);
          setErrorMsg("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const checkCustomer = localStorage.getItem("customer_login");
  if (checkCustomer) {
    window.location.href = "/customer/dashboard";
  }

  const buttonEnable =
    (loginFormData.username !== "") && (loginFormData.password !== "");

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <h4 className="card-header">Login</h4>
            <div className="card-body">
              {formError && <p className="text-danger">{errorMsg}</p>}
              <form>
                <div className="mb-3">
                  <label for="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    value={loginFormData.username}
                    onChange={inputHandler}
                  />
                </div>
                <div className="mb-3">
                  <label for="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    value={loginFormData.password}
                    onChange={inputHandler}
                  />
                </div>
                <button
                  type="button"
                  disabled={!buttonEnable}
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

export default Login;
