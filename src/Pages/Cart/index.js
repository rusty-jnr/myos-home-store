import React, { useEffect, useState } from "react";
import "./cart.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../Layout";
import Close from "../../assets/images/close.svg";
import EmptyCart from "../../assets/images/empty-cart.svg";
import { setData, setOrder } from "../../redux/app/actions";
import { toast } from "react-toastify";
import { dateFormat, isEmailValid } from "../../helpers";
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [total, setTotal] = useState(0);
  const [email, setEmail] = useState("");
  const { cart } = useSelector((state) => state.app);

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:3006/cart/${id}`);
      const newCartList = cart.filter((cart) => {
        return cart.id !== id;
      });
      dispatch(setData({ cart: newCartList }));
    } catch (err) {
      console.log(err);
    }
  };

  const updateCartItem = async (item, qty) => {
    const request = {
      ...item,
      qty,
    };
    try {
      const res = await axios.put(
        `http://localhost:3006/cart/${item?.id}`,
        request
      );
      const { id } = res.data;
      dispatch(
        setData({
          cart: cart.map((data) => {
            return data.id === id ? { ...res.data } : data;
          }),
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const calculateTotal = () => {
    const allValues = cart?.map((item) => {
      return Number(parseFloat(item?.price * item?.qty).toFixed(2));
    });
    var sum = allValues.reduce(function (a, b) {
      return a + b;
    }, 0);
    setTotal(parseFloat(sum).toFixed(2));
  };

  useEffect(() => {
    calculateTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const emptyCart = async () => {
    const itemIdsArray = cart.map((item) => item.id);
    itemIdsArray.forEach((id) => axios.delete(`http://localhost:3006/cart/${id}`));
    dispatch(setData({ cart: [] }));
  }

  const checkout = async () => {
    if (isEmailValid(email)) {
      const request = {
        id: uuidv4(),
        price: total,
        date: dateFormat(new Date()),
        user: email,
        items: [...cart]
      }
      try{
        const res = await axios.post('http://localhost:3006/orders', request);
        dispatch(setOrder(res.data));
        emptyCart();
        toast.success("Order created successfully");
      }catch(err) {
        console.log(err)
      }
    } else {
      toast.error("Please use a valid email address");
    }
  };

  return (
    <Layout>
      {!cart.length ? (
        <div className="empty_cart">
          <img src={EmptyCart} alt="" />
          <h3>Your shopping cart is empty</h3>
          <button onClick={() => navigate("/")}>Continue Shopping</button>
        </div>
      ) : (
        <div className="cart_box container">
          <h3>
            Shopping Cart<sup>({cart?.length})</sup>
          </h3>
          <div className="cart_info_container">
            <div className="table_container">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Products</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product, i) => (
                    <tr key={i}>
                      <td>
                        <img
                          onClick={() => removeFromCart(product?.id)}
                          src={Close}
                          alt=""
                          className="close"
                        />
                      </td>
                      <td>
                        <div className="product_info">
                          <div className="img">
                            <img src={product?.image_url} alt="" />
                          </div>
                          <div>
                            <h3>{product?.title}</h3>
                            <p>
                              {product?.description?.substring(0, 70) + "..."}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="qty_box">
                          <span
                            className="sub"
                            onClick={() => {
                              product?.qty !== 1 &&
                                updateCartItem(product, product?.qty - 1);
                            }}
                          >
                            -
                          </span>
                          <span className="val">{product?.qty}</span>
                          <span
                            className="add"
                            onClick={() =>
                              updateCartItem(product, product?.qty + 1)
                            }
                          >
                            +
                          </span>
                        </div>
                      </td>
                      <td className="price">
                        ${parseFloat(product?.price * product?.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="checkout_box">
              <h4>Summary</h4>
              <div className="summary_list">
                <p>Subtotal</p>
                <h5>${total}</h5>
              </div>
              <div className="summary_list">
                <p>Shipping</p>
                <h5>Free</h5>
              </div>
              <hr />
              <div className="summary_list">
                <p>Total</p>
                <h5>${total}</h5>
              </div>
              <label>Enter you Email address to checkout !!!</label>
              <div className="proceed_checkout">
                <input
                  type="email"
                  placeholder="Enter email address"
                  onChange={({ target }) => setEmail(target.value)}
                />
                <button disabled={!email} onClick={() => checkout()}>
                  Complete order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Cart;
