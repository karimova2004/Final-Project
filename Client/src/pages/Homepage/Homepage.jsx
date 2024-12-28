import React from "react";
import { Link } from "react-router-dom";  
import "./Homepage.css";
import Header from "/src/Header/Header";
import CategoryCoins from "../../Category-coins/CategoryCoins";
import Nav from "../../nav/Nav";

const Homepage = () => {
  return (
    <div className="wrapper">
      <Nav />
      <h1>Homepage</h1>
      
      
      <div className="auth-buttons">
        <Link to="/sign-in">
          <button className="auth-button">Sign In</button>
        </Link>
        <Link to="/login">
          <button className="auth-button">Login</button>
        </Link>
      </div>
      <Header />
      <CategoryCoins />
    </div>
  );
};

export default Homepage;
