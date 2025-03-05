import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CurrencyContext } from "../../Context";

function OrderRow(props) {
  const index = props.index;
  const item = props.item;
  const baseApiurl = "http://127.0.0.1:8000/api";
  const baseurl = "http://127.0.0.1:8000";
  const [totalDownloads, setTotalDownloads] = useState(item.product.downloads);
  const {currencyData} = useContext(CurrencyContext);

  const countDownloads =(product_id) => {
    const formData = new FormData();
    formData.append("product_id", product_id);

    axios
      .post(`${baseApiurl}/update-download-count/${product_id}/`)
      .then(function (response) {
            setTotalDownloads(++item.product.downloads);
            window.open(`${baseurl}/${item.product.product_file}`, '_blank');
            
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <tr className="text-center">
      <td>{index}</td>
      <td>
        <Link to={`/product/${item.product.slug}/${item.product.id}`}>
          <img
            src={`${baseurl}/${item.product.image}`}
            className="img-thumbnail"
            alt="....."
            width="80"
          />
          <p>{item.product.title}</p>
        </Link>
      </td>
      {
            currencyData == 'usd' &&  <td>$ {item.product.usd_price}</td>
      }
      {
            currencyData != 'usd' &&  <td>Rs. {item.product.price}</td>
      }
      
      <td>
        <span>
          {item.order.order_status == true && (
            <i className="fa fa-check-circle text-success"></i>
          )}
          {item.order.order_status == false && (
            <i className="fa fa-spinner fa-spin text-dark"></i>
          )}
        </span>
      </td>
      <td>
        {item.order.order_status == true && (
          <button
            onClick={() =>
              countDownloads(item.product.id)
            }
            className="btn btn-primary btn-sm"
          >
            {" "}
            Download{" "}
            <span className="badge text-dark bg-white">
              {totalDownloads}
            </span>
          </button>
        )}
      </td>
    </tr>
  );
}

export default OrderRow;
