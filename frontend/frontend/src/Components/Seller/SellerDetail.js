import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleProduct from "../SingleProduct";

function SellerDetail() {
  const baseurl = "http://127.0.0.1:8000/api";
  const [productList, setProductList] = useState([]);
  const [vendorList, setVendorList] = useState(null);
  const [loading, setLoading] = useState(true);
  const { seller_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsResponse = await axios.get(`${baseurl}/vendor-products/${seller_id}/`);
        const vendorResponse = await axios.get(`${baseurl}/vendor/${seller_id}/`);
        
        setProductList(productsResponse.data.result);
        setVendorList(vendorResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [seller_id]);

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  return (
    <section className="container mt-4">
      {vendorList && (
        <div className="row mb-4">
          <div className="col-3">
            <img
              src={vendorList.profile_img}
              className="card-img-top"
              alt="Vendor profile"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150";
                e.target.alt = "Placeholder image";
              }}
            />
          </div>
          <div className="col-9">
            {vendorList.user && (
                <>
              <h3>{vendorList.user.first_name} {vendorList.user.last_name}</h3>
              <p>Total Products : {vendorList.total_products}</p>
              </>
            )}
          </div>
        </div>
      )}
      <div className="row">
        {productList.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default SellerDetail;