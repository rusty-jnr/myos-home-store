import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../Layout";
import "./home.scss";
import GridView from "../../assets/images/grid.svg";
import ListView from "../../assets/images/list.svg";
import ProductGridView from "../../components/grid-view";
import ProductListView from "../../components/list-view";

import { useSelector, useDispatch } from "react-redux";
import { setAvailableProducts } from "../../redux/app/actions";

const Home = () => {
  const dispatch = useDispatch();
  const [gridView, setGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const { products } = useSelector((state) => state.app);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3006/products");
      dispatch(setAvailableProducts(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (products.length) {
      var filteredProducts = [];
      products.forEach((product) => {
        if (
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          filteredProducts.push(product);
        }
      });
      setFilteredList(filteredProducts);
    }
  }, [searchTerm, products]);

  return (
    <Layout>
      <div className="banner">
        <h1>Living Room</h1>
        <p>
          Shop our newest items, made with love by the world’s best artisans.
        </p>
      </div>
      <div className="product_container container">
        <div className="top_bar">
          <input
            type="search"
            placeholder="Search product by name or description..."
            value={searchTerm}
            onChange={({ target: { value } }) => setSearchTerm(value)}
          />
          <div className="product_view">
            <img
              src={GridView}
              className={`${gridView && "active"}`}
              onClick={() => setGridView(true)}
              alt=""
            />
            <img
              src={ListView}
              className={`${!gridView && "active"}`}
              onClick={() => setGridView(false)}
              alt=""
            />
          </div>
        </div>
        {gridView ? (
          <ProductGridView products={filteredList} />
        ) : (
          <ProductListView products={filteredList} />
        )}
      </div>
    </Layout>
  );
};

export default Home;
