import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SingleSeller from "./Seller/SingleSeller";

function AllSellers() {
  const baseurl = "http://127.0.0.1:8000/api";
  const [sellers, setSellers] = useState([]);
  const [totalResult, setTotalResult] = useState(0);

  useEffect(() => {
    fetchData(baseurl + "/vendors/");
  }, []);

  function fetchData(baseurl) {
    axios
      .get(baseurl)
      .then((response) => {        
        setSellers(response.data.result); 
        setTotalResult(response.data.count)
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const changeUrl = (newurl) =>
    fetchData(newurl);
  var links = [];
  var limit = 1;
  var totalLinks = totalResult / limit;
  for (let i = 1; i <= totalLinks; i++) {
    links.push(
      <li className="page-item">
        <Link
          onClick={() => changeUrl(`/vendors/?page=${i}`)}
          to={`/vendors/?page=${i}`}
          className="page-link"
        >
          {i}
        </Link>
      </li>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="me-auto mb-4">All Sellers</h2>
      <Row className="d-flex justify-content-center flex-wrap">
        {sellers.map((seller) => (
          <SingleSeller seller={seller} />
        ))}
      </Row>
      <nav aria-label="Page navigation example">
        <ul className="pagination">{links}</ul>
      </nav>
    </Container>
  );
}

export default AllSellers;
