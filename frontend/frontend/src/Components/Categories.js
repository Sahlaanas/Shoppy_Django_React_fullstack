import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <Container className="mt-4">
      <h2 className="me-auto mb-4">All Categories</h2>
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
                <Card.Title>
                  {" "}
                  <Link
                    to="/category/python/1"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Category Title
                  </Link>
                </Card.Title>
                <div>Downloads : 54875</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
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

export default Categories;
