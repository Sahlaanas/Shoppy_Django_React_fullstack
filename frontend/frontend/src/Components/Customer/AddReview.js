import React, { useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddReview() {
  const baseurl = "http://127.0.0.1:8000/api";
  const customer_id = localStorage.getItem("customer_id");
  const { product_id } = useParams();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [reviewFormData, setReviewFormData] = useState({
    review: "",
    rating: 1,
  });

  const inputHandler = (e) => {
    setReviewFormData({
      ...reviewFormData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("review", reviewFormData.review);
    formData.append("rating", reviewFormData.rating);
    formData.append("customer", customer_id);
    formData.append("product", product_id);

    axios
      .post(`${baseurl}/productrating/`, formData, {
        headers: {  'Content-Type': 'multipart/form-data' }
      })
      .then(function (response) {
        console.log(response);
        if(response.status!=201){
            setErrorMsg('Data not saved');
            setSuccessMsg('');
        }else{
            setErrorMsg('');
            setSuccessMsg('Data saved');
            setReviewFormData({
                'review' : '',
                'rating' : ''
            })
        }
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
            <h4 className="card-header">Add Review</h4>
            <div className="card-body">
                {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}
                {successMsg && <p className="alert alert-success">{successMsg}</p>}
              <div className="mb-3">
                <label for="review" className="form-label">
                  Review
                </label>
                <textarea
                  onChange={inputHandler}
                  name="review"
                  value={reviewFormData.review}
                  className="form-control"
                  id="review"
                />
              </div>
              <div className="mb-3">
                <label for="rating" className="form-label">
                  Rating
                </label>
                 <select className="form-control" name="rating" onChange={inputHandler}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                 </select>
              </div>
              <button
                onClick={submitHandler}
                type="button"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReview;
