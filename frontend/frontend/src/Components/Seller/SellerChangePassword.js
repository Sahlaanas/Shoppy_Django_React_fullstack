import React from 'react'
import SellerSidebar from './SellerSidebar'

function SellerChangePassword() {
  return (
      <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <SellerSidebar />
        </div>
        <div className="col-md-9 col-12 ">
          <div className="card">
            <h4 className="card-header">Change Password</h4>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label for="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
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
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerChangePassword