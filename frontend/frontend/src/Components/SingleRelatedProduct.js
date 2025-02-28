import React from 'react'
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { FaHeart, FaStar } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';


function SingleRelatedProduct(props) {
  return (
    <Col  className="col-4 offset-4 mb-4">
            <Card style={{ width: "100%" }}>
                <Link to="">
                <Card.Img
                variant="top"
                src={props.product.image}
                width="100%"
                height="250px"
              />
             </Link>
              <Card.Body>
              <Link to={`/product/${props.product.title}/${props.product.id}`}>
                <Card.Title>{props.product.title}</Card.Title>
                </Link>
                <Card.Subtitle className="mb-2 text-muted">
                  Rs. {props.product.price}
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
  )
}

export default SingleRelatedProduct