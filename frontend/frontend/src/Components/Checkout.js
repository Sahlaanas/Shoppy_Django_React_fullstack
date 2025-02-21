import React from "react";
import { Link } from "react-router-dom";

function Checkout() {
  return (
    <div className="container mt-4">
      <h3 className="mb-4">All Items</h3>
      <div className="row">
        <div className="col-md-8 col-12">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <Link>
                      <img
                        src="/assets/demoImage.png"
                        className="img-thumbnail"
                        alt="....."
                        width="80"
                      />
                      Django
                    </Link>
                  </td>
                  <td>Rs.500</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                    <Link>
                      <img
                        src="/assets/demoImage.png"
                        className="img-thumbnail"
                        alt="....."
                        width="80"
                      />
                      Python
                    </Link>
                  </td>
                  <td>Rs.500</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                    <Link>
                      <img
                        src="/assets/demoImage.png"
                        className="img-thumbnail"
                        alt="....."
                        width="80"
                      />
                      Flask
                    </Link>
                  </td>
                  <td>Rs.500</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                    <Link>
                      <img
                        src="/assets/demoImage.png"
                        className="img-thumbnail"
                        alt="....."
                        width="80"
                      />
                      FastAPI
                    </Link>
                  </td>
                  <td>Rs.500</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                    <Link>
                      <img
                        src="/assets/demoImage.png"
                        className="img-thumbnail"
                        alt="....."
                        width="80"
                      />
                      NumPy
                    </Link>
                  </td>
                  <td>Rs.500</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th>Total</th>
                  <th>Rs. 2500</th>
                </tr>
                <tr>
                    <td colSpan="3" align='right'>
                      <Link to='/categories' className="btn btn-secondary">Continue Shopping</Link>
                      <Link to='/order/success' className="btn btn-success ms-1">Proceed to Payment</Link>
                    </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
