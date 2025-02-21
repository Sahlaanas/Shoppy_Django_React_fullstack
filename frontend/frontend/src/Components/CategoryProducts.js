import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { FaHeart, FaStar } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import SingleProduct from "./SingleProduct";

function CategoryProducts() {
  return (
    <Container className="mt-4">
      <h2 className="me-auto mb-4">
        <span className="text-success">Python </span>Products
      </h2>
      <Row className="d-flex justify-content-center flex-wrap">
        <SingleProduct title="Django Project" />
        <SingleProduct title="ReactJS Project" />
        <SingleProduct title="VueJS Project" />
        <SingleProduct title="Machine Learning Project" />
        <SingleProduct title="Flask Project" />
      </Row>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </Container>
  );
}

export default CategoryProducts;
