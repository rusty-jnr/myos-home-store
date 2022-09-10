import React, { useState } from "react";
import Pagination from "../pagination";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./grid.scss";
import { setCart, setData } from "../../redux/app/actions";

const ProductGridView = ({ products }) => {
  const dispatch = useDispatch();
  const [pageOptions, setPageOptions] = useState({
    currentPage: 1,
    pageSize: 10,
  });
  const { currentPage, pageSize } = pageOptions;
  const { cart } = useSelector((state) => state.app);

  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;

  const addToCart = async (data) => {
    const request = {
      ...data,
      qty: 1,
    };
    try {
      const res = await axios.post("http://localhost:3006/cart", request);
      dispatch(setCart(res.data));
    } catch (err) {
      console.log(err);
    }
  };

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

  const checkCartExistence = (id) => {
    const foundInCart = cart.find((item) => item.id === id);
    return foundInCart;
  };

  return (
    <>
      <div className="grid">
        {products.slice(indexOfFirstPost, indexOfLastPost).map((product, i) => (
          <div className="product_box" key={i}>
            <div className="img_box">
              <img src={product?.image_url} alt="" />
            </div>
            <p>{product?.title}</p>
            <span>${product?.price}</span>
            {!checkCartExistence(product?.id) ? (
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            ) : (
              <button className="remove" onClick={() => removeFromCart(product?.id)}>
                Remove from Cart
              </button>
            )}
          </div>
        ))}
      </div>
      <Pagination
        current_page={currentPage}
        page_size={pageSize}
        total={products.length}
        changePage={(e) =>
          setPageOptions({
            ...pageOptions,
            currentPage: e,
          })
        }
      />
    </>
  );
};

export default ProductGridView;
