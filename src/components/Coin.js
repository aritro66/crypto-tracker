import React from 'react';
import { Link } from "react-router-dom";
import './Coin.css';


export default function Coin({id, name, symbol, image, price, marketcap, volume, priceChange, index, page}) {
  return <div className='coin'>
  <div className="coin-sno">{`${(page-1)*100+1+index}.`}</div>
  <Link to={`/home/${id}`} title='Click to know more'><img src={image} alt={name} className='coin-image'/></Link>
  <Link to={`/home/${id}`} className='coin-name' title='Click to know more'>{name}</Link>
  <div className='coin-symbol'>{symbol.toUpperCase()}</div>
  <div className='coin-price'>{'$'+price}</div>
  <div className='coin-volume'>{'$'+volume}</div>
  <div className='coin-marketcap'>{'$'+marketcap}</div>
  <div className='coin-pricechange' style={{color:`${priceChange<0?"red":"#40ff00"}`}}>{priceChange+"%"}</div>
  </div>;
}
