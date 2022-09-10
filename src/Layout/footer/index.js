import React from "react";
import "../layout.scss";
import Logo from "../../assets/images/footer_logo.svg";
import Facebook from "../../assets/images/facebook.svg";
import Google from "../../assets/images/google.svg";
import Instagrm from "../../assets/images/instagram.svg";
import Twitter from "../../assets/images/twitter.svg";
import submitIcon from "../../assets/images/submit.svg";

const Footer = () => {
  return (
    <div className="footer container">
      <div className="topbar">
        <div className="site_info">
          <img src={Logo} alt="" />
          <p>Address: 17 Princess Road, London, Greater London NW1 8JR, UK</p>
          <p>Phone: (800) 8001-8588, (0600) 874 548</p>
          <p>Email: info@gmail.com</p>
          <ul>
            <li>
              <img src={Facebook} alt="" />
            </li>
            <li>
              <img src={Google} alt="" />
            </li>
            <li>
              <img src={Instagrm} alt="" />
            </li>
            <li>
              <img src={Twitter} alt="" />
            </li>
          </ul>
        </div>
        <div className="footer_links">
          <h4>Company</h4>
          <div className="links">
            <ul>
              <li>About Us</li>
              <li>Shop</li>
              <li>Features</li>
              <li>Sale</li>
              <li>Contact</li>
            </ul>
            <ul>
              <li>Shipping</li>
              <li>Help</li>
              <li>Privacy Policy</li>
              <li>FAQs</li>
            </ul>
          </div>
        </div>
        <div className="news_letter">
          <h4>Newsletter</h4>
          <p>
            Sign up for our Newsletter to get more events, promotions & news
            from us!
          </p>
          <div className="newsletter_input">
            <input type="text" placeholder="Enter your email" />
            <button>
              <img src={submitIcon} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="bottom_bar">
        <p>Copyright © All rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
