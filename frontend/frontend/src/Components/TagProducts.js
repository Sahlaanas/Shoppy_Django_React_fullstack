import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import SingleProduct from "./SingleProduct";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";

function TagProducts() {
  const [products, setProducts] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const baseurl = "http://127.0.0.1:8000/api";
  const {tag} = useParams();


  useEffect(() => {
    
      fetchData(baseurl+'/products/'+tag);
  },[]);

  const fetchData = (baseurl) => {
    axios
    .get(baseurl)
    .then((response) => {
      setProducts(response.data.results);
      setTotalResult(response.data.count);
    })
    .catch((error) => console.error("Error fetching data:", error));
  }

  const changeUrl = (newurl) => {
      fetchData(newurl)
  }

  var links = [];
  var limit = 1;
  var totalLinks = totalResult / limit;
  for (let i = 1; i <= totalLinks; i++) {
    links.push(
      <li className="page-item">
        <Link
        onClick={() => changeUrl(baseurl+`/products/${tag}/?page=${i}`)}
          to={`/products/${tag}/?page=${i}`}
          className="page-link"
        >
          {i}
        </Link>
      </li>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="me-auto mb-4">All Products</h2>
      <Row className="d-flex justify-content-center flex-wrap">
        {products.map((product) => (
          <SingleProduct product={product} />
        ))}
      </Row>
      <nav aria-label="Page navigation example">
        <ul className="pagination">{links}</ul>
      </nav>
    </Container>
  );
}

export default TagProducts;
