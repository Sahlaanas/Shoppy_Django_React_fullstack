import React, { useEffect, useState } from "react";
import SellerSidebar from "./SellerSidebar";
import axios from "axios";

function SellerProfile() {
  const baseurl = "http://127.0.0.1:8000/api";
  const vendor_id = localStorage.getItem("vendor_id");
  const [profileData, setProfileData] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    mobile: "",
    address: "",
    p_image: "",
  });

  useEffect(() => {
    fetchData(baseurl + "/vendor/" + vendor_id);
  }, []);

  const fetchData = (url) => {
    axios
      .get(url)
      .then((response) => {

        setProfileData({
          user_id: response.data.user.id,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          username: response.data.user.username,
          email: response.data.user.email,
          mobile: response.data.mobile,
          address: response.data.address,
          p_image: response.data.profile_img,
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const inputHandler = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // Handle image selection and preview
  const handleFileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.files[0],
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user", profileData.user_id);
    formData.append("mobile", profileData.mobile);
    formData.append("address", profileData.address);
    formData.append("profile_img", profileData.p_image);

    axios
      .put(`${baseurl}/vendor/${vendor_id}/`, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });

    const formUserData = new FormData();
    formUserData.append("first_name", profileData.first_name);
    formUserData.append("last_name", profileData.last_name);
    formUserData.append("username", profileData.username);
    formUserData.append("email", profileData.email);

    axios
      .put(`${baseurl}/user/${profileData.user_id}/`, formUserData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response, "=============");
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
          <h3 className="mb-3">Welcome {profileData.username}</h3>
          <div className="card">
            <h4 className="card-header">Update Profile</h4>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={profileData.first_name}
                    onChange={inputHandler}
                    className="form-control"
                    id="firstName"
                  />
                </div>

                <div className="mb-3">
                  <label for="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={profileData.last_name}
                    onChange={inputHandler}
                    className="form-control"
                    id="lastName"
                  />
                </div>

                <div className="mb-3">
                  <label for="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={inputHandler}
                    className="form-control"
                    id="username"
                  />
                </div>

                <div className="mb-3">
                  <label for="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={inputHandler}
                    className="form-control"
                    id="email"
                  />
                </div>

                <div className="mb-3">
                  <label for="mobile" className="form-label">
                    Mobile
                  </label>
                  <input
                    type="number"
                    name="mobile"
                    value={profileData.mobile}
                    onChange={inputHandler}
                    className="form-control"
                    id="mobile"
                  />
                </div>
                <div className="mb-3">
                  <label for="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={inputHandler}
                    className="form-control"
                    id="address"
                  />
                </div>

                <div className="mb-3">
                  <div className="mb-3">
                    <p>
                      <img
                        src={profileData.p_image}
                        width="100"
                        className="mt-2 rounded"
                      />
                    </p>
                    <label for="profileImg" className="form-label">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      name="p_image"
                      onChange={handleFileChange}
                      className="form-control"
                      id="profileImg"
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

export default SellerProfile;
