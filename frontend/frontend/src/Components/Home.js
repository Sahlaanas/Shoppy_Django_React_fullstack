import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { FaHeart, FaStar } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";

function Home() {
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
          <SingleProduct title="Django Project 1"/>
          <SingleProduct title="Django Project 2" />
          <SingleProduct title="Django Project 3"/>
          <SingleProduct title="Django Project 4"/>
          <SingleProduct title="Django Project 5"/>
        </Row>
      </Container>
      {/* Popular Categories */}
      <Container className="mt-4">
        <h2 className="me-auto mb-4">
          Popular Categories
          <a href="#" className="float-end btn btn-dark m-2">
            View all Categories <i className="fa-solid fa-arrow-right-long"></i>
          </a>
        </h2>
        <Row className="d-flex justify-content-center flex-wrap">
          {[1, 2, 3, 4].map((_, index) => (
            <Col key={index} md={3} sm={6} xs={12} className="mb-4">
              <Card style={{ width: "100%" }}>
                <Card.Img
                  variant="top"
                  src="assets/demoimage.png"
                  width="100%"
                  height="250px"
                />
                <Card.Body>
                  <Card.Title>Category Title</Card.Title>
                  <div>Downloads : 54875</div>
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
          <a href="#" className="float-end btn btn-dark m-2">
            View all Products <i className="fa-solid fa-arrow-right-long"></i>
          </a>
        </h2>
        <Row className="d-flex justify-content-center flex-wrap">
          {[1, 2, 3, 4].map((_, index) => (
            <Col key={index} md={3} sm={6} xs={12} className="mb-4">
              <Card style={{ width: "100%" }}>
                <Card.Img
                  variant="top"
                  src="assets/demoimage.png"
                  width="100%"
                  height="250px"
                />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    $99.99
                  </Card.Subtitle>

                  {/* Rating & Add to Cart Section */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    {/* Rating (Left) */}
                    <div
                      style={{
                        color: "gold",
                        fontSize: "1rem",
                        display: "flex",
                        flexGrow: 1, // Ensures it takes up available space
                      }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>

                    {/* Buttons (Right) */}
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button
                        variant=""
                        size="sm"
                        style={{
                          borderRadius: "15px",
                          border: "1px solid #000",
                        }}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        style={{ borderRadius: "15px" }}
                      >
                        <FaHeart style={{ color: "red" }} />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/*End */}
      <Container className="mt-4">
        <h2 className="me-auto mb-4">
          Popular Seller
          <a href="#" className="float-end btn btn-dark m-2">
            View all Sellers <i className="fa-solid fa-arrow-right-long"></i>
          </a>
        </h2>
        <Row className="d-flex justify-content-center flex-wrap">
          {[1, 2, 3, 4].map((_, index) => (
            <Col key={index} md={3} sm={6} xs={12} className="mb-4">
              <Card style={{ width: "100%" }}>
                <Card.Img
                  variant="top"
                  src="assets/demoimage.png"
                  width="100%"
                  height="250px"
                />
                <Card.Body>
                  <Card.Title>Seller Title</Card.Title>
                  <div>
                    Categories : <a href="#">Python </a>,<a href="#"> JS</a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {/* Rating and Reviews */}
        <div
          id="carouselExampleIndicators"
          className="carousel slide mt-4 border bg-dark text-white p-5"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <cite title="Source Title"> Customer Name</cite>
                </figcaption>
              </figure>
            </div>
            <div className="carousel-item">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <cite title="Source Title"> Customer Name</cite>
                </figcaption>
              </figure>
            </div>
            <div className="carousel-item">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p>A well-known quote, contained in a blockquote element.</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <i className="fa fa-star text-warning"></i>
                  <cite title="Source Title"> Customer Name</cite>
                </figcaption>
              </figure>
            </div>
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
