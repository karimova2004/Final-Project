import React from 'react'
import "../AdminPanel/EditCard.css"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCoinById, removeCoinInListById} from '../redux/coinsSlice';
const EditCard = ({data}) => {
    const dispatch = useDispatch();
    const navigate =useNavigate()
    const handleEdit = ()=>{
        navigate(`/AdminPanel/edit/${data.CoinName}`);
    }
    const handleDelete = ()=>{
        dispatch(deleteCoinById(data.coinId));
        dispatch(removeCoinInListById(data.coinId));
    }
  return (
    <>
      <div className="edit-card">
      <div className="image">
        <img src={`../Coins_images/${data.CoinName}_1.png`} alt="" />
      </div>
      <div className="info">
      <Link className='link' to={`/categories/${data.CategoryId}/${data.CoinName}`}>{data.CoinName}</Link>
      <hr />
      <p>{data.CoinAbout}</p>
      </div>
      <div className="edit-and-delete-button">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
    </>
  )
}

export default EditCard
