import React from "react";
import "./Card.css";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCoinsByCategoryId } from "../redux/coinsSlice";
const Card = ({ text }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="card">
        <h3>{text.name}</h3>
        <Link to={`/categories/${text.id}`}>Show all </Link>
        <div className="image">
          <img src={`./Coins_images/${text.img}_1.png`} alt="" />
        </div>
      </div>
    </>
  );
};

export default Card;