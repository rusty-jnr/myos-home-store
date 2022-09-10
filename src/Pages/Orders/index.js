import React, { useState } from "react";
import "./order.scss";
import Layout from "../../Layout";
// import axios from "axios";
import EmptyCart from "../../assets/images/empty-cart.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Order = () => {
  let navigate = useNavigate();
  const { orders } = useSelector((state) => state.app);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleExpandRow = (key) => {
    if (key === expandedRow) {
      setExpandedRow(null);
    } else {
      setExpandedRow(key);
    }
  };

  return (
    <Layout>
      {!orders.length ? (
        <div className="empty_cart">
          <img src={EmptyCart} alt="" />
          <h3>You have no Order available</h3>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
        </div>
      ) : (
        <div className="order_box container">
          <h3>
            Orders<sup>({orders?.length})</sup>
          </h3>
          <div className="order_info_container">
            <div className="table_container">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Order No.</th>
                    <th>Date Created</th>
                    <th>User</th>
                    <th>Price</th>
                    <th>Number of Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order, i) => (
                    <>
                      <tr key={i} onClick={() => handleExpandRow(i)}>
                        <td>
                          <i
                            className={
                              expandedRow === i
                                ? `icon-up-open`
                                : `icon-down-open`
                            }
                          />
                        </td>
                        <td>Order {i + 1}</td>
                        <td>{order?.date}</td>
                        <td>{order?.user}</td>
                        <td>
                          <strong>${order?.price}</strong>
                        </td>
                        <td>{order?.items?.length}</td>
                      </tr>
                      {expandedRow === i && (
                        <tr className="expanded">
                          <td colSpan={6}>
                            <div className="moreInfo">
                              {order?.items.map((item) => (
                                <div className="product_info">
                                  <div className="img">
                                    <img src={item?.image_url} alt="" />
                                  </div>
                                  <div className="item_details">
                                    <h3>{item?.title}</h3>
                                    <p>
                                      {item?.description?.substring(0, 70) +
                                        "..."}
                                    </p>
                                    <p>
                                      <strong>Qty:</strong>
                                      {item?.qty}
                                    </p>
                                    <p>
                                      <strong>Price:</strong>$
                                      {parseFloat(
                                        item?.price * item?.qty
                                      ).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Order;
