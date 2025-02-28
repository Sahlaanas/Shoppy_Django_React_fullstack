import React, { useState } from "react";
import axios from "axios";

function Register() {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [registerFormData, setRegisterFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    mobile : "",
    password: "",
  });
  const [formError, setFormError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState('');

  const inputHandler = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    const formData = new FormData();
    formData.append("first_name", registerFormData.first_name);
    formData.append("last_name", registerFormData.last_name);
    formData.append("username", registerFormData.username);
    formData.append("email", registerFormData.email);
    formData.append("mobile", registerFormData.mobile);
    formData.append("password", registerFormData.password);
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // };

    axios
      .post(baseUrl + "/customer/register/", formData)
      .then(function (response) {
        console.log(response);

        if (response.data.bool === false) {
          setFormError(true);
          setErrorMsg(response.data.msg);
          setSuccessMsg('')
        } else {
          setRegisterFormData({
            'first_name': '',
            'last_name': '',
            'username': '',
            'email': '',
            'mobile': '',
            'password': '',
          });
          setErrorMsg('');
          setSuccessMsg(response.data.msg)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const buttonEnable =
  (registerFormData.username !== "") && (registerFormData.password !== "") && (registerFormData.email !== "");

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 col-12 offset-2">
          <div className="card">
            <h4 className="card-header">Register</h4>
            <div className="card-body">
            <p className="text-danger">*All fields are required</p>
            {successMsg && <p>{successMsg}</p>}
            {errorMsg && <p className="text-danger">{errorMsg}</p>}
              <form>
                <div className="mb-3">
                  <label for="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    className="form-control"
                    id="firstName"
                    value={registerFormData.first_name}
                    onChange={inputHandler}
                  />
                </div>
                <div className="mb-3">
                  <label for="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    className="form-control"
                    id="lastName"
                    value={registerFormData.last_name}
                    onChange={inputHandler}
                  />
                </div>
                <div className="mb-3">
                  <label for="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    value={registerFormData.username}
                    onChange={inputHandler}
                  />
                </div>
                <div className="mb-3">
                  <label for="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    value={registerFormData.email}
                    onChange={inputHandler}
                  />
                </div>
                <div className="mb-3">
                  <label for="mobile" className="form-label">
                    Mobile 
                  </label>
                  <input
                    type="number"
                    name="mobile"
                    className="form-control"
                    id="mobile"
                    value={registerFormData.mobile}
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
                    value={registerFormData.password}
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

export default Register;
