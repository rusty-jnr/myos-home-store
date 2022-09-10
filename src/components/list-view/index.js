import React, { useState } from "react";
import Pagination from "../pagination";
import "./list.scss";
import SpecialOffer from "../../assets/images/special_offer.svg";
import Chair from "../../assets/images/so_chair.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setData } from "../../redux/app/actions";

const ProductListView = ({ products }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.app);
  const [pageOptions, setPageOptions] = useState({
    currentPage: 1,
    pageSize: 10,
  });
  const { currentPage, pageSize } = pageOptions;

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
      <div className="list">
        <div>
          {products
            .slice(indexOfFirstPost, indexOfLastPost)
            .map((product, i) => (
              <div className="list_product_box" key={i}>
                <div className="img_box">
                  <img src={product?.image_url} alt="" />
                </div>
                <div className="info_box">
                  <p className="title">{product?.title}</p>
                  <span>${product?.price}</span>
                  <p className="description">{product?.description}</p>
                  {!checkCartExistence(product?.id) ? (
                    <button onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      className="remove"
                      onClick={() => removeFromCart(product?.id)}
                    >
                      Remove from Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="special_offer">
          <img src={SpecialOffer} alt="" />
          <p>
            Gently sloping curves and large dual cushions create a favorite
            lounging spot
          </p>
          <img src={Chair} alt="" />
          <button>Shop Now</button>
        </div>
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

export default ProductListView;
