import React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import SingleProduct from "./SingleProduct";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CategoryProducts() {
  const [products, setProducts] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const { category_slug, category_id } = useParams();
  const query = useQuery();
  const page = query.get("page") || 1; // Get page from URL, default to 1

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/products/?category=${category_id}&page=${page}`
      )
      .then((response) => {
        setProducts(response.data.results);
        setTotalResult(response.data.count);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [category_id, page]); // Dependency array includes page

  const limit = 1; // Change as per API pagination settings
  const totalPages = Math.ceil(totalResult / limit);
  const links = [];

  for (let i = 1; i <= totalPages; i++) {
    links.push(
      <li className="page-item" key={i}>
        <Link
          to={`/category/${category_slug}/${category_id}/?page=${i}`}
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
          <SingleProduct key={product.id} product={product} />
        ))}
      </Row>
      <nav aria-label="Page navigation example">
        <ul className="pagination">{links}</ul>
      </nav>
    </Container>
  );
}

export default CategoryProducts;
