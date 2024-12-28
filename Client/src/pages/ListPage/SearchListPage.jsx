import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCoinsByCategoryId, getCoinsByInputRequest } from "../../redux/coinsSlice";
import ResultCard from "../../ResultCard/ResultCard";
import "../ListPage/SearchListPage.css";
import Header from "../../Header/Header";

const SearchListPage = () => {
  const { coins } = useSelector((store) => store.coins);
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);
  useEffect(() => {
    id ==+id? dispatch(getCoinsByCategoryId(id)): dispatch(getCoinsByInputRequest(id))
  }, [id]);
  return (
    <>
      <h1>List of the coins</h1>
      <Header />
      <div className="search-list-page">
        {coins.length !== 0 ? (
          coins.map((coin) => {
            return <ResultCard key={coin.coinId} data={coin} />;
          })
        ) : (
          <p>Nəticə tapılmadı...</p>
        )}
      </div>
    </>
  );
};

export default SearchListPage;
