import React, { useEffect, useState } from "react";
import SellerSidebar from "./SellerSidebar";
import axios from "axios";
import Chart from "react-apexcharts";

function DailyReport() {
  const baseurl = "http://127.0.0.1:8000/api";
  const vendor_id = localStorage.getItem("vendor_id");
  const [dates, setDates] = useState([]);
  const [counts, setCounts] = useState([]);

  useEffect(() => {
    fetch_report(`${baseurl}/vendor/${vendor_id}/`);
  }, []);

  function fetch_report(url) {
    axios
      .get(url)
      .then((response) => {
        setDates(response.data.show_chart_daily_orders.dates)
        setCounts(response.data.show_chart_daily_orders.count)
      })
      .catch((error) => console.error("Error fetching data:", error));
  }


  const chartOptions = {
    options:{
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: dates
        }
    },
    series: [
        {
            name: "Orders",
            data: counts
        }
    ]
  }

  const chartElement = <Chart options={chartOptions.options} series={chartOptions.series} type="bar" width="500" />
  
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 col-12 mb-2">
          <SellerSidebar />
        </div>
        <div className="col-md-9 col-12 mb-2">
          <h4> Daily Report </h4>
          <div className="row mt-2">
            {chartElement}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyReport;
