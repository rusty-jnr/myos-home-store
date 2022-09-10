import React, { useEffect } from "react";
import Footer from "./footer";
import Header from "./header";
import axios from 'axios';
import { useDispatch } from "react-redux";
import "./layout.scss";
import { setData } from "../redux/app/actions";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCart();
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:3006/cart');
      dispatch(setData({cart: res.data}))
    }catch(err) {
      console.log(err);
    }
  }

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:3006/orders');
      dispatch(setData({orders: res.data}))
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="layout__container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
