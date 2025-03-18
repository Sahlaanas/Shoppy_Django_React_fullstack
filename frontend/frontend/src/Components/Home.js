import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { FaHeart, FaStar } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import axios from "axios";
import Testimonial from "./Testimonial";
import SingleSeller from "./Seller/SingleSeller";

function Home() {
  const baseurl = "http://127.0.0.1:8000/api";
  const [products, setProducts] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);

  useEffect(() => {
    fetchData(baseurl + "/products/?fetch_limit=4");
    fetchTestimonialData(baseurl + "/productrating/");
    fetchVendorData(baseurl + "/vendors/?fetch_limit=4");
    fetchPopularProducts(baseurl + "/products/?popular=4");
    fetchPopularCategories(baseurl + "/categories/?popular=4");
  }, []);



  function fetchData(baseurl) {
    axios
      .get(baseurl)
      .then((response) => {

        setProducts(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function fetchTestimonialData(url) {
    axios
      .get(url)
      .then(function (response) {

        setReviewList(response.data.result);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function fetchVendorData(baseurl) {
    axios
      .get(baseurl)
      .then((response) => {

        setVendorList(response.data.result);

      })
      .catch((error) => {
        console.error(error);
      });
  }

  function fetchPopularProducts(baseurl) {
    axios
      .get(baseurl)
      .then((response) => {

        setPopularProducts(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function fetchPopularCategories(baseurl) {
    axios
      .get(baseurl)
      .then((response) => {

        setPopularCategories(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <Container className="mt-4">
        <h2 className="me-auto mb-4">
          Latest Products
          <Link to="/products" className="float-end btn btn-dark m-2">
            View all Products <i className="fa-solid fa-arrow-right-long"></i>
          </Link>
        </h2>
        <Row className="d-flex justify-content-center flex-wrap">
          {products.map((product, index) => (
            <SingleProduct key={index} product={product} />
          ))}
        </Row>
      </Container>
      {/* Popular Categories */}
      <Container className="mt-4">
        <h2 className="me-auto mb-4">
          Popular Categories
          <Link to='/categories' className="float-end btn btn-dark m-2">
            View all Categories <i className="fa-solid fa-arrow-right-long"></i>
          </Link>
        </h2>
        <Row className="d-flex justify-content-center flex-wrap">
          {popularCategories.map((category) => (
            <Col md={3} sm={6} xs={12} className="mb-4">
              <Card style={{ width: "100%" }}>
                <Card.Img
                  variant="top"
                  src="assets/demoimage.png"
                  width="100%"
                  height="250px"
                />
                <Card.Body>
                  <Card.Title>{category.title}</Card.Title>
                  <div>Downloads : {category.total_downloads}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* End */}

      {/* Popular products */}

      <Container className="mt-5">
        <h2 className="me-auto mb-4">
          Popular Products
          <Link to="/products" className="float-end btn btn-dark m-2">
            View all Products <i className="fa-solid fa-arrow-right-long"></i>
          </Link>
        </h2>
        <Row className="d-flex justify-content-center flex-wrap">
          {popularProducts.map((product, index) => (
            <SingleProduct key={index} product={product} />
          ))}
        </Row>
      </Container>
      {/*End */}
      <Container className="mt-4">
        <h2 className="me-auto mb-4">
          Popular Seller
          <Link to="/sellers" className="float-end btn btn-dark m-2">
            View all Sellers <i className="fa-solid fa-arrow-right-long"></i>
          </Link>
        </h2>
        <div className="row mb-4">
        {vendorList && vendorList.map((seller, index) => (
  <SingleSeller key={index} seller={seller} />
))}
        </div>

        {/* Rating and Reviews */}
        <div
          id="carouselExampleIndicators"
          className="carousel slide mt-4 border bg-dark text-white p-5"
        >
          <div className="carousel-indicators">
            {reviewList.map((item, index) => (
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={index}
                className="active"
                aria-current="true"
                aria-label={`Slide ${index + 1} `}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {reviewList.map((item, index) => (
              <Testimonial index={index} item={item} />
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/* End */}
      </Container>
    </div>
  );
}

export default Home;
