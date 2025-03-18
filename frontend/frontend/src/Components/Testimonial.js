import React from "react";

function Testimonial(props) {
  const { index, item } = props;

  // Use === for comparison and convert string to number if needed
  const isActive = index === 0 || index === "0";
  const activeClass = isActive ? "active" : "";
  
  // Generate star components properly
  const stars = [];
  for (let i = 0; i < item.rating; i++) {
    stars.push(<i key={i} className="fa fa-star text-warning"></i>);
  }

  return (
    <div className={`carousel-item ${activeClass}`}>
      <figure className="text-center">
        <blockquote className="blockquote">
          <p>{item.review}</p> 
        </blockquote>
        <figcaption className="blockquote-footer">
          {stars}
          <cite title="Source Title">{item.customer.user.username}</cite>
        </figcaption>
      </figure>
    </div>
  );
}

export default Testimonial;