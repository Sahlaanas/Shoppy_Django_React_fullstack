import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom"; 
import axios from "axios";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [baseurl, setBaseurl] = useState('http://127.0.0.1:8000/api/categories/')
  useEffect(() => {
    axios.get(baseurl)
      .then((response) => {
        setCategories(response.data.result);
        setTotalResult(response.data.count);          
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [baseurl]);

  const changeUrl = (newurl) => setBaseurl(`http://127.0.0.1:8000/api${newurl}`);

  var links = [];
  var limit = 1;
  var totalLinks = totalResult/limit;
  for(let i=1; i<= totalLinks; i++) {
    links.push(<li className="page-item"><Link onClick={() => changeUrl(`/categories/?page=${i}`)} to={`/categories/?page=${i}`} className="page-link">{i}</Link></li>)
  }
  return (
    <Container className="mt-4">
      <h2 className="me-auto mb-4">All Categories</h2>
      <Row className="d-flex justify-content-center flex-wrap">
        {
          categories.map((category) => 
            <Col md={3} sm={6} xs={12} className="mb-4">
            <Card style={{ width: "100%" }}>
              <Card.Img
                variant="top"
                src="/assets/demoimage.png"
                width="100%"
                height="250px"
              />
              <Card.Body>
                <Card.Title>
                  {" "}
                  <Link
                    to={`/category/${category.title}/${category.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {category.title}
                  </Link>
                </Card.Title>
                <div>Downloads : {category.total_downloads}</div>
              </Card.Body>
            </Card>
          </Col>
          )
        }
          
      </Row>
      <nav aria-label="Page navigation example">
        <ul className="pagination">{links}</ul>
      </nav>
    </Container>
  );
}

export default Categories;
