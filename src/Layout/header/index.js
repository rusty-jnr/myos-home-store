import React, { useState } from "react";
import "../layout.scss";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import Cart from "../../assets/images/cart.svg";
import { useSelector } from "react-redux";

const Header = () => {
  const { cart, orders } = useSelector((state) => state.app);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="header container">
      <NavLink to="/">
        <img src={Logo} alt="" />
      </NavLink>

      <ul className={showMenu && 'show'}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders">
            Orders <div className="tag">{orders?.length}</div>
          </NavLink>
        </li>
      </ul>

      <div className="cart">
        <NavLink to="/cart">
          <img src={Cart} alt="" />
          <div className="tag">{cart?.length}</div>
        </NavLink>
        <div className="hamburger__menu" onClick={() => setShowMenu(!showMenu)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Header;
