import React from "react";
import Sidebar from "./Sidebar";

function Profile() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <Sidebar />
        </div>
        <div className="col-md-9 col-12">
          <div className="card">
            <h4 className="card-header">Update Profile</h4>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="firstName" className="form-label">
                    First Name
                  </label>
                  <input type="text" className="form-control" id="firstName" />
                </div>
                <div className="mb-3">
                  <label for="lastName" className="form-label">
                    Last Name
                  </label>
                  <input type="text" className="form-control" id="lastName" />
                </div>
                <div className="mb-3">
                  <label for="username" className="form-label">
                    Username
                  </label>
                  <input type="text" className="form-control" id="username" />
                </div>
                <div className="mb-3">
                  <label for="email" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-control" id="email" />
                </div>

                <div className="mb-3">
                  <label for="formFile" className="form-label">
                    Profile Image
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    accept="image/*"
                  />
                </div>
                {/* <div className="mb-3">
                  <label className="form-label">Select an Image</label>
                  <div className="input-group">
                    <input
                      type="file"
                      class="form-control"
                      id="imageInput"
                      accept="image/*"
                      hidden
                    />
                    <label className="input-group-text " for="imageInput">
                      Browse...
                    </label>
                    <span id="fileName" className="form-control">
                      No file selected
                    </span>
                  </div>
                </div> */}
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

export default Profile;
