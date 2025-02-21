import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import SingleProduct from "./SingleProduct";

function AllProducts() {
  return (
    <Container className="mt-4">
      <h2 className="me-auto mb-4">
       All Products
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

export default AllProducts;
